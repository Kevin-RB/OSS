import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { axiosAuthInstance } from "../axiosConfig";
import { useAuth } from "../context/AuthContext";
import { roles } from "../utils/roles";
import { ProductCatalog } from "../components/product-catalog";

export default function Product() {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  async function fetchProducts(searchTerm) {
    try {
      const name = searchTerm.get("name");
      let query = "";
      if (name) {
        query += `?name=${name}`;
      }
      const response = await axiosAuthInstance.get(`/api/products/${query}`);
      setProducts(response.data);
    } catch (error) {
      setError("Error fetching products");
    }
  }

  useEffect(() => {
    fetchProducts(searchParams);
  }, [searchParams]);

  return (
    <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 md:px-8">
      {/* Search and Manage Products */}
      <div className="flex items-center justify-between mb-6">
        <input
          type="search"
          placeholder="Search products..."
          className="flex-1 max-w-[400px] p-2 border rounded"
          onChange={(e) => setSearchParams({ name: e.target.value })}
          value={searchParams.get("name") || ""}
        />
        {user?.roles[0] === roles.admin && (
          <Link
            to={"admin"}
            relative="path"
            className="px-4 py-2 text-sm font-medium text-center text-black bg-white border rounded-lg hover:bg-gray-100"
          >
            Manage Products
          </Link>
        )}
      </div>

      {error && <div className="text-red-500 mt-4">Error: {error}</div>}

      <ProductCatalog products={products} />
    </div>
  );
}
