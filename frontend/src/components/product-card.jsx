import { Link } from "react-router-dom";

import { useCart } from "../context/cartContext";
import { useToast } from "../context/toastContext";

import { ShoppingCart } from "lucide-react";
import { Card, CardTitle, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { formatCurrency } from "../utils/intl";

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
    <Card className="w-full h-full flex-col">
      <CardHeader >
        <div className="rounded-lg aspect-square overflow-hidden">
          {imageUrl ? (
            <Link to={`${id}`} relative="path">
              <img
                className="object-cover object-top w-full h-full"
                src={imageUrl}
                alt={name}
              />
            </Link>
          ) : (
            <ShoppingCart className="w-12 h-12 text-gray-400" />
          )}
        </div>
        <CardTitle className="text-lg font-semibold leading-snug min-h-[3rem]">
          {name}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 grow">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="text-lg font-bold">{formatCurrency(price)}</span>
          <Button
            onClick={handleAddToCart}
            disabled={isProductInCart}
            className={isProductInCart ? "bg-zinc-400" : ""}
            size="sm"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            {isProductInCart ? "Added" : "Add to cart"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
