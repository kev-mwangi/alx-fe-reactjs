import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useRecipeStore from './recipeStore';
import DeleteRecipeButton from './DeleteRecipeButton';
import { Link } from 'react-router-dom';

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipe = useRecipeStore((state) =>
    state.recipes.find((recipe) => recipe.id === id)
  );

  if (!recipe) {
    return (
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Recipe not found</h2>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{recipe.title}</h1>
              <p className="text-gray-600 mt-2">{recipe.description}</p>
            </div>
            <div className="flex gap-2">
              <Link
                to={`/edit/${recipe.id}`}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              >
                Edit
              </Link>
              <DeleteRecipeButton recipeId={recipe.id} />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-50 p-4 rounded">
              <h3 className="font-bold text-gray-700 mb-2">Preparation Time</h3>
              <p>{recipe.prepTime}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded">
              <h3 className="font-bold text-gray-700 mb-2">Cooking Time</h3>
              <p>{recipe.cookTime}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded">
              <h3 className="font-bold text-gray-700 mb-2">Difficulty</h3>
              <p>{recipe.difficulty}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Ingredients</h2>
              <ul className="list-disc pl-5 space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="text-gray-700">{ingredient}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Instructions</h2>
              <ol className="list-decimal pl-5 space-y-3">
                {recipe.instructions.map((step, index) => (
                  <li key={index} className="text-gray-700">{step}</li>
                ))}
              </ol>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t">
            <button
              onClick={() => navigate('/')}
              className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
            >
              Back to Recipes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;