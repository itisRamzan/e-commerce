"use server"

import Product from "@/models/Product";
import connectDB from "./connectDB";
import { cookies } from "next/headers";
import { getSeller } from "./sellerAuth";

export async function addProduct(currentState, formData) {
    const cookieStore = cookies();
    let name = formData.get('name').trim();
    let price = formData.get('price');
    let category = formData.get('category');
    let stock = formData.get('stock');
    let color = formData.get('color').trim();
    let size = formData.get('size');
    let description = formData.get('description').trim();
    let image = formData.get('image');
    let token = cookieStore.get('sellerToken').value;
    let data = await getSeller(token);
    if (data.status !== 200) {
        return { status: 400, message: "Please Login as a Seller" };
    }
    let sellerID = data.id;
    if (sellerID === null || sellerID === undefined || sellerID === "") {
        return { status: 400, message: "Please Login as a Seller" };
    }
    else if (name === "" || price === "" || category === "" || stock === "" || color === "" || size === "" || description === "" || image === "") {
        return { status: 400, message: "All fields are required" };
    }
    else {
        try {
            await connectDB();
            let newProduct = new Product({
                title: name,
                description: description,
                img: image,
                category: category,
                size: size,
                color: color,
                price: price,
                availableQty: stock,
                seller: sellerID
            })
            await newProduct.save();
            return { status: 200, message: "Product added successfully" };
        }
        catch (err) {
            return { status: 500, message: "Internal server error" };
        }
    }
}

export async function getProducts() {
    try {
        await connectDB();
        const cookieStore = cookies();
        let token = cookieStore.get('sellerToken')?.value;
        let data = await getSeller(token);
        if (data.status === 200) {
            let products = await Product.find({ seller: data.id });
            return { status: 200, products: products };
        }
        else {
            return { status: 400, message: "Please Login as a Seller" };
        }
    }
    catch (err) {
        return { status: 500, message: "Internal server error" };
    }
}