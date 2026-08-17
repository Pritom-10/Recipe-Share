
import Link from "next/link";
import Image from "next/image";
import { getPopularRecipes } from "@/lib/actions/recipe";
import { Heart, User, ImageOff } from "lucide-react";

const PopularRecipes = async () => {
  const recipes = await getPopularRecipes();

  if (!recipes || recipes.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 py-14">
      <div className="flex items-center gap-2 mb-2">
        <Heart className="w-5 h-5 fill-rose-400 text-rose-400" />
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          Popular Recipes
        </h2>
      </div>
      <p className="text-gray-500 dark:text-gray-400 mb-8">
        Check out the communitys favorite recipes.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {recipes.map((recipe) => (
          <Link
            key={recipe._id}
            href={`/recipes/${recipe._id}`}
            className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300"
          >
            <div className="relative h-36 w-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
              {recipe.recipeImage ? (
                <Image
                  src={recipe.recipeImage}
                  alt={recipe.recipeName || "Recipe"}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-300 dark:text-gray-600">
                  <ImageOff className="w-8 h-8" />
                </div>
              )}
            </div>

            <div className="p-4">
              <h3 className="font-bold text-gray-900 dark:text-white truncate mb-3 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                {recipe.recipeName}
              </h3>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                  <User className="w-3.5 h-3.5" />
                  {recipe.userName}
                </div>
                <div className="flex items-center gap-1.5 bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400 px-2.5 py-1 rounded-full font-semibold">
                  <Heart className="w-3.5 h-3.5 fill-rose-500" />
                  {recipe.like || 0}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default PopularRecipes;
