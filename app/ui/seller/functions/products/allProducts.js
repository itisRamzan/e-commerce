import { ToastContainer } from "react-toastify";
import ProductsPage from "./productsPage";


export default function AllProducts({ props, searchParams }) {
    return (
        <>
            <div>
                <ToastContainer />
                <h1 className="text-lg md:text-2xl font-bold mb-4">My Products</h1>
                <ProductsPage searchParams={searchParams} />
            </div>
        </>
    )
}