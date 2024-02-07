"use server"

import Product from "@/models/Product";
import connectDB from "./connectDB";
import { cookies } from "next/headers";
import { getSeller } from "./sellerAuth";
import { getSignature, uploadImage } from "./uploadImage";
import { revalidatePath } from "next/cache";

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
            let res = await uploadImage(formData);
            let slug = name.replace(/\s+/g, '-').toLowerCase() + "-" + size.toLowerCase() + "-" + color.toLowerCase();
            let product = await Product.findOne({ slug: slug, seller: sellerID });
            if (product !== null) { // if product already exists
                product.availableQty += parseInt(stock);
                product.img = res?.imageURL;
                await product.save();
                return { status: 200, message: "Product already exists, Stock and Image updated successfully!" };
            }
            else {
                let newProduct = new Product({
                    title: name,
                    description: description,
                    img: res?.imageURL,
                    category: category,
                    size: size,
                    color: color,
                    price: price,
                    availableQty: stock,
                    slug: name.replace(/\s+/g, '-').toLowerCase() + "-" + size.toLowerCase() + "-" + color.toLowerCase(),
                    seller: sellerID
                })
                await newProduct.save();
                revalidatePath("/seller/products#myProducts");
                return { status: 200, message: "Product added successfully" };
            }
        }
        catch (err) {
            return { status: 500, message: "Internal server error" };
        }
    }
}

export async function getProducts(currentPage) {
    try {
        await connectDB()
        const cookieStore = cookies();
        let token = cookieStore.get('sellerToken')?.value;
        let data = await getSeller(token);
        if (data.status === 200) {
            let totalProducts = await Product.find({ seller: data.id }).countDocuments();
            let products = await Product.find({ seller: data.id }).sort({ createdAt: -1 }).skip((currentPage - 1) * 5).limit(5);
            products = JSON.parse(JSON.stringify(products));
            revalidatePath("/seller/products");
            return { status: 200, products: products, length: totalProducts };
        }
        else {
            return { status: 400, message: "Please Login as a Seller" };
        }
    }
    catch (err) {
        console.log(err.message)
        return { status: 500, message: "Internal server error" };
    }
}