"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";
import { ChefHat, Heart, ImageOff, X } from "lucide-react";
import { toggleFavourite } from "@/lib/actions/recipe-interactions";
import { authClient } from "@/lib/auth-client";

const FavouritesGrid = ({ recipes }) => {
  const [items, setItems] = useState(recipes);
  const [isPending, startTransition] = useTransition();

  const handleRemove = (recipeId) => {
    // optimistic update
    const prevItems = items;
    setItems((prev) => prev.filter((r) => r._id !== recipeId));

    startTransition(async () => {
      try {
        const { data } = await authClient.token();
        const token = data?.token;

        const result = await toggleFavourite(recipeId, token);

        if (result.favourited !== false) {
          throw new Error();
        }
        toast.success("Favourites removed successfully");
      } catch (error) {
        setItems(prevItems); 
        toast.error("Something went wrong");
      }
    });
  };

  if (items.length === 0) {
    return (
      <p className="text-center text-gray-500 py-16">
        You have not added any recipes to your favourites yet. Start exploring and add your favorite recipes to see them here!
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((recipe) => (
        <div
          key={recipe._id}
          className="group rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-md hover:shadow-2xl border border-gray-100 dark:border-gray-700 transition-all duration-300"
        >
          <div className="relative h-48 w-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
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

            <button
              onClick={() => handleRemove(recipe._id)}
              disabled={isPending}
              title="Remove from favourites"
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 backdrop-blur text-rose-500 hover:bg-rose-500 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {typeof recipe.like === "number" && (
              <span className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur px-2.5 py-1 rounded-full text-xs text-white">
                <Heart className="w-3 h-3 fill-rose-400 text-rose-400" />
                {recipe.like}
              </span>
            )}
          </div>

          <div className="p-5">
            <div className="flex items-center gap-1.5 text-orange-500 text-xs font-medium mb-1.5">
              <ChefHat className="w-3.5 h-3.5" />
              {recipe.category}
            </div>
            <h2 className="font-bold text-lg text-gray-900 dark:text-white truncate mb-3">
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

export default FavouritesGrid;