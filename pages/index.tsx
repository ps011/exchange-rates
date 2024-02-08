import {CURRENCIES, CurrencyCodes} from '../constants';
import {useState, useEffect, useMemo} from 'react';
import {useRouter} from 'next/router';
import {SelectCurrency} from "../components/SelectCurrency";
import {Button, Snackbar, TextField} from '@mui/material';
import CurrencyInputGroup from "../components/CurrencyInputGroup";
import {Close, NotificationAdd, SwapVert} from "@mui/icons-material";
import {ExchangeRatesFirebase} from "../lib/firebase";
import {logEvent} from "@firebase/analytics";
import {onMessage} from "@firebase/messaging";
import {
    Currency,
    fetchExchangeRates, getConvertedValue,
    getCurrencyFromValue,
    getCurrencyList,
    Rate
} from "../lib/exchange-rates-api";


export enum Events {
    SWAP_CURRENCIES = 'swap_currencies',
    CHANGE_SOURCE_CURRENCY = 'change_source_currency',
    CHANGE_DESTINATION_CURRENCY = 'change_destination_currency',
    FOOTER_LINK_CLICKED = 'footer_link_clicked',
    HEADER_LINK_CLICKED = 'header_link_clicked',
}

export async function getStaticProps(): Promise<{
    props: { exchangeRates: Rate | null, lastUpdated: number | null },
    revalidate: number
}> {

    const data = await fetchExchangeRates();
    return {
        props: {
            exchangeRates: data.rates || null,
            lastUpdated: data.lastUpdated || null,
        },
        revalidate: 3600,
    }
}

export default function Home({exchangeRates, lastUpdated}) {
    const SRC_KEY = 'src';
    const DEST_KEY = 'dest';
    const IS_CLIENT = typeof window !== "undefined";

    const {query} = useRouter();
    const firebaseApp = useMemo(() => {
        return new ExchangeRatesFirebase();
    }, []);

    const [sourceCurrency, setSourceCurrency] = useState<Currency>({
        label: CURRENCIES[CurrencyCodes.EUR],
        value: CurrencyCodes.EUR
    });
    const [destinationCurrency, setDestinationCurrency] = useState<Currency>({
        label: CURRENCIES[CurrencyCodes.INR],
        value: CurrencyCodes.INR
    });
    const [sourceValue, setSourceValue] = useState(1);
    const [destinationValue, setDestinationValue] = useState(0);
    const [currencyList, setCurrencyList] = useState([]);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    useEffect(() => {
        setCurrencyList(getCurrencyList());

        setSourceCurrency(getCurrencyFromValue((query.src as CurrencyCodes) || localStorage.getItem(SRC_KEY) as CurrencyCodes || CurrencyCodes.EUR));
        setDestinationCurrency(getCurrencyFromValue((query.dest as CurrencyCodes) || localStorage.getItem(DEST_KEY) as CurrencyCodes || CurrencyCodes.INR));

        onMessage(firebaseApp.messaging, (payload) => {
            new Notification(payload.data.title, {
                body: payload.data.body,
                icon: '/favicon.ico',
                badge: '/favicon.ico',
            })
        });
    }, []);

    useEffect(() => {
        calculateExchangeRate(sourceValue);
    }, [sourceCurrency, destinationCurrency])

    const calculateExchangeRate = (e) => {
        const value = getConvertedValue(sourceCurrency, destinationCurrency, exchangeRates, e);
        if (value) {
            setSourceValue(e)
            setDestinationValue(value);
        } else {
            setSnackbarMessage("Failed to calculate exchange rates");
            setShowSnackbar(true);
        }
    }

    const toggleCurrencies = () => {
        localStorage.setItem(SRC_KEY, destinationCurrency.value);
        localStorage.setItem(DEST_KEY, sourceCurrency.value);
        const src = sourceCurrency;
        setSourceCurrency(destinationCurrency);
        setDestinationCurrency(src);

        if (IS_CLIENT && firebaseApp) {
            logEvent(firebaseApp.analytics, Events.SWAP_CURRENCIES, {
                sourceCurrency: sourceCurrency.value,
                destinationCurrency: destinationCurrency.value,
            });
        }
    }

    const sourceCurrencySelect = () => {
        return (
            <SelectCurrency
                onChange={(e) => {
                    setSourceCurrency(e);
                    localStorage.setItem(SRC_KEY, e.value);
                    firebaseApp.logFirebaseEvent(Events.CHANGE_SOURCE_CURRENCY, {
                        oldValue: sourceCurrency.value,
                        newValue: e.value,
                    });
                }}
                currencyList={currencyList}
                currency={sourceCurrency}
            />
        )
    }

    const destinationCurrencySelect = () => {
        return (
            <SelectCurrency
                onChange={(e) => {
                    setDestinationCurrency(e);
                    localStorage.setItem(DEST_KEY, e.value);
                    firebaseApp.logFirebaseEvent(Events.CHANGE_DESTINATION_CURRENCY, {
                        oldValue: destinationCurrency.value,
                        newValue: e.value,
                    });
                }}
                currencyList={currencyList}
                currency={destinationCurrency}
            />
        )
    }

    const sourceCurrencyInput = () => {
        return (
            <TextField
                className="font-josefin w-full rounded dark:bg-white"
                type="number"
                value={sourceValue}
                onChange={(e) => calculateExchangeRate(e.target.value)}/>
        )
    }

    const destinationCurrencyInput = () => {
        return (
            <TextField
                className="font-josefin w-full rounded dark:bg-white"
                type="number"
                value={destinationValue}
                disabled
            />
        )
    }

    const subscribeToNotifications = () => {
        firebaseApp.subscribeToNotifications({
            source: sourceCurrency.value,
            destination: destinationCurrency.value,
            timezoneOffset: new Date().getTimezoneOffset(),
            subscribedAt: new Date().toISOString(),
        }).then((isSet) => {
            if (isSet) {
                setSnackbarMessage(`Subscribed to notifications for ${sourceCurrency.value} → ${destinationCurrency.value}`);
                setShowSnackbar(true);
            } else {
                setSnackbarMessage("Please grant permission to receive notifications");
                setShowSnackbar(true);
            }
        })
    }

    return (
        <div
            className="flex items-center justify-center w-screen text-center h-[calc(100%-212px)]">
            {
                destinationValue &&
                <title>{sourceCurrency.value} {sourceValue} → {destinationCurrency.value} {destinationValue}</title>
            }
            <div className="w-full md:w-4/6 xl:w-3/6 2xl:w-2/6 mt-24">
                <CurrencyInputGroup select={sourceCurrencySelect()} input={sourceCurrencyInput()}/>
                <div className="flex justify-center">
                    <Button className="text-blue-400 bg-white dark:bg-blue-400 dark:text-white mr-2" variant="outlined"
                            size="large" onClick={toggleCurrencies}>
                        <SwapVert/>
                    </Button>
                    <Button variant="outlined" color="primary" aria-label="add" onClick={subscribeToNotifications}>
                        <NotificationAdd/>
                    </Button>
                </div>
                <CurrencyInputGroup select={destinationCurrencySelect()} input={destinationCurrencyInput()}/>
                <p className="mt-4 uppercase"><small className="text-neutral-500">Last Updated</small>
                    <br/> {new Date(lastUpdated * 1000).toLocaleString('en-GB', {hour12: true, timeStyle: "short"})}</p>
            </div>
            <Snackbar
                open={showSnackbar}
                autoHideDuration={5000}
                onClose={() => setShowSnackbar(false)}
                message={snackbarMessage}
                action={
                    <Button color="inherit" size="small" onClick={() => setShowSnackbar(false)}>
                        <Close/>
                    </Button>
                }
                className="bottom-30"
            />
        </div>
    )
}
