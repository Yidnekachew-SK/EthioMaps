import { Link } from "react-router";

function Nav() {
    return(
        <nav>
            <h2 className="title">EthioMaps</h2>
            <div className="navigationLinks">
                <Link to="/" className="links">Login</Link>
                <Link to="/signup" className="links">SignUp</Link>
            </div>
        </nav>
    );
}

export default Nav;