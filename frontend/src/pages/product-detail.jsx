import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosAuthInstance } from "../axiosConfig";
import { useCart } from "../context/cartContext";
import { useToast } from "../context/toastContext";

export function ProductDetail() {
  const { id } = useParams();
  const { addToCart, cart } = useCart();
  const { addToast } = useToast();
  const [product, setProduct] = useState({});
  const [error, setError] = useState(null);

  const isProductInCart = cart.some((product) => product._id === id);

  useEffect(() => {
    async function getProductDetail() {
      try {
        const response = await axiosAuthInstance.get(`/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error(error);
        setError(error);
      }
    }
    getProductDetail();
  }, [id]);

  function onAddToCartHandler() {
    addToCart(product);
    addToast({
      title: "Success",
      description: "Item added to the cart",
      variant: "success",
      duration: 3000,
    });
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section className="flex justify-center mt-10">
      <div className="flex w-full max-w-3xl bg-white rounded-xl overflow-hidden">
        {/* Image container with background blur */}
        <div className="w-1/2 flex items-center justify-center aspect-square relative overflow-hidden">
          {product.imageUrl ? (
            <>
              {/* Blurred background image */}
              <div className="absolute inset-0">
                <img
                  src={product.imageUrl}
                  alt=""
                  className="w-full h-full object-cover blur-lg opacity-50"
                  aria-hidden="true"
                />
              </div>
              {/* Main image */}
              <img
                src={product.imageUrl}
                alt={product.name}
                className="object-contain w-full h-full relative z-10"
              />
            </>
          ) : (
            <span className="text-gray-400">No image</span>
          )}
        </div>

        {/* Description */}
        <div className="w-1/2 p-6 flex flex-col justify-center space-y-4 text-left">
          <h2 className="text-xl font-bold text-gray-900">{product.name}</h2>
          <p className="text-3xl font-semibold text-gray-800">
            ${product.price}.00
          </p>

          <button
            disabled={isProductInCart}
            onClick={onAddToCartHandler}
            className="disabled:bg-zinc-400 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition w-full"
          >
            {isProductInCart ? "Item added to the cart" : "Add to cart"}
          </button>

          <p className="font-normal text-black">{product.description}</p>
        </div>
      </div>
    </section>
  );
}
