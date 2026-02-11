import {useShop} from "../contexts/ShopContext";

function Carrello(){

    const { products, cart, setCart } = useShop();

    const changeNum = (e,id)=>{
        setCart(cart => ({...cart, [id]: Number(e.target.value)}))
    }

    const deleteItem = (id) =>{
         /* setCart(cart => {
                const newCart = { ...cart };
                delete newCart[id];
                return newCart;
        }); */
         setCart(({ [id]: _, ...cart }) => cart);
    }

    const isEmpty = (Object.keys(cart).length === 0);

    const total = Object.entries(cart).reduce((acc, [id, quantity]) => {
            const product = products.find(p => p.id === Number(id));
            if (!product) return acc;
            return acc + Number(product.price) * Number(quantity);
            }, 0);

    return(
        <div>
            <h1>Carrello</h1>
            <div className="flex">
            <div className="cart-container">
            {isEmpty    ?<p>Il carrello è vuoto</p>
                        :Object.entries(cart).map(([id, num]) => {
            const product = products.find(p => p.id === Number(id));
            if (!product) return null;
            return(
                <div key={id} className="cart-product">
                    <div className="cart-image">
                        <img src={product.image} alt={product.title}  />
                    </div>     
                    <div className="cart-info">
                        <h2>{product.title}</h2>
                        {product.price &&
                        <p>Prezzo: {Number(product.price).toFixed(2)} €</p> }
                        <input className="count" name="count" type="number" min="1" max="99" value={num} onChange={(e)=>changeNum(e,id)} />
                        <br /><br />
                        <p>Totale: {(Number(product.price)*Number(num)).toFixed(2)} €</p>
                    </div> 
                    <button className="cart-delete" onClick={(e)=>deleteItem(id)} >X</button>
                </div>
                
            )  
            })}   
            </div>   
            <div className="cart-total">
                <h2>Totale</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Art.</th>
                            <th>Quantità</th>
                            <th>Prezzo</th>
                            <th>Totale riga</th>
                        </tr>
                    </thead>
                    <tbody>{Object.entries(cart).map(([id, num]) => {
                        const product = products.find(p => p.id === Number(id));
                        return(
                        <tr key={id}>
                        <td>{id}</td>
                        <td>{num}</td>
                        <td>{Number(product.price).toFixed(2)} €</td>
                        <td>{(Number(product.price)*Number(num)).toFixed(2)} €</td>
                        </tr>
                     )})
                    }</tbody>
                    <tfoot>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>{total.toFixed(2)} €</td>
                        </tr>
                    </tfoot>
                </table>
               
            </div>
            </div>
        </div>
    )
}

export default Carrello;