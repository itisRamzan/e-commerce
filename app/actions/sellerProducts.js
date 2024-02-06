"use server"

import Product from "@/models/Product";
import connectDB from "./connectDB";

export async function addProduct(currentState, formData) {
    let name = formData.get('name').trim();
    let price = formData.get('price');
    let category = formData.get('category');
    let stock = formData.get('stock');
    let color = formData.get('color').trim();
    let size = formData.get('size');
    let description = formData.get('description').trim();
    let image = formData.get('image');
    let sellerID = formData.get('sellerID').trim();
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