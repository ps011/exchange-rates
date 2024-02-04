import {CURRENCIES, CurrencyCodes} from "../constants";

export interface ExchangeRatesResponse {
    valid: boolean;
    updated: number;
    base: string;
    rates: Rate | null;
}

export interface Currency {
    label: string;
    value: CurrencyCodes;
}

export type Rate = { [key in CurrencyCodes]: number };

export async function fetchExchangeRates(): Promise<{
    rates: Rate | null,
    lastUpdated: number | null
}> {
    const res: Response = await fetch(`${process.env.CURRENCY_API_URL}/rates?key=${process.env.CURRENCY_API_KEY}`)
    const data: ExchangeRatesResponse = await res.json();
    return {
        rates: data.rates || null,
        lastUpdated: data.updated || null
    }
}

export const getConvertedValue = (sourceCurrency: Currency, destinationCurrency: Currency, exchangeRates: Rate, value: number): number | null => {
    if (sourceCurrency && destinationCurrency) {
        return (parseFloat((value * (exchangeRates[destinationCurrency.value] / exchangeRates[sourceCurrency.value])).toFixed(2)));
    }
    return null;
}

export const getCurrencyList = (): Currency[] => {
    return Object.keys(CURRENCIES).map((key: CurrencyCodes) => {
        return {label: CURRENCIES[key], value: key};
    });
};

export const getCurrencyFromValue = (value: CurrencyCodes): Currency => {
    return {label: CURRENCIES[value], value: value};
};