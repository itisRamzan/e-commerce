"use client"

import { sellerLogout } from "@/app/actions/sellerAuth";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function SellerNavbar() {
    const router = useRouter();
    const [showNavbar, setShowNavbar] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);
    const pathname = usePathname();

    const handleLogout = async () => {
        await sellerLogout().then(() => {
            toast.success("Logged out successfully", {
                position: "top-center",
                autoClose: 800,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                onClose: () => {
                    setLoggingOut(true);
                    router.push("/seller/login");
                }
            });

        })
    }

    return (
        <>
            <ToastContainer />
            <div className={` flex justify-center items-center h-screen ${loggingOut === true ? "" : "hidden"} `}>
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div>
            <div className="fixed top-0 z-50" >
                <div className={`  min-h-screen overflow-auto transition-all w-14 max-md:w-12 fixed z-50 ${showNavbar === true ? "-left-4" : "left-0"} `}>
                    <GoSidebarCollapse color="black" size={35}
                        className={`cursor-pointer absolute top-3 left-2 max-md:top-2 max-md:left-1 `}
                        onClick={() => setShowNavbar(!showNavbar)}
                    />
                </div>
                <div className={` shadow-sm border-2 border-gray-400 bg-blue-200 rounded-r-3xl min-h-screen overflow-auto transition-all w-40 fixed z-50 flex flex-col space-y-2  ${showNavbar === false ? "-left-96" : "left-0"} `}>
                    <div className="w-full p-5">
                        <GoSidebarExpand color="black" size={35}
                            className={`cursor-pointer absolute top-3 left-2 `}
                            onClick={() => setShowNavbar(!showNavbar)}
                        />
                    </div>
                    <div className="flex flex-col text-center w-full py-2 font-semibold">
                        <Link href="/seller/dashboard"
                            className={`cursor-pointer p-2 hover:bg-blue-500 hover:text-white
                            ${pathname === "/seller/dashboard" ? "bg-blue-500 text-white" : ""}
                            `}
                        >
                            Home
                        </Link>
                        <Link href="/seller/products"
                            className={`cursor-pointer p-2 hover:bg-blue-500 hover:text-white
                            ${pathname === "/seller/products" ? "bg-blue-500 text-white" : ""}
                            `}
                        >
                            Products
                        </Link>
                        <Link href="/seller/orders"
                            className={`cursor-pointer p-2 hover:bg-blue-500 hover:text-white
                            ${pathname === "/seller/orders" ? "bg-blue-500 text-white" : ""}
                            `}
                        >
                            Orders
                        </Link>
                        <Link href="/seller/customers"
                            className={`cursor-pointer p-2 hover:bg-blue-500 hover:text-white
                            ${pathname === "/seller/customers" ? "bg-blue-500 text-white" : ""}
                            `}
                        >
                            Customers
                        </Link>
                        <Link href="/seller/settings"
                            className={`cursor-pointer p-2 hover:bg-blue-500 hover:text-white
                            ${pathname === "/seller/settings" ? "bg-blue-500 text-white" : ""}
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