import UserNavbar from "@/app/ui/user/Navbar";
import { userAuth } from "@/middlewares/auth";



export default async function SellerLayout({ children }) {
    let isAuth = await userAuth();
    return (
        <>
            <UserNavbar isAuth={isAuth} />
            <div className="w-4/5 px-3 py-4 md:px-4 mx-auto">
                {children}
            </div>
        </>
    );
}