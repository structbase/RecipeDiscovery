import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import type {
    FavoritesContextType,
    FavoritesProviderProps,
} from "../types/favorites";

const FavoritesContext = createContext<FavoritesContextType | undefined>(
    undefined
);

export function FavoritesProvider({ children }: FavoritesProviderProps) {
    const [favorites, setFavorites] = useLocalStorage<string[]>(
        "favorites",
        []
    );

    const addFavorite = (id: string) => {
        if (!favorites.includes(id)) setFavorites([...favorites, id]);
    };

    const removeFavorite = (id: string) => {
        setFavorites(favorites.filter((fav) => fav !== id));
    };

    const isFavorite = (id: string) => favorites.includes(id);

    return (
        <FavoritesContext.Provider
            value={{ favorites, addFavorite, removeFavorite, isFavorite }}
        >
            {children}
        </FavoritesContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useFavorites() {
    const context = useContext(FavoritesContext);
    if (!context)
        throw new Error("useFavorites must be used within a FavoritesProvider");
    return context;
}
