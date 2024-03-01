import ForgotPassword from "@/app/ui/user/auth/ForgotPassword";
import { Suspense } from "react";

export default function UserForgotPassword() {
    return (
        <>
        <Suspense fallback={<div>Loading...</div>}>
            <ForgotPassword />
        </Suspense>
        </>
    )
}