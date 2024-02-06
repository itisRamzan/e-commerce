"use client"

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function SellerNavbar() {
    const router = useRouter();
    const navbarRef = useRef();
    const [showNavbar, setShowNavbar] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);
    const pathname = usePathname();

    const handleLogout = () => {
        setLoggingOut(true);
        setTimeout(() => {
            var allCookies = document.cookie.split(';');
            for (var i = 0; i < allCookies.length; i++)
                document.cookie = allCookies[i] + "=;expires=" + new Date(0).toUTCString();
            setLoggingOut(false);
            router.replace("/seller/login");
        }, 800);
    }

    return (
        <>
            <ToastContainer />
            <div className={` flex justify-center items-center h-screen ${loggingOut === true ? "" : "hidden"} `}>
                <ToastContainer />
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div>
            <div className="fixed top-0" >
                <div className={` shadow-sm bg-blue-400 rounded-r-3xl min-h-screen overflow-auto transition-all w-14 fixed z-50 ${showNavbar === true ? "-left-4" : "left-0"} `}>
                    <GoSidebarCollapse color="black" size={35}
                        className={`cursor-pointer absolute top-3 left-2 `}
                        onClick={() => setShowNavbar(!showNavbar)}
                    />
                </div>
                <div className={` shadow-sm bg-blue-400 rounded-r-3xl min-h-screen overflow-auto transition-all w-40 fixed z-50 flex flex-col space-y-2  ${showNavbar === false ? "-left-96" : "left-0"} `}>
                    <div className="w-full p-5">
                        <GoSidebarExpand color="black" size={35}
                            className={`cursor-pointer absolute top-3 left-2 `}
                            onClick={() => setShowNavbar(!showNavbar)}
                        />
                    </div>
                    <div className="flex flex-col text-center w-full py-2 font-semibold">
                        <Link href="/seller/dashboard"
                            className={`cursor-pointer p-2 hover:bg-blue-300 hover:text-white
                            ${pathname === "/seller/dashboard" ? "bg-blue-300 text-white" : ""}
                            `}
                        >
                            Home
                        </Link>
                        <Link href="/seller/products"
                            className={`cursor-pointer p-2 hover:bg-blue-300 hover:text-white
                            ${pathname === "/seller/products" ? "bg-blue-300 text-white" : ""}
                            `}
                        >
                            Products
                        </Link>
                        <Link href="/seller/orders"
                            className={`cursor-pointer p-2 hover:bg-blue-300 hover:text-white
                            ${pathname === "/seller/orders" ? "bg-blue-300 text-white" : ""}
                            `}
                        >
                            Orders
                        </Link>
                        <Link href="/seller/customers"
                            className={`cursor-pointer p-2 hover:bg-blue-300 hover:text-white
                            ${pathname === "/seller/customers" ? "bg-blue-300 text-white" : ""}
                            `}
                        >
                            Customers
                        </Link>
                        <Link href="/seller/settings"
                            className={`cursor-pointer p-2 hover:bg-blue-300 hover:text-white
                            ${pathname === "/seller/settings" ? "bg-blue-300 text-white" : ""}
                            `}
                        >
                            Settings
                        </Link>
                        <button onClick={handleLogout}
                            className="cursor-pointer font-semibold p-2">Logout
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}