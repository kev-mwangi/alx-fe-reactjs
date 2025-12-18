import useRecipeStore from "./recipeStore";

import React from 'react';


const RecipeList = ({ recipes, onRecipeClick, onDelete }) => {
  return (
    <div className="recipe-list">
      {recipes.length === 0 ? (
        <p>No recipes found. Add your first recipe!</p>
      ) : (
        <div className="recipes-grid">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onClick={() => onRecipeClick(recipe.id)}
              onDelete={() => onDelete(recipe.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};


   
  


export default RecipeList;