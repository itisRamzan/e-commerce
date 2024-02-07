"use server"

import { v2 as Cloudinary } from "cloudinary";
let cloud_name = process.env.CLOUDINARY_CLOUD_NAME;
let api_key = process.env.CLOUDINARY_API_KEY;
let api_secret = process.env.CLOUDINARY_API_SECRET;

Cloudinary.config({
    cloud_name: cloud_name,
    api_key: api_key,
    api_secret: api_secret,
    secure: true
})

export async function uploadImage(formerData) {
    try {
        let { timestamp, signature } = await getSignature();
        let formData = new FormData();
        formData.append("file", formerData.get("image"));
        formData.append("api_key", api_key);
        formData.append("signature", signature);
        formData.append("timestamp", timestamp);
        let endpoint = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;
        const response = await fetch(endpoint, {
            method: "POST",
            body: formData,
        });
        if (response) {
            let data = await response.json();
            let newName = formerData.get("name").replace(/\s+/g, '-').toLowerCase() + "-" + formerData.get("size").toLowerCase() + "-" + formerData.get("color").toLowerCase();
            let result = await Cloudinary.uploader.rename(data.public_id, newName, { overwrite: true })
            return { status: 200, imageURL: result.secure_url, message: "Image uploaded successfully" };
        }
        else {
            return { status: 400, message: "Image upload failed" };
        }
    }
    catch (err) {
        return { status: 500, message: "Internal server error" };
    }
}

export async function getSignature() {
    const timestamp = Math.round(new Date().getTime() / 1000)
    const signature = Cloudinary.utils.api_sign_request({ timestamp: timestamp }, api_secret)
    return { signature, timestamp }
}

