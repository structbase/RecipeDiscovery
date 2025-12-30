import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import type { MealDetail } from "../types/meal";
import type { MealsResponse } from "../types/api";
import { useFavorites } from "../context/FavoritesContext";

export default function RecipeDetail() {
    const { recipeId } = useParams<{ recipeId: string }>();
    const { isFavorite, addFavorite, removeFavorite } = useFavorites();

    if (!recipeId) {
        return <p>Invalid recipe.</p>;
    }

    const { data, loading, error } = useFetch<MealsResponse<MealDetail>>(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`
    );

    if (loading) return <p>Loading recipe...</p>;
    if (error) return <p>Error loading recipe.</p>;
    if (!data || !data.meals || data.meals.length === 0) {
        return <p>Recipe not found.</p>;
    }

    const meal = data.meals[0];

    // Build ingredients list
    const ingredients: string[] = [];

    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];

        if (ingredient && ingredient.trim()) {
            ingredients.push(`${measure ? measure : ""} ${ingredient}`.trim());
        }
    }

    const handleClick = () => {
        if (isFavorite(meal.idMeal)) {
            removeFavorite(meal.idMeal);
        } else {
            addFavorite(meal.idMeal);
        }
    };

    return (
        <div>
            <h1>{meal.strMeal}</h1>
            <img src={meal.strMealThumb} alt={`${meal.strMeal} dish`} />
            <p>
                <strong>Category:</strong> {meal.strCategory}
            </p>
            <p>
                <strong>Area:</strong> {meal.strArea}
            </p>
            <h2>Ingredients</h2>
            <ul>
                {ingredients.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            <h2>Instructions</h2>
            <p>{meal.strInstructions}</p>
            
            <button onClick={handleClick}>
                {isFavorite(meal.idMeal)
                    ? "Remove from Favorites"
                    : "Add to Favorites"}
            </button>{" "}
        </div>
    );
}
