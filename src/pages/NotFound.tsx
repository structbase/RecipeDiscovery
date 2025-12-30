import { Link } from "react-router-dom";
/**
 *
 * @returns handling error 404 message
 */
export default function NotFound() {
    return (
        <div style={{ textAlign: "center", padding: "2rem" }}>
            <h1>404 - Page Not Found</h1>
            <p>Oops! The page you are looking for does not exist.</p>
            <Link to="/">Go back to Home</Link>
        </div>
    );
}
