import {CssBaseline} from "@mui/material";
import '../styles/global.css';

function ExchangeRates({Component, pageProps}) {
    return (<>
            <CssBaseline/>
            <Component {...pageProps} />
    </>)
}

export default ExchangeRates;