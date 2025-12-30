import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Search from "./pages/Search";
import RecipeDetail from "./pages/RecipeDetail";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";

// Main app component with routing configuration
function App() {
    return (
        <>
            {/* Navigation bar visible on all pages */}
            <Navbar />
            <Routes>
                {/* Home page with categories */}
                <Route path="/" element={<Home />} />
                {/* Dynamic route for category pages */}
                <Route path="/category/:categoryName" element={<Category />} />
                {/* Dynamic route for recipe details */}
                <Route path="/recipe/:recipeId" element={<RecipeDetail />} />
                {/* Favorites page */}
                <Route path="/favorites" element={<Favorites />} />
                {/* Search page with query params */}
                <Route path="/search" element={<Search />} />
                {/* Catch-all for 404 pages */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}

export default App;
