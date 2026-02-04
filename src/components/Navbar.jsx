import { NavLink } from "react-router-dom";

//La Navbar gestisce i link del menu principale con NavLink di React Router
//se uno dei link corrisponde alla pagina correntem, gli viene dato classe active

export default function Navbar() {
 return (
    <nav>
        <NavLink className="button" to="/">Home</NavLink>
        <NavLink className="button" to="/chi-siamo">Chi Siamo</NavLink>
        <NavLink className="button" to="/prodotti">Prodotti</NavLink>
    </nav>
 );
}
