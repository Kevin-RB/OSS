import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { axiosAuthInstance } from "../axiosConfig";

export function OrderAdminPannel() {
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

    return (
        <section className="container mt-6 mx-auto max-w-[1200px]  h-full w-full flex flex-col gap-4">
            <div className="relative max-h-[400px] overflow-x-auto shadow-md rounded-md">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Order
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Address
                            </th>
                            <th scope="col" class="px-6 py-3">
                                City
                            </th>
                            <th scope="col" class="px-6 py-3">
                                State
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Zip
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <span class="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders?.map((order) => (
                            <tr key={order._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="col" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {order._id}
                                </th>
                                <td className="px-6 py-4 ">
                                    {order.orderStatus}
                                </td>
                                <td className="px-6 py-4 ">
                                    {order.shippingAddress}
                                </td>
                                <td className="px-6 py-4">
                                    {order.shippingCity}
                                </td>
                                <td className="px-6 py-4">
                                    {order.shippingState}
                                </td>
                                <td className="px-6 py-4">
                                    {order.shippingZip}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <Link to={order._id} relative="path" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="h-full flex flex-col gap-4 bg-gray-800 text-gray-400 rounded-md p-4 mb-6">
                <h1 className="mx-auto">Order details</h1>
                <Outlet context={[orders]} />
            </div>
        </section>
    )
}