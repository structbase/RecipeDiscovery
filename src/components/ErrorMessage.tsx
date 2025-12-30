import type { ErrorMessageProps } from "../types/errorMessage";

// Error message display component
export default function ErrorMessage({ message }: ErrorMessageProps) {
    return (
        <div className="alert alert-danger" role="alert">
            <strong>Error:</strong> {message}
        </div>
    );
}
