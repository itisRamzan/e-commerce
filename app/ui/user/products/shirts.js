import { getProducts } from "@/app/actions/getProducts";
import ProductBoxes from "./ProductBoxes";

export default async function ShirtsPage() {
    let products = await getProducts("Shirts");

    return (
        <>
            <ProductBoxes products={products.data} />
        </>
    );
}