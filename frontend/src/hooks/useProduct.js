import { useState,useEffect } from "react";
import { useParams } from "react-router-dom"; // to get the parameter from the particular product data for product url

export function useProduct(){

    const {id} = useParams(); // useParam returns object so use {}
    const [product , setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if(!id){
            setError('No Product id is provided');
            setLoading(false);
            return;
        }
        async () => {
            setLoading(true);
            try {
                const res = await fetch(`https://dummyjson.com/products/${id}`);
                if(!res.ok) throw new Error('product not found'); // throws application level error to load Error 404 page

                const data = await res.json();
                setProduct(data);
            } catch (error) {
                setError(error.message);
            }
            finally{
                setLoading(false);
            }
        }
    },[id]);
    return {product,loading,error}; // not [] because these all are different objects not an array
}