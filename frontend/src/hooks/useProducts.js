import { useState, useEffect } from "react";

export function useProducts({ limit = 10, skip = 0 } = {}) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let ignore = false;
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(
                    `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
                );
                if (!res.ok) throw new Error("Failed to fetch products");
                const data = await res.json();

                if (!ignore) {
                    setProducts(data.products || []);
                }
            } catch (err) {
                if (!ignore) {
                    setError(err.message);
                }
            } finally {
                if (!ignore) {
                    setLoading(false);
                }
            }
        };
        fetchData();
        return () => {
            ignore = true;
        };
    }, [limit, skip]);
    return { products, loading, error };
}