import UserNavbar from "@/app/ui/user/Navbar";
import UserCart from "@/app/ui/user/cart";
import { userAuth } from "@/middlewares/auth";



export default async function SellerLayout({ children }) {
    let isAuth = await userAuth();
    return (
        <>
            <UserNavbar isAuth={isAuth} />
            <div>
                {children}
            </div>
            <UserCart />
        </>
    );
}