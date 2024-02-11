"use client"

import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useUserStore } from "@/state/store";
import { getServicablePincode } from "@/app/actions/pincodes";


const IndividualProductPage = (props) => {
    let colors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-pink-500", "bg-purple-500", "bg-blue-500", "bg-gray-500", "bg-black-500", "bg-white-500", "bg-black"];
    const router = useRouter();
    const [pin, setPin] = useState("");
    const [color, setcolor] = useState(props.product.color);
    const [size, setsize] = useState(props.product.size);
    let userstore = useUserStore();

    const handleOnChange = (e) => {
        setPin(e.target.value)
    }
    const checkServiceAvailability = async () => {
        if (pin.length !== 6) {
            alert("Please enter a valid pincode");
            return;
        }
        else {
            const res = await getServicablePincode(pin);
            if (res === true) {
                toast.success("Hurray! We deliver to this pin code.", {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    onClose: () => {
                        setPin("")
                    }
                });
            }
            else {
                toast.error("Sorry! We don't deliver to this pin code yet.", {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    onClose: () => {
                        setPin("")
                    }
                });
            }
        }

    }
    const addToCart = (e) => {
        e.preventDefault();
        let item = {
            itemCode: props.product._id,
            qty: 1,
            price: props.product.price,
            name: props.product.title,
            size: props.product.size,
            color: props.product.color,
            category: props.product.category
        }
        userstore.addToCart(item);
        userstore.setShowCart(true);
    }
    const buyNow = () => {
        userstore.buyNow({
            itemCode: props.product._id,
            qty: 1,
            price: props.product.price,
            name: props.product.title,
            size: props.product.size,
            color: props.product.color,
            category: props.product.category
        })
        router.push("/checkout");
    }

    useEffect(() => {
        if (localStorage.getItem("effectRan") === null || localStorage.getItem("effectRan") === "false") {
            if (props.colorSizeSlug[color] !== undefined) {
                if (props.colorSizeSlug[color][size] !== undefined) {
                    // let url = `http://${proces.env.HOST}/product/${props.colorSizeSlug[color][size].slug}`;
                    // window.location = url;
                    let routerURL = `/product/${props.colorSizeSlug[color][size].slug}`
                    router.push(routerURL);
                    // router.push(url);
                    localStorage.setItem("effectRan", "true");
                }
                else {
                    // let url = `http://${proces.env.HOST}/product/${props.colorSizeSlug[color][Object.keys(props.colorSizeSlug[color])[0]].slug}`;
                    // window.location = url;
                    let routerURL = `/product/${props.colorSizeSlug[color][Object.keys(props.colorSizeSlug[color])[0]].slug}`
                    router.push(routerURL);
                    // router.push(url);
                    localStorage.setItem("effectRan", "true");
                }
            }
            else if (props.colorSizeSlug[size] !== undefined) {
                if (props.colorSizeSlug[color][size] !== undefined) {
                    // let url = `http://${proces.env.HOST}/product/${props.colorSizeSlug[color][size].slug}`;
                    // window.location = url;
                    let routerURL = `/product/${props.colorSizeSlug[color][size].slug}`
                    router.push(routerURL);
                    // router.push(url);
                    localStorage.setItem("effectRan", "true");
                }
                else {
                    // let url = `http://${proces.env.HOST}/product/${props.colorSizeSlug[color][Object.keys(props.colorSizeSlug[color])[0]].slug}`;
                    // window.location = url;
                    let routerURL = `/product/${props.colorSizeSlug[color][Object.keys(props.colorSizeSlug[color])[0]].slug}`
                    router.push(routerURL);
                    // router.push(url);
                    localStorage.setItem("effectRan", "true");
                }
            }
        }
        else {
            return;
        }
    }, [color, size])



    return (
        <div>
            <ToastContainer />
            <section className="text-gray-600 body-font overflow-hidden max-md:flex max-md:flex-col max-md:items-center max-md:justify-start max-md:h-screen">
                <div className="container px-5 py-10 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap items-center justify-center text-sm md:text-base">
                        <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto md:px-24 object-cover object-top rounded max-md:h-64 max-md:px-4"
                            src={props.product.img}
                        />
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 max-md:flex max-md:flex-col max-md:items-center max-md:justify-center ">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest">
                                R & R
                            </h2>
                            <h1 className="text-gray-900 text-lg md:text-3xl title-font font-medium mb-1">
                                {props.product.title} ({props.product.size}/{props.product.color})</h1>
                            <p className="leading-relaxed">
                                {props.product.description}
                            </p>
                            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                                <div className="flex">
                                    <span className="mr-1">Color</span>
                                    {
                                        props.variants.filter((item, index, self) => self.findIndex(v => v.color === item.color) === index).map((item, key) => (
                                            <button
                                                className={`border border-gray-300 ml-2 bg-${item.color.toLowerCase()}-500 bg-${(item.color.toLowerCase() === "black") ? "black" : ""} rounded-full w-6 h-6 focus:outline-none ${color === item.color ? "ring-2 ring-offset-2 ring-black" : ""
                                                    }`}
                                                key={key}
                                                title={key.color}
                                                onClick={() => {
                                                    localStorage.setItem("effectRan", "false");
                                                    setcolor(item.color);
                                                }}
                                            ></button>
                                        ))

                                    }
                                </div>
                                <div className="flex ml-6 items-center">
                                    <span className="mr-3">Size</span>
                                    <div className="relative">
                                        <select className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 text-base pl-3 pr-10"
                                            onChange={
                                                (e) => {
                                                    localStorage.setItem("effectRan", "false");
                                                    setsize(e.target.value)
                                                }
                                            }
                                            value={
                                                size
                                            }
                                        >
                                            {
                                                props.variants.filter((item) => item.color === color).map((item, key) => (
                                                    <option key={key}
                                                        value={item.size}
                                                    >{item.size}</option>
                                                ))
                                            }
                                        </select>
                                        <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                                                <path d="M6 9l6 6 6-6"></path>
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="inline-flex flex-row max-md:space-x-2 items-center justify-center">
                                {
                                    props.product.availableQty > 0
                                    && <span
                                        className="font-medium text-xl  md:text-2xl text-gray-900">
                                        ₹‎{props.product.price}
                                    </span>
                                }
                                {props.product.availableQty <= 0 && <span className="max-md:text-sm font-medium text-2xl text-gray-900">Out of Stock!</span>}
                                <button
                                    disabled={props.product.availableQty <= 0}
                                    className="flex ml-6 text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded disabled:bg-blue-400 disabled:cursor-not-allowed max-md:px-2 text-nowrap"
                                    onClick={buyNow}
                                >
                                    Buy Now
                                </button>
                                <button
                                    disabled={props.product.availableQty <= 0}
                                    className="flex ml-6 text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded disabled:bg-blue-400 disabled:cursor-not-allowed max-md:px-2 text-nowrap"
                                    onClick={addToCart}
                                >
                                    Add To Cart
                                </button>
                            </div>
                            <div className="mt-4 flex space-x-2">
                                <input
                                    type="number"
                                    onChange={handleOnChange}
                                    className="p-1 md:p-2 border-2 rounded"
                                    placeholder="Enter Your Pincode"
                                    inputMode="numeric"
                                    value={pin}
                                />
                                <button
                                    className="text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded"
                                    onClick={checkServiceAvailability}
                                >
                                    Check Pin
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default IndividualProductPage;