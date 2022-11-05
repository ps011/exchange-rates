## Currency Exchange Rates

This is a nextjs based application to convert one currency into another using the `currencyapi`. I created this application to convert currencies when I'm traveling abroad and need something handy, fast, and easy to convert currencies.

### Features (MVP)

- Select currencies
- Set source currency and get a corresponding value in destination currency
- Add the last updated time for currency rates
- Add Dark Mode

### Planned Features

- Product
    - As a user I should be able to see conversion rates on the title bar
    - As a user I should be able to enable live exchange rate tracking by polling API every 3 or 5 mins or something
    - As a user I should be able to setup notifications for specific currencies and target rates so that I do not miss when a currency reaches certain value

- Tech
    - Migrate to typescript
    - Add Header and Footer
    - Add animations
    - Add a favicon
    - Add better Dark mode

### API Endpoints
- `/rates`
- `/history`
- `/timeframe`
- `/currencies`

### Setups

In order to setup the repository on local system. You will need only one thing, an account on `https://currencyapi.net/`.

- Create an account on currencyapi.net
- Get the API key
- Rename .env.example to .env
- Replace the value of API_KEY with your API key.
