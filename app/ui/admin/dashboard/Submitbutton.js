'use client'

import { useFormStatus } from "react-dom";

export function SubmitButton() {
    const { pending, data } = useFormStatus();

    return (
        <>
            <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                disabled={pending}
            >
                <p className={` ${pending === true ? "hidden" : ""} `}>
                    Sign up
                </p>
                <div className={` ${pending === true ? "flex justify-center items-center" : "hidden"}  `}>
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white">
                    </div>
                </div>
            </button>
        </>
    )
}