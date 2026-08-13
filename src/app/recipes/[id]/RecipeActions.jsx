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

  // const handleLike = () => {
  //   if (!session?.user) {
  //     toast.error("Like দিতে হলে লগইন করো");
  //     return;
  //   }

  //   // optimistic update
  //   const nextLiked = !isLiked;
  //   setIsLiked(nextLiked);
  //   setLikeCount((prev) => prev + (nextLiked ? 1 : -1));

  //   startTransition(async () => {
  //     try {
  //       const { token } = await authClient.token();
  //       const result = await toggleLike(recipeId, token);
  //       if (typeof result.liked !== "boolean") {
  //         throw new Error();
  //       }
  //     } catch (error) {
  //       // rollback on failure
  //       setIsLiked(!nextLiked);
  //       setLikeCount((prev) => prev + (nextLiked ? -1 : 1));
  //       toast.error("কিছু একটা সমস্যা হয়েছে");
  //     }
  //   });
  // };

  // const handleFavourite = () => {
  //   if (!session?.user) {
  //     toast.error("Favourite করতে হলে লগইন করো");
  //     return;
  //   }

  //   const nextFav = !isFavourited;
  //   setIsFavourited(nextFav);

  //   startTransition(async () => {
  //     try {
  //       const { token } = await authClient.token();
  //       const result = await toggleFavourite(recipeId, token);
  //       if (typeof result.favourited !== "boolean") {
  //         throw new Error();
  //       }
  //       toast.success(
  //         nextFav ? "Favourites এ যোগ হয়েছে" : "Favourites থেকে সরানো হয়েছে",
  //       );
  //     } catch (error) {
  //       setIsFavourited(!nextFav);
  //       toast.error("কিছু একটা সমস্যা হয়েছে");
  //     }
  //   });
  // };


  const handleLike = () => {
    if (!session?.user) {
      toast.error("Like দিতে হলে লগইন করো");
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
        toast.error("কিছু একটা সমস্যা হয়েছে");
      }
    });
  };

  const handleFavourite = () => {
    if (!session?.user) {
      toast.error("Favourite করতে হলে লগইন করো");
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
          nextFav ? "Favourites এ যোগ হয়েছে" : "Favourites থেকে সরানো হয়েছে",
        );
      } catch (error) {
        setIsFavourited(!nextFav);
        toast.error("কিছু একটা সমস্যা হয়েছে");
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
            ? "bg-rose-50 border-rose-200 text-rose-600"
            : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
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
            ? "bg-orange-50 border-orange-200 text-orange-600"
            : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
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
