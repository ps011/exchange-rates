import {CssBaseline} from "@mui/material";
import '../styles/global.css';
import Footer from "../components/Footer";
import Header from "../components/Header";

function ExchangeRates({Component, pageProps}) {
    return (<>
        <CssBaseline/>
        <Header/>
        <Component {...pageProps} />
        <Footer/>
    </>)
}

export default ExchangeRates;