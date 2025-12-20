import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useRecipeStore from '../store/recipeStore';

const EditRecipeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { recipes, updateRecipe } = useRecipeStore();
  
  const recipe = recipes.find(r => r.id === id);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ingredients: [''],
    instructions: [''],
    prepTime: '',
    cookTime: '',
    difficulty: 'Easy'
  });
  
  useEffect(() => {
    if (recipe) {
      setFormData({
        title: recipe.title || '',
        description: recipe.description || '',
        ingredients: recipe.ingredients || [''],
        instructions: recipe.instructions || [''],
        prepTime: recipe.prepTime || '',
        cookTime: recipe.cookTime || '',
        difficulty: recipe.difficulty || 'Easy'
      });
    }
  }, [recipe]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleArrayChange = (index, value, field) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({
      ...formData,
      [field]: newArray
    });
  };
  
  const addArrayField = (field) => {
    setFormData({
      ...formData,
      [field]: [...formData[field], '']
    });
  };
  
  const removeArrayField = (index, field) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData({
      ...formData,
      [field]: newArray
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Filter out empty strings from arrays
    const cleanData = {
      ...formData,
      ingredients: formData.ingredients.filter(ing => ing.trim() !== ''),
      instructions: formData.instructions.filter(inst => inst.trim() !== '')
    };
    
    updateRecipe(id, cleanData);
    navigate(`/recipe/${id}`);
  };
  
  if (!recipe) {
    return (
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold">Recipe not found</h2>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6">Edit Recipe</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prep Time
              </label>
              <input
                type="text"
                name="prepTime"
                value={formData.prepTime}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cook Time
              </label>
              <input
                type="text"
                name="cookTime"
                value={formData.cookTime}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Difficulty
              </label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Ingredients
              </label>
              <button
                type="button"
                onClick={() => addArrayField('ingredients')}
                className="text-sm bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                Add Ingredient
              </button>
            </div>
            {formData.ingredients.map((ingredient, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={ingredient}
                  onChange={(e) => handleArrayChange(index, e.target.value, 'ingredients')}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={`Ingredient ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => removeArrayField(index, 'ingredients')}
                  className="bg-red-500 text-white px-3 rounded hover:bg-red-600"
                  disabled={formData.ingredients.length === 1}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Instructions
              </label>
              <button
                type="button"
                onClick={() => addArrayField('instructions')}
                className="text-sm bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                Add Step
              </button>
            </div>
            {formData.instructions.map((instruction, index) => (
              <div key={index} className="mb-3">
                <label className="block text-sm text-gray-600 mb-1">
                  Step {index + 1}
                </label>
                <div className="flex gap-2">
                  <textarea
                    value={instruction}
                    onChange={(e) => handleArrayChange(index, e.target.value, 'instructions')}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="2"
                    placeholder={`Instruction step ${index + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayField(index, 'instructions')}
                    className="bg-red-500 text-white px-3 rounded hover:bg-red-600 self-start"
                    disabled={formData.instructions.length === 1}
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
              Update Recipe
            </button>
            <button
              type="button"
              onClick={() => navigate(`/recipe/${id}`)}
              className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRecipeForm;