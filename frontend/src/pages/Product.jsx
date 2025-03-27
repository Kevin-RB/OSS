import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { axiosAuthInstance } from '../axiosConfig';
import { ProductCatalog } from '../components/product-catalog';
import { useAuth } from '../context/AuthContext';
import { roles } from '../utils/roles';


export default function Product() {
    const { user } = useAuth()
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    const handleSearch = async (searchTerm) => {
        try {
            const response = await axiosAuthInstance.get(`/api/products/?name=${searchTerm}`);
            setProducts(response.data);
        } catch (error) {
            console.error('Error searching products:', error);
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
            console.error('Error fetching products:', error);
            setError('Error fetching products');
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);


    return (
        <div>
            <div className="max-w-md mx-auto mt-10">
                <input
                    type="search"
                    placeholder="Search products..."
                    className="w-full p-2 border rounded"
                    onChange={(e) => setSearchParams({ name: e.target.value })}
                    value={searchParams.get('name') || ''}
                />
            </div>
            {user?.roles[0] === roles.admin && (
                <button className="" onClick={() => { navigate("admin", { relative: "path" }) }}>
                    Admin panel
                </button>
            )}
            <ProductCatalog products={products} />
        </div>
    );
}