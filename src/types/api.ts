import type { Category } from "./category";

// API response type for categories endpoint
export interface CategoriesResponse {
    categories: Category[];
}

// Generic API response type for meals endpoints
export interface MealsResponse<T> {
    meals: T[] | null;
}
