import {useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import type { MealSummary } from "../types/meal";
import type { MealsResponse } from "../types/api";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import MealCard from "../components/MealCard";

export default function Category() {
    const { categoryName } = useParams<{ categoryName: string }>();

    const { data, loading, error } = useFetch<MealsResponse<MealSummary>>(
        categoryName
            ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
            : ""
    );

    if (loading) {
        return (
            <div className="container my-5">
                <Spinner />
            </div>
        );
    }

    if (error) {
        return (
            <div className="container my-5">
                <ErrorMessage message="Error loading meals." />
            </div>
        );
    }

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
