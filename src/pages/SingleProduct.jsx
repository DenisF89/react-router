import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function SingleProduct(){
    const {id, category} = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const [categoryProducts, setCategoryProducts] = useState([]);

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
  

    
    return (
            <>
                <h1>Dettagli Prodotto</h1>
                <p>Stai visualizzando il prodotto con ID: {id}</p>

                <div className="single-container">
                    <button className="button" onClick={prevProduct}>⬅</button>
                    
                    <div className="product">
                        <div className="single-image">
                            <img src={product.image} alt={product.title}  />
                        </div>
                        <div className="single-info">
                            <h2>{product.title}</h2>
                            <p>Prezzo: {product.price} €</p>
                            <p>{product.description}</p>
                            <p>category: {product.category}</p>
                            <p>rating: {product.rating?.rate}, {product.rating?.count} recensioni</p>
                        </div>
                    </div>

                    <button className="button" onClick={nextProduct}>➡</button>
                </div>
            </>
    );

}