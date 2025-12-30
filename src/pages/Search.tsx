import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import MealCard from "../components/MealCard";
import type { MealSummary } from "../types/meal";
import type { MealsResponse } from "../types/api";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";

// Recipe search page with URL state sync
export default function Search() {
    const [query, setQuery] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const searchTerm = searchParams.get("query") || "";

    // Fetch only when search term exists
    const { data, loading, error } = searchTerm
        ? // eslint-disable-next-line react-hooks/rules-of-hooks
            useFetch<MealsResponse<MealSummary>>(
                `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
                    searchTerm
                )}`
            )
        : { data: null, loading: false, error: null };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            setSearchParams({ query: query.trim() });
        }
    };

    return (
        <div className="container my-5">
            {/* Page header */}
            <div className="row mb-4">
                <div className="col">
                    <h1 className="display-4 fw-bold text-center">
                        Search Recipes
                    </h1>
                    <p className="lead text-center text-muted">
                        Find your favorite recipes
                    </p>
                </div>
            </div>

            {/* Search form */}
            <div className="row mb-4">
                <div className="col-md-8 mx-auto">
                    <form onSubmit={handleSubmit}>
                        <div className="input-group input-group-lg">
                            <input
                                type="text"
                                className="form-control"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search for a recipe..."
                                aria-label="Search for a recipe"
                            />
                            <button className="btn btn-primary" type="submit">
                                Search
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Loading state */}
            {loading && (
                <div className="text-center">
                    <Spinner />
                </div>
            )}

            {/* Error state */}
            {error && <ErrorMessage message={error.message} />}

            {/* No results message */}
            {!loading && !error && (!data || !data.meals) && searchTerm && (
                <div className="alert alert-warning" role="alert">
                    No recipes found for "{searchTerm}".
                </div>
            )}

            {/* Search results grid */}
            {data?.meals && data.meals.length > 0 && (
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
            )}
        </div>
    );
}
