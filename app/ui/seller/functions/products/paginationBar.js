"use client"

import { usePathname, useRouter } from "next/navigation";

export default function PaginationBar({ productsLength, currentPage }) {
    const noOfProductsPerPage = 5;
    currentPage = Number(currentPage);
    let noOfPages = Math.ceil(productsLength / noOfProductsPerPage);
    const router = useRouter();
    const pathname = usePathname();

    return (
        <>
            <nav
                className="flex items-center flex-col flex-wrap md:flex-row justify-between pt-4"
                aria-label="Table navigation"
            >
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                    Showing <span className="font-semibold text-gray-900">
                        {
                            productsLength === 0 ? "0 - 0" : `${(currentPage - 1) * noOfProductsPerPage + 1} - ${currentPage * noOfProductsPerPage > productsLength ? productsLength : currentPage * noOfProductsPerPage}`
                        }
                    </span> of{" "}
                    <span className="font-semibold text-gray-900">
                        {productsLength}
                    </span>
                </span>
                <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                    <li>
                        <button
                            className={` flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed disabled:hover:bg-white disabled:text-gray-500
                            `}
                            disabled={currentPage === 1}
                            onClick={(e) => {
                                e.preventDefault();
                                router.push(pathname + `?page=${currentPage - 1}` + "#myProducts")
                            }}
                        >
                            Previous
                        </button>
                    </li>
                    {Array.from({ length: noOfPages }, (_, i) => {
                        return (
                            <li key={i}>
                                <button
                                    className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300  ${currentPage === i + 1
                                        ? "bg-green-400 text-white"
                                        : "hover:bg-gray-100 hover:text-gray-700"
                                        }`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        router.push(pathname + `?page=${i + 1}` + "#myProducts")
                                    }}
                                >
                                    {i + 1}
                                </button>
                            </li>
                        );
                    })}
                    <li>
                        <button
                            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed disabled:hover:bg-white disabled:text-gray-500"
                            disabled={currentPage === noOfPages || noOfPages === 0}
                            onClick={(e) => {
                                e.preventDefault();
                                router.push(pathname + `?page=${currentPage + 1}` + "#myProducts")
                            }}
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        </>
    )
}