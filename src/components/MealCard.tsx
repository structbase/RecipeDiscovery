import { Link } from "react-router-dom";
import type { MealCardProps } from "../types/meal";

export default function MealCard({ meal, link }: MealCardProps) {
    const to = link || `/recipe/${meal.idMeal}`;

    return (
        <div className="card h-100 shadow-sm meal-card">
            <Link to={to} className="text-decoration-none text-dark">
                <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body d-flex align-items-center justify-content-center">
                    <h5 className="card-title text-center mb-0">
                        {meal.strMeal}
                    </h5>
                </div>
            </Link>
        </div>
    );
}
