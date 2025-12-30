import { Link, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import type { MealSummary } from "../types/meal";
import type { MealsResponse } from "../types/api";

export default function Category() {
    const { categoryName } = useParams<{ categoryName: string }>();

    const { data, loading, error } = useFetch<MealsResponse<MealSummary>>(
        categoryName
            ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
            : ""
    );

    if (loading) return <p>Loading meals...</p>;
    if (error) return <p>Error loading meals.</p>;
    if (!data || !data.meals) return <p>No meals found.</p>;

    return (
        <div>
            <h1>{categoryName} Meals</h1>

            <ul>
                {data.meals.map((meal) => (
                    <li key={meal.idMeal}>
                        <Link to={`/recipe/${meal.idMeal}`}>
                            {meal.strMeal}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
