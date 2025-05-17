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
import { useToast } from "../context/toastContext";
import { Table, TableBody, TableCell, TableRow } from "./ui/table";

export function OrderUpdate() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [order, setOrder] = useState([]);
    const { addToast } = useToast();

    useEffect(() => {
        async function getOrders() {
            try {
                const response = await axiosAuthInstance.get(`/api/order/${id}`);
                setOrder(response.data);
            } catch (error) {
                window.alert('Error fetching orders');
            }
        }
        getOrders()
    }, [])

    if (!order) return (<p>Order not found</p>)

    async function onSubmit(data) {
        try {
            await axiosAuthInstance.put(`/api/order/${id}`, data)
            addToast({
                title: "Success",
                description: "Order updated!",
                variant: "success",
                duration: 3000,
            });
            navigate("/order-management")
        } catch (error) {
            addToast({
                title: "Error",
                description: "Error updating order status",
                variant: "error",
                duration: 3000,
            });
        }
    }

    return (
        <section className="container mx-auto space-y-4 rounded-lg p-4">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/product">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/order-management">Order Management</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Order status</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex justify-center border rounded-md shadow-sm bg-white p-4">
                <div className="max-w-2xl w-full grid grid-cols-4 gap-4">
                    <div className="col-span-3">
                        <Table >
                            <TableBody>
                                {order.itemsInCart?.map((product) => (
                                    <TableRow key={product._id}>
                                        <TableCell className="whitespace-nowrap py-4">
                                            <div className="flex items-center gap-4">
                                                <Link to={`/product/${product.productId._id}`} className="flex items-center aspect-square w-16 h-16 shrink-0">
                                                    <img className="h-full w-full max-h-full object-cover rounded-md" src={product.productId.imageUrl} alt={product.productId.name} />
                                                </Link>
                                                <Link to={`/product/${product.productId._id}`} className="hover:underline">{product.productId.name}</Link>
                                            </div>
                                        </TableCell>
                                        <TableCell class="p-4 text-base font-normal text-gray-900">x{product.quantity}</TableCell>
                                        <TableCell class="p-4 text-right text-base font-bold text-gray-900">${product.quantity * product.productId.price}.00</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="col-span-1">
                        <UpdateOrderForm order={order} onSubmit={onSubmit} />
                    </div>
                </div>
            </div>
        </section>
    )
}