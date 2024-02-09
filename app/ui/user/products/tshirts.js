import { getProducts } from "@/app/actions/getProducts";
import ProductBoxes from "./ProductBoxes";

export default async function TShirtsPage() {
    let products = await getProducts("T Shirts");

    return (
        <>
            <ProductBoxes products={products.data} />
        </>
    );
}