"use server"

import User from "@/models/User";
import connectDB from "./connectDB";
import { getUser } from "./userAuth";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
const bcrypt = require("bcryptjs");

export async function userAddressUpdate(currentState, formData) {
    let name = formData.get('name');
    let address = formData.get('address');
    let phoneno = formData.get('phoneno');
    let pincode = formData.get('pincode');
    if (name === "" || address === "" || phoneno === "" || pincode === "") {
        return { status: 400, message: "All fields are required" };
    }
    else if (name.length < 3 || address.length < 10) {
        return { status: 400, message: "Please check your name and address" };
    }
    else {
        try {
            await connectDB();
            let email = (await getUser(cookies().get("userToken").value)).user.email;
            let user = await User.findOne({ email: email });
            if (!user) {
                return { status: 400, message: "User not found" };
            }
            else {
                user.name = name;
                user.address = address;
                user.phoneno = phoneno;
                user.pincode = pincode;
                await user.save();
                revalidatePath("/userProfile")
                return { status: 200, message: "Address updated successfully" };
            }
        }
        catch (err) {
            return { status: 500, message: "Internal server error" };
        }
    }
}

export async function userPasswordUpdate(currentState, formData) {
    let oldPassword = formData.get('oldpassword');
    let newPassword = formData.get('newpassword');
    let confirmPassword = formData.get('confirmpassword');
    if (oldPassword === "" || newPassword === "" || confirmPassword === "") {
        return { status: 400, message: "All fields are required" };
    }
    else if (newPassword !== confirmPassword) {
        return { status: 400, message: "Passwords Do Not match" };
    }
    else {
        try {
            await connectDB();
            let email = (await getUser(cookies().get("userToken").value)).user.email;
            let user = await User.findOne({ email: email });
            if (!user) {
                return { status: 400, message: "Incorrect Credentials" };
            }
            else {
                let compare = bcrypt.compareSync(oldPassword, user.password);
                if (!compare) {
                    return { status: 400, message: "Incorrect Credentials" };
                }
                else {
                    let salt = bcrypt.genSaltSync(10);
                    user.password = bcrypt.hashSync(newPassword, salt);
                    await user.save();
                    return { status: 200, message: "Password updated successfully" };
                }
            }
        }
        catch (err) {
            console.log(err.message)
            return { status: 500, message: "Internal server error" };
        }
    }
}