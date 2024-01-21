import {CssBaseline} from "@mui/material";
import '../styles/global.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function ExchangeRates({Component, pageProps}) {
    return (<>
            <CssBaseline/>
            <Component {...pageProps} />
    </>)
}

export default ExchangeRates;