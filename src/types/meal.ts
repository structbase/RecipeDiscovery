export interface MealSummary {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
}

export interface MealDetail {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strCategory: string;
    strArea: string;
    strInstructions: string;

    // MealDB ingredients & measures (1–20)
    [key: `strIngredient${number}`]: string | null;
    [key: `strMeasure${number}`]: string | null;
}
