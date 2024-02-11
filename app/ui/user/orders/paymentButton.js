"use client"

import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { BsFillBagCheckFill } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";

export function PaymentButton({ amount }) {
    let { pending } = useFormStatus();
    const [paying, setPaying] = useState(false);
    useEffect(() => {
        if (pending === true) {
            setPaying(true);
        }
    }, [pending])

    return (
        <>
            <ToastContainer />
            <button
                type="submit"
                className="flex justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 max-w-fit my-4 disabled:cursor-not-allowed"
                disabled={paying}
            >
                <div className={` ${paying === true ? "hidden" : ""} `}>
                    <div className="flex flex-row items-center justify-center space-x-2">
                        <BsFillBagCheckFill className="text-xl" />
                        <p>
                            Pay ₹‎{amount}
                        </p>
                    </div>
                </div>
                <div className={` ${paying === true ? "flex justify-center items-center" : "hidden"}  `}>
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white">
                    </div>
                </div>
            </button>
        </>
    )
}