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