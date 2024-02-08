import { getProducts } from "@/app/actions/sellerProducts";
import PaginationBar from "./paginationBar";
import Image from "next/image";
import { EditButton } from "./editProduct";


export default async function ProductsTable({ currentPage, searchParams }) {
    const data = await getProducts(currentPage);
    const products = data.products;

    return (
        <div className="flex flex-col space-y-2">
            <table className="min-w-full text-gray-900 overflow-x-auto" id="myProducts">
                <thead className="rounded-lg text-left text-sm font-normal overflow-x-auto">
                    <tr>
                        <th className="px-4 py-5 text-left">Product</th>
                        <th className="px-4 py-5 text-center">Price (in Rupees) </th>
                        <th className="px-4 py-5 text-center">Category</th>
                        <th className="px-4 py-5 text-center">Stock</th>
                        <th className="px-4 py-5 text-center">Color</th>
                        <th className="px-4 py-5 text-center">Size</th>
                        <th className="px-4 py-5 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white overflow-x-auto">
                    {products?.map((product) => (
                        <tr
                            key={product._id}
                            className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                        >
                            <td className="py-3 pl-6 pr-3 text-center">
                                <div className="flex max-md:flex-col items-center md:gap-3">
                                    <Image
                                        src={product.img.toString()}
                                        className="object-cover rounded-md object-center w-[8rem] md:w-16 md:h-16"
                                        width={50}
                                        height={50}
                                        alt={product.title}
                                    />
                                    <p className="max-md:text-sm">
                                        {product.title}
                                    </p>
                                </div>
                            </td>
                            <td className="text-center px-4">
                                ₹‎ {product.price}
                            </td>
                            <td className="text-center px-4">
                                {product.category}
                            </td>
                            <td className="text-center px-4">
                                {product.availableQty}
                            </td>
                            <td className="text-center px-4">
                                {product.color}
                            </td>
                            <td className="text-center px-4">
                                {product.size}
                            </td>
                            <td className="text-center px-4">
                                <EditButton productID={product._id} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <PaginationBar productsLength={data?.length || 0} currentPage={searchParams.page} />
        </div>
    )
}