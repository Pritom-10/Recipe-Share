// app/recipes/RecipeSearch.jsx
"use client";

import { Search } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";

const RecipeSearch = ({ defaultValue }) => {
  const [value, setValue] = useState(defaultValue || "");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-10">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search by name, category or cuisine..."
          className="w-full pl-12 pr-28 py-3.5 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
        />
        <button
          type="submit"
          className="absolute right-1.5 top-1.5 bottom-1.5 px-6 rounded-full bg-gradient-to-r from-orange-500 to-rose-500 text-white text-sm font-medium hover:shadow-md transition-all"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default RecipeSearch;
