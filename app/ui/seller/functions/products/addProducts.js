"use client"

import { getSeller } from "@/app/actions/sellerAuth";
import { SubmitButton } from "../../auth/Submitbutton";
import { addProduct } from "@/app/actions/sellerProducts";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddProducts() {
    const router = useRouter();
    const [sellerID, setSellerID] = useState("");
    const [state, addProductFormAction] = useFormState(addProduct, null);

    useEffect(() => {
        let token = document.cookie.split(";")[0].slice(12);
        if (token === "") {
            router.replace("/seller/login");
        }
        else {
            const fetchSeller = async () => {
                let response = await getSeller(token);
                setSellerID(response.id);
            }
            fetchSeller();
        }
    }, []);

    useEffect(() => {
        if (state?.status === 200) {
            toast.success(state?.message, {
                position: "top-right",
                autoClose: 1800,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                onClose: () => {
                    document.getElementById("addProductForm").reset();
                },
            });
        }
        else {
            toast.error(state?.message, {
                position: "top-right",
                autoClose: 1800,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                onClose: () => {
                    document.getElementById("addProductForm").reset();
                },
            });
        }
    }, [state]);

    return (
        <>
            <div>
                <ToastContainer />
                <h1 className="text-2xl font-bold mb-4">Add Product</h1>
                <form action={addProductFormAction} id="addProductForm">
                    <div className="flex flex-col space-y-4">
                        <div className="flex flex-col">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Product Name"
                                className="border border-gray-300 p-2 rounded"
                                required={true}
                            />
                        </div>
                        <div className="flex flex-row flex-wrap items-center justify-between">
                            <div className="flex flex-col space-y-3 my-2 mr-2">
                                <label htmlFor="price">Price (in Rupees)</label>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    placeholder="Product Price"
                                    className="border border-gray-300 p-2 rounded"
                                    required={true}
                                    min={1}
                                />
                            </div>
                            <div className="flex flex-col space-y-3 my-2 mr-2">
                                <label htmlFor="category">Category</label>
                                <select
                                    name="category"
                                    className="border border-gray-300 p-2 rounded"
                                    required={true}
                                >
                                    <option value="">Select Category</option>
                                    <option value="Shirts">Shirt</option>
                                    <option value="T Shirts">T Shirt</option>
                                    <option value="Pants">Pant</option>
                                </select>
                            </div>
                            <div className="flex flex-col space-y-3 my-2 mr-2">
                                <label htmlFor="stock">Stock</label>
                                <input
                                    type="number"
                                    id="stock"
                                    name="stock"
                                    placeholder="Product Stock"
                                    className="border border-gray-300 p-2 rounded"
                                    required={true}
                                    min={1}
                                />
                            </div>
                            <div className="flex flex-col space-y-3 my-2 mr-2">
                                <label htmlFor="color">Color</label>
                                <input
                                    type="text"
                                    name="color"
                                    placeholder="Product Color"
                                    className="border border-gray-300 p-2 rounded"
                                />
                            </div>
                            <div className="flex flex-col space-y-3 my-2 mr-2">
                                <label htmlFor="size"
                                >Size</label>
                                <select
                                    name="size"
                                    className="border border-gray-300 p-2 rounded"
                                >
                                    <option value="">Select Size</option>
                                    <option value="S">S</option>
                                    <option value="M">M</option>
                                    <option value="L">L</option>
                                    <option value="XL">XL</option>
                                </select>
                            </div>
                            <input type="hidden" name="sellerID" value={sellerID} />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                placeholder="Product Description"
                                className="border border-gray-300 p-2 rounded"
                                required={true}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="image">Image URL (for now)</label>
                            <input
                                type="text"
                                id="image"
                                name="image"
                                required={true}
                                placeholder="Product Image"
                                className="border border-gray-300 p-2 rounded"
                            />
                        </div>
                        <SubmitButton title="Add Product" />
                    </div>
                </form>
            </div>
        </>
    )
}