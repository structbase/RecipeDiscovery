import { Link } from "react-router-dom";
/**
 *
 * @returns handling error 404 message
 */
export default function NotFound() {
    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-md-8 mx-auto text-center">
                    <div className="card shadow">
                        <div className="card-body py-5">
                            <h1 className="display-1 fw-bold text-primary">
                                404
                            </h1>
                            <h2 className="h3 mb-4">Page Not Found</h2>
                            <p className="lead text-muted mb-4">
                                Oops! The page you are looking for does not
                                exist.
                            </p>
                            <Link to="/" className="btn btn-primary btn-lg">
                                Go back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
