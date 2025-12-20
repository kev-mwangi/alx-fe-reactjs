import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useRecipeStore from '../store/recipeStore';

const FavoritesList = () => {
  const { favorites, recipes, removeFavorite, generateRecommendations } = useRecipeStore();
  
  // Get favorite recipes
  const favoriteRecipes = recipes.filter(recipe => favorites.includes(recipe.id));
  
  // Generate recommendations when favorites change
  useEffect(() => {
    generateRecommendations();
  }, [favorites, generateRecommendations]);

  if (favorites.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">❤️ My Favorites</h2>
          <span className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-full">
            {favorites.length} recipes
          </span>
        </div>
        
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-50 rounded-full mb-4">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No favorites yet</h3>
          <p className="text-gray-600 mb-4">Start by adding some recipes to your favorites!</p>
          <Link 
            to="/"
            className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Browse Recipes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">❤️ My Favorites</h2>
          <p className="text-gray-600 mt-1">Your personal collection of favorite recipes</p>
        </div>
        <span className="px-4 py-2 bg-red-50 text-red-700 font-semibold rounded-full">
          {favorites.length} {favorites.length === 1 ? 'recipe' : 'recipes'}
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favoriteRecipes.map((recipe) => (
          <div key={recipe.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-lg text-gray-800">
                    <Link to={`/recipe/${recipe.id}`} className="hover:text-blue-600">
                      {recipe.title}
                    </Link>
                  </h3>
                  <span className="inline-block px-2 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded mt-1">
                    {recipe.category}
                  </span>
                </div>
                <button
                  onClick={() => removeFavorite(recipe.id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                  title="Remove from favorites"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </button>
              </div>
              
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {recipe.description}
              </p>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                  <span>{recipe.rating?.toFixed(1) || '4.5'}</span>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  recipe.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                  recipe.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {recipe.difficulty}
                </span>
              </div>
              
              <div className="mt-4">
                <Link
                  to={`/recipe/${recipe.id}`}
                  className="block w-full text-center bg-blue-50 text-blue-600 px-4 py-2 rounded hover:bg-blue-100 transition-colors"
                >
                  View Recipe
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Stats */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h4 className="font-semibold text-gray-700 mb-3">Your Favorites Stats</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-3 rounded">
            <p className="text-sm text-gray-600">Most Common Category</p>
            <p className="font-bold text-gray-800">
              {(() => {
                const categories = favoriteRecipes.map(r => r.category);
                const counts = {};
                categories.forEach(cat => counts[cat] = (counts[cat] || 0) + 1);
                const mostCommon = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
                return mostCommon ? mostCommon[0] : 'None';
              })()}
            </p>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <p className="text-sm text-gray-600">Average Difficulty</p>
            <p className="font-bold text-gray-800">
              {(() => {
                const difficulties = favoriteRecipes.map(r => r.difficulty);
                const avg = difficulties.filter(d => d === 'Easy').length / difficulties.length;
                return avg > 0.7 ? 'Easy' : avg > 0.4 ? 'Mixed' : 'Challenging';
              })()}
            </p>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <p className="text-sm text-gray-600">Average Prep Time</p>
            <p className="font-bold text-gray-800">
              {(() => {
                const times = favoriteRecipes.map(r => parseInt(r.prepTime) || 0);
                const avg = times.reduce((a, b) => a + b, 0) / times.length;
                return isNaN(avg) ? 'N/A' : `${Math.round(avg)} min`;
              })()}
            </p>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <p className="text-sm text-gray-600">Total Cook Time Saved</p>
            <p className="font-bold text-gray-800">
              {favoriteRecipes.reduce((total, recipe) => {
                const time = parseInt(recipe.cookTime) || 0;
                return total + time;
              }, 0)} min
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoritesList;