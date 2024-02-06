"use server"

import Seller from "@/models/Seller";
import connectDB from "./connectDB";

const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwt_secret = process.env.NEXT_PUBLIC_JWT_SECRET;


export async function sellerSignup(currentState, formData) {
    let name = formData.get('name');
    let email = formData.get('email');
    let password = formData.get('password');
    if (name === "" || email === "" || password === "") {
        return { status: 400, message: "All fields are required" };
    }
    else {
        try {
            await connectDB();
            let seller = await Seller.findOne({ email: email });
            if (seller) {
                return { status: 400, message: "Seller with this email already exists" };
            }
            else {
                let salt = bcryptjs.genSaltSync(10);
                password = bcryptjs.hashSync(password, salt);
                let newSeller = new Seller({
                    name: name,
                    email: email,
                    password: password
                });
                await newSeller.save();
                return { status: 200, message: "Seller created successfully" };
            }
        }
        catch (err) {
            return { status: 500, message: "Internal server error" };
        }
    }

}

export async function sellerLogin(currentState, formData) {
    let email = formData.get('email');
    let password = formData.get('password');
    if (email === "" || password === "") {
        return { status: 400, message: "All fields are required" };
    }
    else {
        try {
            await connectDB();
            let seller = await Seller.findOne({ email: email });
            if (seller) {
                let isMatch = await bcryptjs.compare(password, seller.password);
                if (isMatch) {
                    let token = jwt.sign({
                        id: seller._id,
                        name: seller.name,
                        email: seller.email
                    }, jwt_secret, { expiresIn: "24h" });
                    // let salt = bcryptjs.genSaltSync(10);
                    // token = bcryptjs.hashSync(token, salt);
                    return { status: 200, token: token, message: "Login successful" };
                }
                else {
                    return { status: 400, message: "Invalid email or password" };
                }
            }
            else {
                return { status: 400, message: "Invalid email or password" };
            }
        }
        catch (err) {
            return { status: 500, message: "Internal server error" };
        }

    }
}

export async function getSeller(token) {
    try {
        let decoded = jwt.verify(token, jwt_secret);
        return { status: 200, id: decoded.id };
    }
    catch (err) {
        return { status: 500, message: "Internal server error" };
    }
}