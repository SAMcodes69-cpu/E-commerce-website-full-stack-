import { useProduct } from "../hooks/useProduct";
import { Link, Navigate } from "react-router-dom";
import { fav } from "../assets/icons";
import { useState } from "react";

export default function ProductDetail() {
    const { product, loading, error } = useProduct();  

    if (loading) return <div className="text-center py-20">Loading product...</div>;

    if (error || !product) {
        return <Navigate to="/error404" replace />;
    }

    const discountedPrice = (product.price * (1 - product.discountPercentage / 100)).toFixed(2);
    const showDiscount = product.discountPercentage > 0;
    const finalPrice = showDiscount ? discountedPrice : product.price.toFixed(2);

    const stockAmount = product.stock;
    const inStock = stockAmount > 0;

    const [qty, setQty] = useState(1);
    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                <div className="space-y-4">
                    <div className="grid grid-cols-4 gap-3">
                        {product.images?.slice(0, 4).map((imgURL, index) => (
                            <img
                                key={index}
                                src={imgURL}
                                alt={`${product.title} - view ${index + 1}`}
                                className="w-full h-24 object-cover rounded border cursor-pointer hover:border-blue-500"
                            />
                        ))}
                    </div>
                    <div className="border rounded-lg overflow-hidden bg-gray-50">
                        <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="w-full h-auto object-contain aspect-square p-4"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-6">

                    <div>
                        <h1 className="text-3xl font-bold">{product.title}</h1>
                        {product.brand && <p className="text-gray-600 mt-1">Brand: {product.brand}</p>}
                    </div>
                    <div className="flex items-center gap-4">
                        <span className={`font-medium ${inStock ? 'text-green-600' : 'text-red-600'}`}>
                            ● {inStock ? "In Stock" : "Out of Stock"}
                        </span>
                    </div>

                    <div className="text-4xl font-bold">
                        ${finalPrice}
                        {showDiscount && (
                            <>
                                <span className="ml-4 text-xl text-gray-500 line-through">
                                    ${product.price.toFixed(2)}
                                </span>
                                <span className="ml-3 text-green-600 text-lg">
                                    -{Math.round(product.discountPercentage)}%
                                </span>
                            </>
                        )}
                    </div>
                    <p className="text-gray-700 leading-relaxed">{product.description}</p>

                    <div className="flex items-center gap-6 mt-4">
                        <div className="flex border rounded overflow-hidden">
                            <button
                                onClick={() => setQty(prev => Math.max(1, prev - 1))}
                                className="px-5 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                                disabled={qty <= 1}
                            >
                                -
                            </button>
                            <span className="px-6 py-2 border-x min-w-12 text-center">{qty}</span>
                            <button
                                onClick={() => setQty(prev => (prev < stockAmount ? prev + 1 : prev))}
                                className="px-5 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                                disabled={qty >= stockAmount}
                            >
                                +
                            </button>
                        </div>

                        <Link
                            to="/checkout"
                            className="bg-red-600 text-white px-8 py-3 rounded font-medium hover:bg-red-700 transition"
                        >
                            Buy Now
                        </Link>

                        <button 
                            className="p-3 border rounded hover:bg-gray-50 transition"
                            onClick={handleCart}
                        >
                            <img src={fav} alt="Add to wishlist" className="w-6 h-6" />
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}