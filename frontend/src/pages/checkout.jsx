import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { orderCreation } from "../validation/order";
import { axiosAuthInstance } from "../axiosConfig";
import { useAuth } from "../context/AuthContext";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { ShieldCheck, CreditCard, Loader2 } from "lucide-react";
import { useState } from "react";
import { PayPalIcon } from "../icons/paypal";
import { useToast } from "../context/toastContext";

export function Checkout() {
    const { user } = useAuth()
    const navigate = useNavigate();
    const { getCartTotal, cart, clearCart } = useCart();
    const total = getCartTotal();
    const { addToast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const [paymentMethod, setPaymentMethod] = useState("card"); // Default to card payment

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(orderCreation),
        values: {
            userId: user.id,
            paymentMethod: paymentMethod,
            totalAmount: total,
            itemsInCart: cart.map((product) => ({
                productId: product._id,
                quantity: product.quantity,
            }))
        }
    })

    async function onSubmit(data) {
        try {
            setIsLoading(true);
            await axiosAuthInstance.post(`/api/order`, data);
            addToast({
                title: "Success",
                description: "Order created successfully.",
                variant: "success",
                duration: 3000,
            });
            navigate('/product');
            clearCart();
        } catch (error) {
            addToast({
                title: "Error",
                description: "Failed to create order. Please try again.",
                variant: "error",
                duration: 3000,
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <section className="container mt-6 mx-auto max-w-[1200px] relative mb-6 flex gap-6">
            <div>
                <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm bg-gray-5 bg-white p-4 rounded-lg">
                    <h3 className="mb-4 text-lg font-medium leading-none text-gray-900">Invoice details</h3>
                    <div className="grid gap-4 mb-4 grid-cols-1">
                        {/* Payment Method Selection */}
                        <div>
                            <Label className="block mb-2">Payment Method</Label>
                            <div className="grid grid-cols-2 gap-4">
                                {/* Credit Card Payment Option */}
                                <div
                                    className={`flex flex-col items-center justify-center border rounded-lg p-4 cursor-pointer transition-all ${paymentMethod === "card"
                                        ? "border-blue-500 bg-blue-50"
                                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                                        }`}
                                    onClick={() => setPaymentMethod("card")}
                                >
                                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 mb-2">
                                        <CreditCard className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <span className="font-medium">Credit Card</span>
                                </div>

                                {/* PayPal Payment Option */}
                                <div
                                    className={`flex flex-col items-center justify-center border rounded-lg p-4 cursor-pointer transition-all ${paymentMethod === "paypal"
                                        ? "border-blue-700 bg-blue-50"
                                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                                        }`}
                                    onClick={() => setPaymentMethod("paypal")}
                                >                                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 mb-2">
                                        <PayPalIcon className="w-6 h-6 text-blue-700" />
                                    </div>
                                    <span className="font-medium">PayPal</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="email">Email address</Label>
                            <Input {...register("email")} type="email" id="email" placeholder="user@gmail.com" />
                            <p className="text-red-500">{errors.email?.message}</p>
                        </div>

                        {/* Card Payment Details - Only shown when card payment method is selected */}
                        {paymentMethod === "card" && (
                            <>
                                <div>
                                    <Label htmlFor="nameOnCard">Name on card</Label>
                                    <Input {...register("nameOnCard")} type="text" id="nameOnCard" placeholder="John Doe" />
                                    <p className="text-red-500">{errors.nameOnCard?.message}</p>
                                </div>
                                <div>
                                    <Label htmlFor="card-number">Card number</Label>
                                    <Input {...register("cardNumber")} type="text" id="card-number" placeholder="1234 5678 9012 3456" />
                                    <p className="text-red-500">{errors.cardNumber?.message}</p>
                                </div>
                                <div className="grid grid-cols-5 gap-4">
                                    <div className="col-span-3">
                                        <Label htmlFor="expiration-date">Expiration date</Label>
                                        <Input {...register("expirationDate")} type="text" id="expiration-date" placeholder="MM/YY" />
                                        <p className="text-red-500">{errors.expirationDate?.message}</p>
                                    </div>
                                    <div className="col-span-2">
                                        <Label htmlFor="cvc">CVC</Label>
                                        <div className="relative">
                                            <Input {...register("cvc")} type="password" id="cvc" className="pr-8" placeholder="123" />
                                            <ShieldCheck className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                        </div>
                                        <p className="text-red-500">{errors.cvc?.message}</p>
                                    </div>
                                </div>
                            </>
                        )}
                        {/* If PayPal is selected, we could show a message */}
                        {paymentMethod === "paypal" && (
                            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 text-center flex flex-col items-center">
                                <PayPalIcon className="w-12 h-12 text-blue-700 mb-3" />
                                <p className="text-blue-700 font-medium text-lg mb-1">Secure Checkout with PayPal</p>
                                <p className="text-blue-600 text-sm">You'll be redirected to PayPal after confirming your order</p>
                            </div>
                        )}
                        <div>
                            <Label htmlFor="shippingAddress">Address</Label>
                            <Input {...register("shippingAddress")} type="text" id="shippingAddress" placeholder="123 Main st" />
                            <p className="text-red-500">{errors.shippingAddress?.message}</p>
                        </div>                        <div className="grid grid-cols-6 gap-4">
                            <div className="col-span-2">
                                <Label htmlFor="shippingCity">City</Label>
                                <Input {...register("shippingCity")} type="text" id="shippingCity" placeholder="Brisbane" />
                                <p className="text-red-500">{errors.shippingCity?.message}</p>
                            </div>
                            <div className="col-span-2">
                                <Label htmlFor="shippingState">State</Label>
                                <Input {...register("shippingState")} type="text" id="shippingState" placeholder="QLD" />
                                <p className="text-red-500">{errors.shippingState?.message}</p>
                            </div>
                            <div className="col-span-2">
                                <Label htmlFor="shippingZip">Postal code</Label>
                                <Input {...register("shippingZip")} type="text" id="shippingZip" placeholder="4000" />
                                <p className="text-red-500">{errors.shippingZip?.message}</p>
                            </div>
                        </div>
                    </div>
                    <Button
                        type="submit"
                        className={`w-full mt-2 flex items-center justify-center py-2.5`}
                        disabled={isLoading}
                    >{
                            isLoading ? (
                                <>
                                    <Loader2 className="animate-spin mr-2" />
                                    <span>Processing...</span>
                                </>
                            ) : (
                                paymentMethod === "card" ? (
                                    <>
                                        <CreditCard className="mr-2" />
                                        <span>Checkout with Card</span>
                                    </>
                                ) : (
                                    <>
                                        <PayPalIcon className="mr-2" />
                                        <span>Checkout with PayPal</span>
                                    </>
                                )
                            )
                        }
                    </Button>
                </form>
            </div>
            {/* Order summary  */}
            <section className="py-8 antialiased bg-white p-4 rounded-lg">
                <form action="#" className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <div className="mx-auto max-w-3xl">
                        <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">Order summary</h2>
                        <div>
                            <div className="relative overflow-x-auto border-b border-gray-200">
                                <table className="w-full text-left font-medium text-gray-900 md:table-fixed">
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
                                                <td class="p-4 text-base font-normal text-gray-900">x{product.quantity}</td>
                                                <td class="p-4 text-right text-base font-bold text-gray-900">${product.total}.00</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div class="mt-4 space-y-6">
                                <div class="space-y-4">
                                    <dl class="flex items-center justify-between gap-4">
                                        <dt class="text-lg font-bold text-gray-900">Total</dt>
                                        <dd class="text-lg font-bold text-gray-900">${total}.00</dd>
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