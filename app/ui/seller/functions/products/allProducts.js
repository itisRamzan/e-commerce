import { ToastContainer } from "react-toastify";
import ProductsPage from "./productsPage";
import { Suspense } from "react";
import ProductsTable from "./productsTable";
import ProducstsTableSkeleton from "./ProdutsTableSkeleton";
import { IoMdRefresh } from "react-icons/io";
import { revalidatePath } from "next/cache";

export default async function AllProducts({ props, searchParams }) {
    return (
        <>
            <div>
                <ToastContainer />
                <h1 className="text-lg md:text-2xl font-bold mb-4">My Products
                    {/* <IoMdRefresh className="inline mx-2 cursor-pointer"
                        onClick={revalidatePath("/seller/products")}
                    /> */}
                </h1>
                <div className="flex flex-col space-y-4">
                    <div className="bg-blue-50 rounded-lg p-6 md:pt-0 overflow-x-auto">
                        <Suspense fallback={<ProducstsTableSkeleton />} >
                            <ProductsTable currentPage={Number(searchParams.page)} searchParams={searchParams} />
                        </Suspense>
                    </div>
                </div>
            </div>
        </>
    )
}