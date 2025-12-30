import useFetch from "../hooks/useFetch";
import type { Category } from "../types/category";
import type { CategoriesResponse } from "../types/api";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import MealCard from "../components/MealCard";

// Home page displaying all recipe categories
export default function Home() {
    // Fetch all available categories from API
    const { data, loading, error } = useFetch<CategoriesResponse>(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
    );

    // Show loading spinner while fetching
    if (loading) {
        return (
            <div className="container my-5">
                <Spinner />
            </div>
        );
    }

    // Show error message if fetch fails
    if (error) {
        return (
            <div className="container my-5">
                <ErrorMessage message={error.message} />
            </div>
        );
    }

    // Show message if no categories available
    if (!data || !data.categories || data.categories.length === 0) {
        return (
            <div className="container my-5">
                <div className="alert alert-info" role="alert">
                    No categories available.
                </div>
            </div>
        );
    }
    return (
        <div className="container my-5">
            {/* Page header */}
            <div className="row mb-4">
                <div className="col">
                    <h1 className="display-4 fw-bold text-center">
                        Recipe Categories
                    </h1>
                    <p className="lead text-center text-muted">
                        Explore delicious recipes by category
                    </p>
                </div>
            </div>
            {/* Categories grid */}
            <div className="row g-4">
                {data.categories.map((category: Category) => (
                    <div
                        key={category.idCategory}
                        className="col-md-6 col-lg-4 col-xl-3"
                    >
                        <MealCard
                            meal={{
                                idMeal: category.idCategory,
                                strMeal: category.strCategory,
                                strMealThumb: category.strCategoryThumb,
                            }}
                            link={`/category/${category.strCategory}`}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
