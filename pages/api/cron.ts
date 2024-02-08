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
        response.status(200).end();
    } catch (error) {
        console.error(error);
        response.write(error.message);
        response.status(500);
        response.end();
    }
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

async function processDataset(data: { [key: string]: NotificationData }): Promise<void> {
    const accessToken = await fetchAccessToken();
    const {rates} = await fetchExchangeRates();
    for (const key of Object.keys(data)) {
        await sendNotification(key, data[key], rates, accessToken)
    }

}

async function sendNotification(key: string, value: NotificationData, rates: Rate, token: string): Promise<void> {
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
                            body: 'Currency Exchange Rate Update',
                            title: `${value.source} 1 -> ${value.destination} ${getConvertedValue(getCurrencyFromValue(value.source), getCurrencyFromValue(value.destination), rates, 1)}`,
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