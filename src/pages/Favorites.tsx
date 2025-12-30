import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import useFetch from "../hooks/useFetch";
import type { MealDetail } from "../types/meal";
import type { MealsResponse } from "../types/api";

export default function Favorites() {
    const { favorites } = useFavorites();

    // If no favorites, show message
    if (favorites.length === 0) {
        return <p>You have no favorite recipes. Go add some!</p>;
    }

    // Fetch all favorite meals using Promise.all pattern
    const { data, loading, error } = useFetch<MealsResponse<MealDetail>>(
        // API supports only one meal at a time, so fetch first favorite as a simple demo
        // Later you could fetch all with Promise.all or a custom hook
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${favorites[0]}`
    );

    if (loading) return <p>Loading favorite recipes...</p>;
    if (error) return <p>Error loading favorite recipes.</p>;
    if (!data || !data.meals) return <p>No data found for favorites.</p>;

    const meal = data.meals[0];

    return (
        <div>
            <h1>Your Favorites</h1>
            <ul>
                {favorites.map((id) => (
                    <li key={id}>
                        <Link to={`/recipe/${id}`}>Recipe ID: {id}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
