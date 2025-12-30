import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import MealCard from "../components/MealCard";
import type { MealSummary } from "../types/meal";
import type { MealsResponse } from "../types/api";

/**
 * Recipe search page with URL state.
 * Syncs input with search params and API.
 * @returns form and search results
 */
export default function Search() {
    const [query, setQuery] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const searchTerm = searchParams.get("query") || "";

    // Only construct the URL if searchTerm is not empty
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
        <div>
            <h1>Search Recipes</h1>

            {/* Form for searching */}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for a recipe..."
                />
                <button type="submit">Search</button>
            </form>

            {/* Handle various data fetching states */}
            {loading && searchTerm && <p>Loading results...</p>}
            {error && <p>Error: {error.message}</p>}

            {/* Logic for "No Results Found" */}
            {!loading && !error && searchTerm && !data?.meals && (
                <p>No recipes found for "{searchTerm}".</p>
            )}

            {/* Render results in a grid layout */}
            <div className="search-grid">
                {data?.meals?.map((meal) => (
                    <MealCard key={meal.idMeal} meal={meal} />
                ))}
            </div>
        </div>
    );
}
