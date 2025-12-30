import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => setIsOpen(!isOpen);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
            <div className="container">
                <Link className="navbar-brand fw-bold" to="/">
                    Recipe Discovery
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={toggleNavbar}
                    aria-controls="navbarNav"
                    aria-expanded={isOpen}
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className={`collapse navbar-collapse ${
                        isOpen ? "show" : ""
                    }`}
                    id="navbarNav"
                >
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${
                                    location.pathname === "/" ? "active" : ""
                                }`}
                                to="/"
                                onClick={() => setIsOpen(false)}
                            >
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${
                                    location.pathname === "/search"
                                        ? "active"
                                        : ""
                                }`}
                                to="/search"
                                onClick={() => setIsOpen(false)}
                            >
                                Search
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${
                                    location.pathname === "/favorites"
                                        ? "active"
                                        : ""
                                }`}
                                to="/favorites"
                                onClick={() => setIsOpen(false)}
                            >
                                Favorites
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
