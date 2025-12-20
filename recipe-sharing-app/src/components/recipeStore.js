import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

const useRecipeStore = create(
  persist(
    (set, get) => ({
      recipes: [
        {
          id: '1',
          title: 'Spaghetti Carbonara',
          description: 'Classic Italian pasta dish with eggs, cheese, pancetta, and black pepper',
          ingredients: ['Spaghetti', 'Eggs', 'Parmesan cheese', 'Pancetta', 'Black pepper', 'Garlic'],
          instructions: ['Cook pasta', 'Fry pancetta', 'Mix eggs and cheese', 'Combine everything'],
          prepTime: '15 min',
          cookTime: '15 min',
          difficulty: 'Medium',
          category: 'Italian'
        },
        {
          id: '2',
          title: 'Chicken Curry',
          description: 'Spicy and flavorful chicken curry',
          ingredients: ['Chicken', 'Curry powder', 'Coconut milk', 'Onions', 'Garlic', 'Ginger'],
          instructions: ['Sauté onions', 'Add chicken', 'Add spices', 'Simmer with coconut milk'],
          prepTime: '20 min',
          cookTime: '30 min',
          difficulty: 'Easy',
          category: 'Indian'
        },
        {
          id: '3',
          title: 'Chocolate Chip Cookies',
          description: 'Classic homemade chocolate chip cookies',
          ingredients: ['Flour', 'Butter', 'Sugar', 'Chocolate chips', 'Eggs', 'Vanilla extract'],
          instructions: ['Mix dry ingredients', 'Cream butter and sugar', 'Add eggs', 'Bake at 350°F'],
          prepTime: '15 min',
          cookTime: '10 min',
          difficulty: 'Easy',
          category: 'Dessert'
        },
        {
          id: '4',
          title: 'Vegetable Stir Fry',
          description: 'Healthy vegetable stir fry with tofu',
          ingredients: ['Bell peppers', 'Broccoli', 'Carrots', 'Tofu', 'Soy sauce', 'Garlic'],
          instructions: ['Cut vegetables', 'Stir fry tofu', 'Add vegetables', 'Season with sauce'],
          prepTime: '20 min',
          cookTime: '15 min',
          difficulty: 'Easy',
          category: 'Asian'
        }
      ],
      
      
      searchTerm: '',
      selectedCategory: 'All',
      selectedDifficulty: 'All',
      maxPrepTime: 120, 
      filteredRecipes: [],
      
      
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
      
      
      setSearchTerm: (term) => set({ searchTerm: term }),
      
      setSelectedCategory: (category) => set({ selectedCategory: category }),
      
      setSelectedDifficulty: (difficulty) => set({ selectedDifficulty: difficulty }),
      
      setMaxPrepTime: (time) => set({ maxPrepTime: time }),
      
      
      getCategories: () => {
        const categories = get().recipes.map(recipe => recipe.category);
        return ['All', ...new Set(categories.filter(Boolean))];
      },
      
      
      getDifficulties: () => {
        const difficulties = get().recipes.map(recipe => recipe.difficulty);
        return ['All', ...new Set(difficulties.filter(Boolean))];
      },
      
      
      filterRecipes: () => {
        const { recipes, searchTerm, selectedCategory, selectedDifficulty, maxPrepTime } = get();
        
        let filtered = recipes;
        
        
        if (searchTerm.trim() !== '') {
          const term = searchTerm.toLowerCase();
          filtered = filtered.filter(recipe =>
            recipe.title.toLowerCase().includes(term) ||
            recipe.description.toLowerCase().includes(term) ||
            recipe.ingredients.some(ingredient => 
              ingredient.toLowerCase().includes(term)
            ) ||
            recipe.instructions.some(instruction => 
              instruction.toLowerCase().includes(term)
            )
          );
        }
        
        
        if (selectedCategory !== 'All') {
          filtered = filtered.filter(recipe => recipe.category === selectedCategory);
        }
        
        
        if (selectedDifficulty !== 'All') {
          filtered = filtered.filter(recipe => recipe.difficulty === selectedDifficulty);
        }
        
        
        filtered = filtered.filter(recipe => {
          const prepTime = parseInt(recipe.prepTime) || 0;
          return prepTime <= maxPrepTime;
        });
        
        set({ filteredRecipes: filtered });
      },
      
      
      clearFilters: () => set({
        searchTerm: '',
        selectedCategory: 'All',
        selectedDifficulty: 'All',
        maxPrepTime: 120
      })
    }),
    {
      name: 'recipe-storage',
    }
  )
);

export default useRecipeStore;