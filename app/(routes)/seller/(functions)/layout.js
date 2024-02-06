import SellerNavbar from "@/app/ui/seller/Navbar";



export default async function SellerLayout({ children }) {
    return (
        <>
            <SellerNavbar />
            <div className="w-4/5 px-8 py-4 md:px-4 mx-auto">
                {children}
            </div>
        </>
    );
}