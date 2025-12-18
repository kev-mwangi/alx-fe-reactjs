import {create} from 'zustand'
const recipeStore = {
  
  recipes: [
    {
      id: 1,
      title: 'Spaghetti Bolognese',
      ingredients: ['spaghetti', 'ground beef', 'tomato sauce', 'onion', 'garlic'],
      instructions: '1. Cook spaghetti...',
      cookingTime: '30 min',
      difficulty: 'Easy'
    },
    {
      id: 2,
      title: 'Chicken Salad',
      ingredients: ['chicken breast', 'lettuce', 'tomato', 'cucumber', 'olive oil'],
      instructions: '1. Grill chicken...',
      cookingTime: '20 min',
      difficulty: 'Easy'
    }
  ],
  
  
  getRecipes: () => {
    return recipeStore.recipes;
  },
  
  
  getRecipeById: (id) => {
    return recipeStore.recipes.find(recipe => recipe.id === id);
  },
  
  
  addRecipe: (recipeData) => {
    
    const newId = recipeStore.recipes.length > 0 
      ? Math.max(...recipeStore.recipes.map(r => r.id)) + 1
      : 1;
    
    const newRecipe = {
      id: newId,
      ...recipeData
    };
    
    recipeStore.recipes.push(newRecipe);
    return newRecipe;
  },
  
  
  updateRecipe: (id, updatedData) => {
    const index = recipeStore.recipes.findIndex(recipe => recipe.id === id);
    
    if (index !== -1) {
      recipeStore.recipes[index] = {
        ...recipeStore.recipes[index],
        ...updatedData,
        id 
      };
      return recipeStore.recipes[index];
    }
    return null;
  },
  
  
  deleteRecipe: (id) => {
    const initialLength = recipeStore.recipes.length;
    recipeStore.recipes = recipeStore.recipes.filter(recipe => recipe.id !== id);
    return initialLength > recipeStore.recipes.length;
  },
  
  
  searchRecipes: (searchTerm) => {
    const term = searchTerm.toLowerCase();
    return recipeStore.recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(term) ||
      recipe.ingredients.some(ingredient => 
        ingredient.toLowerCase().includes(term)
      )
    );
  }
};


export default useRecipeStore;