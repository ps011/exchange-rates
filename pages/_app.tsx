import { CssBaseline } from "@mui/material";
import "../styles/global.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Josefin_Sans } from "next/font/google";
import { AppProps } from "next/app";
import { useMemo } from "react";
import { ExchangeRatesFirebase } from "../lib/firebase";

const josefinSans = Josefin_Sans({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-josefin",
});

function ExchangeRates({ Component, pageProps }: AppProps) {
  const firebaseApp = useMemo(() => {
    return new ExchangeRatesFirebase();
  }, []);

  return (
    <main className={`${josefinSans.variable} font-josefin`}>
      <CssBaseline />
      <Header logFirebaseEvent={firebaseApp.logFirebaseEvent} />
      <Component {...pageProps} />
      <Footer logFirebaseEvent={firebaseApp.logFirebaseEvent} />
    </main>
  );
}

export default ExchangeRates;
