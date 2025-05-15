import { useNavigate, useOutletContext, useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react";
import { UpdateOrderForm } from "./update-order-form"
import { axiosAuthInstance } from "../axiosConfig"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb"
import { Slash } from "lucide-react"

export function OrderUpdate() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        async function getOrders() {
            try {
                const response = await axiosAuthInstance.get('/api/order');
                setOrders(response.data);
            } catch (error) {
                window.alert('Error fetching orders');
            }
        }
        getOrders()
    }, [])

    const order = orders.find((order) => order._id === id)
    if (!order) return (<p>Order not found</p>)

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
        <section>
            <Breadcrumb className="container my-8">
                <BreadcrumbList>
                    <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                    <Slash />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                    <BreadcrumbPage>Order summary</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="overflow-x-auto border rounded-md shadow-sm bg-white container">
                <div class="grid grid-cols-4 gap-4">
                    <div class="col-span-3">
                        <div className="relative overflow-x-auto border-b border-gray-200">
                            <table className="w-full text-left font-medium text-gray-900 md:table-fixed">
                                <tbody className="divide-y divide-gray-200">
                                    {order.itemsInCart?.map((product) => (
                                        <tr key={product._id}>
                                            <td className="whitespace-nowrap py-4 md:w-[384px]">
                                                <div className="flex items-center gap-4">
                                                    <Link to={`/product/${product.productId._id}`} className="flex items-center aspect-square w-16 h-16 shrink-0">
                                                        <img className="h-full w-full max-h-full object-cover rounded-md" src={product.productId.imageUrl} alt={product.productId.name} />
                                                    </Link>
                                                    <Link to={`/product/${product.productId._id}`} class="hover:underline">{product.productId.name}</Link>
                                                </div>
                                            </td>
                                            <td class="p-4 text-base font-normal text-gray-900">x{product.quantity}</td>
                                            <td class="p-4 text-right text-base font-bold text-gray-900">${product.quantity*product.productId.price}.00</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div>
                        <UpdateOrderForm order={order} onSubmit={onSubmit} />
                    </div>
                </div>
            </div>
        </section>
    )
}