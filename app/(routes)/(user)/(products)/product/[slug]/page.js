import { getProduct } from "@/app/actions/getProducts";
import IndividualProductPage from "@/app/ui/user/IndividualProductPage";

export default async function ProductPage({ params }) {
    let res = await getProduct(params.slug)
    if (res.status !== 200) {
        return (
            <>
                <div className="flex flex-col items-center justify-center min-h-screen">
                    <p className="text-center text-red-500 text-4xl">{res.message}</p>
                </div>
            </>
        )
    }
    return (
        <>
            <IndividualProductPage product={res.product} colorSizeSlug={res.colorSizeSlug} variants={res.variants} />
        </>
    );
}