import { Link } from "react-router-dom";
import type { MealSummary } from "../types/meal";

type MealCardProps = {
    meal: MealSummary;
};

export default function MealCard({ meal }: MealCardProps) {
    return (
        <div className="meal-card">
            <Link to={`/recipe/${meal.idMeal}`}>
                <img src={meal.strMealThumb} alt={meal.strMeal} />
                <h3>{meal.strMeal}</h3>
            </Link>
        </div>
    );
}
