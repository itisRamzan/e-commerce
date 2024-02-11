"use client"

import { useRouter } from "next/navigation"
import { useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"


const UserCheckoutUnAuth = () => {
    const router = useRouter();
    let useEffectRan = useRef(false);
    useEffect(() => {
        if (useEffectRan.current) return;
        else{
            toast.error("You need to login to checkout", {
                position: "top-right",
                autoClose: 1400,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                onClick: () => {
                    useEffectRan.current = true;
                    router.push("/login")
                },
                onClose: () => {
                    useEffectRan.current = true;
                    router.push("/login")
                }
            });
        }
    }, [])
    return (
        <>
            <ToastContainer />
        </>
    )
}

export default UserCheckoutUnAuth