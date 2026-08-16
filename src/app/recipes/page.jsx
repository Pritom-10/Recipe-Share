import RecipePagination from "./RecipePagination";
import RecipeGrid from "./RecipeGrid";
import RecipeFilters from "./RecipeFilters";

const SERVER_URL = process.env.SERVER_URL;
const LIMIT = 8;

const buildQuery = (params) => {
  const query = new URLSearchParams();
  query.set("page", params?.page || "1");
  query.set("limit", LIMIT);
  if (params?.search) query.set("search", params.search);
  if (params?.category) query.set("category", params.category);
  if (params?.cuisineType) query.set("cuisineType", params.cuisineType);
  if (params?.minTime) query.set("minTime", params.minTime);
  if (params?.maxTime) query.set("maxTime", params.maxTime);
  return query.toString();
};

const AllrecipePage = async ({ searchParams }) => {
  const params = await searchParams;

 const res = await fetch(`${SERVER_URL}/recipes?${buildQuery(params)}`, {
   cache: "no-store",
 });

 if (!res.ok) {
   const errorBody = await res.text();
   console.log("Status:", res.status, "Body:", errorBody);
   return (
     <div className="text-center py-20 text-red-500">
       রেসিপি লোড করতে সমস্যা হয়েছে। ({res.status})
     </div>
   );
 }

  const { recipes, totalCount, totalPages, currentPage } = await res.json();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent">
        All Recipes
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">
        Browse the full catalog. Filter by category, cuisine, or search by name.
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
        <RecipeFilters defaultParams={params} />

        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Showing{" "}
            <span className="font-semibold text-gray-800 dark:text-gray-400">
              {recipes.length}
            </span>{" "}
            of <span className="font-semibold text-gray-800 dark:text-gray-400">{totalCount}</span>{" "}
            recipes
          </p>

          {recipes.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 py-16">
              কোনো রেসিপি পাওয়া যায়নি।
            </p>
          ) : (
            <>
              <RecipeGrid recipes={recipes} />
              <RecipePagination
                currentPage={currentPage}
                totalPages={totalPages}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllrecipePage;
