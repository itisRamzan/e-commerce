import { cookies } from "next/headers";
import { createStorage, uploadImage } from "../actions/mediaHandler";
import multer from "multer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req, res) {
    let sellerID = cookies().get("sellerToken").value;
    const storage = await createStorage(sellerID);
    uploadImage(storage)(Request, Response, async (err) => {
        if (err) {
            console.log(err.message + " in POST function");
        }
        else {
            console.log("Image saved successfully hogya hai");
        }
    })

    return Response.json({ status: 200, message: "Image saved" });
}