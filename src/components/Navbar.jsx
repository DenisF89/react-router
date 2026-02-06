import { NavLink,useLocation  } from "react-router-dom";
import { useBudget } from '../contexts/BudgetContext';


//La Navbar gestisce i link del menu principale con NavLink di React Router
//se uno dei link corrisponde alla pagina corrente, gli viene dato classe active

export default function Navbar(){

    const [budgetMode, setBudgetMode] = useBudget();
    
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
                    <button className="button" name="Modalità Budget" onClick={myBudgetMode}>
                    {budgetMode ? "Disattiva" : "Attiva"} Modalità Budget
                    </button>
                    )
            }
           
    </div>
    );
}
