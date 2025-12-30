import type { ReactNode } from "react";

// Favorites context type definition
export interface FavoritesContextType {
    favorites: string[];
    addFavorite: (id: string) => void; 
    removeFavorite: (id: string) => void;
    isFavorite: (id: string) => boolean; 
}

// Props for FavoritesProvider component
export interface FavoritesProviderProps {
    children: ReactNode;
}
