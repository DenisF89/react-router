import { createContext, useContext, useState } from "react";

const BudgetContext = createContext();

// Definiamo un custom Provider
function BudgetProvider({ children }) {

    // Aggiungiamo le varibili di stato che vogliamo condividere
    const [budgetMode, setBudgetMode] = useState(false);

    return (
        <BudgetContext.Provider 
            value={[budgetMode, setBudgetMode]}
        >
        {children}
        </BudgetContext.Provider>
    );
}

//custom Hook
function useBudget() {
    const context = useContext(BudgetContext);
    return context;
}

// Esportiamo il nostro provider ed il nostro hook
export {BudgetProvider, useBudget}