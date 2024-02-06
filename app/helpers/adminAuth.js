"use server"

import Admin from "@/models/Admin";
import connectDB from "./connectDB";

const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwt_secret = process.env.NEXT_PUBLIC_JWT_SECRET;


export async function adminSignup(currentState, formData) {
    let name = formData.get('name');
    let email = formData.get('email');
    let password = formData.get('password');
    if (name === "" || email === "" || password === "") {
        return { status: 400, message: "All fields are required" };
    }
    else {
        try{
            await connectDB();
            let admin = await Admin.findOne({ email: email });
            if (admin) {
                return { status: 400, message: "Admin with this email already exists" };
            }
            else {
                let salt = bcryptjs.genSaltSync(10);
                password = bcryptjs.hashSync(password, salt);
                let newAdmin = new Admin({
                    name: name,
                    email: email,
                    password: password
                });
                await newAdmin.save();
                return { status: 200, message: "Admin created successfully" };
            }
        }
        catch (err) {
            return { status: 500, message: "Internal server error" };
        }
    }

}

export async function adminLogin(currentState, formData) {
    let email = formData.get('email');
    let password = formData.get('password');
    if (email === "" || password === "") {
        return { status: 400, message: "All fields are required" };
    }
    else {
        try {
            await connectDB();
            let admin = await Admin.findOne({ email: email });
            if (admin) {
                let isMatch = await bcryptjs.compare(password, admin.password);
                if (isMatch) {
                    let token = jwt.sign({
                        id: admin._id,
                        name: admin.name,
                        email: admin.email
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