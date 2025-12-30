import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App.tsx";
import { FavoritesProvider } from "./context/FavoritesContext.tsx";

// Initialize React app with routing and context providers
createRoot(document.getElementById("root")!).render(
    <StrictMode>
        {/* Router enables client-side navigation */}
        <BrowserRouter>
            {/* Favorites context available to all components */}
            <FavoritesProvider>
                <App />
            </FavoritesProvider>
        </BrowserRouter>
    </StrictMode>
);
