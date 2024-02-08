import { Suspense } from "react";
import AddProducts from "./products/addProducts";
import AllProducts from "./products/allProducts";

export default async function ProducstsPage({ props, searchParams }) {
    return (
        <>
            <div className="flex flex-col space-y-4">
                <AddProducts />
                <AllProducts searchParams={searchParams} />
            </div>
        </>
    )
}