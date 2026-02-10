import { NavLink, useLocation  } from "react-router-dom";
import { useBudget } from '../contexts/BudgetContext';


//La Navbar gestisce i link del menu principale con NavLink di React Router
//se uno dei link corrisponde alla pagina corrente, gli viene dato classe active

export default function Navbar(){

    const {maxPrice, setMaxPrice , budgetMode, setBudgetMode } = useBudget();
    
    const location = useLocation();

    //Versione booleano
    /* const myBudgetMode = ()=>{
        setBudgetMode(bm=>!bm)
    }  */

    //Versione input
    const myPrice = (e)=>{
        let value = e.target.value;
        if (value <= 0){value=""};
        setMaxPrice(value);
    }

    return (
        <div className="barra">
            <nav>
                <NavLink className="button" to="/">Home</NavLink>
                <NavLink className="button" to="/chi-siamo">Chi Siamo</NavLink>
                <NavLink className="button" to="/prodotti">Prodotti</NavLink>
            </nav>

           
            {
                location.pathname === "/prodotti" && (
                <div className="setbudget">
                    {/* versione input */}
                    <span>Prezzo massimo: €</span>
                    <input name="maxPrice" type="number" step="10" value={String(maxPrice)} onChange={myPrice} />
                    
                    {/* versione booleano */}
                    {/* <button className="button" name="Modalità Budget" onClick={myBudgetMode}>
                    {budgetMode ? "Disattiva" : "Attiva"} Modalità Budget 
                    </button>*/}

                </div>
                )
            }
           
    </div>
    );
}
