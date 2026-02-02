import { Link, NavLink } from "react-router-dom";
export default function Navbar() {
 return (
    <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/chi-siamo">Chi Siamo</NavLink>
        <NavLink to="/prodotti">Prodotti</NavLink>
    </nav>
 );
}
