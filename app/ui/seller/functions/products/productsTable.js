import { getProducts } from "@/app/actions/sellerProducts";
import PaginationBar from "./paginationBar";
import Image from "next/image";


export default async function ProductsTable({ currentPage }) {
    const data = await getProducts(currentPage);
    const products = data.products;

    return (
        <>
            <table className="hidden min-w-full text-gray-900 md:table" id="myProducts">
                <thead className="rounded-lg text-left text-sm font-normal">
                    <tr>
                        <th className="px-4 py-5 font-medium sm:pl-6 text-left">Product</th>
                        <th className="px-4 py-5 font-medium sm:pl-6 text-center">Price (in Rupees) </th>
                        <th className="px-4 py-5 font-medium sm:pl-6 text-center">Category</th>
                        <th className="px-4 py-5 font-medium sm:pl-6 text-center">Stock</th>
                        <th className="px-4 py-5 font-medium sm:pl-6 text-center">Color</th>
                        <th className="px-4 py-5 font-medium sm:pl-6 text-center">Size</th>
                        <th className="px-4 py-5 font-medium sm:pl-6 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {products?.map((product) => (
                        <tr
                            key={product._id}
                            className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                        >
                            <td className="py-3 pl-6 pr-3 text-center">
                                <div className="flex items-center gap-3">
                                    <Image
                                        src={product.img.toString()}
                                        className="rounded-full"
                                        width={28}
                                        height={28}
                                        alt={product.title}
                                    />
                                    {product.title}
                                </div>
                            </td>
                            <td className="text-center px-4">
                                {product.price}
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
                            <td className=" py-3 pl-6 pr-3">
                                <div className="flex flex-row space-x-2">
                                    <span className="text-blue-500 cursor-pointer">Edit</span>
                                    <span className="text-red-500 cursor-pointer">Delete</span>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
        </>
    )
}