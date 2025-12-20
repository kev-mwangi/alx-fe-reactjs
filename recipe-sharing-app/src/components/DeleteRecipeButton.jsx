import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useRecipeStore from './recipeStore';

const DeleteRecipeButton = ({ recipeId }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);
  const navigate = useNavigate();

  const handleDelete = () => {
    deleteRecipe(recipeId);
    navigate('/');
  };

  return (
    <div className="relative">
      {!showConfirm ? (
        <button
          onClick={() => setShowConfirm(true)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
        >
          Delete
        </button>
      ) : (
        <div className="absolute right-0 top-full mt-2 bg-white shadow-lg rounded-lg p-4 z-10 border border-gray-200 min-w-[200px]">
          <p className="text-gray-700 mb-3">Are you sure?</p>
          <div className="flex gap-2">
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
            >
              Yes, Delete
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              className="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400 text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteRecipeButton;