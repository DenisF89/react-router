import { useEffect, useState, useContext } from "react";
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

    return(
        <>
            <h1>Prodotti</h1>
                <Filter category={category} 
                        setCategory={setCategory} 
                        products={products} 
                />
                
            

            <div className="card_container">
                {error!=""? <p className="error">{error}</p> 
                          : products
                                    .filter(product => !category || product.category === category)  // se non esiste categoria non filtrare
                                    .filter(product => !budgetMode || product.price <= maxPrice)          // se budget non attivo non filtrare
                                    .map(product => (
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