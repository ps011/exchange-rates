import {CURRENCIES, Currency, CurrencyCodes} from "./constants";
import {MOCK_RESPONSE} from "./mock-response";

export interface ExchangeRatesResponse {
    valid: boolean;
    updated: number;
    base: string;
    rates: Rate | null;
}

export interface GetStaticProps {
    exchangeRates: Rate | null,
    lastUpdated: number | null
}

export interface ExchangeRatesProps {
    rates: Rate | null,
    lastUpdated: number | null
}


export type Rate = { [key in CurrencyCodes]: number };

export const SRC_KEY = 'src';
export const DEST_KEY = 'dest';

export async function fetchExchangeRates(): Promise<ExchangeRatesProps> {
    if (process.env.NODE_ENV !== "production") {
        return MOCK_RESPONSE;
    }
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

export const getCurrencyDetailsByCode = (code: CurrencyCodes): Currency => {
    return CURRENCIES[code];
};

export const getDefaultCurrency = (query, key: typeof SRC_KEY | typeof DEST_KEY): Currency => {
    const code = (query as CurrencyCodes) || localStorage.getItem(SRC_KEY) as CurrencyCodes
    if (key === SRC_KEY) {
        return code in CurrencyCodes ? CURRENCIES[code] : CURRENCIES.EUR;
    }
    return code in CurrencyCodes ? CURRENCIES[code] : CURRENCIES.INR;
}