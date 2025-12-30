import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import type { MealSummary } from "../types/meal";
import type { MealsResponse } from "../types/api";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import MealCard from "../components/MealCard";

// Category page displaying meals for selected category
export default function Category() {
    // Get category name from URL params
    const { categoryName } = useParams<{ categoryName: string }>();

    // Fetch meals filtered by category
    const { data, loading, error } = useFetch<MealsResponse<MealSummary>>(
        categoryName
            ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
            : ""
    );

    // Show loading spinner while fetching
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

    // Show error message if fetch fails
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

    // Show message if no meals found
    if (!data || !data.meals || data.meals.length === 0) {
        return (
            <div className="container my-5">
                <div className="alert alert-info" role="alert">
                    No meals found.
                </div>
            </div>
        );
    }
    return (
        <div className="container my-5">
            {/* Page header with category name */}
            <div className="row mb-4">
                <div className="col">
                    <h1 className="display-4 fw-bold text-center">
                        {categoryName} Meals
                    </h1>
                    <p className="lead text-center text-muted">
                        Discover delicious {categoryName?.toLowerCase() || ""}{" "}
                        recipes
                    </p>
                </div>
            </div>
            {/* Meals grid */}
            <div className="row g-4">
                {data.meals.map((meal) => (
                    <div
                        key={meal.idMeal}
                        className="col-md-6 col-lg-4 col-xl-3"
                    >
                        <MealCard meal={meal} />
                    </div>
                ))}
            </div>
        </div>
    );
}
