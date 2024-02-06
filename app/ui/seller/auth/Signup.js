"use client"

import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { sellerSignup } from "@/app/actions/sellerAuth";
import { SubmitButton } from "./Submitbutton";
import { useFormState } from 'react-dom';
import { useRouter } from "next/navigation";


export default function SignupForm() {
    const [state, submitAction] = useFormState(sellerSignup, null);
    const router = useRouter();

    useEffect(() => {
        if (document.cookie.includes("sellerToken")) {
            router.replace("/seller/dashboard");
        }
    }, []);

    useEffect(() => {
        if (state?.status !== 200) {
            toast.error(state?.message, {
                position: "top-right",
                autoClose: 1800,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                onClose: () => {
                    document.getElementById("singupForm").reset();
                },
            });
        }
        else if (state?.status === 200) {
            toast.success(state?.message, {
                position: "top-right",
                autoClose: 1800,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                onClose: () => {
                    document.getElementById("singupForm").reset();
                    router.replace("/seller/login")
                },
            });
        }
    }, [state]);

    return (
        <>
            <div className="min-h-screen">
                <ToastContainer />
                <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img
                            className="mx-auto h-10 w-auto"
                            src="https://tailwindui.com/img/logos/mark.svg?color=blue&shade=600"
                            alt="Your Company"
                        />
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Sign up for Seller account
                        </h2>
                    </div>
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form action={submitAction} className="space-y-6" id="singupForm">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        autoComplete="name"
                                        minLength={3}
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 p-2 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:opacity-50"
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 p-2 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:opacity-50"
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        minLength={6}
                                        autoComplete="current-password"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 p-2 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:opacity-50"
                                    />
                                </div>
                            </div>
                            <div>
                                <SubmitButton title="Sign up" />
                            </div>
                        </form>
                        <p className="mt-10 text-center text-sm text-gray-500">
                            Already have a seller account? &nbsp;
                            <Link href={"/seller/login"} className="font-semibold leading-6 text-blue-600 hover:text-blue-500" >
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}