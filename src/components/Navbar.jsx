import { NavLink } from "react-router-dom";
export default function Navbar() {
 return (
    <nav>
        <NavLink className="button" to="/">Home</NavLink>
        <NavLink className="button" to="/chi-siamo">Chi Siamo</NavLink>
        <NavLink className="button" to="/prodotti">Prodotti</NavLink>
    </nav>
 );
}
