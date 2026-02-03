import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function SingleProduct(){
    const {id, category} = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const [categoryProducts, setCategoryProducts] = useState([]);
    const [open,setOpen] = useState(false);

    const index = categoryProducts.findIndex(p => p.id === Number(id));

    function getData(){
        if(isNaN(id) || id<=0 || id>20){
            navigate("/prodotti");
            return;
        }
        axios.get(`https://fakestoreapi.com/products/${id}`)
        .then((res)=>{
            setProduct(res.data);
        }).catch((err)=>{
            navigate("/prodotti");        
        })
    } 

    useEffect(()=>{
        getData();
        setOpen(false);
    },[id])

    useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/category/${category}`)
      .then(res => setCategoryProducts(res.data))
      .catch(() => navigate("/prodotti"));
  }, [category]);

    const nextProduct = () => {
        if(category)
            {if (index < categoryProducts.length - 1) {
                const nextId = categoryProducts[index + 1].id;
                navigate(`/prodotti/${category}/${nextId}`);
            }else{navigate("/prodotti")}
        }else{navigate(`/prodotti/${Number(id) + 1}`);}
    }

    const prevProduct = () => {
        if(category)
            {if (index > 0) {
                const prevId = categoryProducts[index - 1].id;
                navigate(`/prodotti/${category}/${prevId}`);
            }else{navigate("/prodotti")}
        }else{
            navigate(`/prodotti/${Number(id) - 1}`);
        }
    }

   const converti = (value)=>{
        const result = value.toFixed(2).replace(".", ",");
        return result;
    }

    const stars = (value) =>{
        const white = Math.round(value);
        const result = Array.from({ length:5},(_,i) => 
            <span className={"rating "+(i < white ?"yellow":"")} key={i}>{i < white ? "★" : "☆"}</span>
        )
        return result;
    }

    const taglia = (text)=>{
    if(!text)return;
    
    return (<>
            <p className={`description ${open ? "d-open" : "d-closed"}`}>
                {open ? text : text.slice(0, 160)}
                {!open && text.length > 160 && "..."}
            </p>
            {text.length>160 && 
                <button onClick={() => setOpen(!open)}>
                {open ? "Close" : "More"}
                </button>
            }
            </>
        ) 
    }
    
    return (
            <>
                {category && (<h2>Filtro: {category.toUpperCase()}</h2>)}
                <p>Stai visualizzando il prodotto con ID: {id}</p>

                <div className="single-container">
                    <button className="button" onClick={prevProduct}>⬅</button>
                    
                    <div className="product">
                        <div className="single-image">
                            <img src={product.image} alt={product.title}  />
                        </div>
                        <div className="single-info">
                            <h2>{product.title}</h2>
                            {product.price &&
                            <p>Prezzo: {converti(product.price)} €</p> }
                            {taglia(product.description)}
                            <p>rating: {stars(product.rating?.rate)}</p> 
                            <p>{product.rating?.count} recensioni</p>
                        </div>
                    </div>

                    <button className="button" onClick={nextProduct}>➡</button>
                </div>
            </>
    );

}