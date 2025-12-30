import type { ReactNode } from "react";

export interface FavoritesContextType {
    favorites: string[];
    addFavorite: (id: string) => void; 
    removeFavorite: (id: string) => void;
    isFavorite: (id: string) => boolean; 
}

export interface FavoritesProviderProps {
    children: ReactNode;
}
