import { useEffect, useState } from "react";
import Card from "../components/Card";
import Filter from "../components/Filter";
import { getData } from "../functions/functions.js"

function Prodotti(){

    //dichiarazioni variabili
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    const [category, setCategory] = useState('');

    const url = "https://fakestoreapi.com/products";

    //chiamata all'api
    useEffect(()=>{getData(url, setProducts, setError)}, [])

    return(
        <>
            <h1>Prodotti</h1>
                <Filter category={category} 
                        setCategory={setCategory} 
                        products={products} 
                />

            <div className="card_container">
                {error!=""  ? <p className="error">{error}</p> 
                            : (category ?products.filter(product => product.category === category)
                                        :products
                              )         .map((product) =>   <Card 
                                                                key={product.id} 
                                                                category={category} 
                                                                product={product}  
                                                            />
                                        )
                }
            </div>
        </>
    )
}

export default Prodotti;