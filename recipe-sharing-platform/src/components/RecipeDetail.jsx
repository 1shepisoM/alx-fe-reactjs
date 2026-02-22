import { useParams, Link } from "react-router-dom";
import data from "../data.json";

function RecipeDetail() {
  const { id } = useParams();
  const recipe = data.find((r) => r.id === parseInt(id));

  if (!recipe) {
    return <h2 className="text-center mt-10">Recipe Not Found</h2>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-64 object-cover rounded-lg shadow-md"
      />

      <h1 className="text-3xl font-bold mt-6">{recipe.title}</h1>

      <div className="mt-6 bg-gray-100 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
        <ul className="list-disc pl-6">
          {recipe.ingredients.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="mt-6 bg-gray-100 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Instructions</h2>
        <p>{recipe.instructions}</p>
      </div>

      <Link
        to="/"
        className="inline-block mt-6 text-blue-600 hover:underline"
      >
        ← Back to Home
      </Link>
    </div>
  );
}

export default RecipeDetail;
