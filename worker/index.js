'use strict'

self.__WB_DISABLE_DEV_LOGS = true
self.addEventListener("message", async (event) => {
    const payload = event.data.payload;
    switch (event.data.type) {
        case "notification": {
            const rates = await getExchangeRates();
            const exchangeRate = calculateExchangeRate(rates, payload.sourceCurrency, payload.destinationCurrency);
            const notificationOptions = {
                body: `${payload.sourceCurrency} 1 → ${payload.destinationCurrency} ${exchangeRate}`,
                icon: "icon-192.png",
                tag: "exchange-rate",
                data: {
                    url: process.env.NEXT_PUBLIC_MODE === "development" ? "http://localhost:3000" : "https://exchange-rates-delta.vercel.app/",
                }
            };

            setInterval(() => {
                self.registration.showNotification("Exchange Rate", notificationOptions);
            }, 30000);
        }
    }


});

const calculateExchangeRate = (exchangeRates, sourceCurrency, destinationCurrency) => {
    return (parseFloat(((exchangeRates[destinationCurrency] / exchangeRates[sourceCurrency])).toFixed(2)));
}

const getExchangeRates = async () => {
    const res = await fetch(`https://currencyapi.net/api/v1/rates?key=${process.env.NEXT_PUBLIC_API_KEY}`)
    const data = await res.json();
    return data.rates;
}