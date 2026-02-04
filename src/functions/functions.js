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
        const index = categoryProducts.findIndex(p => p.id === Number(id));
        if (index === -1) return navigate("/prodotti");
        if(category)
            {if (index < categoryProducts.length - 1) {
                const nextId = categoryProducts[index + 1].id;
                navigate(`/prodotti/${category}/${nextId}`);
            }else{navigate("/prodotti")}
        }else{navigate(`/prodotti/${Number(id) + 1}`);}
}

//naviga al prodotto precedente
export const prevProduct = (id,category,categoryProducts,navigate) => {
    const index = categoryProducts.findIndex(p => p.id === Number(id));
      if (index === -1) return navigate("/prodotti");
        if(category)
            {if (index > 0) {
                const prevId = categoryProducts[index - 1].id;
                navigate(`/prodotti/${category}/${prevId}`);
            }else{navigate("/prodotti")}
        }else{
            navigate(`/prodotti/${Number(id) - 1}`);
        }
}

//sintassi prezzo corretta
export const converti= (value)=>{
    const result = value.toFixed(2).replace(".", ",");
    return result;
}