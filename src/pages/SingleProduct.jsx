//hooks
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
//funzioni
import { getData, nextProduct, prevProduct, converti } from "../functions/functions.js";
//componenti
import Stars from "../components/Stars";
import Description from "../components/Description.jsx";

export default function SingleProduct(){
    
    //variabili di stato
    const [product, setProduct] = useState({});
    const [categoryProducts, setCategoryProducts] = useState([]);
    const [open,setOpen] = useState(false);
    const [error, setError] = useState('');
    
    //variabili di navigazione
    const {id, category} = useParams();
    const navigate = useNavigate();

    //indirizzi per recupero dati
    const idUrl = `https://fakestoreapi.com/products/${id}`;
    const catUrl = `https://fakestoreapi.com/products/category/${category}`;

    //chiama le api al caricamento useParams
    useEffect(()=>{
        if(isNaN(id) || id<=0 || id>20)
        return navigate("/prodotti");
        getData(idUrl,setProduct,setError);
        setOpen(false);
        },[id])

    useEffect(()=>{
        if(!category) return;
        getData(catUrl,setCategoryProducts,setError);
        },[category])

    
    return (
            <>
                {category && (<h2>Filtro: {category.toUpperCase()}</h2>)}
                <p>Stai visualizzando il prodotto con ID: {id}</p>

                <div className="single-container">

                    {error!="" ? <> <p className="error">{error}</p>
                                    <button onClick={()=>navigate(-1)}>Torna ai prodotti</button>
                            </>:(<>

                    {/* NAV PRECEDENTE */}
                    <button className="button" onClick={()=>prevProduct(id,category,categoryProducts,navigate)}>⬅</button>

                    {/* SCHEDA PRODOTTO */}
                    <div className="product">
                        
                        <div className="single-image">
                            <img src={product.image} alt={product.title}  />
                        </div>
                        
                        <div className="single-info">

                            <h2>{product.title}</h2>

                            {product.price &&
                            <p>Prezzo: {converti(product.price)} €</p> }
                            
                            <Description text={product.description} open={open} setOpen={setOpen} />
                            
                            <p>rating: <Stars value={product.rating?.rate} /></p>
                            
                            <p>{product.rating?.count} recensioni</p>

                        </div> 

                    </div> 

                    {/* NAV SUCCESSIVO */}
                    <button className="button" onClick={()=>nextProduct(id,category,categoryProducts,navigate)}>➡</button>
                    
                    </>)}
                    
                </div>
            </>
    );

}