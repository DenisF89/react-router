import {useState} from "react";
import {useShop} from "../contexts/ShopContext";

function Carrello(){

    const { products, cart, setCart } = useShop();

    const changeNum = (e,id)=>{
        setCart(cart => ({...cart, [id]: Number(e.target.value)}))
    }

    const [isVisible,setIsVisible] = useState(false);
    const [toDelete,setToDelete] = useState({id:0, tit:"", qta:0});

    const openModal = (i,num,title)=>{
        setIsVisible(true);
        setToDelete(()=>({id:Number(i), tit:title, qta:Number(num)}));
    }
    const hideModal = ()=>{
        setIsVisible(false);
        setToDelete(()=>({id:0, tit:"", qta:0}));
    }

    const deleteItem = (id) =>{
         /* setCart(cart => {
                const newCart = { ...cart };
                delete newCart[id];
                return newCart;
        }); */
         setCart(({ [id]: _, ...cart }) => cart);
         hideModal();
    }

    

    const isEmpty = (Object.keys(cart).length === 0);
    

    const total = Object.entries(cart).reduce((acc, [id, quantity]) => {
            const product = products.find(p => p.id === Number(id));
            if (!product) return acc;
            return acc + Number(product.price) * Number(quantity);
            }, 0);


    return(
            
            <div className="cart-container">
                <h1>Carrello</h1>
            {isEmpty    ?<p>Il carrello è vuoto</p>
                        :
            <div className="cart-total">
                
                <table>
                    <thead>
                        <tr>
                            <th colSpan="3">Articolo</th>
                            <th>Prezzo</th>
                            <th>Quantità</th>
                            <th>Totale riga</th>
                        </tr>
                    </thead>
                    <tbody>{Object.entries(cart).map(([id, num]) => {
                        const product = products.find(p => p.id === Number(id));
                        return(
                        <tr key={id}>
                        <td><button className="cart-delete" onClick={(e)=>openModal(id,num,product.title)}>X</button></td>
                        <td><div className="cart-image">
                                <img src={product.image} alt={product.title}  />
                            </div>
                        </td>
                        <td>{product.title}</td>
                        <td>{Number(product.price).toFixed(2)} €</td>
                        <td><input className="count" name="count" type="number" min="1" max="99" value={num} onChange={(e)=>changeNum(e,id)} /></td>
                        <td>{(Number(product.price)*Number(num)).toFixed(2)} €</td>
                        </tr>
                     )})
                    }</tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="4"></td>
                            <td>Totale</td>
                            <td>{total.toFixed(2)} €</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            }
                            
    {/* MODALE CONFERMA ELIMINAZIONE */}
                
            {
                isVisible && toDelete.id &&

                <div className="overlay">

                    <div className="modal">

                        <h3 className="m-title">Conferma eliminazione</h3>

                        <p className="m-text">Stai per eliminare {toDelete.qta} {toDelete.tit} dal carrello.</p>

                        <p className="m-text">Sei sicuro di voler continuare?</p>

                        <div className="m-buttons">
                            <button className="m-btn m-cancel" onClick={hideModal}>Annulla</button>
                            <button className="m-btn m-delete" onClick={(e)=>deleteItem(toDelete.id)}>Elimina</button>
                        </div>
                    </div>
                </div>
            }

        </div>
            
    )
}

export default Carrello;