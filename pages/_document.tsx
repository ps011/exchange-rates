import Document, {Html, Head, Main, NextScript} from 'next/document'

class ExchangeRatesDocument extends Document {
    render() {
        return (
            <Html className="h-full">
                <Head>
                    <link rel="manifest" href="/manifest.json"/>
                    <link rel="apple-touch-icon" href="/icon-192.png"></link>
                    <meta name="theme-color" content="#075dc0"/>
                    <script async
                            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6531525250981265"></script>
                </Head>
                <body className="h-full">
                <Main />
                <NextScript/>
                </body>
            </Html>
        )
    }
}

export default ExchangeRatesDocument
