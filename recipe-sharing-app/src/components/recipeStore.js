import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

const useRecipeStore = create(
  persist(
    (set) => ({
      recipes: [
        {
          id: '1',
          title: 'Spaghetti Carbonara',
          description: 'Classic Italian pasta dish with eggs, cheese, pancetta, and black pepper',
          ingredients: ['Spaghetti', 'Eggs', 'Parmesan cheese', 'Pancetta', 'Black pepper'],
          instructions: ['Cook pasta', 'Fry pancetta', 'Mix eggs and cheese', 'Combine everything'],
          prepTime: '15 min',
          cookTime: '15 min',
          difficulty: 'Medium'
        },
        {
          id: '2',
          title: 'Chicken Curry',
          description: 'Spicy and flavorful chicken curry',
          ingredients: ['Chicken', 'Curry powder', 'Coconut milk', 'Onions', 'Garlic'],
          instructions: ['Sauté onions', 'Add chicken', 'Add spices', 'Simmer with coconut milk'],
          prepTime: '20 min',
          cookTime: '30 min',
          difficulty: 'Easy'
        }
      ],
      
      
      addRecipe: (recipe) => set((state) => ({
        recipes: [...state.recipes, { ...recipe, id: uuidv4() }]
      })),
      
      
      updateRecipe: (id, updatedRecipe) => set((state) => ({
        recipes: state.recipes.map((recipe) =>
          recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe
        )
      })),
      
      
      deleteRecipe: (id) => set((state) => ({
        recipes: state.recipes.filter((recipe) => recipe.id !== id)
      })),
      
      
      getRecipe: (id) => {
        return useRecipeStore.getState().recipes.find(recipe => recipe.id === id);
      }
    }),
    {
      name: 'recipe-storage', 
    }
  )
);

export default useRecipeStore;