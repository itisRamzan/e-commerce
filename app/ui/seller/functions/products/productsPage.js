import { Suspense } from "react";
import ProductsTable from "./productsTable";
import { getProducts } from "@/app/actions/sellerProducts";
import PaginationBar from "./paginationBar";
import mongoose from "mongoose";

export default async function ProductsPage({ props, searchParams }) {
    const data = await getProducts(1);

    return (
        <div className="flex flex-col space-y-4">
            <div className="bg-blue-50 rounded-lg p-6 md:pt-0">
                <Suspense fallback={<>Loading....</>} >
                    <ProductsTable currentPage={Number(searchParams.page)} />
                </Suspense>
                <PaginationBar productsLength={data?.length} currentPage={searchParams.page} />
            </div>
        </div>
    )
}