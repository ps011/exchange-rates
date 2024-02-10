## Currency Exchange Rates

This is a Next.JS based application to convert one currency into another using the `currencyapi`. I created this application to convert currencies when I'm traveling abroad and need something handy, fast, and easy to convert currencies.

## Getting started
- Clone the repository
- Run `nvm use` to use the correct node version
- Run `npm install`
- Rename `.env.example` to `.env` and replace the value of environment variables with your variables. [See setups for more information](#setups).
- Run `npm run dev` to start the development server
- Open `http://localhost:3000` in your browser
- Enjoy the app

### Setups
- In order to setup the repository on local system. You will need only one thing, an account on `https://currencyapi.net/`.
  - Create an account on currencyapi.net
  - Get the API key
  - Rename .env.example to .env
  - Replace the value of CURRENCY_API_KEY with your API key.
- Create an account and project on firebase and get the firebase config
  - Replace the value of NEXT_PUBLIC_FIREBASE_* configs with your firebase config.


### Features (MVP) ✅
- ~~Select currencies~~ ✅
- ~~Set source currency and get a corresponding value in destination currency~~ ✅
- ~~Add the last updated time for currency rates~~ ✅
- ~~Add Dark Mode~~ ✅

### Planned Features and Roadmap

- Product
    - ~~As a user I should be able to see conversion rates on the title bar~~ ✅
    - ~~As a user I should be able to enable live exchange rate tracking by polling API every 3 or 5 mins or something~~ ❌
    - ~~As a user I should be able to setup notifications for specific currencies and target rates so that I get one notification everyday~~ ✅
    - ~~As a user, I should be able to see the last changed time in my timezone~~ ✅

- Tech
    - ~~Add Header and Footer~~ ✅
    - Add animations
    - ~~Migrate to Next.JS 13~~ ✅
    - ~~Publish the app on play store~~ ✅
    - ~~Start using github actions for CI/CD~~ ✅
    - ~~Migrate to typescript~~ ✅
    - ~~Add a favicon~~ ✅
    - ~~Add better Dark mode~~ ✅

