"use client";

import { Heart, Bookmark } from "lucide-react";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";
import { toggleLike, toggleFavourite } from "@/lib/actions/recipe-interactions";
import { authClient } from "@/lib/auth-client";

const RecipeActions = ({
  recipeId,
  initialLike,
  initialIsLiked,
  initialIsFavourited,
}) => {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likeCount, setLikeCount] = useState(initialLike || 0);
  const [isFavourited, setIsFavourited] = useState(initialIsFavourited);
  const [isPending, startTransition] = useTransition();

  const { data: session } = authClient.useSession();



  const handleLike = () => {
    if (!session?.user) {
      toast.error("Like the recipe by logging in");
      return;
    }

    const nextLiked = !isLiked;
    setIsLiked(nextLiked);
    setLikeCount((prev) => prev + (nextLiked ? 1 : -1));

    startTransition(async () => {
      try {
        const { data } = await authClient.token();
        const token = data?.token;

        if (!token) throw new Error("No token");

        const result = await toggleLike(recipeId, token);
        if (typeof result.liked !== "boolean") {
          throw new Error();
        }
      } catch (error) {
        setIsLiked(!nextLiked);
        setLikeCount((prev) => prev + (nextLiked ? -1 : 1));
        toast.error("Something went wrong");
      }
    });
  };

  const handleFavourite = () => {
    if (!session?.user) {
      toast.error("Favourite the recipe by logging in");
      return;
    }

    const nextFav = !isFavourited;
    setIsFavourited(nextFav);

    startTransition(async () => {
      try {
        const { data } = await authClient.token();
        const token = data?.token;

        if (!token) throw new Error("No token");

        const result = await toggleFavourite(recipeId, token);
        if (typeof result.favourited !== "boolean") {
          throw new Error();
        }
        toast.success(
          nextFav ? "Recipe added to favourites" : "Recipe removed from favourites",
        );
      } catch (error) {
        setIsFavourited(!nextFav);
        toast.error("Something went wrong");
      }
    });
  };
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleLike}
        disabled={isPending}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
          isLiked
            ? "bg-rose-50 dark:bg-rose-950 border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400"
            : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
        }`}
      >
        <Heart
          className={`w-4 h-4 ${isLiked ? "fill-rose-500 text-rose-500" : ""}`}
        />
        {likeCount}
      </button>

      <button
        onClick={handleFavourite}
        disabled={isPending}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
          isFavourited
            ? "bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-900 text-orange-600 dark:text-orange-400"
            : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
        }`}
      >
        <Bookmark
          className={`w-4 h-4 ${isFavourited ? "fill-orange-500 text-orange-500" : ""}`}
        />
        {isFavourited ? "Favourited" : "Favourite"}
      </button>
    </div>
  );
};

export default RecipeActions;
