import { Link } from "react-router-dom";
import type { MealCardProps } from "../types/meal";

// Card component displaying meal thumbnail and title
export default function MealCard({ meal, link }: MealCardProps) {
    // Use custom link or default to recipe detail page
    const to = link || `/recipe/${meal.idMeal}`;

    return (
        <div className="card h-100 shadow-sm meal-card">
            <Link to={to} className="text-decoration-none text-dark">
                {/* Meal thumbnail image */}
                <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                />
                {/* Meal title */}
                <div className="card-body d-flex align-items-center justify-content-center">
                    <h5 className="card-title text-center mb-0">
                        {meal.strMeal}
                    </h5>
                </div>
            </Link>
        </div>
    );
}
