import { useNavigate } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';

const DeleteRecipeButton = ({ id }) => {
  const deleteRecipe = useRecipeStore(state => state.deleteRecipe);
  const navigate = useNavigate();

  return (
    <button
      onClick={() => {
        deleteRecipe(id);
        navigate('/');
      }}
    >
      Delete Recipe
    </button>
  );
};

export default DeleteRecipeButton;
