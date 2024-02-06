import { getProducts } from "@/app/actions/sellerProducts";

export default async function ProductsTable() {
    const data = await getProducts();
    if (data.status === 200) {
        let products = data.products;
        return (
            <div className="flex flex-col space-y-4">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
                    <table className="w-full text-sm text-left  text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-blue-200 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Product
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Category
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Stock
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Color
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Size
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => {
                                return (
                                    <tr
                                        key={index}
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-blue-100 dark:hover:bg-gray-600"
                                    >
                                        <td className="px-6 py-4 font-medium text-gray-900">
                                            {product.title}
                                        </td>
                                        <td className="px-6 py-4 text-center"> ₹ {product.price}</td>
                                        <td className="px-6 py-4 text-center">{product.category}</td>
                                        <td className="px-6 py-4 text-center">{product.availableQty}</td>
                                        <td className="px-6 py-4 text-center">{product.color}</td>
                                        <td className="px-6 py-4 text-center">{product.size}</td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="mx-1 text-blue-500 cursor-pointer">Edit</span>
                                            <span className="mx-1 text-red-500 cursor-pointer">Delete</span>
                                        </td>
                                    </tr>
                                );
                            })}
                            {products.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="text-center">
                                        <div className="my-4">Add some products</div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <nav
                        className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
                        aria-label="Table navigation"
                    >
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                            Showing <span className="font-semibold text-gray-900">
                                {"1 - " + products.length}
                            </span> of{" "}
                            <span className="font-semibold text-gray-900">
                                {products.length}
                            </span>
                        </span>
                        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                >
                                    Previous
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    aria-current="page"
                                    className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                                >
                                    3
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                >
                                    Next
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="text-center text-red-500">
                {data.message}
            </div>
        )
    }
}