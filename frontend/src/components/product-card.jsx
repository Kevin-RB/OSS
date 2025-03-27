export function ProductCard({ imageUrl, name, price, id }) {
    const route = `product/${id}`
    
    return (
        <div class="group w-full max-w-xs p-4  rounded-lg border border-zinc-200">
            <a href={route}>
                <div className=" rounded-md h-64 w-full overflow-hidden">
                    <img class="w-full h-full object-cover" src={imageUrl} alt="product image" />
                </div>
            </a>
            <div class="px-5 pb-5">
                <a href={route}>
                    <h5 class="text-xl font-semibold tracking-tight text-gray-700">{name}</h5>
                </a>
                <div class="flex items-center justify-between">
                    <span class="text-3xl font-bold text-gray-700">${price}.00</span>
                    <a href={route} className="group-hover:visible invisible text-sky-600 underline text-sm">more information</a>
                </div>
            </div>
        </div>
    )
}
