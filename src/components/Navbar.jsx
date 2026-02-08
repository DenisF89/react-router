import { NavLink,useLocation  } from "react-router-dom";
import { useBudget } from '../contexts/BudgetContext';


//La Navbar gestisce i link del menu principale con NavLink di React Router
//se uno dei link corrisponde alla pagina corrente, gli viene dato classe active

export default function Navbar(){

    const {budgetMode, setBudgetMode, maxPrice, setMaxPrice} = useBudget();
    
    const location = useLocation();

    const myBudgetMode = ()=>{
        setBudgetMode(bm=>!bm)
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
                    <span>Prezzo massimo: €</span>
                    <input name="maxPrice" type="number" step="0.1" value={maxPrice} onChange={(e)=>setMaxPrice(e.target.value)} />
                    <button className="button" name="Modalità Budget" onClick={myBudgetMode}>
                    {budgetMode ? "Disattiva" : "Attiva"} Modalità Budget
                    </button>
                </div>
                )
            }
           
    </div>
    );
}
