import { Suspense } from "react";
import ProductsTable from "./productsTable";
import ProducstsTableSkeleton from "./ProdutsTableSkeleton";
import { unstable_noStore } from "next/cache";

export default async function ProductsPage({ props, searchParams }) {

    return (
        <div className="flex flex-col space-y-4">
            <div className="bg-blue-50 rounded-lg p-6 md:pt-0 overflow-x-auto">
                {/* <Suspense fallback={<ProducstsTableSkeleton />} >
                    <ProductsTable currentPage={Number(searchParams.page)} searchParams={searchParams} />
                </Suspense> */}
                
            </div>
        </div>
    )
}