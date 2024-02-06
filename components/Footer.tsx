import {GitHub, Instagram, LinkedIn, X} from "@mui/icons-material";
import Link from "next/link";
import {getAnalytics, logEvent} from "@firebase/analytics";
import {useMemo} from "react";
import {ExchangeRatesFirebase} from "../lib/firebase";

export default function Footer() {
    const firebaseApp = useMemo(() => {
        return new ExchangeRatesFirebase();
    }, []);

    const logLinkClickEvent = (name: string) => {
        logEvent(getAnalytics(firebaseApp.firebaseApp), "footer_link_clicked", {name})
    }

    return (
        <footer className="bg-white rounded-lg shadow dark:bg-gray-900 fixed bottom-0 right-0 left-0">
            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8"/>
            <div className="text-center flex flex-col">
                <p className="my-0">Developed and Maintained by</p>
                <a href="https://ps011.github.io" target="_blank" className="text-white no-underline">Prasheel Soni</a>
            </div>
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div
                    className="flex flex-wrap justify-around items-center mb-6 text-sm font-medium text-gray-500 dark:text-gray-400">
                    <Link href="https://instagram.com/ps.11" target="_blank" className="text-white no-underline">
                        <span onClick={() => {
                            logLinkClickEvent("instagram")
                        }}>
                        <Instagram className="cursor-pointer"/>
                        </span>
                    </Link>
                    <Link href="https://github.com/ps011" target="_blank" className="text-white no-underline">
                        <span onClick={() => {
                            logLinkClickEvent("github")
                        }}>
                        <GitHub className="cursor-pointer"/>
                        </span>
                    </Link>
                    <Link href="https://x.com/soniprasheel" target="_blank" className="text-white no-underline">
                         <span onClick={() => {
                             logLinkClickEvent("github")
                         }}>
                        <X className="cursor-pointer"/>
                            </span>
                    </Link>
                    <Link href="https://linkedin.com/in/ps011" target="_blank" className="text-white no-underline">
                         <span onClick={() => {
                             logLinkClickEvent("github")
                         }}>
                        <LinkedIn className="cursor-pointer"/>
                            </span>
                    </Link>
                </div>
            </div>
        </footer>


    )
}