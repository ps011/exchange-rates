import {GitHub, Instagram, LinkedIn, OpenInNew, X} from "@mui/icons-material";
import {useMemo} from "react";
import {ExchangeRatesFirebase} from "../lib/firebase";
import {Events} from "../pages";

export default function Footer() {
    const firebaseApp = useMemo(() => {
        return new ExchangeRatesFirebase();
    }, []);

    const logLinkClickEvent = (name: string) => {
        firebaseApp.logFirebaseEvent(Events.FOOTER_LINK_CLICKED, {name});
    }

    return (
        <footer className="bg-white rounded-lg shadow dark:bg-gray-900 absolute left-0 right-0 bottom-0">
            <hr className="border-gray-200 sm:mx-auto dark:border-gray-700"/>
            <div className="mx-auto p-4 flex flex-col sm:flex-row sm:w-full">
                <div className="text-center flex flex-col mb-8 sm:flex-1 sm:text-left">
                    <p className="my-0 text-neutral-300">Developed and Maintained by</p>
                    <a href="https://ps011.github.io" target="_blank" className="text-black dark:text-white no-underline" aria-label="Portfolio">
                        <h3 className="my-2" onClick={() => {
                            logLinkClickEvent("portfolio")
                        }}>
                            Prasheel Soni
                        <OpenInNew className="align-middle ml-1" fontSize="small"/>
                        </h3>
                    </a>
                </div>
                <div
                    className="flex flex-wrap justify-around items-center text-sm font-medium text-gray-500 dark:text-gray-400">
                    <a href="https://instagram.com/ps.11" target="_blank" className="text-black dark:text-white no-underline sm:ml-4"  aria-label="Instagram">
                        <span onClick={() => {
                            logLinkClickEvent("instagram")
                        }}>
                        <Instagram className="cursor-pointer"/>
                        </span>
                    </a>
                    <a href="https://github.com/ps011" target="_blank" className="text-black dark:text-white no-underline sm:ml-4"  aria-label="Github">
                        <span onClick={() => {
                            logLinkClickEvent("github")
                        }}>
                        <GitHub className="cursor-pointer"/>
                        </span>
                    </a>
                    <a href="https://x.com/soniprasheel" target="_blank" className="text-black dark:text-white no-underline sm:ml-4"  aria-label="X">
                         <span onClick={() => {
                             logLinkClickEvent("x")
                         }}>
                        <X className="cursor-pointer"/>
                            </span>
                    </a>
                    <a href="https://linkedin.com/in/ps011" target="_blank" className="text-black dark:text-white no-underline sm:ml-4"  aria-label="linkedin">
                         <span onClick={() => {
                             logLinkClickEvent("linkedin")
                         }}>
                        <LinkedIn className="cursor-pointer"/>
                            </span>
                    </a>
                </div>
            </div>
        </footer>


    )
}