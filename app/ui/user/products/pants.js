import { getProducts } from "@/app/actions/getProducts";
import ProductBoxes from "./ProductBoxes";

export default async function PantsPage() {
    let products = await getProducts("Pants");

    return (
        <>
            <ProductBoxes products={products.data} />
        </>
    );
}