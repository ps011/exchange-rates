import {GitHub, Instagram, LinkedIn, OpenInNew, X} from "@mui/icons-material";
import {getAnalytics, logEvent} from "@firebase/analytics";
import {useMemo} from "react";
import {ExchangeRatesFirebase} from "../lib/firebase";
import {Events} from "../pages";

export default function Footer() {
    const firebaseApp = useMemo(() => {
        return new ExchangeRatesFirebase();
    }, []);

    const logLinkClickEvent = (name: string) => {
        logEvent(getAnalytics(firebaseApp.firebaseApp), Events.FOOTER_LINK_CLICKED, {name})
    }

    return (
        <footer className="bg-white rounded-lg shadow dark:bg-gray-900 relative bottom-0 right-0 left-0">
            <hr className="border-gray-200 sm:mx-auto dark:border-gray-700"/>
            <div className="mx-auto p-4 flex flex-col sm:flex-row sm:w-full">
                <div className="text-center flex flex-col mb-8 sm:flex-1 sm:text-left">
                    <p className="my-0 text-neutral-500">Developed and Maintained by</p>
                    <a href="https://ps011.github.io" target="_blank" className="text-white no-underline">
                        <h3 className="my-2">Prasheel Soni
                        <OpenInNew className="align-middle ml-1" fontSize="small"/>
                        </h3>
                    </a>
                </div>
                <div
                    className="flex flex-wrap justify-around items-center text-sm font-medium text-gray-500 dark:text-gray-400">
                    <a href="https://instagram.com/ps.11" target="_blank" className="dark:text-white no-underline sm:ml-4">
                        <span onClick={() => {
                            logLinkClickEvent("instagram")
                        }}>
                        <Instagram className="cursor-pointer"/>
                        </span>
                    </a>
                    <a href="https://github.com/ps011" target="_blank" className="text-white no-underline sm:ml-4">
                        <span onClick={() => {
                            logLinkClickEvent("github")
                        }}>
                        <GitHub className="cursor-pointer"/>
                        </span>
                    </a>
                    <a href="https://x.com/soniprasheel" target="_blank" className="text-white no-underline sm:ml-4">
                         <span onClick={() => {
                             logLinkClickEvent("github")
                         }}>
                        <X className="cursor-pointer"/>
                            </span>
                    </a>
                    <a href="https://linkedin.com/in/ps011" target="_blank" className="text-white no-underline sm:ml-4">
                         <span onClick={() => {
                             logLinkClickEvent("github")
                         }}>
                        <LinkedIn className="cursor-pointer"/>
                            </span>
                    </a>
                </div>
            </div>
        </footer>


    )
}