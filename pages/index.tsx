import {CURRENCIES} from '../constants';
import {useState, useEffect} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {SelectCurrency} from "../components/SelectCurrency";
import {Button, TextField} from '@mui/material';
import CurrencyInputGroup from "../components/CurrencyInputGroup";

export async function getStaticProps() {
    const res = await fetch(`https://currencyapi.net/api/v1/rates?key=${process.env.API_KEY}`)
    const data = await res.json();
    return {
        props: {
            exchangeRates: data.rates || null,
            lastUpdated: new Date(Date.now()).toUTCString()
        },
        revalidate: 3600,
    }
}

export default function Home({exchangeRates, lastUpdated}) {
    const {query} = useRouter();
    let sourceCur = '';
    let destinationCur = ''

    if (typeof window !== "undefined") {
        sourceCur = (query.src as string) || localStorage.getItem('src') || 'EUR';
        destinationCur = (query.dest as string) || localStorage.getItem('dest') || 'INR';
    }
    const [sourceCurrency, setSourceCurrency] = useState(sourceCur);
    const [destinationCurrency, setDestinationCurrency] = useState(destinationCur);
    const [sourceValue, setSourceValue] = useState(1);
    const [destinationValue, setDestinationValue] = useState(0);
    const [currencyList, setCurrencyList] = useState([]);

    useEffect(() => {
        const list = []
        Object.keys(CURRENCIES).map(key => {
            const obj = {label: CURRENCIES[key], value: key};
            list.push(obj);
        });
        setCurrencyList(list);
        console.log(sourceCurrency, destinationCurrency)
    }, [])

    useEffect(() => {
        calculateExchangeRate(sourceValue);
    }, [destinationCurrency, sourceCurrency])

    const calculateExchangeRate = (e) => {
        if (sourceCurrency !== 'Currency' && destinationCurrency !== 'Currency') {
            setSourceValue(e)
            setDestinationValue(parseFloat((e * (exchangeRates[destinationCurrency] / exchangeRates[sourceCurrency])).toFixed(2)));
        } else {
            alert('Please Select Currencies')
        }
    }

    const toggleCurrencies = () => {
        localStorage.setItem('src', sourceCurrency);
        localStorage.setItem('dest', destinationCurrency);
        const src = sourceCurrency;
        const srcVal = sourceValue;
        setSourceCurrency(destinationCurrency);
        setDestinationCurrency(src);
        setSourceValue(destinationValue);
        setDestinationValue(srcVal);
    }

    function sourceCurrencySelect() {
        return (
            <SelectCurrency
                onChange={(e) => {
                    setSourceCurrency(e.value);
                    localStorage.setItem('src', e.value)
                }}
                currencyList={currencyList}
                currency={sourceCurrency}
            />
        )
    }

    function destinationCurrencySelect() {
        return (
            <SelectCurrency
                onChange={(e) => {
                    setDestinationCurrency(e.value);
                    localStorage.setItem('dest', e.value)
                }}
                currencyList={currencyList}
                currency={destinationCurrency}
            />
        )
    }

    function sourceCurrencyInput() {
        return (
            <TextField
                className="dark:bg-white"
                type="number"
                value={sourceValue}
                onChange={(e) => calculateExchangeRate(e.target.value)}/>
        )
    }

    function destinationCurrencyInput() {
        return (
            <TextField
                className="dark:bg-white"
                type="number"
                value={destinationValue}
                onChange={(e) => calculateExchangeRate(e.target.value)}/>
        )
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-blue-400 dark:bg-blue-950 dark:text-white">
            <div className="text-center">
                <h1>Currency Exchange Rates</h1>
                <div>
                    <CurrencyInputGroup select={sourceCurrencySelect()} input={sourceCurrencyInput()}/>
                    <CurrencyInputGroup select={destinationCurrencySelect()} input={destinationCurrencyInput()}/>
                </div>
                <Button variant="contained" onClick={toggleCurrencies}>Toggle Currencies</Button>
                <div>
                    <small>Last Updated: {lastUpdated}</small> <br/>
                    Developed and Maintained by <br/> <Link href="https://ps011.github.io">Prasheel Soni</Link>
                </div>
            </div>
        </div>
    )
}
