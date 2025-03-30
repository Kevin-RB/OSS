import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { orderUpdate } from "../validation/order"

export function UpdateOrderForm({ order, onSubmit }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        values: {
            orderStatus: order.orderStatus,
            id: order._id,
        },
        resolver: zodResolver(orderUpdate),
    })

    return (
        <form className="max-w-sm mx-auto mb-4" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-white mb-2 text-lg">Update status</h2>
            <select className="w-full bg-zinc-200 rounded px-2 py-1" {...register("orderStatus")}>
                <option value="Pending">Pending</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
            </select>
            <p className="text-red-500">{errors?.orderStatus?.message}</p>
            <button type="submit" className="w-full bg-blue-500 text-white rounded px-4 py-2 mt-4">Update</button>
        </form>
    )
}
