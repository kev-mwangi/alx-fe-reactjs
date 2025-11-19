import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { create } from 'zustand'
import { RecipeList } from './components/RecipeList'
import { useRecipeStore } from './components/RecipeList'
function App() {
  const [count, setCount] = useState(0)

  

const useRecipeStore = create((set, get) => ({
  // Initial state
  recipes: [],
  
  // Actions
  addRecipe: (newRecipe) => set((state) => ({ 
    recipes: [...state.recipes, { ...newRecipe, id: Date.now().toString() }] 
  })),
  
  initializeRecipes: (recipes) => set({ recipes }),
  
  // Additional useful actions
  updateRecipe: (id, updatedRecipe) => set((state) => ({
    recipes: state.recipes.map(recipe => 
      recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe
    )
  })),
  
  deleteRecipe: (id) => set((state) => ({
    recipes: state.recipes.filter(recipe => recipe.id !== id)
  })),
  
  getRecipeById: (id) => {
    const state = get()
    return state.recipes.find(recipe => recipe.id === id)
  },
  
  clearRecipes: () => set({ recipes: [] }),
  
  // Utility getter
  get recipeCount() {
    return get().recipes.length
  }
}))


}


export default useRecipeStore