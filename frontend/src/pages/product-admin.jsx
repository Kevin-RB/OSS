import { useEffect, useState } from "react";
import { ProductAdminPannel } from "../components/product-admin-pannel";
import { axiosAuthInstance } from "../axiosConfig";
import { Link } from "react-router-dom";

export function ProductAdmin() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    async function fetchProducts() {
        try {
            const response = await axiosAuthInstance('/api/products');
            setProducts(response.data);
        } catch (error) {
            setError('Error fetching products');
        }
    }

    async function deleteProduct(id) {
        try {
            await axiosAuthInstance.delete(`/api/products/${id}`);
            setProducts(products.filter(product => product._id !== id));
        } catch (error) {
            window.alert('Error deleting product:', error);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <section className="container mx-auto max-w-4xl space-y-4 mt-6">
            <div className="flex justify-between items-center">
                <h1 className="font-semibold text-xl text-zinc-800">Product Admin</h1>
                <Link to={"create-product"} relative="path" className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >
                    Add product
                </Link>
            </div>
            <ProductAdminPannel productList={products} onDeleteProduct={deleteProduct} />
        </section>
    );
}