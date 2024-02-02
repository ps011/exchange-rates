import {CssBaseline} from "@mui/material";
import '../styles/global.css';
import {useEffect} from "react";
import {ExchangeRatesFirebase} from "../lib/firebase";

function ExchangeRates({Component, pageProps}) {
    useEffect(() => {
        const firebaseApp = new ExchangeRatesFirebase();
    }, [ExchangeRatesFirebase]);
    return (<>
            <CssBaseline/>
            <Component {...pageProps} />
    </>)
}

export default ExchangeRates;