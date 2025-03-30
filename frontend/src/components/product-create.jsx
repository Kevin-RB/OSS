import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { productSchema } from "../validation/product";
import { axiosAuthInstance } from "../axiosConfig";
import { useNavigate } from "react-router-dom";

export function ProductCreate() {
    const navigate = useNavigate();
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
            window.alert('Product Created!');
            navigate('/product/admin');
        } catch (error) {
            console.error('Error Creating product:');
        }
    }

    return (
        <section className="grid h-full w-full pt-6 place-items-center" >
            <div className="max-w-md w-full bg-zinc-50 border border-zinc-300 rounded-md shadow-md p-6">
                <h1 className="text-zinc-800 font-semibold text-lg mb-6">Edit Product</h1>
                {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
                <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label>Name</label>
                        {/* register your input into the hook by invoking the "register" function */}
                        <input type="text" placeholder="Awsome product" className="w-full bg-zinc-200 rounded px-2 py-1" {...register("name")} />
                        <p className="text-red-500">{errors.name?.message}</p>
                    </div>

                    <div>
                        <label>Price</label>
                        {/* include validation with required or other standard HTML validation rules */}
                        <input type="number" placeholder="150" className="w-full bg-zinc-200 rounded px-2 py-1" {...register("price", { required: true, valueAsNumber: true })} />
                        <p className="text-red-500">{errors.price?.message}</p>
                    </div>
                    <div>
                        <label>Description</label>
                        {/* include validation with required or other standard HTML validation rules */}
                        <textarea placeholder="This product will change your life" className="w-full bg-zinc-200 rounded px-2 py-1" {...register("description", { required: true })} />
                        <p className="text-red-500">{errors.description?.message}</p>
                    </div>
                    <div>
                        <label>Image Url</label>
                        {/* include validation with required or other standard HTML validation rules */}
                        <input placeholder="https://my-product-image" type="url" className="w-full bg-zinc-200 rounded px-2 py-1" {...register("imageUrl", { required: true })} />
                        <p className="text-red-500">{errors.imageUrl?.message}</p>
                    </div>

                    <button className="bg-blue-500 text-white p-2 rounded-md" type="submit" >Create</button>
                </form>
            </div>
        </section>
    )
}