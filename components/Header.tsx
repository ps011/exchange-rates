import {AppBar, IconButton, Toolbar} from "@mui/material";
import Image from "next/image";
import {GitHub} from "@mui/icons-material";
import {getAnalytics, logEvent} from "@firebase/analytics";
import {Events} from "../pages";
import {useMemo} from "react";
import {ExchangeRatesFirebase} from "../lib/firebase";

export default function Header() {
    const firebaseApp = useMemo(() => {
        return new ExchangeRatesFirebase();
    }, []);
    const logLinkClickEvent = (name: string) => {
        logEvent(getAnalytics(firebaseApp.firebaseApp), Events.HEADER_LINK_CLICKED, {name})
    }
    return (
        <AppBar position="sticky" classes={{colorPrimary: "bg-blue-950"}}>
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{mr: 2}}
                    onClick={() => {
                        logLinkClickEvent("logo")
                    }}
                >
                    <Image src={'/assets/icons/icon-512.png'} alt="logo" width={40} height={40}/>
                </IconButton>

                <h2 className="flex-1">
                    Exchange Rates
                </h2>
                <a href="https://github.com/ps011/exchange-rates" target="_blank" rel="noreferrer noopener"
                     onClick={() => {
                          logLinkClickEvent("github")
                     }}
                   className="text-white">
                    <GitHub/>
                </a>
            </Toolbar>
        </AppBar>
    );
}