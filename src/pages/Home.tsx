import useFetch from "../hooks/useFetch";
import type { CategoriesResponse } from "../types/api";

export default function Home() {
    const { data, loading, error } = useFetch<CategoriesResponse>(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
    );

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h1>Categories</h1>

            {data?.categories.map((category) => (
                <div key={category.idCategory}>
                    <h3>{category.strCategory}</h3>
                </div>
            ))}
        </div>
    );
}
