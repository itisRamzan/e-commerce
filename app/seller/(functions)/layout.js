import SellerNavbar from "@/app/ui/seller/dashboard/Navbar";



export default async function SellerLayout({ children }) {
    return (
        <>
            <SellerNavbar />
            <div>{children}</div>
        </>
    );
}