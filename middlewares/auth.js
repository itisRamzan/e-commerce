"use server"

import { cookies } from "next/headers"

export async function userAuth() {
    if (cookies().get("userToken") && cookies().get("userToken").value) {
        return true;
    }
    else {
        return false;
    }
}

export async function sellerAuth() {
    if (cookies().get("sellerToken") && cookies().get("sellerToken").value) {
        return true;
    }
    else {
        return false;
    }
}