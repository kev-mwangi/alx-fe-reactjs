import React, { useEffect } from 'react';
import useRecipeStore from '../store/recipeStore';

const SearchBar = () => {
  const { searchTerm, setSearchTerm, filterRecipes } = useRecipeStore();
  
  
  useEffect(() => {
    filterRecipes();
  }, [searchTerm, filterRecipes]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          placeholder="Search recipes by title, description, or ingredients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 pl-12 pr-4 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
        />
        <svg
          className="absolute left-4 top-3.5 h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;