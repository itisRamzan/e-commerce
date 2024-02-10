"use client"

import { IoMdCloseCircle } from "react-icons/io"
import { useUserStore } from "@/state/store"
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi"
import { IoCartOutline } from "react-icons/io5"
import { MdDeleteOutline } from "react-icons/md";
import Link from "next/link"

export default function UserCart() {
    let userStore = useUserStore();
    const toggleCartView = () => {
        userStore.setShowCart(!userStore.showCart);
    }

    return (
        <>
            <div>
                <button onClick={toggleCartView} className="fixed top-4 right-4 bg-blue-500 text-white p-2 rounded-full z-50">
                    <IoCartOutline className="text-2xl max-md:text-3xl" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
                        {userStore.cart.length}
                    </span>
                </button>
            </div>
            <div className={`
           min-h-screen z-50  max-md:w-[18rem] w-[19rem] overflow-y-auto max-md:text-sm cart-sidebar fixed top-0 bg-blue-200 p-8 transition-all ${userStore.showCart === true ? "right-0" : "-right-96"}
            `}>
                <h2 className="text-2xl font-bold text-center">Cart Details</h2>
                <p className="absolute top-4 right-2" onClick={toggleCartView}>
                    <IoMdCloseCircle className="text-lg cursor-pointer text-blue-500" />
                </p>
                <ol className="list-decimal my-2">
                    {
                        Object.keys(userStore.cart).length === 0 && <p className="text-center">Cart is empty</p>
                    }
                    {userStore.cart && Object.keys(userStore.cart).map((item, index) => {
                        return (
                            <li className="py-3 px-1" key={index}>
                                <div className="flex justify-between items-center">
                                    <div className="w-full flex flex-row space-x-1">
                                        <div className="w-2/3">
                                            {userStore.cart[item].name + "(" + userStore.cart[item].size + "/" + userStore.cart[item].color + ")"}
                                        </div>
                                        <div className="flex items-center justify-center w-1/3 space-x-2 ">
                                            <FiMinusCircle className="text-lg cursor-pointer"
                                                onClick={() => {
                                                    userStore.removeFromCart(
                                                        userStore.cart[item].itemCode
                                                    )
                                                }}
                                            />
                                            <p className="text-md">{userStore.cart[item].qty}</p>
                                            <FiPlusCircle className="text-lg cursor-pointer"
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
                                            }} 
                                            />
                                            <MdDeleteOutline className="text-lg cursor-pointer"
                                                onClick={() => {
                                                    userStore.deleteFromCart(
                                                        userStore.cart[item].itemCode
                                                    )
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </ol>
                <p className="text-md font-semibold">
                    Subtotal: ₹‎{userStore.subTotal}
                </p>
                <div className="flex space-x-2 my-2 items-center justify-start">
                    <Link href={"/checkout"}>
                        <button className="flex items-center space-x-2 text-white bg-blue-500 border-0 py-2 px-4 focus:outline-none hover:bg-blue-600 rounded disabled:bg-blue-400 disabled:cursor-not-allowed" disabled={Object.keys(userStore.cart).length === 0 ? true : false} >
                            <IoCartOutline className="text-xl" />
                            <p>
                                Checkout
                            </p>
                        </button>
                    </Link>
                    <button className="flex items-center space-x-2 text-white bg-blue-500 border-0 py-2 px-4 focus:outline-none hover:bg-blue-600 rounded disabled:bg-blue-400 disabled:cursor-not-allowed"
                        onClick={() => {
                            userStore.clearCart()
                        }}
                        disabled={Object.keys(userStore.cart).length === 0 ? true : false}
                    >
                        Clear Cart
                    </button>
                </div>
            </div>
        </>
    )
}

// min-h-screen z-20 max-md:w-[18rem] w-[19rem] overflow-y-auto max-md:text-sm cart-sidebar fixed top-0 bg-blue-200 p-8 transition-all ${userStore.showCart === true ? "right-0" : "-right-96"}