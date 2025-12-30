// Basic meal information for lists and cards
export interface MealSummary {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
}

// Complete meal details with ingredients and instructions
export interface MealDetail {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strCategory: string;
    strArea: string;
    strInstructions: string;

    // Dynamic properties for ingredients and measures (1–20).
    // `number` is used to create keys like `strIngredient1`, `strMeasure1`, etc.
    // Each property can either be a string (ingredient/measure) or null if not present.

    [key: `strIngredient${number}`]: string | null; // Ingredient at position `number`.
    [key: `strMeasure${number}`]: string | null; // Measure for ingredient at position `number`.
}

// Props for MealCard component
export interface MealCardProps {
    meal: MealSummary;
    link?: string;
}
