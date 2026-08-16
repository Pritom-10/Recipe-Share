import Image from "next/image";
import Link from "next/link";
import { getFeaturedRecipes } from "@/lib/actions/recipe";
import { ChefHat, Clock, ImageOff, Star } from "lucide-react";

const FeaturedRecipes = async () => {
  const recipes = await getFeaturedRecipes();

  if (!recipes || recipes.length === 0) {
    return null; 
  }

  return (
   
    <section className="max-w-7xl mx-auto px-4 py-14">
      <div className="flex items-center gap-2 mb-2">
        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          Featured Recipes
        </h2>
      </div>
      <p className="text-gray-500 dark:text-gray-400 mb-8">
        আমাদের বাছাই করা সেরা রেসিপিগুলো দেখো।
      </p>

      <div className="flex gap-6 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory">
        {recipes.map((recipe) => (
          <Link
            key={recipe._id}
            href={`/recipes/${recipe._id}`}
            className="group flex-shrink-0 w-72 snap-start rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-md hover:shadow-2xl border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:-translate-y-1.5"
          >
            {/* image অংশ অপরিবর্তিত */}
            <div className="p-4">
              <div className="flex items-center gap-1.5 text-orange-500 text-xs font-medium mb-1">
                <ChefHat className="w-3.5 h-3.5" />
                {recipe.category}
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white truncate">
                {recipe.recipeName}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeaturedRecipes;