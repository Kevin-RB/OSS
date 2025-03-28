import { useEffect, useState } from "react";
import { ProductAdminPannel } from "../components/product-admin-pannel";
import { axiosAuthInstance } from "../axiosConfig";

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
        <section className="container mx-auto max-w-4xl space-y-4">
            <h1 className="font-semibold text-xl text-zinc-800">Product Admin</h1>
            <ProductAdminPannel productList={products} onDeleteProduct={deleteProduct} />
        </section>
    );
}