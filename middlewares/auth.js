"use server"

import { cookies } from "next/headers"

export async function userAuth() {
    if (cookies().get("userToken")) {
        return true;
    }
    else {
        return false;
    }
}

export async function sellerAuth() {
    if (cookies().get("sellerToken")) {
        return true;
    }
    else {
        return false;
    }
}