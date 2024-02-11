"use client"

import { getPincodeDetails, getServicablePincode } from "@/app/actions/pincodes";
import { useUserStore } from "@/state/store";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoRemoveCircleOutline, IoAddCircleOutline } from "react-icons/io5";
import { useFormState } from "react-dom";
import { createOrder, inititateCheckoutPayment, postTransaction, revokeTransaction } from "@/app/actions/checkout";
import { PaymentButton } from "./paymentButton";
import { useRouter } from "next/navigation";



export default function UsercheckoutForm(props) {
    const [initState, cartSubmitAction] = useFormState(inititateCheckoutPayment, null);
    let userStore = useUserStore();
    let [pincode, setPincode] = useState("");
    let [city, setCity] = useState("");
    let [state, setState] = useState("");
    let [pincodeError, setPincodeError] = useState(false);
    const router = useRouter();


    useEffect(() => {
        userStore.setShowCart(false)
    }, []) // to close the cart when the checkout page is loaded

    useEffect(() => {
        if (pincode.length === 6) {
            getServicablePincode(pincode).then((res) => {
                if (res === true) {
                    getPincodeDetails(pincode).then((res) => {
                        setCity(res.city);
                        setState(res.state);
                        setPincodeError(false);
                    })
                }
                else {
                    setCity("");
                    setState("");
                    setPincodeError(true);
                    setTimeout(() => {
                        setPincodeError(false);
                    }, 2000)
                }
            })
        }
        else {
            setCity("");
            setState("");
        }
    }, [pincode]); // to get the city and state of the pincode entered

    useEffect(() => {
        if (initState?.status === 200) {
            createOrder(initState?.order).then((res) => {
                if (res?.status === 200) {
                    let options = {
                        "key": process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                        "amount": res.order.amount,
                        "currency": "INR",
                        "name": "R & R",
                        "description": "Test Transaction",
                        "order_id": res.order.id,
                        "handler": async function (response) {
                            let data = { ...response, amount: res.order.amount, cart: userStore.cart, id: res.userOrder._id }
                            postTransaction(data).then((res) => {
                                if (res.status === 200) {
                                    toast.success("Payment Successful! 🎉", {
                                        position: "top-center",
                                        autoClose: 700,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        onClose: () => {
                                            userStore.clearCart();
                                            router.push(`/order?orderID=${res.order.orderID}`);
                                        }
                                    })
                                }
                                else {
                                    toast.error(res.error, {
                                        position: "top-center",
                                        autoClose: 900,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: false,
                                        draggable: false,
                                        progress: undefined,
                                        onClose: () => {
                                            revokeTransaction(res.userOrder._id).then((res) => {
                                                toast.error("Payment Failed! 😢 Please Try Again", {
                                                    position: "top-center",
                                                    autoClose: 800,
                                                    hideProgressBar: false,
                                                    closeOnClick: true,
                                                    pauseOnHover: false,
                                                    draggable: false,
                                                    progress: undefined,
                                                    onClose: () => {
                                                        alert("Payment Failed! 😢 Please Try Again")
                                                        window.location.reload();
                                                    }
                                                })
                                            })
                                        }
                                    })
                                }
                            })
                        },
                        "prefill": {
                            "name": res.userOrder.userDetails.name,
                            "email": res.userOrder.userDetails.email,
                        },
                        "notes": {
                            "userID": res.userOrder.userDetails._id,
                        },
                        "modal": {
                            "ondismiss": () => {
                                revokeTransaction(res.userOrder._id).then((res) => {
                                    toast.error("Payment Failed! 😢 Please Try Again", {
                                        position: "top-center",
                                        autoClose: 3000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        onClose: () => {
                                            window.location.reload();
                                        }
                                    })
                                })
                            }
                        }
                    };
                    function loadScript(src) {
                        return new Promise((resolve) => {
                            const script = document.createElement("script");
                            script.src = src;
                            script.onload = () => {
                                resolve(true);
                            };
                            script.onerror = () => {
                                resolve(false);
                            };
                            document.body.appendChild(script);
                        });
                    }
                    loadScript("https://checkout.razorpay.com/v1/checkout.js").then((res1) => {
                        if (!res1) {
                            toast.error("Razorpay SDK failed to load. Are you online?", {
                                position: "top-center",
                                autoClose: 900,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            })
                        }
                        else {
                            var rzp1 = new Razorpay(options);
                            rzp1.open();
                            rzp1.on('payment.failed', function (response) {
                                rzp1.close();
                                revokeTransaction(res.userOrder._id).then(() => {
                                    toast.error("Payment Failed! 😢 Please Try Again", {
                                        position: "top-center",
                                        autoClose: 3000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        onClose: () => {
                                            window.location.reload();
                                        }
                                    })
                                })
                            });
                        }
                    })

                }
                else {
                    toast.error(res.message, {
                        position: "top-center",
                        autoClose: 900,
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
            })
        }
        else if (initState?.status && initState?.status !== 200) {
            toast.error(initState?.message, {
                position: "top-center",
                autoClose: 900,
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
    }, [initState]); // to handle the payment process



    return (
        <>
            <div className="container my-8 w-4/5 mx-auto">
                <ToastContainer />
                <form action={cartSubmitAction} id="checkoutForm">
                    <h1 className="w-fit mx-auto text-2xl font-bold">
                        Checkout
                    </h1>
                    <div>
                        <div className="bg-white rounded-lg p-8 flex flex-col">
                            <div className="address">
                                <div className="text-xl font-semibold">
                                    1. Shipping Address
                                </div>
                                <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-2 my-2">
                                    <div className="w-full md:w-1/2">
                                        <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                            required
                                        />
                                    </div>
                                    <div className="w-full md:w-1/2">
                                        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out disabled:cursor-not-allowed"
                                            required
                                            disabled
                                            value={props.email}
                                        />
                                    </div>
                                </div>
                                <div className="w-full">
                                    <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
                                    <textarea
                                        name="address"
                                        cols="30" rows="2"
                                        className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                        required
                                    ></textarea>
                                </div>
                                <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:justify-between my-2">
                                    <div className="w-full md:w-1/5">
                                        <label htmlFor="phoneno" className="leading-7 text-sm text-gray-600">Phone Number</label>
                                        <input
                                            type="number"
                                            name="phoneno"
                                            className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                            required
                                            maxLength={10}
                                            minLength={10}
                                        />
                                    </div>
                                    <div className="w-full md:w-1/5">
                                        <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">Pin Code</label>
                                        <input
                                            type="number"
                                            name="pincode"
                                            className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                            required
                                            maxLength={6}
                                            minLength={6}
                                            value={pincode}
                                            onChange={(e) => {
                                                setPincode(e.target.value)
                                            }}
                                        />
                                        <p className={`text-red-400 my-1 ${pincodeError === true ? "" : "invisible"} `}>
                                            Pincode not serviceable
                                        </p>
                                    </div>
                                    <div className="w-full md:w-1/5">
                                        <label htmlFor="city" className="leading-7 text-sm text-gray-600">City</label>
                                        <input type="text" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out disabled:cursor-not-allowed"
                                            required
                                            value={city}
                                            disabled={true}
                                        />
                                    </div>
                                    <div className="w-full md:w-1/5">
                                        <label htmlFor="city" className="leading-7 text-sm text-gray-600">State</label>
                                        <input type="text" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out disabled:cursor-not-allowed"
                                            required
                                            value={state}
                                            disabled={true}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="cart">
                                <div className="text-xl font-semibold">
                                    2. Cart Details
                                </div>
                                <div className="w-[95%] mx-auto">
                                    <ol className="list-decimal my-2">
                                        {
                                            Object.keys(userStore.cart).length === 0 && <p className="text-center">Cart is empty</p>
                                        }
                                        {userStore.cart && Object.keys(userStore.cart).map((item, index) => {
                                            return (
                                                <li className="p-3" key={index}>
                                                    <div className="flex justify-between items-center">
                                                        <div className="w-full flex flex-row">
                                                            <div className="w-2/3 ">
                                                                {userStore.cart[item].name + "(" + userStore.cart[item].size + "/" + userStore.cart[item].color + ")"}
                                                            </div>
                                                            <div className="flex items-center justify-center w-1/3 space-x-2">
                                                                <IoRemoveCircleOutline className="text-lg cursor-pointer"
                                                                    onClick={() => {
                                                                        userStore.removeFromCart(userStore.cart[item].itemCode)
                                                                    }} />
                                                                <p className="text-md">{userStore.cart[item].qty}</p>
                                                                <IoAddCircleOutline className="text-lg cursor-pointer"
                                                                    onClick={() => {
                                                                        userStore.addToCart({
                                                                            itemCode: userStore.cart[item].itemCode,
                                                                            qty: 1,
                                                                            price: userStore.cart[item].price,
                                                                            name: userStore.cart[item].name,
                                                                            size: userStore.cart[item].size,
                                                                            variant: userStore.cart[item].variant,
                                                                            category: userStore.cart[item].category
                                                                        })
                                                                    }} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            )
                                        })}
                                    </ol>
                                    <span className="font-bold text-xl">
                                        Subtotal : ₹‎{userStore.subTotal}
                                    </span>
                                </div>
                            </div>
                            <input type="hidden" name="products"
                                value={
                                    JSON.stringify(userStore.cart)
                                }
                            />
                            <input
                                type="hidden"
                                name="subTotal"
                                value={userStore.subTotal}
                            />
                            <PaymentButton
                                amount={userStore.subTotal}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}