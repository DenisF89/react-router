import { filtra } from "../functions/functions.js"

export default function Filter({category,setCategory,products}){

    const options = ["Tutti i prodotti",
                        ...new Set(products.map(product => product.category))];

    return(
                <div className="filter-bar">
                    <select name="filter" value={category} onChange={(e)=>filtra(e.target.value, setCategory)}>
                        {options.map((option,i)=>
                            <option key={i} value={option}>{option}</option>
                        )}
                    </select>
                </div>
    )
}