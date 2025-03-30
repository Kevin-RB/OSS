import { Link } from "react-router-dom";
import { useCart } from "../context/cartContext";

export function Checkout() {
    const { getCartTotal, cart } = useCart();
    const total = getCartTotal();
    return (
        <section className="container mt-6 mx-auto max-w-[1200px] relative mb-6 flex gap-6">
            <div>
                <form action="#" className="max-w-sm bg-gray-50 dark:bg-gray-700 dark:text-gray-400 p-4 rounded-lg">
                    <h3 className="mb-4 text-lg font-medium leading-none text-gray-900 dark:text-white">Invoice details</h3>
                    <div className="grid gap-4 mb-4 grid-cols-1">
                        <div>
                            <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                            <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>
                        <div>
                            <label for="card-holder" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name on card</label>
                            <input type="text" name="card-holder" id="card-holder" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>
                        <div>
                            <label for="card-number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Card number</label>
                            <input type="text" name="card-number" id="card-number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>
                        <div className="grid grid-cols-5 gap-4">
                            <div className="col-span-3">
                                <label for="expiration-date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Expiration date</label>
                                <input type="text" name="expiration-date" id="expiration-date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div className="col-span-2">
                                <label for="cvc" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CVC</label>
                                <input type="text" name="cvc" id="cvc" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                        </div>
                        <div>
                            <label for="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                            <input type="text" name="address" id="address" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>
                        <div className="grid grid-cols-6 gap-4">
                            <div className="col-span-2">
                                <label for="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
                                <input type="text" name="city" id="city" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div className="col-span-2">
                                <label for="state" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">State</label>
                                <input type="text" name="state" id="state" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div className="col-span-2">
                                <label for="postal-code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Postal code</label>
                                <input type="text" name="postal-code" id="postal-code" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Pay ${total}.00
                    </button>
                </form>
            </div>
            <section class="py-8 antialiased bg-gray-50 dark:bg-gray-700 dark:text-gray-400 p-4 rounded-lg">
                <form action="#" class="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <div class="mx-auto max-w-3xl">
                        <h2 class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Order summary</h2>
                        <div>
                            <div class="relative overflow-x-auto border-b border-gray-200 dark:border-gray-800">
                                <table class="w-full text-left font-medium text-gray-900 dark:text-white md:table-fixed">
                                    <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
                                        {cart?.map((product) => (
                                            <tr>
                                                <td class="whitespace-nowrap py-4 md:w-[384px]">
                                                    <div class="flex items-center gap-4">
                                                        <Link to={`/product/${product._id}`} class="flex items-center aspect-square w-10 h-10 shrink-0">
                                                            <img class="h-full w-full max-h-full object-cover rounded-md" src={product.imageUrl} alt={product.name} />
                                                        </Link>
                                                        <Link to={`/product/${product._id}`} class="hover:underline">{product.name}</Link>
                                                    </div>
                                                </td>

                                                <td class="p-4 text-base font-normal text-gray-900 dark:text-white">x{product.quantity}</td>

                                                <td class="p-4 text-right text-base font-bold text-gray-900 dark:text-white">${product.total}.00</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div class="mt-4 space-y-6">
                                <div class="space-y-4">
                                    <dl class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                                        <dt class="text-lg font-bold text-gray-900 dark:text-white">Total</dt>
                                        <dd class="text-lg font-bold text-gray-900 dark:text-white">${total}.00</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </section>
    )
}