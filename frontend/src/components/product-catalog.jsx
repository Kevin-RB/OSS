import ProductCard from "./product-card";

export function ProductCatalog({ products }) {
  return (
    <section className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          id={product._id}
          name={product.name}
          price={product.price}
          imageUrl={product.imageUrl}
          key={product._id}
        />
      ))}
    </section>
  );
}
