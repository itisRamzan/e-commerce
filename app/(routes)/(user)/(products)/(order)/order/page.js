import UnauthorizedPage from "@/app/ui/Unauthorized";
import IndiviOrderPage from "@/app/ui/user/orders/IndividualOrder"
import { userAuth } from "@/middlewares/auth"

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
            <IndiviOrderPage />
        </>
    )
}