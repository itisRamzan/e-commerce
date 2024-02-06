import AddProducts from "./products/addProducts";
import AllProducts from "./products/allProducts";

export default function ProducstsPage() {
    return (
        <>
            <div className="flex flex-col space-y-4">
                <AddProducts />
                <AllProducts />
            </div>
        </>
    )
}