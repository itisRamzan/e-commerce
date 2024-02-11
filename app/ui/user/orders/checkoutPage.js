import { userAuth } from "@/middlewares/auth";
import UsercheckoutForm from "./UsercheckoutForm";
import UserCheckoutUnAuth from "./UserCheckoutUnAuth";
import { getUser } from "@/app/actions/userAuth";
import { cookies } from "next/headers";

export default async function UserCheckoutPage() {

    let isAuth = await userAuth();
    if (!isAuth) {
        return ( <UserCheckoutUnAuth /> )
    }
    let data = await getUser(cookies().get("userToken").value)
    return (
        <>
            <UsercheckoutForm email={data.user?.email} />
        </>
    )
}