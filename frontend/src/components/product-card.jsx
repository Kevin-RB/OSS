import { Link } from "react-router-dom";

import { useCart } from "../context/cartContext";
import { useToast } from "../context/toastContext";

import { ShoppingCart } from "lucide-react";
import { Card, CardTitle, CardContent } from "./ui/card";
import { Button } from "./ui/button";

export default function ProductCard({ imageUrl, name, price, id }) {
  const { addToCart, cart } = useCart();
  const { addToast } = useToast();
  const isProductInCart = cart.some((product) => product._id === id);

  const handleAddToCart = () => {
    addToCart({ _id: id, imageUrl, name, price });
    addToast({
      title: "Success",
      description: "Item added to the cart",
      variant: "success",
      duration: 3000,
    });
  };

  return (
    <Card className="w-full h-full">
      <div className="p-4">
        <div className="rounded-lg aspect-square flex items-center justify-center overflow-hidden">
          {imageUrl ? (
            <>
              <Link to={`${id}`} relative="path">
                <div className=" rounded-md size-64 w-full overflow-hidden">
                  <img
                    className="h-full w-full object-contain"
                    src={imageUrl}
                    alt={name}
                  />
                </div>
              </Link>
            </>
          ) : (
            <ShoppingCart className="w-12 h-12 text-gray-400" />
          )}
        </div>
      </div>

      <CardContent className="pt-0 space-y-4">
        <div className="min-h-[48px]">
          <CardTitle className="text-lg font-semibold leading-snug">
            {name}
          </CardTitle>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">${price}</span>
          <Button
            onClick={handleAddToCart}
            disabled={isProductInCart}
            className={isProductInCart ? "bg-zinc-400" : ""}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            {isProductInCart ? "Added" : "Add to cart"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
