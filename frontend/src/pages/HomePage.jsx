import { useProduct, useProducts } from "../hooks";
import { ProductCard } from "../components";
import { useState, useEffect } from "react";
import { HeroBanner, leftarrow, rightarrow, phone, 
    computer, camera, headphone, gaming, smartwatch } from "../assets/icons";
import { Link, Navigate } from "react-router-dom";
// import { getFromLocalStorage, saveToLocalStorage } from "../utils/localstorage";


export default function HomePage() {
    const { products, error, loading } = useProducts({ limit: 10 });
    if (loading) return <div>Loading...</div>;
    if (error || !products) {
        return <Navigate to="/error404" replace />
    }
    const categories = [
        {name : "Phones", id : 1, image : {phone}},
        {name : "Computers", id : 2, image : {computer}},
        {name : "SmartWatch", id : 3, image : {smartwatch}},
        {name : "Camera", id : 4, image : {camera}},
        {name : "Headphones", id : 5, image : {headphone}},
        {name : "Gaming", id : 6, image : {gaming}},
    ];
    return (
        <div>
            <div>
                <aside>
                    <nav>
                        <ul>
                            <li>Woman's Fashion </li>
                            <li>Man's Fashion</li>
                            <li>Electronics</li>
                            <li>Home & Lifestyle</li>
                            <li>Medicine</li>
                            <li>xSports & Outdoor</li>
                            <li>Health & Beauty</li>
                        </ul>
                    </nav>
                </aside>
                <section>
                    <img src={HeroBanner} alt="" />
                </section>
            </div>
            <div>
                <div>
                    <p>Today's</p>
                </div>
                <div>
                    <h1>Flash Sales</h1>
                    {/* a countdown timer for flash sales */}
                    <button
                        onClick={leftScroll}
                    >
                        <img src={leftarrow} alt="" />
                    </button>
                    <button
                        onClick={rightScroll}
                    >
                        <img src={rightarrow} alt="" />
                    </button>
                </div>
                <div>
                    {
                        products.map((product) => (
                            <div>
                                <ProductCard
                                    product={product}
                                    key={product.id}
                                    onAddToCart={handleAddToCart}
                                />
                            </div>
                        ))
                    }
                </div>
                <div>
                    <button
                        onClick={viewProducts}
                    >
                        View All Products
                    </button>
                </div>
            </div>
            <div>
                <div>
                    <p>Categories </p>
                </div>
                <div>
                    <h1>
                        Browse by Category
                    </h1>
                    <div>
                        <button
                            onClick={leftScroll}
                        >
                            <img src={leftarrow} alt="" />
                        </button>
                        <button
                            onClick={rightScroll}
                        >
                            <img src={rightarrow} alt="" />
                        </button>
                    </div>
                </div>
                <div>
                    {
                        categories.map((category) => (
                            <div>
                                <img src={category.image} alt="" />
                                <p>{category.name}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}
// A page should NOT care about Navbar / Footer / layout.
// react custom hooks cant be called from other functions they should be called directly from parent function
// So HomePage.jsx = only the content between navbar & footer.