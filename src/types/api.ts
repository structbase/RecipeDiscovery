import type { Category } from "./category";

export interface CategoriesResponse {
    categories: Category[];
}

export interface MealsResponse<T> {
    meals: T[] | null;
}
