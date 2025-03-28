import { useRef, useState } from "react";
import { Link } from "react-router-dom";

export function ProductAdminPannel({ productList, onDeleteProduct }) {
    const modalRef = useRef(null);
    const [product, setProduct] = useState({});

    async function deleteProduct(id) {
        onDeleteProduct(id);
        modalRef.current.close();
    }

    return (
        <section>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Product name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                price
                            </th>
                            <th scope="col" class="px-6 py-3">
                                description
                            </th>
                            <th scope="col" class="px-6 py-3">
                                imageUrl
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <span class="sr-only">Edit</span>
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <span class="sr-only">Delete</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {productList.map((product) => (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="col" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {product.name}
                                </th>
                                <td className="px-6 py-4 ">
                                    ${product.price}.00
                                </td>
                                <td className="px-6 py-4 ">
                                    {product.description}
                                </td>
                                <td className="px-6 py-4 text-ellipsis overflow-hidden  max-w-xs ">
                                    {product.imageUrl}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <Link to={`update`} state={{ ...product }} relative="path" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button onClick={() => {
                                        setProduct(product)
                                        modalRef.current.showModal()
                                    }} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <dialog ref={modalRef} className="dialog p-6 bg-white rounded-md shadow-md w-96">
                <h1 className="text-2xl mb-6">You are about to delete an item</h1>
                <p className="text-zinc-600 mb-4 text-center">This action is irreversible</p>
                <div className="flex gap-2">
                    <button className="w-full px-2 py-1 bg-red-500 text-white rounded-md" onClick={() => { deleteProduct(product._id) }}>Delete</button>
                    <button className="w-full px-2 py-1 text-zinc-600 border border-zinc-700 rounded-md" onClick={() => { modalRef.current.close() }}>Cancel</button>
                </div>
            </dialog>
        </section>
    )
}