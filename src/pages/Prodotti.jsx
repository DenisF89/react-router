import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
                    <Link to={`/prodotti/${product.id}`}>
                        <div className="title">
                            <h2>{product.title}</h2>
                        </div>
                        <div className="image">
                            <img src={product.image} alt={product.title} />
                        </div>
                        <p className="price">{product.price} €</p>
                    </Link>
                </div>
                
            ))}
            </div>
    </>
    )
}

export default Prodotti;