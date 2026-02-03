import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Prodotti(){

    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    const [category, setCategory] = useState('');
    const options = ["Tutti i prodotti",
                    ...new Set(products.map(product => product.category))];
    
const apiUrl = "https://fakestoreapi.com/products";

function getData(){
    axios.get(apiUrl)
    .then((res)=>{
        setProducts(res.data);
    }).catch((err)=>{
        setError("Errore nel caricamento dei prodotti");
    })
}

const filtra = (e) => {
    if(e.target.value === "Tutti i prodotti"){
        setCategory('');
    }
    else {setCategory(e.target.value);}
}

const converti= (value)=>{
    const result = value.toFixed(2).replace(".", ",");
    return result;
}

useEffect(()=>{
    getData();
},[])



    return(
    <>
            <h1>Prodotti</h1>
            <div className="filter-bar">
                <select value={category} onChange={filtra}>
                    {options.map((option,i)=>
                    <option key={i} value={option}>{option}</option>
                    )}
                </select>
            </div>
            <div className="card_container">
            {error!=""  ? <p className="error">{error}</p> 
                        : (category?products.filter(product => product.category === category):products)
                                            .map((product) => (
                <div key={product.id} className="card">
                    <Link to={`/prodotti/${category?`${category}/`:''}${product.id}`}>
                        <div className="title">
                            <h2>{product.title}</h2>
                        </div>
                        <div className="image">
                            <img src={product.image} alt={product.title} />
                        </div>
                        <p className="price">{converti(product.price)} €</p>
                    </Link>
                </div>
                
            ))}
            </div>
    </>
    )
}

export default Prodotti;