import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { productSchema } from "../validation/product";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosAuthInstance } from "../axiosConfig";

export function ProductEdit() {
    const { state } = useLocation()
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(productSchema),
        values: state
    })

    async function onSubmit(data) {
        try {
            await axiosAuthInstance.put(`/api/products/${state._id}`, data);
            window.alert('Product updated!');
            navigate('/product/admin');
        } catch (error) {
            console.error('Error updating product:', error);
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
                        <input type="text" className="w-full bg-zinc-200 rounded px-2 py-1" {...register("name")} />
                        <p className="text-red-500">{errors.name?.message}</p>
                    </div>

                    <div>
                        <label>Price</label>
                        {/* include validation with required or other standard HTML validation rules */}
                        <input type="number" className="w-full bg-zinc-200 rounded px-2 py-1" {...register("price", { required: true, valueAsNumber: true })} />
                        <p className="text-red-500">{errors.price?.message}</p>
                    </div>
                    <div>
                        <label>Description</label>
                        {/* include validation with required or other standard HTML validation rules */}
                        <textarea className="w-full bg-zinc-200 rounded px-2 py-1" {...register("description", { required: true })} />
                        <p className="text-red-500">{errors.description?.message}</p>
                    </div>
                    <div>
                        <label>Image Url</label>
                        {/* include validation with required or other standard HTML validation rules */}
                        <input type="url" className="w-full bg-zinc-200 rounded px-2 py-1" {...register("imageUrl", { required: true })} />
                        <p className="text-red-500">{errors.imageUrl?.message}</p>
                    </div>

                    {/* errors will return when field validation fails  */}
                    {errors.exampleRequired && <span>This field is required</span>}

                    <button className="bg-blue-500 text-white p-2 rounded-md" type="submit" >Update</button>
                </form>
            </div>
        </section>
    )
}