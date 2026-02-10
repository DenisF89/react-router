import { useEffect, useState } from "react";
import Card from "../components/Card";
import Filter from "../components/Filter";
import { getData } from "../functions/functions.js"
import { useBudget } from '../contexts/BudgetContext';

function Prodotti(){

    //dichiarazioni variabili
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    const [category, setCategory] = useState('');
    const {budgetMode,maxPrice} = useBudget();

    const url = "https://fakestoreapi.com/products";

    //chiamata all'api
    useEffect(()=>{getData(url, setProducts, setError);}, [])

    const filteredarray = products  .filter(product => !category || product.category === category)  // se non esiste categoria non filtrare
                                    //versione input
                                    .filter(product => !maxPrice || product.price <= maxPrice)  // se il prezzo massimo non è settato non filtrare
                                    //versione booleano
                                    //.filter(product => !budgetMode || product.price <= 30) // se budget non attivo non filtrare;

    return(
        <>
            <h1>Prodotti</h1>
                <Filter category={category} 
                        setCategory={setCategory} 
                        products={products} 
                />
                
            

            <div className="card_container">
                {error!=""? <p className="error">{error}</p> 
                          : filteredarray.length<=0
                                                ?(<p>Nessun prodotto soddisfa i requisiti</p>)
                                                :filteredarray.map(product => (
                                                <Card
                                                    key={product.id}
                                                    category={category}
                                                    product={product}
                                                /> )           
                                    )
                }
            </div>
        </>
    )
}

export default Prodotti;