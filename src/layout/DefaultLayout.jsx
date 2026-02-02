import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";


function DefaultLayout() {
    
    return (
        <div className="boxed">
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}

export default DefaultLayout;