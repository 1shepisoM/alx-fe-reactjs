import { useRecipeStore } from './recipeStore';

const FavoritesList = () => {
  const { favorites, recipes } = useRecipeStore();

  const favRecipes = favorites.map(id =>
    recipes.find(recipe => recipe.id === id)
  );

  return (
    <div>
      <h2>My Favorites</h2>
      {favRecipes.map(recipe => (
        <div key={recipe.id}>
          <h4>{recipe.title}</h4>
        </div>
      ))}
    </div>
  );
};

export default FavoritesList;
