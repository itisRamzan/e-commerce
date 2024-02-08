import UnauthorizedPage from "@/app/ui/Unauthorized";
import SellerNavbar from "@/app/ui/seller/Navbar";
import { sellerAuth } from "@/middlewares/auth";



export default async function SellerLayout({ children }) {
    let authStatus = await sellerAuth();
    if (authStatus === false) {
        return (
            <UnauthorizedPage />
        )
    }
    else {
        return (
            <>
                <SellerNavbar />
                <div className="w-4/5 px-3 py-4 md:px-4 mx-auto">
                    {children}
                </div>
            </>
        );
    }
}