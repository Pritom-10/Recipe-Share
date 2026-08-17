
"use client";

import { Search, X } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";

const CATEGORIES = ["Main Course", "Appetizer", "Dessert", "Pasta", "Soup"];
const CUISINES = ["Bangladeshi", "Chinese", "Italian", "Indian", "Thai"];

const RecipeFilters = ({ defaultParams }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(defaultParams?.search || "");
  const [category, setCategory] = useState(
    defaultParams?.category ? defaultParams.category.split(",") : [],
  );
  const [cuisineType, setCuisineType] = useState(
    defaultParams?.cuisineType ? defaultParams.cuisineType.split(",") : [],
  );
  const [minTime, setMinTime] = useState(defaultParams?.minTime || "");
  const [maxTime, setMaxTime] = useState(defaultParams?.maxTime || "");

  const isFirstRender = useRef(true);
  const debounceRef = useRef(null);

  const applyFilters = ({
    search: s = search,
    category: c = category,
    cuisineType: ct = cuisineType,
    minTime: min = minTime,
    maxTime: max = maxTime,
  } = {}) => {
    const params = new URLSearchParams(searchParams.toString());

    s ? params.set("search", s) : params.delete("search");
    c.length ? params.set("category", c.join(",")) : params.delete("category");
    ct.length
      ? params.set("cuisineType", ct.join(","))
      : params.delete("cuisineType");
    min ? params.set("minTime", min) : params.delete("minTime");
    max ? params.set("maxTime", max) : params.delete("maxTime");
    params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      applyFilters({ search });
    }, 400);

    return () => clearTimeout(debounceRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const toggleValue = (list, setList, value) => {
    const updated = list.includes(value)
      ? list.filter((v) => v !== value)
      : [...list, value];
    setList(updated);
    return updated;
  };

  const handleReset = () => {
    setSearch("");
    setCategory([]);
    setCuisineType([]);
    setMinTime("");
    setMaxTime("");
    router.push(pathname);
  };

  return (
    <aside className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 h-fit sticky top-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-bold text-gray-900 dark:text-white">Refine</h2>
        <button
          onClick={handleReset}
          className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
          Reset
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Search by name
        </p>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="e.g. Chicken Biryani"
            className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>
      </div>

      {/* Category */}
      <div className="mb-6">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Category
        </p>
        <div className="space-y-2.5">
          {CATEGORIES.map((cat) => (
            <label
              key={cat}
              className="flex items-center gap-2.5 text-sm text-gray-600 dark:text-gray-400 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={category.includes(cat)}
                onChange={() => {
                  const updated = toggleValue(category, setCategory, cat);
                  applyFilters({ category: updated });
                }}
                className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-orange-500 focus:ring-orange-400"
              />
              {cat}
            </label>
          ))}
        </div>
      </div>

      {/* Cuisine */}
      <div className="mb-6">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Cuisine
        </p>
        <div className="space-y-2.5">
          {CUISINES.map((cuisine) => (
            <label
              key={cuisine}
              className="flex items-center gap-2.5 text-sm text-gray-600 dark:text-gray-400 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={cuisineType.includes(cuisine)}
                onChange={() => {
                  const updated = toggleValue(
                    cuisineType,
                    setCuisineType,
                    cuisine,
                  );
                  applyFilters({ cuisineType: updated });
                }}
                className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-orange-500 focus:ring-orange-400"
              />
              {cuisine}
            </label>
          ))}
        </div>
      </div>

      {/* Prep time range */}
      <div>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Preparation Time (min)
        </p>
        <div className="flex gap-3">
          <input
            type="number"
            value={minTime}
            onChange={(e) => setMinTime(e.target.value)}
            onBlur={() => applyFilters({ minTime })}
            placeholder="Min"
            className="w-1/2 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <input
            type="number"
            value={maxTime}
            onChange={(e) => setMaxTime(e.target.value)}
            onBlur={() => applyFilters({ maxTime })}
            placeholder="Max"
            className="w-1/2 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>
      </div>
    </aside>
  );
};

export default RecipeFilters;