import {CURRENCIES, Currency, CurrencyCodes} from '../lib/constants';
import {useState, useEffect, useMemo} from 'react';
import {useRouter} from 'next/router';
import {SelectCurrency} from "../components/SelectCurrency";
import {Button, Snackbar, TextField} from '@mui/material';
import CurrencyInputGroup from "../components/CurrencyInputGroup";
import {Close, NotificationAdd, SwapVert} from "@mui/icons-material";
import {ExchangeRatesFirebase} from "../lib/firebase";
import {onMessage} from "@firebase/messaging";
import {
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

    const [sourceCurrency, setSourceCurrency] = useState<Currency>(CURRENCIES[CurrencyCodes.EUR]);
    const [destinationCurrency, setDestinationCurrency] = useState<Currency>(CURRENCIES[CurrencyCodes.INR]);
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
    }

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
        )
    }

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
        )
    }

    const sourceCurrencyInput = () => {
        return (
            <TextField
                className="w-full rounded dark:bg-white"
                type="number"
                value={sourceValue}
                onChange={(e) => calculateExchangeRate(e.target.value)}/>
        )
    }

    const destinationCurrencyInput = () => {
        return (
            <TextField
                className="w-full rounded dark:bg-white"
                type="number"
                value={destinationValue}
                disabled
            />
        )
    }

    const subscribeToNotifications = () => {
        firebaseApp.subscribeToNotifications({
            source: sourceCurrency.code,
            destination: destinationCurrency.code,
            timezoneOffset: new Date().getTimezoneOffset(),
            subscribedAt: new Date().toISOString(),
        }).then((isSet) => {
            if (isSet) {
                setSnackbarMessage(`Subscribed to notifications for ${sourceCurrency.code} → ${destinationCurrency.code}`);
                setShowSnackbar(true);
            } else {
                setSnackbarMessage("Please grant permission to receive notifications");
                setShowSnackbar(true);
            }
        })
    }

    return (
        <div
            className="flex items-center justify-center w-screen text-center h-[calc(100vh-252px)] md:h-[calc(100vh-220px)]">
            {
                destinationValue &&
                <title>{sourceCurrency.code} {sourceValue} → {destinationCurrency.code} {destinationValue}</title>
            }
            <div className="w-full md:w-4/6 xl:w-3/6 2xl:w-2/6 mt-24">
                <CurrencyInputGroup select={sourceCurrencySelect()} input={sourceCurrencyInput()}/>
                <div className="flex justify-center">
                    <Button classes={{root: "mr-2 dark:text-white"}} variant="outlined" color="primary"
                            size="large" onClick={toggleCurrencies}>
                        <SwapVert/>
                    </Button>
                    <Button color="primary" onClick={subscribeToNotifications}>
                        <NotificationAdd/>
                    </Button>
                </div>
                <CurrencyInputGroup select={destinationCurrencySelect()} input={destinationCurrencyInput()}/>
                <p className="mt-4 uppercase" suppressHydrationWarning><small className="text-neutral-500" >Last Updated</small>
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
