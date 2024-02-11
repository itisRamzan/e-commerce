"use server"

import Product from "@/models/Product";
import { getPincodeDetails } from "./pincodes"
import connectDB from "./connectDB";
import { cookies } from "next/headers";
import { getUser } from "./userAuth";
import { userAuth } from "@/middlewares/auth";
import User from "@/models/User";
import Order from "@/models/Order";
import Razorpay from "razorpay";
const crypto = require("crypto");

export async function inititateCheckoutPayment(currentState, formData) {
    try {
        let nameInp = formData.get("name");
        let addressInp = formData.get("address");
        let phoneInp = formData.get("phoneno");
        let pincodeInp = formData.get("pincode");
        if (nameInp.length < 3 || addressInp.length === 10 || phoneInp.length !== 10 || pincodeInp.length !== 6) {
            return { status: 400, message: "Please Check your fields" };
        }
        await connectDB();
        let subT = formData.get("subTotal");
        const amountRequest = parseInt(subT);
        let amountActual = 0;
        const producstsRequest = JSON.parse(formData.get("products"));
        for (const product of producstsRequest) {
            let actProduct = await Product.findById(product.itemCode);
            amountActual += actProduct.price * product.qty;
        }
        if (amountActual !== amountRequest) {
            return { status: 500, message: "The price of items in your cart have been changed, Please try again" };
        }
        let pincode = formData.get("pincode");
        let pincodeDetails = await getPincodeDetails(pincode);
        let address = formData.get("address");
        let totalAddress = address + ", " + pincodeDetails.city + ", " + pincodeDetails.state;
        let userToken = cookies().get("userToken");
        let det = await getUser(userToken.value);
        let user = await User.findById(det.id).select("name email");
        let newOrder = new Order({
            email: user.email,
            userDetails: user,
            address: totalAddress,
            amount: amountRequest,
            products: producstsRequest,
        })
        await newOrder.save();
        let orderJSON = JSON.parse(JSON.stringify(newOrder));
        return {
            status: 200,
            message: "Order placed successfully",
            order: orderJSON
        }
    }
    catch (err) {
        return { status: 500, message: "Internal Server Error" + err.message }
    }
}

export async function createOrder(order) {
    var instance = new Razorpay({
        key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
    });
    const { amount, _id } = order;
    var options = {
        amount: amount * 100,
        currency: "INR",
    }
    let newOrder = {};
    let error = false;

    await new Promise((resolve, reject) => {
        instance.orders.create(options, (err, order) => {
            if (err) {
                error = true;
                reject(err);
            } else {
                newOrder = order;
                resolve();
            }
        });
    });

    if (error) {
        return { status: 500, message: "Internal Server Error" };
    } else {
        return { status: 200, message: "Order created successfully", order: newOrder, userOrder: order };
    }

}

export async function postTransaction(details) {
    const { id } = details;
    const paymentID = details.razorpay_payment_id;
    const orderID = details.razorpay_order_id;
    const payment_signature = details.razorpay_signature;
    const response = await fetch("https://api.razorpay.com/v1/payments/" + paymentID, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization:
                "Basic " + Buffer.from(process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID + ":" + process.env.RAZORPAY_KEY_SECRET).toString("base64"),
        },
    });
    const data = await response.json();
    if (data.error) {
        return { status: 500, error: data.error.description };
    }
    else {
        let expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(orderID + "|" + paymentID).digest("hex");
        if (expectedSignature !== payment_signature) {
            return { status: 500, message: "Payment not successful" };
        }
        else {
            if (data.status === "captured" && data.amount === details.amount && data.currency === "INR" && data.order_id === orderID) {
                await connectDB();
                let order = await Order.findById(id);
                if (!order) {
                    return { status: 404, message: "Order not found" };
                }
                order.payment_status = "paid";
                order.paymentID = paymentID;
                order.orderID = orderID;
                order.payment_info = data;
                let cart = details.cart;
                cart.forEach(async (item) => {
                    let product = await Product.findById(item.itemCode);
                    if (!product) {
                        return { status: 404, error: "Some Products were not found" };
                    }
                    if (product.availableQty < item.qty) {
                        return { status: 500, error: "Some Products are not available" };
                    }
                    product.availableQty -= item.qty;
                    await product.save();
                });
                await order.save();
                return {
                    status: 200,
                    message: "Payment successful",
                    order: JSON.parse(JSON.stringify(order))
                };
            }
            else if (Math.floor(data.amount / 100) !== details.amount) {
                return { status: 500, error: "Payment not successful" };
            }
            else {
                return { status: 500, error: "Payment not successful" };
            }
        }
    }
}

export async function revokeTransaction(orderID) {
    try {
        await connectDB();
        await Order.findByIdAndDelete(orderID);
        return { status: 200, message: "Order deleted successfully" };
    }
    catch (err) {
        return { status: 500, error: "Internal Server Error" };
    }
}