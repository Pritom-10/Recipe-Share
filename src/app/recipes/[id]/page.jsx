// app/recipes/[id]/page.jsx
import Image from "next/image";

const SERVER_URL = process.env.SERVER_URL;

const RecipeDetailsPage = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(`${SERVER_URL}/recipes/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div className="text-center py-20 text-red-500">
        রেসিপি লোড করতে সমস্যা হয়েছে।
      </div>
    );
  }

  const recipe = await res.json();

  if (!recipe || !recipe._id) {
    return (
      <div className="text-center py-20 text-gray-500">
        রেসিপি পাওয়া যায়নি।
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="relative h-80 w-full rounded-xl overflow-hidden mb-6">
        <Image
          src={recipe.recipeImage}
          alt={recipe.recipeName}
          fill
          className="object-cover"
        />
      </div>

      <h1 className="text-3xl font-bold mb-3">{recipe.recipeName}</h1>

      <div className="flex gap-2 mb-6">
        <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
          {recipe.category}
        </span>
        <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
          {recipe.cuisineType}
        </span>
      </div>

      {recipe.ingredients && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
          <ul className="list-disc list-inside space-y-1">
            {recipe.ingredients.map((ing, i) => (
              <li key={i}>{ing}</li>
            ))}
          </ul>
        </div>
      )}

      {recipe.instructions && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Instructions</h2>
          <p className="whitespace-pre-line leading-relaxed">
            {recipe.instructions}
          </p>
        </div>
      )}

      <form action="/api/payment" method="POST" className="mt-2">
        <input type="hidden" name="recipeName" value={recipe.recipeName} />
        <input
          type="hidden"
          name="preparationTime"
          value={recipe.preparationTime}
        />
        <input type="hidden" name="recipeId" value={recipe._id} />
        <button type="submit">Purchased</button>
      </form>
    </div>
  );
};

export default RecipeDetailsPage;