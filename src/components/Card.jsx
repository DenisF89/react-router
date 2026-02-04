import { Link } from "react-router-dom";
import { converti } from "../functions/functions.js";


//Componente Card - preview degli articoli in pagina Prodotti
//gli elementi sono wrappati in un Link che manda alla pagina SingleProduct
//con parametro id e se filtrato anche la categoria

export default function Card({category,product}){
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
                </div>
    )
}