import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { orderUpdate } from "../validation/order"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Button } from "./ui/button";

export function UpdateOrderForm({ order, onSubmit }) {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        values: {
            orderStatus: order.orderStatus,
            id: order._id,
        },
        resolver: zodResolver(orderUpdate),
    })

    return (
        <form className="max-w-sm mx-auto mb-4 space-y-2" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="mb-2 text-lg font-bold">Update status</h2>
            <Select onValueChange={(value) => setValue("orderStatus", value)} defaultValue={order.orderStatus}>
            <SelectTrigger>
                <SelectValue placeholder={order.orderStatus} />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Canceled">Canceled</SelectItem>
                <SelectItem value="Shipped">Shipped</SelectItem>
                <SelectItem value="Delivered">Delivered</SelectItem>
            </SelectContent>
            </Select>
            <p className="text-red-500">{errors?.orderStatus?.message}</p>
            <Button className="w-full" type="submit" >Update</Button>
        </form>
    )
}
