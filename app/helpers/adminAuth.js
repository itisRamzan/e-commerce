"use server"

import Admin from "@/models/Admin";
import connectDB from "./connectDB";


export async function adminSignup(currentState, formData) {
    let name = formData.get('name');
    let email = formData.get('email');
    let password = formData.get('password');
    if (name === "" || email === "" || password === "") {
        return { status: 400, message: "All fields are required" };
    }
    else {
        await connectDB();
        let admin = await Admin.findOne({ email: email });
        if (admin) {
            return { status: 400, message: "Admin with this email already exists" };
        }
        else {
            let newAdmin = new Admin({
                name: name,
                email: email,
                password: password
            });
            await newAdmin.save();
            return { status: 200, message: "Admin created successfully" };
        }
    }

}