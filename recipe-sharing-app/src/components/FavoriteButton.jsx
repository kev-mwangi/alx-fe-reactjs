import React from 'react';
import useRecipeStore from '../store/recipeStore';

const FavoriteButton = ({ recipeId, size = 'medium' }) => {
  const { toggleFavorite, isFavorite } = useRecipeStore();
  const isFav = isFavorite(recipeId);
  
  const sizes = {
    small: 'w-6 h-6',
    medium: 'w-8 h-8',
    large: 'w-10 h-10'
  };
  
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        toggleFavorite(recipeId);
      }}
      className={`p-2 rounded-full transition-all transform hover:scale-110 ${
        isFav 
          ? 'text-red-500 bg-red-50 hover:bg-red-100' 
          : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
      }`}
      title={isFav ? "Remove from favorites" : "Add to favorites"}
    >
      <svg className={sizes[size]} fill={isFav ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    </button>
  );
};

export default FavoriteButton;