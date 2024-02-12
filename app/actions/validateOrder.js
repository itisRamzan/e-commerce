"use server"

import { userAuth } from "@/middlewares/auth"
import { getUser } from "./userAuth"
import Order from "@/models/Order"
import connectDB from "./connectDB"
import { cookies } from "next/headers"

export async function validateUserOrder(orderID) {
    try {
        let isAuth = await userAuth()
        if (isAuth === false) {
            return { status: 401, message: "Unauthorized" }
        }
        await connectDB();
        let userData = await getUser(cookies().get("userToken").value);
        let user = await userData.user;
        let order = await Order.findOne({ orderID: orderID, email: user.email })
        if (!order) {
            return { status: 404, message: "Order Not Found" }
        }
        return { status: 200, message: "Order Found", order: JSON.parse(JSON.stringify(order)) }
    }
    catch (err) {
        return { status: 500, message: "Internal Server Error" }
    }
}