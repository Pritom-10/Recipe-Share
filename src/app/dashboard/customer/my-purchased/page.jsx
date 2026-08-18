import { getServerSession } from "@/lib/getServerSession";
import { getMyPurchased } from "@/lib/actions/purchased";
import Image from "next/image";
import Link from "next/link";
import { Clock, ImageOff, ShoppingBag } from "lucide-react";

const MyPurchasedPage = async ({ searchParams }) => {
  const params = await searchParams;
  const page = Number(params?.page) || 1;

  const session = await getServerSession();

  if (!session?.user) {
    return (
      <div className="text-center py-20 text-red-500">
        Need to be logged in to view purchased recipes.
      </div>
    );
  }


  const {
    data,
    total_page,
    page: currentPage,
  } = await getMyPurchased(page);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">My Purchased Recipes</h1>
      <p className="text-gray-500 mb-8">
        he recipes you purchase will appear here.
      </p>

      {data.length === 0 ? (
        <p className="text-center text-gray-500 py-16">
          You have not purchased any recipes yet. Start exploring and purchase
          your favorite recipes to see them here!
        </p>
      ) : (
        <div className="space-y-4">
          {data.map((purchase) => (
            <div
              key={purchase._id}
              className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                {purchase.recipeImage ? (
                  <Image
                    src={purchase.recipeImage}
                    alt={purchase.recipeName}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                    <ImageOff className="w-6 h-6" />
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 dark:text-white truncate">
                    {purchase.recipeName}
                  </p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {purchase.category && (
                      <span className="bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">
                        {purchase.category}
                      </span>
                    )}
                    {purchase.preparationTime && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {purchase.preparationTime} min
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <Link
                href={`/recipes/${purchase.recipeId}`}
                className="flex-shrink-0 flex items-center gap-1.5 bg-gradient-to-r from-orange-500 to-rose-500 text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:shadow-lg transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                View Recipe
              </Link>
            </div>
          ))}
        </div>
      )}

      {total_page > 1 && (
        <div className="flex justify-center items-center gap-2 mt-10">
          {Array.from({ length: total_page }).map((_, i) => (
            <Link
              key={i}
              href={`?page=${i + 1}`}
              className={`px-3 py-1.5 rounded border text-sm ${
                currentPage === i + 1
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800 dark:border-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              {i + 1}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPurchasedPage;
