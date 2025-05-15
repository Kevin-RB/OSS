import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { productSchema } from "../validation/product";
import { axiosAuthInstance } from "../axiosConfig";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textArea";
import { Button } from "./ui/button";
import { useToast } from "../context/toastContext";
import { useNavigate } from "react-router-dom";

export function ProductCreate() {
    const navigate = useNavigate();
    const { addToast } = useToast();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(productSchema),
    })

    async function onSubmit(data) {
        try {
            await axiosAuthInstance.post(`/api/products`, data);
            addToast({
                title: "Success",
                description: "Product created successfully.",
                variant: "success",
                duration: 3000,
            });
            navigate("/product/admin");
        } catch (error) {
            addToast({
                title: "Error",
                description:
                    error.response.data?.message || "Product creation failed. Please try again.",
                variant: "error",
                duration: 3000,
            });
        }
    }

    return (
        <section className="grid h-full w-full place-items-center" >
            <Card className="w-[450px]">
                <CardHeader>
                    <CardTitle>Create product</CardTitle>
                    <CardDescription>add a new product to the store</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="email">Product title</Label>
                            <Input type="text" {...register("name")} placeholder="Awsome product" />
                            <p className="text-red-500">{errors.name?.message}</p>
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="price">Price</Label>
                            <Input type="number" placeholder="150"{...register("price", { required: true, valueAsNumber: true })} />
                            <p className="text-red-500">{errors.price?.message}</p>
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="description">Description</Label>
                            <Textarea type="text" placeholder="This product will change your life" {...register("description", { required: true })} />
                            <p className="text-red-500">{errors.description?.message}</p>
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="imageUrl">Image Url</Label>
                            {/* include validation with required or other standard HTML validation rules */}
                            <Input placeholder="https://my-product-image" type="url" {...register("imageUrl", { required: true })} />
                            <p className="text-red-500">{errors.imageUrl?.message}</p>
                        </div>
                        <Button type="submit" >Create</Button>
                    </form>
                </CardContent>
            </Card>
        </section>
    )
}