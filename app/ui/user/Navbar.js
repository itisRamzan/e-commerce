"use client"

import { userLogout } from "@/app/actions/userAuth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GoHomeFill } from "react-icons/go";
import { IoShirtOutline } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UserNavbar(props) {
    let pathname = usePathname();
    let isUserLoggedIn = props.isAuth;

    const handleLogout = async () => {
        await userLogout().then((res) => {
            toast.success(res.message, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined
            });
        });
    };

    return (
        <>
            <ToastContainer />
            <div className="flex flex-row w-fit mx-auto mb-2 md:mb-4 sticky top-4 overflow-x-auto space-x-0 max-md:hidden z-50">
                <Link href={"/"}
                    className={` bg-blue-400 text-white px-4 py-2 border-l-2 rounded-l-full border-r-0 border-x-0 mx-0
                    ${pathname === "/" ? "bg-blue-700" : "hover:bg-blue-700"}
                    `}
                >
                    Home
                </Link>
                <Link href={"/tshirts"}
                    className={` bg-blue-400 text-white px-4 py-2 
                    border-x-0 mx-0 border-l-0
                    ${pathname === "/tshirts" ? "bg-blue-700" : "hover:bg-blue-700"}
                    `}
                >
                    T-Shirts
                </Link>
                <Link href={"/shirts"}
                    className={` bg-blue-400 text-white px-4 py-2 
                    border-x-0
                    ${pathname === "/shirts" ? "bg-blue-700" : "hover:bg-blue-700"}
                    `}
                >
                    Shirts
                </Link>
                <Link href={"/pants"}
                    className={` bg-blue-400 text-white px-4 py-2 
                    ${pathname === "/pants" ? "bg-blue-700" : "hover:bg-blue-700"}
                    `}
                >
                    Pants
                </Link>
                {
                    isUserLoggedIn ? (
                        <>
                            <Link href={"/userProfile"}
                                className={` bg-blue-400 text-white px-4 py-2 mx-0 border-l-0 border-x-0 
                            ${pathname === "/userProfile" ? "bg-blue-700" : "hover:bg-blue-700"}
                            `}
                            >
                                Profile
                            </Link>
                            <button
                                className="bg-blue-400 text-white hover:bg-blue-700 px-4 py-2 border-r-2 rounded-r-full mx-0 border-l-0 border-x-0"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link href={"/login"}
                            className={` bg-blue-400 text-white hover:bg-blue-400 px-4 py-2 border-r-2 rounded-r-full mx-0 border-l-0 border-x-0 
                            ${pathname === "/login" ? "bg-blue-700" : "hover:bg-blue-700"}
                            `}
                        >
                            Login
                        </Link>
                    )
                }
            </div>

            <div className="flex flex-row items-center w-full bg-blue-400 fixed bottom-[0px] justify-between md:hidden overflow-x-auto p-1 z-50">
                <Link href={"/"}
                    className="bg-blue-400 text-white p-1"
                >
                    <GoHomeFill size={40}
                        className={` ${pathname === "/" ? "text-black" : "text-white"} `}
                    />
                </Link>
                <Link href={"/tshirts"}
                    className="bg-blue-400 text-white p-1"
                >
                    <IoShirtOutline size={40}
                        className={` ${pathname === "/tshirts" ? "text-black" : "text-white"} `} />
                </Link>
            </div>
        </>
    );
}