import { useEffect, useState } from "react";
import { useFavorites } from "../context/FavoritesContext";
import MealCard from "../components/MealCard";
import type { MealSummary } from "../types/meal";
import type { MealsResponse } from "../types/api";

export default function Favorites() {
    const { favorites } = useFavorites();
    const [meals, setMeals] = useState<MealSummary[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (favorites.length === 0) {
            setMeals([]);
            return;
        }

        const fetchAllFavorites = async () => {
            setLoading(true);
            setError(null);

            try {
                // Fetch all favorite meals in parallel
                const promises = favorites.map((id) =>
                    fetch(
                        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
                    ).then((res) => res.json())
                );

                const results = await Promise.all(promises);
                const allMeals: MealSummary[] = [];

                results.forEach((data: MealsResponse<MealSummary>) => {
                    if (data.meals && data.meals[0]) {
                        allMeals.push(data.meals[0]);
                    }
                });

                setMeals(allMeals);
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err
                        : new Error("Failed to load favorites")
                );
            } finally {
                setLoading(false);
            }
        };

        fetchAllFavorites();
    }, [favorites]);

    // If no favorites, show message
    if (favorites.length === 0) {
        return (
            <div>
                <h1>Your Favorites</h1>
                <p>You have no favorite recipes. Go add some!</p>
            </div>
        );
    }

    if (loading) {
        return (
            <div>
                <h1>Your Favorites</h1>
                <p>Loading favorite recipes...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <h1>Your Favorites</h1>
                <p>Error loading favorite recipes: {error.message}</p>
            </div>
        );
    }

    return (
        <div>
            <h1>Your Favorites</h1>
            <div className="favorites-grid">
                {meals.map((meal) => (
                    <MealCard key={meal.idMeal} meal={meal} />
                ))}
            </div>
        </div>
    );
}
