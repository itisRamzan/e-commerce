import ProducstsPage from "@/app/ui/seller/functions/Products";

export default async function ProductPage({ params, searchParams }) {
    if (searchParams.page === undefined) {
        searchParams.page = 1;
    }
    return (
        <>
            <ProducstsPage searchParams={searchParams} />
        </>
    )
}