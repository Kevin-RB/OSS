import { Link } from "react-router-dom";

export function ProductCard({ imageUrl, name, price, id }) {

    return (
        <div className="group w-full p-4  rounded-lg border border-zinc-200">
            <Link to={`${id}`} relative="path">
                <div className=" rounded-md h-64 w-full overflow-hidden">
                    <img className="w-full h-full object-cover" src={imageUrl} alt="" />
                </div>
            </Link>
            <div className="px-5 pb-5">
                <Link to={`${id}`} relative="path">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-700">{name}</h5>
                </Link>
                <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-gray-700">${price}.00</span>
                    <Link to={`${id}`} relative="path" className="group-hover:visible invisible text-sky-600 underline text-sm">more information</Link>
                </div>
            </div>
        </div>
    )
}
