"use client"

import { userAddressUpdate, userPasswordUpdate } from "@/app/actions/updateUserInfo"
import { useEffect, useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useFormState } from "react-dom"
import { SubmitButton } from "../../Submitbutton"

const UserAddressForm = ({ user }) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [phoneno, setPhoneno] = useState("")
    const [pincode, setPincode] = useState("")
    const [addressFormState, addressSubmitAction] = useFormState(userAddressUpdate, null);
    const [passwordFormState, passwordSubmitAction] = useFormState(userPasswordUpdate, null);
    useEffect(() => {
        if (user) {
            setName(user.name)
            setEmail(user.email)
            setAddress(user.address)
            setPhoneno(user.phoneno)
            setPincode(user.pincode)
        }
    }, []); // set the initial values of the user address form fields

    useEffect(() => {
        if (addressFormState?.status === 200) {
            toast.success(addressFormState?.message, {
                position: "top-center",
                autoClose: 800,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            })
        }
        else {
            toast.error(addressFormState?.message, {
                position: "top-center",
                autoClose: 800,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                onClick: () => {
                    window.location.reload();
                },
                onClose: () => {
                    window.location.reload();
                }
            })
        }
    }, [addressFormState]) // show the toast message on address form submit

    useEffect(() => {
        if (passwordFormState?.status === 200) {
            toast.success(passwordFormState?.message, {
                position: "top-center",
                autoClose: 800,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                onClick: () => {
                    document.getElementById("passwordForm").reset();
                },
                onClose: () => {
                    document.getElementById("passwordForm").reset();
                }
            })
        }
        else {
            toast.error(passwordFormState?.message, {
                position: "top-center",
                autoClose: 800,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                onClick: () => {
                    window.location.reload();
                },
                onClose: () => {
                    window.location.reload();
                }
            })
        }
    }, [passwordFormState]) // show the toast message on password form submit

    return (
        <>
            <div>
                <ToastContainer />
                <div className="w-4/5 container mx-auto my-7">
                    <h1 className="text-2xl font-semibold text-center">
                        My Account
                    </h1>
                    <div className="bg-white rounded-lg p-8 flex flex-col space-y-3">
                        <div className="address">
                            <form
                                action={addressSubmitAction}
                                id="addressForm"
                            >
                                <div className="text-lg font-semibold">
                                    1. Address Details
                                </div>
                                <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-2 my-2">
                                    <div className="w-full md:w-1/2">
                                        <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                                        <input type="text" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                            required
                                            defaultValue={name}
                                            onChange={(e) => setName(e.target.value)}
                                            minLength={3}
                                        />
                                    </div>
                                    <div className="w-full md:w-1/2">
                                        <label htmlFor="email" className="leading-7 text-sm text-gray-600">
                                            Email <i>(Cannot be changed)</i>
                                        </label>
                                        <p
                                            aria-disabled="true"
                                            className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out aria-disabled:cursor-not-allowed aria-disabled:bg-gray-200 aria-disabled:text-gray-600 selection:cursor-not-allowed"
                                        >
                                            {email}
                                        </p>
                                    </div>
                                </div>
                                <div className="w-full">
                                    <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
                                    <textarea name="address" cols="30" rows="2"
                                        className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                        value={address}
                                        minLength={10}
                                        onChange={(e) => setAddress(e.target.value)}
                                    ></textarea>
                                </div>
                                <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:justify-between my-2 md:space-x-2">
                                    <div className="w-full">
                                        <label htmlFor="phoneno" className="leading-7 text-sm text-gray-600">Phone Number</label>
                                        <input type="number" name="phoneno" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out "
                                            maxLength={10}
                                            minLength={10}
                                            value={phoneno}
                                            onChange={(e) => setPhoneno(e.target.value)}
                                        />
                                    </div>
                                    <div className="w-full ">
                                        <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">Pin Code</label>
                                        <input type="number" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                            maxLength={6}
                                            minLength={6}
                                            value={pincode}
                                            onChange={(e) => setPincode(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <SubmitButton
                                    title={"Update Address"}
                                    size={"fit"}
                                />
                            </form>
                        </div>
                        <div className="password">
                            <form 
                            action={passwordSubmitAction}
                            id="passwordForm"
                            >
                                <div className="text-lg font-semibold">
                                    2. Change Password
                                </div>
                                <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-2 my-2">
                                    <div className="w-full md:w-1/2">
                                        <label htmlFor="oldpassword" className="leading-7 text-sm text-gray-600">Old Password</label>
                                        <input type="password" name="oldpassword" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                            required
                                        />
                                    </div>
                                    <div className="w-full md:w-1/2">
                                        <label htmlFor="newpassword" className="leading-7 text-sm text-gray-600">New Password</label>
                                        <input type="password" name="newpassword" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                            required
                                        />
                                    </div>
                                    <div className="w-full md:w-1/2">
                                        <label htmlFor="confirmpassword" className="leading-7 text-sm text-gray-600">Confirm Password</label>
                                        <input type="password" name="confirmpassword" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                            required
                                        />
                                    </div>
                                </div>
                                <SubmitButton
                                    title={"Change Password"}
                                    size={"fit"}
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserAddressForm