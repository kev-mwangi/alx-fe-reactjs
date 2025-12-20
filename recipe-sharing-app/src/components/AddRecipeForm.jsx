import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useRecipeStore from '../store/recipeStore';

const AddRecipeForm = () => {
  const navigate = useNavigate();
  const addRecipe = useRecipeStore((state) => state.addRecipe);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ingredients: [''],
    instructions: [''],
    prepTime: '',
    cookTime: '',
    difficulty: 'Easy'
  });
  
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
    
    const cleanData = {
      ...formData,
      ingredients: formData.ingredients.filter(ing => ing.trim() !== ''),
      instructions: formData.instructions.filter(inst => inst.trim() !== '')
    };
    
    addRecipe(cleanData);
    navigate('/');
  };
  
  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6">Add New Recipe</h1>
        
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
          
          
          
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
              Add Recipe
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
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

export default AddRecipeForm;