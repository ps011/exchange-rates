import {CssBaseline} from "@mui/material";
import '../styles/global.css';
import Footer from "../components/Footer";
import Header from "../components/Header";
import {Josefin_Sans} from 'next/font/google';

const josefinSans = Josefin_Sans({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-josefin',
})

function ExchangeRates({Component, pageProps}) {
    return (
        <main className={`${josefinSans.variable} font-josefin`}>
        <CssBaseline/>
        <Header />
        <Component {...pageProps} />
        <Footer />
    </main>
    )
}

export default ExchangeRates;