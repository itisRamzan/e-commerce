const { cookies } = require("next/headers");

export async function sellerAuth() {
    const authStatus = cookies().has("sellerToken");
    return authStatus;
}

export async function userAuth() {
    const authStatus = cookies().has("userToken");
    return authStatus;
}