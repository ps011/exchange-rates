import {CURRENCIES} from '../constants';
import {useState, useEffect} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {Currency, SelectCurrency} from "../components/SelectCurrency";
import {Button, TextField} from '@mui/material';
import CurrencyInputGroup from "../components/CurrencyInputGroup";

export async function getStaticProps() {
    const res = await fetch(`https://currencyapi.net/api/v1/rates?key=${process.env.API_KEY}`)
    const data = await res.json();
    return {
        props: {
            exchangeRates: data.rates || null,
            lastUpdated: new Date(Date.now()).toString()
        },
        revalidate: 3600,
    }
}

export default function Home({exchangeRates, lastUpdated}) {
    const SRC_KEY = 'src';
    const DEST_KEY = 'dest';
    const {query} = useRouter();
    let sourceCur: Currency = {label: CURRENCIES["EUR"], value: "EUR"};
    let destinationCur: Currency = {label: CURRENCIES["INR"], value: "INR"};
    const getCurrencyFromValue = (value: string): Currency => {
        return {label: CURRENCIES[value], value: value};
    }

    if (typeof window !== "undefined") {
        sourceCur = getCurrencyFromValue((query.src as string) || localStorage.getItem(SRC_KEY) || 'EUR');
        destinationCur = getCurrencyFromValue((query.dest as string) || localStorage.getItem(DEST_KEY) || 'INR');
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
        calculateExchangeRate(sourceValue);
    }, [destinationCurrency, sourceCurrency])

    const calculateExchangeRate = (e) => {
        if (sourceCurrency && destinationCurrency) {
            setSourceValue(e)
            setDestinationValue(parseFloat((e * (exchangeRates[destinationCurrency.value] / exchangeRates[sourceCurrency.value])).toFixed(2)));
        } else {
            alert('Please Select Currencies')
        }
    }

    const toggleCurrencies = () => {
        localStorage.setItem(SRC_KEY, sourceCurrency.value);
        localStorage.setItem(DEST_KEY, destinationCurrency.value);
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
                className="w-full dark:bg-white"
                type="number"
                value={sourceValue}
                onChange={(e) => calculateExchangeRate(e.target.value)}/>
        )
    }

    const destinationCurrencyInput = () => {
        return (
            <TextField
                className="w-full dark:bg-white"
                type="number"
                value={destinationValue}
                disabled
            />
        )
    }

    return (
        <div
            className="flex flex-col justify-between items-center h-screen w-screen bg-blue-400 text-center dark:bg-blue-950 dark:text-white">
            <h1>Currency Exchange Rates</h1>
            <div className="w-full md:w-4/5 lg:w-2/3">
                <CurrencyInputGroup select={sourceCurrencySelect()} input={sourceCurrencyInput()}/>
                <CurrencyInputGroup select={destinationCurrencySelect()} input={destinationCurrencyInput()}/>
                <Button className="mt-6" variant="contained" size="large" onClick={toggleCurrencies}>Toggle
                    Currencies</Button>
            </div>
            <div className="text-center flex flex-col">
                <small>Last Updated: {lastUpdated}</small>
                <p>Developed and Maintained by</p>
                <Link href="https://ps011.github.io">Prasheel Soni</Link>
            </div>
        </div>
    )
}
