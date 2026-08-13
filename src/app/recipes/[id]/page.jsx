import Image from "next/image";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { ChefHat, Clock, Gauge, ImageOff, ShoppingBag } from "lucide-react";
import RecipeActions from "./RecipeActions";

const SERVER_URL = process.env.SERVER_URL;

const RecipeDetailsPage = async ({ params }) => {
  const { id } = await params;

  const headersList = await headers();
  const { token } = await auth.api.getToken({ headers: headersList });

  const res = await fetch(`${SERVER_URL}/recipes/${id}`, {
    cache: "no-store",
    headers: token ? { authorization: `Bearer ${token}` } : {},
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
      {/* Hero image */}
      <div className="relative h-72 sm:h-96 w-full rounded-3xl overflow-hidden mb-8 bg-gray-100 shadow-lg">
        {recipe.recipeImage ? (
          <Image
            src={recipe.recipeImage}
            alt={recipe.recipeName}
            fill
            unoptimized
            priority
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-300">
            <ImageOff className="w-14 h-14" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between flex-wrap gap-3">
          <div>
            <span className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-gray-800 mb-3">
              <ChefHat className="w-3.5 h-3.5 text-orange-500" />
              {recipe.category}
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-white drop-shadow-sm">
              {recipe.recipeName}
            </h1>
          </div>
        </div>
      </div>

      {/* Meta badges + actions */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
        <div className="flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-600 px-4 py-2 rounded-xl text-sm font-medium">
            {recipe.cuisineType} Cuisine
          </span>
          {recipe.preparationTime && (
            <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium">
              <Clock className="w-4 h-4" />
              {recipe.preparationTime} min
            </span>
          )}
          {recipe.difficultyLevel && (
            <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium">
              <Gauge className="w-4 h-4" />
              {recipe.difficultyLevel}
            </span>
          )}
        </div>

        <RecipeActions
          recipeId={recipe._id}
          initialLike={recipe.like}
          initialIsLiked={recipe.isLiked}
          initialIsFavourited={recipe.isFavourited}
        />
      </div>

      <div className="grid sm:grid-cols-5 gap-10">
        {/* Ingredients */}
        {recipe.ingredients?.length > 0 && (
          <div className="sm:col-span-2">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-orange-500 rounded-full" />
              Ingredients
            </h2>
            <ul className="space-y-3">
              {recipe.ingredients.map((ing, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-gray-700 bg-gray-50 rounded-xl px-4 py-3"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                  {ing}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Instructions */}
        {recipe.instructions?.length > 0 && (
          <div className="sm:col-span-3">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-orange-500 rounded-full" />
              Instructions
            </h2>
            <ol className="space-y-4">
              {recipe.instructions.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-rose-500 text-white text-sm font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <p className="text-gray-700 leading-relaxed pt-1">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>

      {/* Purchase */}
      <div className="mt-12 bg-gradient-to-r from-orange-50 to-rose-50 border border-orange-100 rounded-2xl p-6 flex items-center justify-between flex-wrap gap-4">
        <div>
          <p className="font-semibold text-gray-900">
            Want the full recipe access?
          </p>
          <p className="text-sm text-gray-500">
            Unlock and purchase this recipe now.
          </p>
        </div>
        <form action="/api/payment" method="POST">
          <input type="hidden" name="recipeName" value={recipe.recipeName} />
          <input
            type="hidden"
            name="preparationTime"
            value={recipe.preparationTime}
          />
          <input type="hidden" name="recipeId" value={recipe._id} />
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-rose-500 text-white font-semibold px-6 py-3 rounded-xl hover:shadow-lg transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            Purchase
          </button>
        </form>
      </div>
    </div>
  );
};

export default RecipeDetailsPage;
