import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { axiosAuthInstance } from '../axiosConfig';
import { ProductCatalog } from '../components/product-catalog';
import { useAuth } from '../context/AuthContext';
import { roles } from '../utils/roles';


export default function Product() {
    const { user } = useAuth()
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    const handleSearch = async (searchTerm) => {
        try {
            const response = await axiosAuthInstance.get(`/api/products/?name=${searchTerm}`);
            setProducts(response.data);
        } catch (error) {
            console.error('Error searching products:', error);
            setError(error);
        }
    };

    useEffect(() => {
        const name = searchParams.get('name');
        handleSearch(name);
    }, [searchParams]);

    async function fetchProducts() {
        try {
            const response = await axiosAuthInstance.get('/api/products');
            setProducts(response.data);
        } catch (error) {
            setError('Error fetching products');
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);


    return (
        <div className='container mx-auto max-w-[1200px]'>
            <div className="max-w-md mx-auto mt-10">
                <input
                    type="search"
                    placeholder="Search products..."
                    className="w-full p-2 border rounded"
                    onChange={(e) => setSearchParams({ name: e.target.value })}
                    value={searchParams.get('name') || ''}
                />
            </div>
            {error && <div className="text-red-500">Error: {error}</div>}
            {user?.roles[0] === roles.admin && (
                <div className="flex justify-end mt-4">
                    <Link to={"admin"} relative='path' className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Admin panel
                    </Link>
                </div>
            )}
            <ProductCatalog products={products} />
        </div>
    );
}