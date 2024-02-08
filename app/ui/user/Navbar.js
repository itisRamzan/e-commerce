"use client"

import { userLogout } from "@/app/actions/userAuth";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { GoHomeFill } from "react-icons/go";
import { IoShirtOutline } from "react-icons/io5";
import { RiShirtLine } from "react-icons/ri";
import { PiPants } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { CiLogin, CiLogout } from "react-icons/ci";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UserNavbar(props) {
    let pathname = usePathname();
    let isUserLoggedIn = props.isAuth;
    let router = useRouter();
    const handleLogout = () => {
        userLogout().then((res) => {
            toast.success(res.message, {
                position: "top-right",
                autoClose: 800,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                onClose: () => {
                    window.location.reload();
                },
            });
        });
    };

    return (
        <>
            <ToastContainer />
            <div className="flex flex-row w-fit mx-auto mb-2 md:mb-4 sticky top-4 overflow-x-auto space-x-0 max-md:hidden">
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

            <div className="flex flex-row items-center w-full bg-blue-400 fixed bottom-[0px] justify-between md:hidden overflow-x-auto p-1">
                <Link href={"/"}
                    className={` bg-blue-400 text-white p-1
                    ${pathname === "/" ? "text-black" : ""}
                    `}
                >
                    <GoHomeFill size={40} />
                </Link>
                <Link href={"/tshirts"}
                    className={` bg-blue-400 text-white p-1
                    ${pathname === "/tshirts" ? "text-black" : ""}
                    `}
                >
                    <IoShirtOutline size={40}  />
                </Link>
                <Link href={"/shirts"}
                    className={` bg-blue-400 text-white p-1 
                    border-x-0
                    ${pathname === "/shirts" ? "text-black" : ""}
                    `}
                >
                    <RiShirtLine size={40} />
                </Link>
                <Link href={"/pants"}
                    className={` bg-blue-400 text-white p-1 
                    ${pathname === "/pants" ? "text-black" : ""}
                    `}
                >
                    <PiPants size={40} />
                </Link>
                {
                    isUserLoggedIn ? (
                        <>
                            <Link href={"/userProfile"}
                                className={` bg-blue-400 text-white p-1
                            ${pathname === "/userProfile" ? "text-black" : ""}
                            `}
                            >
                                <CgProfile size={40} />
                            </Link>
                            <button
                                className="bg-blue-400 text-white p-1"
                                onClick={handleLogout}
                            >
                                <CiLogout size={40} />
                            </button>
                        </>
                    ) : (
                        <Link href={"/login"}
                            className={` bg-blue-400 text-white hover:bg-blue-400 p-1 flex text-center items-center justify-center
                            ${pathname === "/login" ? "bg-blue-700" : ""}
                            `}
                        >
                            <CiLogin size={40} />
                        </Link>
                    )
                }
            </div>
        </>
    );
}