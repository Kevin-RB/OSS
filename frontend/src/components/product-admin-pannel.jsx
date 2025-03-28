import { Link } from "react-router-dom";

export function ProductAdminPannel({ productList }) {

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
                                <td scope="col" className="px-6 py-4 ">
                                    ${product.price}.00
                                </td>
                                <td scope="col" className="px-6 py-4 ">
                                    {product.description}
                                </td>
                                <td scope="col" className="px-6 py-4 text-ellipsis overflow-hidden  max-w-xs ">
                                    {product.imageUrl}
                                </td>
                                <td scope="col" className="px-6 py-4 text-right">
                                    <Link to={`update`} state={{ ...product }} relative="path" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                                </td>
                                <td scope="col" className="px-6 py-4 text-right">
                                    <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <dialog >
                <p>Greetings, one and all!</p>
                <form method="dialog">
                    <button>OK</button>
                </form>
            </dialog>
        </section>
    )
}