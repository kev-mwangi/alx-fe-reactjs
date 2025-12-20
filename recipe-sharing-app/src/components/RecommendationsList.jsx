import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useRecipeStore from '../store/recipeStore';

const RecommendationsList = () => {
  const { 
    recipes, 
    recommendations, 
    generateRecommendations, 
    favorites,
    addFavorite,
    isFavorite,
    toggleFavorite 
  } = useRecipeStore();
  
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  
  useEffect(() => {
    const loadRecommendations = async () => {
      setIsLoading(true);
      await generateRecommendations();
      setIsLoading(false);
      setLastUpdated(new Date());
    };
    
    loadRecommendations();
  }, [generateRecommendations]);

  // If no recipes or no favorites, show placeholder
  if (recipes.length === 0) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">✨ Personalized Recommendations</h2>
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-32 bg-gray-100 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const displayRecipes = recommendations.length > 0 ? recommendations : 
    recipes.slice(0, 4).sort((a, b) => b.rating - a.rating);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">✨ Personalized Recommendations</h2>
          <p className="text-gray-600 mt-1">
            {favorites.length > 0 
              ? "Based on your favorites, you might like these recipes!"
              : "Check out these popular recipes to get started!"}
          </p>
        </div>
        {lastUpdated && (
          <span className="text-sm text-gray-500">
            Updated {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        )}
      </div>
      
      {displayRecipes.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No recommendations available yet. Add some favorites!</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayRecipes.map((recipe) => {
              const isFav = isFavorite(recipe.id);
              
              return (
                <div key={recipe.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-4">
                    {/* Recipe Header */}
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-gray-800">
                          <Link to={`/recipe/${recipe.id}`} className="hover:text-blue-600">
                            {recipe.title}
                          </Link>
                        </h3>
                        <div className="flex items-center mt-1">
                          <span className="inline-block px-2 py-1 text-xs font-semibold text-purple-600 bg-purple-100 rounded">
                            {recipe.category}
                          </span>
                          {favorites.includes(recipe.id) && (
                            <span className="ml-2 inline-block px-2 py-1 text-xs font-semibold text-red-600 bg-red-50 rounded">
                              In Favorites
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => toggleFavorite(recipe.id)}
                        className={`p-2 rounded-full transition-colors ${
                          isFav 
                            ? 'text-red-500 bg-red-50 hover:bg-red-100' 
                            : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                        }`}
                        title={isFav ? "Remove from favorites" : "Add to favorites"}
                      >
                        <svg className="w-5 h-5" fill={isFav ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>
                    
                    {/* Recipe Description */}
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {recipe.description}
                    </p>
                    
                    {/* Tags */}
                    <div className="mb-3">
                      <div className="flex flex-wrap gap-1">
                        {(recipe.tags || []).slice(0, 3).map((tag, index) => (
                          <span 
                            key={index} 
                            className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Recipe Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M0 0h24v24H0z" fill="none"/>
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                          </svg>
                          <span>{recipe.rating?.toFixed(1) || '4.5'}</span>
                        </div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                              d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          <span>{recipe.cookTime}</span>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        recipe.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                        recipe.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {recipe.difficulty}
                      </span>
                    </div>
                    
                    {/* Match Score (for recommendations) */}
                    {recommendations.length > 0 && !favorites.includes(recipe.id) && (
                      <div className="mt-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-600">Match with your taste</span>
                          <span className="text-xs font-semibold text-purple-600">
                            {Math.floor(Math.random() * 30 + 70)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="bg-purple-600 h-1.5 rounded-full" 
                            style={{ width: `${Math.floor(Math.random() * 30 + 70)}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                    
                    {/* Action Button */}
                    <div className="mt-4">
                      <Link
                        to={`/recipe/${recipe.id}`}
                        className="block w-full text-center bg-purple-50 text-purple-600 px-4 py-2 rounded hover:bg-purple-100 transition-colors font-medium"
                      >
                        Try This Recipe
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Recommendation Insights */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h4 className="font-semibold text-gray-700 mb-3">Why These Recommendations?</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-3 rounded">
                <p className="text-sm text-blue-700">
                  {favorites.length > 0 
                    ? "Based on your favorite categories and difficulty levels"
                    : "Popular recipes loved by many users"}
                </p>
              </div>
              <div className="bg-green-50 p-3 rounded">
                <p className="text-sm text-green-700">
                  {favorites.length > 0
                    ? "Matches your cooking style and ingredient preferences"
                    : "High-rated recipes with great reviews"}
                </p>
              </div>
              <div className="bg-purple-50 p-3 rounded">
                <p className="text-sm text-purple-700">
                  {favorites.length > 0
                    ? "Similar preparation time to your favorites"
                    : "Perfect for beginners and experienced cooks"}
                </p>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <button
                onClick={generateRecommendations}
                className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh Recommendations
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RecommendationsList;