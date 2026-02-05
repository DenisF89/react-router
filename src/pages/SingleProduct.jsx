//hooks
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
//funzioni
import { getData, nextProduct, prevProduct, converti } from "../functions/functions.js";
//componenti
import Stars from "../components/Stars";
import Description from "../components/Description.jsx";

export default function SingleProduct(){
    
   //variabili di navigazione
    const {id, category} = useParams();                             //salvo le variabili che mi passa l'indirizzo (parametri)
    const navigate = useNavigate();

    //variabili di stato
    const [product, setProduct] = useState({});                     //state da popolare con proprietà del prodotto con id uguale al parametro "id"
    const [categoryProducts, setCategoryProducts] = useState([]);   //state da popolare con array di prodotti filtrati per il parametro "categoria"
    const [open,setOpen] = useState(false);                         //state per visualizzare/nascondere descrizione lunga
    const [error, setError] = useState('');                         //state per restituire una stringa in caso di errore di comunicazione api
    const [arrow, setArrow] = useState({prev:true,next:true});      //state per visualizzare/nascondere frecce
    const [currentIndex, setCurrentIndex] = useState(-1);           //indice attuale dell'id in categoryProducts

    //indirizzi per recupero dati
    const idUrl = `https://fakestoreapi.com/products/${id}`;
    const catUrl = `https://fakestoreapi.com/products/category/${category}`;

    //chiama le api al caricamento useParams
    useEffect(()=>{
        if(isNaN(id) || id<=0 || id>20)                 //se l'id non è valido
        return navigate("/prodotti");                   //torna alla pagina prodotti
        getData(idUrl,setProduct,setError);             //passo url, lo state da popolare ed eventuale errore
        setOpen(false);                                 //chiuso evt. descrizione
        },[id])

    useEffect(()=>{
        if(!category) return;
        getData(catUrl,setCategoryProducts,setError);   //se esiste parametro categoria riempi array con tutti i prodotti della categoria
        },[category])
    
    //gestione visualizza arrow
    useEffect(()=>{
         if(categoryProducts.length)                                            //se l'array è popolato
            {const index = categoryProducts.findIndex(p=>p.id === Number(id));  //trovo l'indice dell'oggetto che ha la proprietà id uguale all'id pagina
            setCurrentIndex(index);                                                       
            if (index === -1)                                                   //controllo che esista un id corrispondente (se non esiste l'indice è -1)
                {navigate("/prodotti");}                                        //torna ai prodotti
            if (categoryProducts.length === 1)                                  //se esiste solo un elemento nell'array
                {setArrow({prev:false,next:false})}                             //nascondi entrambe le frecce
            else if (index === 0)                                               //se è il primo elemento dell'array
                {setArrow({prev:false,next:true})}                              //nascondi prev
            else if (index === categoryProducts.length-1)                       //se è l'ultimo elemento dell'array
                {setArrow({prev:true,next:false})}                              //nascondi next
            else {setArrow({prev:true,next:true})}                              //altrimenti visualizza entrambe le frecce
            }
        else{   if(Number(id) === 1){setArrow({prev:false,next:true})}          //se l'id è 1 nascondi prev
                else if (Number(id) === 20){setArrow({prev:true,next:false})}   //se l'id è 20 nascondi next
                else {setArrow({prev:true,next:true})}                          //se no visualizza entrambi
            }},[categoryProducts,id]);
    
    return (
            <>
                {category && (<h2>Filtro: {category.toUpperCase()}</h2>)}
                <p>Stai visualizzando il prodotto con ID: {id}</p>

                <div className="single-container">

                    {error!="" ? <> <p className="error">{error}</p>
                                    <button onClick={()=>navigate(-1)}>Torna ai prodotti</button>
                            </>:(<>

                    {/* NAV PRECEDENTE */}
                    {//arrow.prev &&
                    <button className="button" onClick={()=>prevProduct(id, category, categoryProducts, currentIndex, navigate)}>⬅</button>
                    }
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
                    {//arrow.next &&
                    <button className="button" onClick={()=>nextProduct(id, category, categoryProducts, currentIndex, navigate)}>➡</button>
                    }
                    </>)}
                    
                </div>
            </>
    );

}