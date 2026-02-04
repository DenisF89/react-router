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
export const nextProduct = (id,category,categoryProducts,navigate) => {
        if(category)                                                                //se esiste il parametro category
            {const index = categoryProducts.findIndex(p => p.id === Number(id));    //trovo l'indice dell'oggetto che ha la proprietà id uguale all'id pagina
            if (index === -1)                                                       //controllo che esista un id corrispondente (se non esiste l'indice è -1)
                return navigate("/prodotti");                                       //torna ai prodotti

            if (index < categoryProducts.length - 1)                                //se non è l'ultimo indice dell'array              
                {const nextId = categoryProducts[index + 1].id;                     //ricavo il prossimo id prodotto dal prossimo indice dell'array
                 navigate(`/prodotti/${category}/${nextId}`);                       //navigazione programmatica al prossimo prodotto
                }
            else{
                 navigate("/prodotti")                                              //se è l'ultimo indice invece torna ai prodotti
                }
            }
        else{   
             navigate(`/prodotti/${Number(id) + 1}`);                               //se non esiste category vai al prossimo id (id+1)
            }
}

//naviga al prodotto precedente
export const prevProduct = (id,category,categoryProducts,navigate) => {
        if(category)                                                                //se esiste il parametro category
            {const index = categoryProducts.findIndex(p => p.id === Number(id));    //trovo l'indice dell'oggetto che ha la proprietà id uguale all'id pagina
            if (index === -1)                                                       //controllo che esista un id corrispondente (se non esiste l'indice è -1)
                return navigate("/prodotti");                                       //torna ai prodotti
        
            if (index > 0)                                                          //se non è il primo indice dell'array
                {const prevId = categoryProducts[index - 1].id;                     //ricavo l'id del prodotto con l'indice precedente
                 navigate(`/prodotti/${category}/${prevId}`);                       //navigazione programmatica al prodotto precedente
                }
            else{
                 navigate("/prodotti")                                              //se è il primo indice dell'array torna ai prodotti
                }
            }
        else{
             navigate(`/prodotti/${Number(id) - 1}`);                               //se non esiste category vai all'id precedente (id-1)
            }
}

//sintassi prezzo corretta
export const converti= (value)=>{
    const result = value.toFixed(2).replace(".", ",");
    return result;
}