import { ToastContainer } from "react-toastify";
import ProductsTable from "./productsTable";


export default function AllProducts() {
    return (
        <>
            <div>
                <ToastContainer />
                <h1 className="text-lg md:text-2xl font-bold mb-4">My Products</h1>
                <ProductsTable />
            </div>
        </>
    )
}