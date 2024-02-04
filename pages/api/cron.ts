import type {NextApiRequest, NextApiResponse} from 'next';
import {JWT} from "google-auth-library";
import {fetchExchangeRates, getConvertedValue, getCurrencyFromValue, Rate} from "../../lib/exchange-rates-api";
import {CurrencyCodes} from "../../constants";

interface NotificationData {
    source: CurrencyCodes;
    destination: CurrencyCodes;
    timezoneOffset: number;
    subscribedAt: string;
}

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse,
) {
    try {
        const data = await getDataset();
        await processDataset(data);
    } catch (error) {
        console.error(error);
    }
    response.status(200).end();
}

async function getDataset(): Promise<{ [key: string]: NotificationData }> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL}/notifications.json`)
        return response.json();
    } catch (error) {
        console.error(error);
        return {};
    }
}

async function processDataset(data: { [key: string]: NotificationData }) {
    const token = await fetchAccessToken();
    const {rates} = await fetchExchangeRates();
    Object.keys(data).forEach(async (key) => {
        await sendNotification(key, data[key], rates, token);
    });
}

async function sendNotification(key: string, value: NotificationData, rates: Rate, token: string) {
    try {
        await fetch(process.env.NEXT_PUBLIC_FIREBASE_NOTIFICATIONS_SEND_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(
                {
                    message: {
                        token: key,
                        data: {
                            title: 'Currency Exchange Rate Update',
                            body: `
                            ${value.source} 1 -> ${value.destination} ${getConvertedValue(getCurrencyFromValue(value.source), getCurrencyFromValue(value.destination), rates, 1)}`,
                        },
                    }
                }
            ),
        });
    } catch (error) {
        console.error(error);
    }

}

async function fetchAccessToken(): Promise<string> {
    const serviceAccount = JSON.parse(
        process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
    );
    const MESSAGING_SCOPE = 'https://www.googleapis.com/auth/firebase.messaging';
    const SCOPES = [MESSAGING_SCOPE];
    return new Promise(function (resolve, reject) {
        const jwtClient = new JWT(
            serviceAccount.client_email,
            null,
            serviceAccount.private_key,
            SCOPES,
            null
        );
        jwtClient.authorize(function (err, tokens) {
            if (err) {
                reject(err);
                return;
            }
            resolve(tokens.access_token);
        });
    });


}