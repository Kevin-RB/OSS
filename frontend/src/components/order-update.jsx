import { useNavigate, useOutletContext, useParams } from "react-router-dom"
import { UpdateOrderForm } from "./update-order-form"
import { axiosAuthInstance } from "../axiosConfig"

export function OrderUpdate() {
    const { id } = useParams()
    const [orders] = useOutletContext()
    const navigate = useNavigate()

    const order = orders.find((order) => order._id === id)
    if (!order) return <p>Order not found</p>

    async function onSubmit(data) {
        try {
            await axiosAuthInstance.put(`/api/order`, data)
            window.alert('Order updated!')
            navigate(0)
        } catch (error) {
            window.alert('Error updating order status')
        }
    }

    return (
        <section className="antialiased rounded-lg">
            <UpdateOrderForm order={order} onSubmit={onSubmit} />
            <form action="#" className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <div className="mx-auto max-w-3xl">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Order summary</h2>
                    <div>
                        <div className="relative overflow-x-auto border-b border-gray-200 dark:border-gray-800">
                            <table className="w-full text-left font-medium text-gray-900 dark:text-white md:table-fixed">
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                                    {order.itemsInCart.map(product => {
                                        const { productId: item, quantity } = product
                                        return (
                                            <tr>
                                                <td className="whitespace-nowrap py-4 md:w-[384px]">
                                                    <div className="flex items-center gap-4">
                                                        <div className="flex items-center aspect-square w-10 h-10 shrink-0">
                                                            <img className="h-full w-full max-h-full object-cover rounded-md" src={item.imageUrl} alt={item.name} />
                                                        </div>
                                                        <span className="hover:underline">{item.name}</span>
                                                    </div>
                                                </td>
                                                <td className="p-4 text-base font-normal text-gray-900 dark:text-white">x{quantity}</td>
                                                <td className="p-4 text-right text-base font-bold text-gray-900 dark:text-white">${item.price}.00</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </form>
        </section>
    )
}