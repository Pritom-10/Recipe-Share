import Link from "next/link";
import { getPopularRecipes } from "@/lib/actions/recipe";
import { Heart, User } from "lucide-react";

const PopularRecipes = async () => {
  const recipes = await getPopularRecipes();

  if (!recipes || recipes.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 py-14">
      <div className="flex items-center gap-2 mb-2">
        <Heart className="w-5 h-5 fill-rose-400 text-rose-400" />
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Popular Recipes
        </h2>
      </div>
      <p className="text-gray-500 mb-8">
        কমিউনিটির সবচেয়ে পছন্দের রেসিপিগুলো দেখো।
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {recipes.map((recipe) => (
          <Link
            key={recipe._id}
            href={`/recipes/${recipe._id}`}
            className="group bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300"
          >
            <h3 className="font-bold text-gray-900 truncate mb-3 group-hover:text-orange-600 transition-colors">
              {recipe.recipeName}
            </h3>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1.5 text-gray-500">
                <User className="w-3.5 h-3.5" />
                {recipe.userName}
              </div>
              <div className="flex items-center gap-1.5 bg-rose-50 text-rose-600 px-2.5 py-1 rounded-full font-semibold">
                <Heart className="w-3.5 h-3.5 fill-rose-500" />
                {recipe.like || 0}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default PopularRecipes;
