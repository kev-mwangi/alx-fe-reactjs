import {create} from 'zustand'
const recipeStore = {
  recipes: [],
  
  updateRecipe: (id, updatedRecipe) => {
    
    const index = recipeStore.recipes.findIndex(recipe => recipe.id === id);
    
    if (index !== -1) {
      
      recipeStore.recipes[index] = { ...recipeStore.recipes[index], ...updatedRecipe };
      return true; 
    }
    return false; 
  },
  
  deleteRecipe: (id) => {
  
    const initialLength = recipeStore.recipes.length;
    recipeStore.recipes = recipeStore.recipes.filter(recipe => recipe.id !== id);
    
    
    return recipeStore.recipes.length < initialLength;
  }
};


export default useRecipeStore;