import ProducstsPage from "@/app/ui/seller/functions/Products";
import { Suspense } from "react";

export default async function ProductPage({ params, searchParams }) {
    if (searchParams.page === undefined) {
        searchParams.page = 1;
    }
    return (
        <>
            <Suspense fallback={<h1>Loading...</h1>}>
                <ProducstsPage searchParams={searchParams} />
            </Suspense>
        </>
    )
}