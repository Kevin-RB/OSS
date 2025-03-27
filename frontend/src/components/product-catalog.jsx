import { ProductCard } from "./product-card";

export function ProductCatalog({ products }) {

    return (
        <section className="container mx-auto grid grid-cols-2 md:grid-cols-3 gap-4" >
            {products.map((product) => (
                <ProductCard
                    id={product._id}
                    name={product.name}
                    price={product.price}
                    imageUrl={product.imageUrl}
                    key={product.id}
                />
            ))}
        </section>
    )
}