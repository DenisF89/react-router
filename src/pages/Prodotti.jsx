import { useEffect, useState } from "react";
import axios from "axios";

function Prodotti(){

    const [products, setProducts] = useState([]);
    
const apiUrl = "https://fakestoreapi.com/products";

function getData(){
    axios.get(apiUrl)
    .then((res)=>{
        setProducts(res.data);
    }).catch((err)=>{
        console.log(err);
    })
}

useEffect(()=>{
    getData();
},[])

    return(
    <>
            <h1>Prodotti</h1>

            {products.map((product) => (
                <div key={product.id}>
                    <h2>{product.title}</h2>
                    <p>{product.description}</p>
                </div>
            ))}
    </>
    )
}

export default Prodotti;