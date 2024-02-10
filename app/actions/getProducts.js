"use server"

import Product from "@/models/Product"
import connectDB from "./connectDB"


export async function getProducts(category) {
    try {
        await connectDB();
        let products = await Product.find({ category: category });
        let categoryVariants = {}
        for (let item of products) {
            if (item.title in categoryVariants) {
                if (!categoryVariants[item.title].color.includes(item.color) && item.availableQty > 0) {
                    categoryVariants[item.title].color.push(item.color);
                }
                if (!categoryVariants[item.title].size.includes(item.size) && item.availableQty > 0) {
                    categoryVariants[item.title].size.push(item.size);
                }

            }
            else {
                categoryVariants[item.title] = JSON.parse(JSON.stringify(item));
                if (item.availableQty > 0) {
                    categoryVariants[item.title].color = [item.color];
                    categoryVariants[item.title].size = [item.size];
                }
                else {
                    categoryVariants[item.title].color = [];
                    categoryVariants[item.title].size = [];
                }
            }
        }
        return { status: 200, data: categoryVariants }
    }
    catch (error) {
        return { status: 500, data: { message: "Internal Server Error" } }
    }
}

export async function getProduct(slug) {
    try {
        await connectDB();
        let product = await Product.findOne({ slug: slug });
        if (product === null) {
            return {
                props: {
                    error: "Product not found"
                }
            }
        }
        let variants = await Product.find({ title: product.title, category: product.category });
        let colorSizeSlug = {};
        for (let item of variants) {
            if (Object.keys(colorSizeSlug).includes(item.color)) {
                colorSizeSlug[item.color][item.size] = { slug: item.slug }
            }
            else {
                colorSizeSlug[item.color] = {}
                colorSizeSlug[item.color][item.size] = { slug: item.slug }
            }
        }
        return {
            status: 200,
            product: JSON.parse(JSON.stringify(product)),
            variants: JSON.parse(JSON.stringify(variants)),
            colorSizeSlug: JSON.parse(JSON.stringify(colorSizeSlug))
        }
    }
    catch (error) {
        return { status: 500, message: "Internal Server Error" }
    }
}