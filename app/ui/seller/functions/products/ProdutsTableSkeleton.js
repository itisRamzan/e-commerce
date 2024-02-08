import React from 'react';

const ProducstsTableSkeleton = () => {
    return (
        <table className="min-w-full text-gray-900 overflow-x-auto" id="myProducts">
            <thead className="rounded-lg text-left text-sm font-normal overflow-x-auto">
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
            <tbody className="bg-white overflow-x-auto">
                {[1, 2, 3, 4, 5].map((index) => (
                    <tr
                        key={index}
                        className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg animate-pulse"
                    >
                        <td className="py-3 pl-6 pr-3 text-center">
                            <div className="flex max-md:flex-col items-center md:gap-3">
                                <div className="bg-gray-300 rounded-lg h-16 w-16 md:w-16 md:h-16"></div>
                                <div className="bg-gray-300 h-4 w-16 mt-1"></div>
                            </div>
                        </td>
                        <td className="text-center px-4">
                            <div className="bg-gray-300 h-4 w-16"></div>
                        </td>
                        <td className="text-center px-4">
                            <div className="bg-gray-300 h-4 w-16"></div>
                        </td>
                        <td className="text-center px-4">
                            <div className="bg-gray-300 h-4 w-16"></div>
                        </td>
                        <td className="text-center px-4">
                            <div className="bg-gray-300 h-4 w-16"></div>
                        </td>
                        <td className="text-center px-4">
                            <div className="bg-gray-300 h-4 w-16"></div>
                        </td>
                        <td className=" py-3 pl-6 pr-3">
                            <div className="flex flex-row space-x-2">
                                <div className="bg-gray-300 h-4 w-16"></div>
                                <div className="bg-gray-300 h-4 w-16"></div>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ProducstsTableSkeleton;