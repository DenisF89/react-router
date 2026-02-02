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
            <div className="card_container">
            {products.map((product) => (
                <div key={product.id} className="card">
                    <h2>{product.title}</h2>
                    <img src={product.image} alt={product.title} width="100" />
                    <p>{product.price} €</p>
                </div>
            ))}
            </div>
    </>
    )
}

export default Prodotti;