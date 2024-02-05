import Document, {Html, Head, Main, NextScript} from 'next/document'

class ExchangeRatesDocument extends Document {
    render() {
        return (
            <Html className="h-full">
                <Head>
                    <link rel="manifest" href="/manifest.json"/>
                    <meta name="theme-color" content="#172554"/>

                    <meta name="application-name" content="Currency Exchange Rates" />
                    <meta name="apple-mobile-web-app-capable" content="yes" />
                    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                    <meta name="apple-mobile-web-app-title" content="Currency Exchange Rates" />
                    <meta name="description" content="An app to check currency exchange rates" />
                    <meta name="format-detection" content="telephone=no" />
                    <meta name="mobile-web-app-capable" content="yes" />
                    <meta name="msapplication-config" content="/icons/browserconfig.xml" />
                    <meta name="msapplication-TileColor" content="#2B5797" />
                    <meta name="msapplication-tap-highlight" content="no" />

                    <link rel="apple-touch-icon" href="/assets/icons/apple-touch-icon.png" />
                    <link rel="apple-touch-icon" sizes="152x152" href="/assets/icons/apple-touch-icon.png" />
                    <link rel="apple-touch-icon" sizes="180x180" href="/assets/icons/apple-touch-icon.png" />
                    <link rel="apple-touch-icon" sizes="167x167" href="/assets/icons/apple-touch-icon.png" />

                    <link rel="icon" type="image/png" sizes="32x32" href="/assets/icons/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/assets/icons/favicon-16x16.png" />
                    <link rel="shortcut icon" href="/favicon.ico" />

                    <meta name="twitter:card" content="Currency Exchange Rates" />
                    <meta name="twitter:url" content="https://exchange-rates-delta.vercel.app/" />
                    <meta name="twitter:title" content="Currency Exchange Rates" />
                    <meta name="twitter:description" content="An app to check currency exchange rates" />
                    <meta name="twitter:image" content="https://exchange-rates-delta.vercel.app/assets/icons/android-chrome-192x192.png" />
                    <meta name="twitter:creator" content="@soniprasheel" />
                    <meta property="og:type" content="website" />
                    <meta property="og:title" content="Currency Exchange Rates" />
                    <meta property="og:description" content="An app to check currency exchange rates" />
                    <meta property="og:site_name" content="Currency Exchange Rates" />
                    <meta property="og:url" content="https://exchange-rates-delta.vercel.app/" />
                    <meta property="og:image" content="https://exchange-rates-delta.vercel.app/assets/icons/apple-touch-icon.png" />
                </Head>
                <body className="dark:bg-gray-900 dark:text-white">
                <Main />
                <NextScript/>
                </body>
            </Html>
        )
    }
}

export default ExchangeRatesDocument
