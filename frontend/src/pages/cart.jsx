import { Link } from "react-router-dom";
import { useCart } from "../context/cartContext";
import { Button } from "../components/ui/button";
import { Trash } from "lucide-react";

export function Cart() {
    const { cart, increaseQuantity, decreaseQuantity, removeFromCart, getCartTotal, getCartNetTotal, TAX_RATE_STRING, getTaxedTotal } = useCart();
    const netTotal = getCartNetTotal();
    const tax = getTaxedTotal();
    const total = getCartTotal();

    function handleIncreaseQuantity(product) {
        increaseQuantity(product);
    }

    function handleDecreaseQuantity(product) {
        decreaseQuantity(product);
    }

    function handleRemoveFromCart(product) {
        removeFromCart(product);
    }

    return (
        <section className="container mt-6 mx-auto max-w-[1200px] relative space-y-6 bg-white rounded-lg p-6">
            <div className="mx-auto max-w-2xl">
                <table className="w-full text-sm text-left rtl:text-right">
                    <tbody className="divide-y divide-gray-200">
                        {cart?.map((product) => (
                            <tr key={product._id}>
                                <td className="whitespace-nowrap py-4 md:w-[384px]">
                                    <div className="flex items-center gap-4">
                                        <Link to={`/product/${product._id}`} className="flex items-center aspect-square w-16 h-16 shrink-0">
                                            <img className="h-full w-full max-h-full object-cover rounded-md" src={product.imageUrl} alt={product.name} />
                                        </Link>
                                        <Link to={`/product/${product._id}`} class="hover:underline">{product.name}</Link>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <Button onClick={() => { handleDecreaseQuantity(product) }} size="icon" variant="secondary">
                                            <span className="sr-only">Quantity button</span>
                                            <svg className="w-3 h-3" aria-hidden="true" viewBox="0 0 18 2">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                                            </svg>
                                        </Button>
                                        <td className="p-4 text-center text-sm font-normal text-gray-900 min-w-10">{product.quantity}</td>
                                        <Button onClick={() => { handleIncreaseQuantity(product) }} size="icon" variant="secondary">
                                            <span className="sr-only">Quantity button</span>
                                            <svg className="w-3 h-3" aria-hidden="true" viewBox="0 0 18 18">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                                            </svg>
                                        </Button>
                                    </div>
                                </td>
                                <td class="p-4 text-right text-base font-bold text-gray-900">${product.total.toFixed(2)}</td>
                                <td className="px-6 py-4">
                                    <Button onClick={() => { handleRemoveFromCart(product) }} variant="ghost" size="icon" className="hover:text-red-500">
                                        <Trash className="w-4 h-4" />
                                        <span className="sr-only">Remove item</span>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <section className="divide-y divide-gray-200 mt-6">
                    <h2 className="font-bold">Order summary</h2>
                    <section>
                        <div className="flex items-center justify-between mt-4">
                            <span className="text-sm font-medium text-gray-900">subtotal</span>
                            <span className="text-sm font-bold text-gray-900">${netTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                            <span className="text-sm font-medium text-gray-900">tax <i className="text-xs text-gray-500">{TAX_RATE_STRING} rate</i></span>
                            <span className="text-sm font-bold text-gray-900">${tax.toFixed(2)}</span>
                        </div>
                    </section>
                    <div className="flex items-center justify-between mt-4">
                        <span className="text-lg font-bold text-gray-900">Total</span>
                        <span className="text-sm font-bold text-gray-900">${total.toFixed(2)}</span>
                    </div>
                </section>
                <div className="flex items-center justify-between mt-4 space-x-2">
                    <Link to={"/product"} className="w-full" >
                        <Button className="w-full" variant="outline">
                            Continue shopping
                        </Button>
                    </Link>
                    <Link to={"/cart/checkout"} className="w-full">
                        <Button className="w-full">
                            Proceed to checkout
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}