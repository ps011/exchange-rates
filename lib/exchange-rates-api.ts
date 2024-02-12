import {CURRENCIES, Currency, CurrencyCodes} from "./constants";

export interface ExchangeRatesResponse {
    valid: boolean;
    updated: number;
    base: string;
    rates: Rate | null;
}

export type Rate = { [key in CurrencyCodes]: number };

export async function fetchExchangeRates(): Promise<{
    rates: Rate | null,
    lastUpdated: number | null
}> {

    try {
        const res: Response = await fetch(`${process.env.CURRENCY_API_URL}/rates?key=${process.env.CURRENCY_API_KEY}`)
        const data: ExchangeRatesResponse = await res.json();
        return {
            rates: data.rates || null,
            lastUpdated: data.updated || null
        }
    } catch (e) {
        return {
            rates: null,
            lastUpdated: null
        }

    }
}

export const getConvertedValue = (sourceCurrency: Currency, destinationCurrency: Currency, exchangeRates: Rate, value: number): number | null => {
    if (sourceCurrency && destinationCurrency) {
        return (parseFloat((value * (exchangeRates[destinationCurrency.code] / exchangeRates[sourceCurrency.code])).toFixed(2)));
    }
    return null;
}

export const getCurrencyList = (): Currency[] => {
    return Object.keys(CURRENCIES).map((key: CurrencyCodes) => {
        return CURRENCIES[key];
    });
};

export const getCurrencyFromValue = (value: CurrencyCodes): Currency => {
    return CURRENCIES[value];
};