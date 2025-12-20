import React from 'react';
import { Link } from 'react-router-dom';
import useRecipeStore from './store/recipeStore';
import FavoriteButton from './FavoriteButton';
const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Recipes</h1>
        <Link
          to="/add"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add New Recipe
        </Link>
      </div>
      
      {recipes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No recipes yet. Add your first recipe!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  <Link
                    to={`/recipe/${recipe.id}`}
                    className="hover:text-blue-600"
                  >
                    {recipe.title}
                  </Link>
                </h2>
                <p className="text-gray-600 mb-3">{recipe.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>{recipe.prepTime}</span>
                  <span>{recipe.difficulty}</span>
                </div>
                <div className="flex gap-2">
                  <Link
                    to={`/recipe/${recipe.id}`}
                    className="flex-1 text-center bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
                  >
                    View
                  </Link>
                  <Link
                    to={`/edit/${recipe.id}`}
                    className="flex-1 text-center bg-yellow-500 text-white px-3 py-2 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeList;