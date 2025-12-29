import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav>
            <Link to={"/"}>Home</Link>
            <Link to={"/favorites"}>Favorites</Link>
            <Link to={"/category"}>category</Link>
            <Link to={"/search"}>search</Link>
        </nav>
    );
}
