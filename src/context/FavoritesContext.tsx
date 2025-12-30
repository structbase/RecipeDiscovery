import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import type {
    FavoritesContextType,
    FavoritesProviderProps,
} from "../types/favorites";

// Context for managing favorite recipes globally
const FavoritesContext = createContext<FavoritesContextType | undefined>(
    undefined
);

// Provider component for favorites context
export function FavoritesProvider({ children }: FavoritesProviderProps) {
    const [favorites, setFavorites] = useLocalStorage<string[]>(
        "favorites",
        []
    );

    // Add recipe to favorites if not already present
    const addFavorite = (id: string) => {
        if (!favorites.includes(id)) setFavorites([...favorites, id]);
    };

    // Remove recipe from favorites
    const removeFavorite = (id: string) => {
        setFavorites(favorites.filter((fav) => fav !== id));
    };

    // Check if recipe is in favorites
    const isFavorite = (id: string) => favorites.includes(id);

    return (
        <FavoritesContext.Provider
            value={{ favorites, addFavorite, removeFavorite, isFavorite }}
        >
            {children}
        </FavoritesContext.Provider>
    );
}

// Hook to access favorites context
// eslint-disable-next-line react-refresh/only-export-components
export function useFavorites() {
    const context = useContext(FavoritesContext);
    if (!context)
        throw new Error("useFavorites must be used within a FavoritesProvider");
    return context;
}
