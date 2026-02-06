import { Link } from "react-router-dom";

function ErrorPage(){
    return(
        <div>
            <h1>404 - Not Found</h1>
            <Link className="button" to="/">Torna alla homepage</Link>
        </div>
    );
}

export default ErrorPage
