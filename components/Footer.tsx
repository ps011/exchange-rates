import Image from "next/image";
import {GitHub, Instagram, LinkedIn, X} from "@mui/icons-material";

export default function Footer() {
    return (
        <footer className="bg-white rounded-lg shadow dark:bg-gray-900 fixed bottom-0 right-0 left-0">
            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8"/>
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <a href="https://ps011.github.io/"
                       className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                        <Image src="/assets/icons/icon-512.png" className="h-8" alt="Exchange Rates Logo" width={40}
                               height={40}/>
                        <span
                            className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Exchange Rates</span>
                    </a>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                        <li>
                            <Instagram/>
                        </li>
                        <li>
                            <GitHub />
                        </li>
                        <li>
                            <X/>
                        </li>
                        <li>
                            <LinkedIn/>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>


    )
}