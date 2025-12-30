import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import type { MealDetail } from "../types/meal";
import type { MealsResponse } from "../types/api";
import { useFavorites } from "../context/FavoritesContext";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";

// Recipe detail page with ingredients and instructions
export default function RecipeDetail() {
    const { recipeId } = useParams<{ recipeId: string }>();
    const { isFavorite, addFavorite, removeFavorite } = useFavorites();

    const { data, loading, error } = useFetch<MealsResponse<MealDetail>>(
        recipeId
            ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`
            : ""
    );

    if (!recipeId) {
        return (
            <div className="container my-5">
                <div className="alert alert-danger" role="alert">
                    Invalid recipe.
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="container my-5">
                <div className="row">
                    <div className="col">
                        <div className="text-center">
                            <Spinner />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container my-5">
                <div className="row">
                    <div className="col">
                        <ErrorMessage message="Error loading meals." />
                    </div>
                </div>
            </div>
        );
    }

    if (!data || !data.meals || data.meals.length === 0) {
        return (
            <div className="container my-5">
                <div className="alert alert-warning" role="alert">
                    Recipe not found.
                </div>
            </div>
        );
    }

    const meal = data.meals[0];

    // Extract ingredients and measures from meal data
    const ingredients: string[] = [];

    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];

        if (ingredient && ingredient.trim()) {
            ingredients.push(`${measure ? measure : ""} ${ingredient}`.trim());
        }
    }

    // Toggle favorite status
    const handleClick = () => {
        if (isFavorite(meal.idMeal)) {
            removeFavorite(meal.idMeal);
        } else {
            addFavorite(meal.idMeal);
        }
    };

    const isFav = isFavorite(meal.idMeal);

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-lg-8 mx-auto">
                    <div className="card shadow">
                        {/* Recipe image */}
                        <img
                            src={meal.strMealThumb}
                            alt={`${meal.strMeal} dish`}
                            className="card-img-top"
                            style={{ maxHeight: "500px", objectFit: "cover" }}
                        />
                        <div className="card-body">
                            {/* Recipe title */}
                            <h1 className="card-title display-4 fw-bold mb-4">
                                {meal.strMeal}
                            </h1>

                            {/* Category and area badges */}
                            <div className="mb-4">
                                <span className="badge bg-primary me-2">
                                    {meal.strCategory}
                                </span>
                                <span className="badge bg-secondary">
                                    {meal.strArea}
                                </span>
                            </div>

                            {/* Favorite toggle button */}
                            <div className="mb-4">
                                <button
                                    className={`btn btn-lg ${
                                        isFav
                                            ? "btn-danger"
                                            : "btn-outline-primary"
                                    }`}
                                    onClick={handleClick}
                                >
                                    {isFav ? (
                                        <>Remove from Favorites</>
                                    ) : (
                                        <> Add to Favorites</>
                                    )}
                                </button>
                            </div>

                            {/* Ingredients list */}
                            <div className="mb-4">
                                <h2 className="h3 fw-bold mb-3">Ingredients</h2>
                                <ul className="list-group">
                                    {ingredients.map((item, index) => (
                                        <li
                                            key={index}
                                            className="list-group-item"
                                        >
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Cooking instructions */}
                            <div>
                                <h2 className="h3 fw-bold mb-3">
                                    Instructions
                                </h2>
                                <div className="card bg-light">
                                    <div className="card-body">
                                        <p
                                            className="card-text"
                                            style={{
                                                whiteSpace: "pre-line",
                                            }}
                                        >
                                            {meal.strInstructions}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
