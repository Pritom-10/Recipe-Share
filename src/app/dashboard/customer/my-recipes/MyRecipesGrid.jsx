// app/dashboard/my-recipes/MyRecipesGrid.jsx
import Image from "next/image";
import Link from "next/link";
import { ChefHat, Clock, ImageOff } from "lucide-react";

const MyRecipesGrid = ({ recipes }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {recipes.map((recipe) => (
        <div
          key={recipe._id}
          className="group rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-2xl border border-gray-100 transition-all duration-300 hover:-translate-y-1.5"
        >
          <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
            {recipe.recipeImage ? (
              <Image
                src={recipe.recipeImage}
                alt={recipe.recipeName || "Recipe"}
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, 25vw"
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                <ImageOff className="w-10 h-10" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            {recipe.cuisineType && (
              <span className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-gray-800">
                {recipe.cuisineType}
              </span>
            )}
            {recipe.preparationTime && (
              <span className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur px-2.5 py-1 rounded-full text-xs text-white">
                <Clock className="w-3 h-3" />
                {recipe.preparationTime} min
              </span>
            )}
          </div>

          <div className="p-5">
            <div className="flex items-center gap-1.5 text-orange-500 text-xs font-medium mb-1.5">
              <ChefHat className="w-3.5 h-3.5" />
              {recipe.category}
            </div>
            <h2 className="font-bold text-lg text-gray-900 truncate mb-3">
              {recipe.recipeName}
            </h2>

            <Link
              href={`/recipes/${recipe._id}`}
              className="block w-full text-center bg-gradient-to-r from-orange-500 to-rose-500 text-white py-2.5 rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-orange-200 transition-all duration-200"
            >
              View Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyRecipesGrid;
