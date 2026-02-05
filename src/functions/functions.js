//chiamata axios
import axios from "axios";
export const getData = (apiUrl, setState, setError) => {
        axios.get(apiUrl)
        .then((res)=>{
            setState(res.data);
        }).catch((err)=>{
            setError("Errore nel caricamento");
        })
}

//filtra categorie da SELECT
export const filtra = (value, setCategory) => {
    setCategory(value === "Tutti i prodotti" ? "" : value);
}

//naviga al prodotto successivo
export const nextProduct = (id,category,categoryProducts,index,navigate) => {
        let nextId = Number(id) + 1;
        if(category){                                                               //se esiste il parametro category
            if (index < categoryProducts.length - 1)                                //se non è l'ultimo indice dell'array              
                {nextId = categoryProducts[index + 1].id;}                          //ricavo il prossimo id prodotto dal prossimo indice dell'array                
            else{return (navigate("/prodotti"));}                                             //se è l'ultimo indice invece torna ai prodotti
        }
        navigate(`/prodotti/${category?category+"/":""}/${nextId}`);                //navigazione programmatica al prossimo prodotto
}

//naviga al prodotto precedente
export const prevProduct = (id,category,categoryProducts,index,navigate) => {
        let prevId = Number(id) - 1;
        if(category){
            if (index > 0)                                                          //se non è il primo indice dell'array
                {prevId = categoryProducts[index - 1].id;}                          //ricavo l'id del prodotto con l'indice precedente
            else{return (navigate("/prodotti"));}                                             //se è il primo indice dell'array torna ai prodotti
        }  
        navigate(`/prodotti/${category?category+"/":""}/${prevId}`);                //navigazione programmatica al prodotto precedente
}

//sintassi prezzo corretta
export const converti= (value)=>{
    const result = value.toFixed(2).replace(".", ",");
    return result;
}