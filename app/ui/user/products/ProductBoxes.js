"use client"

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ProductBoxes = (props) => {
    let colors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-pink-500", "bg-purple-500", "bg-indigo-500", "bg-gray-500", "bg-black-500", "bg-white-500", "bg-black"];
    let pathname = usePathname();

    return (
        <>
            <section className="text-gray-600 max-md:mt-6 py-4 w-full px-0">
                <div className="md:px-5 w-full mx-auto">
                    <div className="flex flex-wrap -m-4 justify-center md:py-6 max-md:pb-[4rem] ">
                        {
                            Object.keys(props.products).length === 0 &&
                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-gray-900">No
                                    {
                                        " " + pathname.charAt(1).toUpperCase() + pathname.slice(2) + " "
                                    }
                                    Found</h2>
                                <p className="mt-2 text-sm text-gray-500">Please try again later.</p>
                            </div>
                        }
                        {
                            Object.keys(props.products).map((product, key) => (
                                <Link href={`/product/${props.products[product].slug}`} className="p-4 max-sm:w-full w-[14rem] md:w-[14rem] shadow-md rounded-lg border-2 m-2" key={key}>
                                    <div className="block relative h-48 rounded overflow-hidden">
                                        <img alt="ecommerce" className="m-auto h-[30vh] md:h-[36vh] w-[30rem] md:w-[40rem]" src={props.products[product].img} />
                                    </div>
                                    <div className="mt-4 text-center md:text-left">
                                        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{props.products[product].category}</h3>
                                        <h2 className="text-gray-900 title-font text-lg font-medium">{props.products[product].title}</h2>
                                        <p className="mt-1">₹{props.products[product].price}</p>
                                        <p className="mt-1">
                                            {
                                                props.products[product].color.sort().map((color, key) => (
                                                    <span className={`inline-flex items-center justify-center px-2 py-1 mr-1 text-xs leading-none text-white bg-${color.toLowerCase()}-500 rounded-3xl 
                                                    ${(color.toLowerCase() === "black") ? "bg-black" : ""} 
                                                    ${(color.toLowerCase() !== "white") ? "text-white" : "text-black bg-white border"} 
                                                    `} key={key}>{color}</span>
                                                ))
                                            }
                                        </p>
                                        <p className="mt-1">
                                            {
                                                props.products[product].size.sort().map((size, key) => (
                                                    <span className="inline-flex items-center justify-center px-2 py-1 mr-1 text-xs leading-none border border-gray-400" key={key}>{size}
                                                    </span>
                                                ))
                                            }
                                        </p>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default ProductBoxes