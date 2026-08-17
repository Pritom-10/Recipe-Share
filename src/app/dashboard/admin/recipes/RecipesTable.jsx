// app/dashboard/admin/recipes/RecipesTable.jsx — সম্পূর্ণ ফাইল প্রতিস্থাপন করো
"use client";

import { useState, useTransition, useEffect, useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import { adminDeleteRecipe, toggleFeatureRecipe } from "@/lib/actions/admin";
import { authClient } from "@/lib/auth-client";
import { Search, Star, Trash2, Pencil, ImageOff } from "lucide-react";
import EditRecipeModalAdmin from "./EditRecipeModalAdmin";

const RecipesTable = ({
  initialRecipes,
  totalPage,
  currentPage,
  initialSearch,
}) => {
  const [recipes, setRecipes] = useState(initialRecipes);
  const [search, setSearch] = useState(initialSearch || "");
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const debounceRef = useRef(null);
  const skipNextSearchEffect = useRef(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRecipes(initialRecipes);
  }, [initialRecipes]);


  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSearch(initialSearch || "");
    skipNextSearchEffect.current = true;
  }, [initialSearch]);

  // Live search — শুধু ইউজার নিজে টাইপ করলে ট্রিগার হবে
  useEffect(() => {
    if (skipNextSearchEffect.current) {
      skipNextSearchEffect.current = false;
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (search) {
        params.set("search", search);
      } else {
        params.delete("search");
      }
      params.set("page", "1");
      router.push(`${pathname}?${params.toString()}`);
    }, 400);

    return () => clearTimeout(debounceRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const goToPage = (page) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    if (search) {
      params.set("search", search);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleDelete = (id) => {
    if (!confirm("তুমি কি নিশ্চিত এই রেসিপিটা মুছে ফেলতে চাও?")) return;

    const prev = recipes;
    setRecipes((r) => r.filter((recipe) => recipe._id !== id));

    startTransition(async () => {
      try {
        const { data } = await authClient.token();
        const token = data?.token;

        const result = await adminDeleteRecipe(id, token);
        if (!result.success) throw new Error();
        toast.success("Recipe deleted successfully");
        router.refresh();
      } catch (error) {
        setRecipes(prev);
        toast.error("Something went wrong");
      }
    });
  };

  const handleToggleFeature = (recipe) => {
    const nextFeatured = !recipe.featured;

    setRecipes((prev) =>
      prev.map((r) =>
        r._id === recipe._id ? { ...r, featured: nextFeatured } : r,
      ),
    );

    startTransition(async () => {
      try {
        const { data } = await authClient.token();
        const token = data?.token;

        const result = await toggleFeatureRecipe(recipe._id, token);
        if (!result.success) throw new Error();
        toast.success(
          nextFeatured
            ? `"${recipe.recipeName}" Featured are Added`
            : `"${recipe.recipeName}" Featured are Removed`,
        );
      } catch (error) {
        setRecipes((prev) =>
          prev.map((r) =>
            r._id === recipe._id ? { ...r, featured: !nextFeatured } : r,
          ),
        );
        toast.error("Something went wrong");
      }
    });
  };

  const handleUpdated = (updatedRecipe) => {
    setRecipes((prev) =>
      prev.map((r) => (r._id === updatedRecipe._id ? updatedRecipe : r)),
    );
  };

  const featuredCount = recipes.filter((r) => r.featured).length;
  const visibleRecipes = showFeaturedOnly
    ? recipes.filter((r) => r.featured)
    : recipes;

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div className="max-w-sm flex-1 min-w-55">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by recipe name..."
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
        </div>

        <button
          onClick={() => setShowFeaturedOnly((prev) => !prev)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-colors ${
            showFeaturedOnly
              ? "bg-amber-50 border-amber-200 text-amber-600"
              : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
          }`}
        >
          <Star
            className={`w-4 h-4 ${showFeaturedOnly ? "fill-amber-500" : ""}`}
          />
          Featured ({featuredCount})
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400 text-left">
            <tr>
              <th className="px-5 py-3 font-medium">Recipe</th>
              <th className="px-5 py-3 font-medium">Owner</th>
              <th className="px-5 py-3 font-medium">Category</th>
              <th className="px-5 py-3 font-medium">Likes</th>
              <th className="px-5 py-3 font-medium">Featured</th>
              <th className="px-5 py-3 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {visibleRecipes.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-10 text-gray-400">
                  {showFeaturedOnly
                    ? "এখনো কোনো রেসিপি Featured করা হয়নি।"
                    : "কোনো রেসিপি পাওয়া যায়নি।"}
                </td>
              </tr>
            ) : (
              visibleRecipes.map((recipe) => (
                <tr
                  key={recipe._id}
                  className={`border-t border-gray-100 dark:border-gray-700 ${
                    recipe.featured ? "bg-amber-50/40" : ""
                  }`}
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        {recipe.recipeImage ? (
                          <Image
                            src={recipe.recipeImage}
                            alt={recipe.recipeName}
                            fill
                            unoptimized
                            className="object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                            <ImageOff className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                      <p className="font-medium text-gray-900 truncate max-w-40 dark:text-gray-500">
                        {recipe.recipeName}
                      </p>
                    </div>
                  </td>
                  <td className="px-5 py-3 font-medium text-gray-900 dark:text-white">
                    {recipe.userName}
                  </td>
                  <td className="px-5 py-3 text-xs text-gray-400 dark:text-gray-500">
                    {recipe.category}
                  </td>
                  <td className="px-5 py-3 text-gray-600 dark:text-gray-300">
                    {recipe.like || 0}
                  </td>
                  <td className="px-5 py-3">
                    <button
                      onClick={() => handleToggleFeature(recipe)}
                      disabled={isPending}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                        recipe.featured
                          ? "bg-amber-100 text-amber-700 hover:bg-amber-200"
                          : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                      }`}
                    >
                      <Star
                        className={`w-3.5 h-3.5 ${recipe.featured ? "fill-amber-600" : ""}`}
                      />
                      {recipe.featured ? "Featured" : "Feature it"}
                    </button>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setEditingRecipe(recipe)}
                        className="p-2 rounded-lg bg-gray-50 text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(recipe._id)}
                        disabled={isPending}
                        className="p-2 rounded-lg bg-gray-50 text-gray-600 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {!showFeaturedOnly && totalPage > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          {Array.from({ length: totalPage }).map((_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i + 1)}
              className={`px-3 py-1.5 rounded border text-sm ${
                currentPage === i + 1
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800 dark:border-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {editingRecipe && (
        <EditRecipeModalAdmin
          recipe={editingRecipe}
          isOpen={!!editingRecipe}
          onOpenChange={(open) => !open && setEditingRecipe(null)}
          onUpdated={handleUpdated}
        />
      )}
    </div>
  );
};

export default RecipesTable;
