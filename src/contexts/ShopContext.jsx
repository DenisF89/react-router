import { createContext, useContext, useState } from "react";

const ShopContext = createContext();

// Definiamo un custom Provider
function ShopProvider({ children }) {

    // Aggiungiamo le varibili di stato che vogliamo condividere

    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([])

    return (
        <ShopContext.Provider 
            value={{ products, setProducts, cart, setCart}}
        >
        {children}
        </ShopContext.Provider>
    );
}

//custom Hook
function useShop() {
    const context = useContext(ShopContext);
    return context;
}

// Esportiamo il nostro provider ed il nostro hook
export {ShopProvider, useShop}