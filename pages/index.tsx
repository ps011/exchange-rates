import { CURRENCIES, Currency, CurrencyCodes } from "../lib/constants";
import { useState, useEffect, useMemo, useCallback } from "react";
import { SelectCurrency } from "../components/SelectCurrency";
import { Button, Snackbar, TextField } from "@mui/material";
import CurrencyInputGroup from "../components/CurrencyInputGroup";
import {
  Close,
  FileCopy,
  NotificationAdd,
  SwapVert,
} from "@mui/icons-material";
import { ExchangeRatesFirebase } from "../lib/firebase";
import { onMessage } from "@firebase/messaging";
import {
  GetStaticProps,
  fetchExchangeRates,
  getConvertedValue,
  getCurrencyList,
  SRC_KEY,
  DEST_KEY,
  getDefaultCurrency,
} from "../lib/exchange-rates-api";
import { useSearchParams } from "next/navigation";

export enum Events {
  SWAP_CURRENCIES = "swap_currencies",
  CHANGE_SOURCE_CURRENCY = "change_source_currency",
  CHANGE_DESTINATION_CURRENCY = "change_destination_currency",
  FOOTER_LINK_CLICKED = "footer_link_clicked",
  HEADER_LINK_CLICKED = "header_link_clicked",
}

export async function getStaticProps(): Promise<
  | {
      props: GetStaticProps;
      revalidate: number;
    }
  | { notFound: boolean }
> {
  const data = await fetchExchangeRates();

  if (!data.rates) {
    return { notFound: true };
  }
  return {
    props: {
      exchangeRates: data.rates,
      lastUpdated: data.lastUpdated,
    },
    revalidate: 3600,
  };
}

export default function Home({ exchangeRates, lastUpdated }) {
  const IS_CLIENT = typeof window !== "undefined";

  const query = useSearchParams();
  const querySrc = query.get("src");
  const queryDest = query.get("dest");

  const firebaseApp = useMemo(() => {
    return new ExchangeRatesFirebase();
  }, []);

  const [sourceCurrency, setSourceCurrency] = useState<Currency>(
    CURRENCIES[CurrencyCodes.EUR],
  );
  const [destinationCurrency, setDestinationCurrency] = useState<Currency>(
    CURRENCIES[CurrencyCodes.INR],
  );
  const [sourceValue, setSourceValue] = useState(1);
  const [destinationValue, setDestinationValue] = useState(0);
  const [currencyList, setCurrencyList] = useState([]);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    setCurrencyList(getCurrencyList());

    setSourceCurrency(getDefaultCurrency(querySrc, SRC_KEY));
    setDestinationCurrency(getDefaultCurrency(queryDest, DEST_KEY));
  }, [querySrc, queryDest]);

  useEffect(() => {
    onMessage(firebaseApp.messaging, (payload) => {
      new Notification(payload.data.title, {
        body: payload.data.body,
        icon: "/favicon.ico",
        badge: "/favicon.ico",
      });
    });
  });

  const calculateExchangeRate = useCallback(
    (e) => {
      setSourceValue(e);
      if (!e) {
        setDestinationValue(0);
        return;
      }
      const value = getConvertedValue(
        sourceCurrency,
        destinationCurrency,
        exchangeRates,
        e,
      );
      if (value) {
        setDestinationValue(value);
      } else {
        setSnackbarMessage("Failed to calculate exchange rates");
        setShowSnackbar(true);
      }
    },
    [destinationCurrency, exchangeRates, sourceCurrency],
  );

  useEffect(() => {
    calculateExchangeRate(sourceValue);
  }, [sourceCurrency, destinationCurrency, sourceValue, calculateExchangeRate]);

  const toggleCurrencies = () => {
    localStorage.setItem(SRC_KEY, destinationCurrency.code);
    localStorage.setItem(DEST_KEY, sourceCurrency.code);
    const src = sourceCurrency;
    setSourceCurrency(destinationCurrency);
    setDestinationCurrency(src);

    if (IS_CLIENT && firebaseApp) {
      firebaseApp.logFirebaseEvent(Events.SWAP_CURRENCIES, {
        sourceCurrency: sourceCurrency.code,
        destinationCurrency: destinationCurrency.code,
      });
    }
  };

  const sourceCurrencySelect = () => {
    return (
      <SelectCurrency
        onChange={(e) => {
          setSourceCurrency(e);
          localStorage.setItem(SRC_KEY, e.code);
          firebaseApp.logFirebaseEvent(Events.CHANGE_SOURCE_CURRENCY, {
            oldValue: sourceCurrency.code,
            newValue: e.code,
          });
        }}
        currencyList={currencyList}
        currency={sourceCurrency}
      />
    );
  };

  const destinationCurrencySelect = () => {
    return (
      <SelectCurrency
        onChange={(e) => {
          setDestinationCurrency(e);
          localStorage.setItem(DEST_KEY, e.code);
          firebaseApp.logFirebaseEvent(Events.CHANGE_DESTINATION_CURRENCY, {
            oldValue: destinationCurrency.code,
            newValue: e.code,
          });
        }}
        currencyList={currencyList}
        currency={destinationCurrency}
      />
    );
  };

  const sourceCurrencyInput = () => {
    return (
      <TextField
        className="w-full rounded dark:bg-white"
        aria-label="Value"
        type="number"
        value={sourceValue}
        onChange={(e) => calculateExchangeRate(e.target.value)}
      />
    );
  };

  const destinationCurrencyInput = () => {
    return (
      <TextField
        className="w-full rounded dark:bg-white"
        aria-label="Converted value"
        type="number"
        value={destinationValue}
        disabled
      />
    );
  };

  const subscribeToNotifications = () => {
    firebaseApp
      .subscribeToNotifications({
        source: sourceCurrency.code,
        destination: destinationCurrency.code,
        timezoneOffset: new Date().getTimezoneOffset(),
        subscribedAt: new Date().toISOString(),
      })
      .then((isSet) => {
        if (isSet) {
          setSnackbarMessage(
            `Subscribed to notifications for ${sourceCurrency.code} → ${destinationCurrency.code}`,
          );
          setShowSnackbar(true);
        } else {
          setSnackbarMessage(
            "Please grant permission to receive notifications",
          );
          setShowSnackbar(true);
        }
      });
  };

  const copyToClipboard = () => {
    const hasSrcOrDest =
      window.location.search.includes("src") ||
      window.location.search.includes("dest");
    const queryParam = hasSrcOrDest
      ? ""
      : `?src=${sourceCurrency.code}&dest=${destinationCurrency.code}`;
    navigator.clipboard
      .writeText(
        `
        ${sourceCurrency.code} ${sourceValue} → ${destinationCurrency.code} ${destinationValue}
        Link: ${window.location.href}${queryParam}
        `,
      )
      .then(() => {
        setSnackbarMessage("Copied to clipboard");
        setShowSnackbar(true);
      })
      .catch(() => {
        setSnackbarMessage("Failed to copy to clipboard");
        setShowSnackbar(true);
      });
  };

  return (
    <div className="flex items-center justify-center w-screen text-center h-[calc(100vh-252px)] overflow-scroll md:h-[calc(100vh-220px)]">
      {destinationValue && (
        <title>
          {sourceCurrency.code} {sourceValue} → {destinationCurrency.code}{" "}
          {destinationValue}
        </title>
      )}
      <div className="w-full md:w-4/6 xl:w-3/6 2xl:w-2/6 mt-24">
        <CurrencyInputGroup
          select={sourceCurrencySelect()}
          input={sourceCurrencyInput()}
        />
        <div className="flex justify-center">
          <Button
            color="primary"
            onClick={copyToClipboard}
            aria-label="copy to clipcoard"
          >
            <FileCopy />
          </Button>
          <Button
            classes={{ root: "mr-2 dark:text-white" }}
            variant="outlined"
            color="primary"
            size="large"
            onClick={toggleCurrencies}
            aria-label="swap currencies"
          >
            <SwapVert />
          </Button>
          <Button
            color="primary"
            onClick={subscribeToNotifications}
            aria-label="subscribe to notifications"
          >
            <NotificationAdd />
          </Button>
        </div>
        <CurrencyInputGroup
          select={destinationCurrencySelect()}
          input={destinationCurrencyInput()}
        />
        <p className="mt-4 uppercase" suppressHydrationWarning>
          <small className="text-neutral-300">Last Updated</small>
          <br />{" "}
          {new Date(lastUpdated * 1000).toLocaleString("en-GB", {
            hour12: true,
            timeStyle: "short",
          })}
        </p>
      </div>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={5000}
        onClose={() => setShowSnackbar(false)}
        message={snackbarMessage}
        action={
          <Button
            color="inherit"
            size="small"
            onClick={() => setShowSnackbar(false)}
          >
            <Close />
          </Button>
        }
        className="bottom-30"
      />
    </div>
  );
}
