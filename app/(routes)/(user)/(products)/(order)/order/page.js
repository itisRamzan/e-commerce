import PageLoadingIcon from "@/app/ui/PageLoadingIcon";
import UnauthorizedPage from "@/app/ui/Unauthorized";
import IndiviOrderPage from "@/app/ui/user/orders/IndividualOrder"
import { userAuth } from "@/middlewares/auth"
import { Suspense } from "react";

export default async function indOrderPage() {
    let isAuth = await userAuth();
    if (isAuth === false) {
        return (
            <>
                <UnauthorizedPage />
            </>
        )
    }

    return (
        <>
            <Suspense fallback={<div>
                <div className="flex justify-center items-center h-screen text-4xl">
                    <PageLoadingIcon />
                </div>
            </div>}>
                <IndiviOrderPage />
            </Suspense>
        </>
    )
}