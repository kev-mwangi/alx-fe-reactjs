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
          category: 'Italian',
          tags: ['Pasta', 'Italian', 'Quick', 'Dinner'],
          rating: 4.5,
          cookCount: 120
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
          category: 'Indian',
          tags: ['Chicken', 'Spicy', 'Indian', 'Dinner'],
          rating: 4.8,
          cookCount: 95
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
          category: 'Dessert',
          tags: ['Dessert', 'Cookies', 'Baking', 'Sweet'],
          rating: 4.7,
          cookCount: 200
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
          category: 'Asian',
          tags: ['Vegetarian', 'Healthy', 'Asian', 'Quick'],
          rating: 4.3,
          cookCount: 75
        },
        {
          id: '5',
          title: 'Beef Tacos',
          description: 'Tasty Mexican beef tacos with fresh toppings',
          ingredients: ['Ground beef', 'Taco shells', 'Lettuce', 'Tomato', 'Cheese', 'Sour cream'],
          instructions: ['Brown beef', 'Add seasoning', 'Prepare toppings', 'Assemble tacos'],
          prepTime: '20 min',
          cookTime: '15 min',
          difficulty: 'Easy',
          category: 'Mexican',
          tags: ['Beef', 'Mexican', 'Dinner', 'Family'],
          rating: 4.6,
          cookCount: 150
        },
        {
          id: '6',
          title: 'Greek Salad',
          description: 'Fresh Mediterranean salad with feta and olives',
          ingredients: ['Cucumber', 'Tomato', 'Red onion', 'Feta cheese', 'Olives', 'Olive oil'],
          instructions: ['Chop vegetables', 'Add feta and olives', 'Dress with olive oil'],
          prepTime: '15 min',
          cookTime: '0 min',
          difficulty: 'Easy',
          category: 'Mediterranean',
          tags: ['Vegetarian', 'Healthy', 'Salad', 'Quick'],
          rating: 4.4,
          cookCount: 85
        }
      ],
      
      // Favorites state
      favorites: [],
      
      // Recommendations state
      recommendations: [],
      lastGenerated: null,
      
      // Search and filter state (existing)
      searchTerm: '',
      selectedCategory: 'All',
      selectedDifficulty: 'All',
      maxPrepTime: 120,
      filteredRecipes: [],
      
      // Recipe CRUD actions (existing)
      addRecipe: (recipe) => set((state) => ({
        recipes: [...state.recipes, { ...recipe, id: uuidv4() }]
      })),
      
      updateRecipe: (id, updatedRecipe) => set((state) => ({
        recipes: state.recipes.map((recipe) =>
          recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe
        )
      })),
      
      deleteRecipe: (id) => set((state) => ({
        recipes: state.recipes.filter((recipe) => recipe.id !== id),
        favorites: state.favorites.filter(favId => favId !== id) // Remove from favorites if deleted
      })),
      
      // Favorites actions
      addFavorite: (recipeId) => set((state) => {
        // Prevent duplicates
        if (state.favorites.includes(recipeId)) {
          return state;
        }
        return { favorites: [...state.favorites, recipeId] };
      }),
      
      removeFavorite: (recipeId) => set((state) => ({
        favorites: state.favorites.filter(id => id !== recipeId)
      })),
      
      toggleFavorite: (recipeId) => set((state) => {
        const isFavorite = state.favorites.includes(recipeId);
        if (isFavorite) {
          return { favorites: state.favorites.filter(id => id !== recipeId) };
        } else {
          return { favorites: [...state.favorites, recipeId] };
        }
      }),
      
      isFavorite: (recipeId) => {
        return get().favorites.includes(recipeId);
      },
      
      // Recommendations actions
      generateRecommendations: () => {
        const state = get();
        const { recipes, favorites, lastGenerated } = state;
        
        // Don't regenerate too frequently (once per hour)
        const now = Date.now();
        if (lastGenerated && (now - lastGenerated) < 3600000) {
          return state.recommendations;
        }
        
        // If no favorites, recommend popular recipes
        if (favorites.length === 0) {
          const popularRecipes = [...recipes]
            .sort((a, b) => b.cookCount - a.cookCount || b.rating - a.rating)
            .slice(0, 4);
          
          set({ recommendations: popularRecipes, lastGenerated: now });
          return popularRecipes;
        }
        
        // Get favorite recipes
        const favoriteRecipes = recipes.filter(recipe => favorites.includes(recipe.id));
        
        // Extract preferences from favorites
        const favoriteCategories = [...new Set(favoriteRecipes.map(r => r.category))];
        const favoriteTags = favoriteRecipes.flatMap(r => r.tags || []);
        const favoriteDifficulty = [...new Set(favoriteRecipes.map(r => r.difficulty))];
        
        // Score recipes for recommendation
        const scoredRecipes = recipes
          .filter(recipe => !favorites.includes(recipe.id)) // Don't recommend favorites
          .map(recipe => {
            let score = 0;
            
            // Category match
            if (favoriteCategories.includes(recipe.category)) score += 3;
            
            // Tag matches
            const tagMatches = (recipe.tags || []).filter(tag => 
              favoriteTags.includes(tag)
            ).length;
            score += tagMatches * 2;
            
            // Difficulty match
            if (favoriteDifficulty.includes(recipe.difficulty)) score += 1;
            
            // Popularity boost
            score += recipe.rating / 5;
            score += recipe.cookCount / 100;
            
            return { recipe, score };
          })
          .sort((a, b) => b.score - a.score)
          .slice(0, 4)
          .map(item => item.recipe);
        
        // If not enough recommendations, add popular recipes
        if (scoredRecipes.length < 4) {
          const popularRecipes = [...recipes]
            .filter(recipe => !favorites.includes(recipe.id) && !scoredRecipes.find(r => r.id === recipe.id))
            .sort((a, b) => b.cookCount - a.cookCount)
            .slice(0, 4 - scoredRecipes.length);
          
          set({ 
            recommendations: [...scoredRecipes, ...popularRecipes], 
            lastGenerated: now 
          });
        } else {
          set({ recommendations: scoredRecipes, lastGenerated: now });
        }
      },
      
      // Update recipe popularity
      incrementCookCount: (recipeId) => set((state) => ({
        recipes: state.recipes.map((recipe) =>
          recipe.id === recipeId 
            ? { ...recipe, cookCount: (recipe.cookCount || 0) + 1 }
            : recipe
        )
      })),
      
      // Rate a recipe
      rateRecipe: (recipeId, rating) => set((state) => ({
        recipes: state.recipes.map((recipe) =>
          recipe.id === recipeId 
            ? { 
                ...recipe, 
                rating: ((recipe.rating || 0) + rating) / 2, // Simple average
                ratingCount: (recipe.ratingCount || 0) + 1 
              }
            : recipe
        )
      })),
      
      // Search and filter actions (existing)
      setSearchTerm: (term) => set({ searchTerm: term }),
      setSelectedCategory: (category) => set({ selectedCategory: category }),
      setSelectedDifficulty: (difficulty) => set({ selectedDifficulty: difficulty }),
      setMaxPrepTime: (time) => set({ maxPrepTime: time }),
      clearFilters: () => set({
        searchTerm: '',
        selectedCategory: 'All',
        selectedDifficulty: 'All',
        maxPrepTime: 120
      }),
      
      // Get all unique categories from recipes
      getCategories: () => {
        const categories = get().recipes.map(recipe => recipe.category);
        return ['All', ...new Set(categories.filter(Boolean))];
      },
      
      // Filter recipes based on all criteria
      filterRecipes: () => {
        const { recipes, searchTerm, selectedCategory, selectedDifficulty, maxPrepTime } = get();
        
        let filtered = recipes;
        
        if (searchTerm.trim() !== '') {
          const term = searchTerm.toLowerCase();
          filtered = filtered.filter(recipe =>
            recipe.title.toLowerCase().includes(term) ||
            recipe.description.toLowerCase().includes(term) ||
            (recipe.ingredients || []).some(ingredient => 
              ingredient.toLowerCase().includes(term)
            ) ||
            (recipe.tags || []).some(tag => 
              tag.toLowerCase().includes(term)
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
    }),
    {
      name: 'recipe-storage',
    }
  )
);

export default useRecipeStore;