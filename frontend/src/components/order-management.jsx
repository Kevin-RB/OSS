import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { axiosAuthInstance } from "../axiosConfig";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../components/ui/table"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Slash } from "lucide-react"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "../components/ui/breadcrumb"
import { ArrowLongRight } from "@mynaui/icons-react";
import { SectionTitle } from "./section-title";

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
        <section className="container mx-auto space-y-4 rounded-lg">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/product">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage href="/order-management">Order Management</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <SectionTitle title="Order Management" />

            <div className="overflow-x-auto border rounded-md shadow-sm bg-white">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>OrderID</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Address</TableHead>
                            <TableHead>City</TableHead>
                            <TableHead>State</TableHead>
                            <TableHead>Zip</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders?.map((order) => {
                            const statusVariant = {
                                Pending: "secondary",
                                Canceled: "destructive",
                                Shipped: "default",
                                Delivered: "success",
                            }[order.orderStatus] || "outline"
                            return (
                                <TableRow key={order._id}>
                                    <TableCell>{order._id}</TableCell>
                                    <TableCell><Badge variant={statusVariant}>{order.orderStatus}</Badge></TableCell>
                                    <TableCell>{order.shippingAddress}</TableCell>
                                    <TableCell>{order.shippingCity}</TableCell>
                                    <TableCell>{order.shippingState}</TableCell>
                                    <TableCell>{order.shippingZip}</TableCell>
                                    <TableCell className="text-right"><Link to={order._id} className="hover:underline">
                                        View <ArrowLongRight className="inline" size="16" />
                                    </Link></TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>
        </section>
    )
}