import { Link } from "react-router-dom";
import { converti } from "../functions/functions.js";
import { useShop } from "../contexts/ShopContext.jsx"

//Componente Card - preview degli articoli in pagina Prodotti
//gli elementi sono wrappati in un Link che manda alla pagina SingleProduct
//con parametro id e se filtrato anche la categoria

export default function Card({category,product}){

    const { setCart } = useShop();

    const addtoCart = (e)=>{
    e.preventDefault();
    const data = new FormData(e.target);
    const id = Number(data.get("id"));
    const count = Number(data.get("count"));
    setCart(cart => ({...cart, [id]:(cart[id]??0)+count}));
    //setCart(cart => ({...cart, [item]:count}));
    alert(count+(count==1?" articolo aggiunto":" articoli aggiunti")+" al carrello")
    e.target.reset();
}

    return(
                <div className="card">
                    <Link to={`/prodotti/${category ? category+"/" : ""}${product.id}`}>
                        <div className="title">
                            <h2>{product.title}</h2>
                        </div>
                        <div className="image">
                            <img src={product.image} alt={product.title} />
                        </div>
                        <p className="price">{converti(product.price)} €</p>
                    </Link>
                    <form className="addtocart" onSubmit={addtoCart}>
                        <input type="hidden" name="id" value={product.id} />
                        
                        <button type="submit">Aggiungi al carrello</button>
                        <input name="count" type="number" min="1" max="9" defaultValue="1" />
                    </form>
                </div>
    )
}