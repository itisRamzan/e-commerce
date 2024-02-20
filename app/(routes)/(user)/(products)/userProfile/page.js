import UnauthorizedPage from "@/app/ui/Unauthorized";
import UserInfoPage from "@/app/ui/user/profile/UserInfo";
import { userAuth } from "@/middlewares/auth";

export default async function userProfilePage() {
    const isAuth = await userAuth();
    if (!isAuth) {
        return (
            <UnauthorizedPage />
        )
    }
    else {
        return (
            <>
                <UserInfoPage />
            </>
        )
    }

}