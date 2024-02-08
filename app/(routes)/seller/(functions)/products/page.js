import Loader from "@/app/ui/loader";
import ProducstsPage from "@/app/ui/seller/functions/Products";
import { Suspense } from "react";

export default async function ProductPage({ params, searchParams }) {
    if (searchParams.page === undefined) {
        searchParams.page = 1;
    }
    return (
        <>
            <Suspense fallback={<Loader />}>
                <ProducstsPage searchParams={searchParams} />
            </Suspense>
        </>
    )
}