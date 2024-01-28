import {CURRENCIES, CurrencyCodes} from '../constants';
import {useState, useEffect} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {Currency, SelectCurrency} from "../components/SelectCurrency";
import {Button, Fab, TextField} from '@mui/material';
import CurrencyInputGroup from "../components/CurrencyInputGroup";
import {NotificationAdd, SwapVert} from "@mui/icons-material";

type Rate = { [key in CurrencyCodes]: number };

interface ExchangeRatesResponse {
    valid: boolean;
    updated: number;
    base: string;
    rates:  Rate | null;
}

export enum MessageTypes {
    NOTIFICATION = 'notification'
}

export async function getStaticProps(): Promise<{
    props: { exchangeRates: Rate | null, lastUpdated: number | null },
    revalidate: number
}> {
    const res: Response = await fetch(`https://currencyapi.net/api/v1/rates?key=${process.env.NEXT_PUBLIC_API_KEY}`)
    const data = await res.json();
    return {
        props: {
            exchangeRates: data.rates || null,
            lastUpdated: data.updated || null,
        },
        revalidate: 3600,
    }
}

export default function Home({exchangeRates, lastUpdated}) {
    const SRC_KEY = 'src';
    const DEST_KEY = 'dest';
    const NOTIFICATION_KEY = 'notification';
    const IS_CLIENT = typeof window !== "undefined";

    const {query} = useRouter();
    let sourceCur: Currency = {label: CURRENCIES[CurrencyCodes.EUR], value: CurrencyCodes.EUR};
    let destinationCur: Currency = {label: CURRENCIES[CurrencyCodes.INR], value: CurrencyCodes.INR};

    const getCurrencyFromValue = (value: string): Currency => {
        return {label: CURRENCIES[value], value: value};
    }

    if (IS_CLIENT) {
        sourceCur = getCurrencyFromValue((query.src as string) || localStorage.getItem(SRC_KEY) || CurrencyCodes.EUR);
        destinationCur = getCurrencyFromValue((query.dest as string) || localStorage.getItem(DEST_KEY) || CurrencyCodes.INR);
    }

    const [sourceCurrency, setSourceCurrency] = useState(sourceCur);
    const [destinationCurrency, setDestinationCurrency] = useState(destinationCur);
    const [sourceValue, setSourceValue] = useState(1);
    const [destinationValue, setDestinationValue] = useState(0);
    const [currencyList, setCurrencyList] = useState([]);

    useEffect(() => {
        const currencyList: Currency[] = []
        Object.keys(CURRENCIES).map(key => {
            const currency: Currency = {label: CURRENCIES[key], value: key};
            currencyList.push(currency);
        });
        setCurrencyList(currencyList);
    }, []);

    useEffect(() => {
        calculateExchangeRate(sourceValue);
    }, [sourceCurrency, destinationCurrency])

    const calculateExchangeRate = (e) => {
        if (sourceCurrency && destinationCurrency) {
            setSourceValue(e)
            setDestinationValue(parseFloat((e * (exchangeRates[destinationCurrency.value] / exchangeRates[sourceCurrency.value])).toFixed(2)));
        } else {
            alert('Please Select Currencies')
        }
    }

    const toggleCurrencies = () => {
        localStorage.setItem(SRC_KEY, destinationCurrency.value);
        localStorage.setItem(DEST_KEY, sourceCurrency.value);
        const src = sourceCurrency;
        setSourceCurrency(destinationCurrency);
        setDestinationCurrency(src);
    }

    const sourceCurrencySelect = () => {
        return (
            <SelectCurrency
                onChange={(e) => {
                    setSourceCurrency(e);
                    localStorage.setItem(SRC_KEY, e.value)
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
                    localStorage.setItem(DEST_KEY, e.value)
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

    const enableNotifications = () => {
        Notification.requestPermission()
            .then(function (permission: NotificationPermission) {
                if (permission === "granted") {

                    navigator.serviceWorker.ready.then((registration) => {
                        registration.active.postMessage({
                            type: MessageTypes.NOTIFICATION,
                            payload: {
                                sourceCurrency: sourceCurrency.value,
                                destinationCurrency: destinationCurrency.value,
                            }
                        });
                    localStorage.setItem(NOTIFICATION_KEY, 'true');
                    });
                }
            });
    }

    const areNotificationsEnabled = (): boolean => {
        if (IS_CLIENT) {
            return localStorage.getItem(NOTIFICATION_KEY) === 'true';
        }
        return false;
    };

    return (
        <div
            className="flex flex-col justify-between items-center h-full w-screen text-center dark:bg-blue-950 dark:text-white">
            {
                destinationValue &&
                <title>{sourceCurrency.value} {sourceValue} → {destinationCurrency.value} {destinationValue}</title>
            }
            <h1>Currency Exchange Rates</h1>
            <div className="sm:w-4/6 xl:w-3/6 2xl:w-2/6">
                <CurrencyInputGroup select={sourceCurrencySelect()} input={sourceCurrencyInput()}/>
                <Button className="text-blue-400 bg-white dark:bg-blue-400 dark:text-white" variant="outlined"
                        size="large" onClick={toggleCurrencies}>
                    <SwapVert/>
                </Button>
                <CurrencyInputGroup select={destinationCurrencySelect()} input={destinationCurrencyInput()}/>
                <p className="mt-4 uppercase"><small className="text-neutral-500">Last Updated</small>
                    <br/> {new Date(lastUpdated * 1000).toLocaleString('en-GB', {hour12: true, timeStyle: "long"})}</p>
            </div>
            <div className="text-center flex flex-col">
                <p className="my-0">Developed and Maintained by</p>
                <Link href="https://ps011.github.io">Prasheel Soni</Link>
            </div>
            {
                !areNotificationsEnabled() &&
                <Fab color="primary" aria-label="add" className="absolute bottom-16 right-8"
                     onClick={enableNotifications}>
                    <NotificationAdd/>
                </Fab>
            }

        </div>
    )
}