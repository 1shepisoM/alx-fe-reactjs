import { create } from 'zustand';

export const useRecipeStore = create((set, get) => ({
  recipes: [],
  searchTerm: '',
  filteredRecipes: [],
  favorites: [],
  recommendations: [],

 
  addRecipe: (newRecipe) =>
    set(state => ({
      recipes: [...state.recipes, newRecipe],
      filteredRecipes: [...state.recipes, newRecipe]
    })),

  updateRecipe: (updatedRecipe) =>
    set(state => ({
      recipes: state.recipes.map(recipe =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      ),
      filteredRecipes: state.filteredRecipes.map(recipe =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      )
    })),

  deleteRecipe: (id) =>
    set(state => ({
      recipes: state.recipes.filter(recipe => recipe.id !== id),
      filteredRecipes: state.filteredRecipes.filter(recipe => recipe.id !== id),
      favorites: state.favorites.filter(fid => fid !== id)
    })),

  
  setSearchTerm: (term) => {
    set({ searchTerm: term });
    get().filterRecipes();
  },

  filterRecipes: () =>
    set(state => ({
      filteredRecipes: state.recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
      )
    })),

 
  addFavorite: (id) =>
    set(state => ({
      favorites: [...state.favorites, id]
    })),

  removeFavorite: (id) =>
    set(state => ({
      favorites: state.favorites.filter(fid => fid !== id)
    })),

  
  generateRecommendations: () =>
    set(state => ({
      recommendations: state.recipes.filter(recipe =>
        state.favorites.includes(recipe.id) && Math.random() > 0.4
      )
    })),
}));
