import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosAuthInstance } from "../axiosConfig";

export function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [error, setError] = useState(null);

    async function getProductDetail() {
        try {
            const response = await axiosAuthInstance.get(`/api/products/${id}`);
            setProduct(response.data)
        } catch (error) {
            console.error(error);
            setError(error);
        }
    }

    useEffect(() => { getProductDetail() }, []);

    return (
        <article className="container mx-auto grid place-items-center mt-10">
            <div class="max-w-xl w-full bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                    <img class="rounded-t-lg object-cover h-80 w-full" src={product.imageUrl} alt="" />
                </a>
                <div class="space-y-2 p-4">
                    <div className="flex justify-between items-center">
                        <a href="#">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{product.name}</h5>
                            <span class="text-3xl font-bold text-white">${product.price}.00</span>
                        </a>
                    </div>
                    <p class="mb-3 font-normal text-white dark:text-gray-10000">{product.description}</p>
                    <button href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Add to cart
                    </button>
                </div>
            </div>
        </article>
    );
}