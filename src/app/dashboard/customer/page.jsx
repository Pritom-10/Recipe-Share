// app/dashboard/customer/page.jsx
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { stripe } from "@/lib/stripe";
import { getRecipeStatus, confirmUpgrade } from "@/lib/actions/upgrade";
import { getMyRecipesOverview } from "@/lib/actions/overview";
import { AddRecipe } from "@/components/dashboard/AddRecipe";
import Image from "next/image";
import { Heart, ImageOff } from "lucide-react";

const CustomerDashboard = async ({ searchParams }) => {
  const params = await searchParams;
  const headersList = await headers();

  const { token } = await auth.api.getToken({ headers: headersList });

  // Stripe payment সাকসেস হলে প্ল্যান আপডেট করে দাও
  if (params?.session_id) {
    const checkoutSession = await stripe.checkout.sessions.retrieve(
      params.session_id,
    );
    if (checkoutSession.status === "complete") {
      await confirmUpgrade(token);
    }
  }

  const status = await getRecipeStatus(token);
  const overview = await getMyRecipesOverview(token);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Customer Dashboard</h1>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 flex items-center justify-between flex-wrap gap-4">
        <div>
          <p className="text-sm text-gray-500 mb-1">Recipes Added</p>
          <p className="text-2xl font-bold text-gray-500">
            {status.recipeCount}
            {status.plan !== "premium" && (
              <span className="text-gray-400 text-lg"> / {status.limit}</span>
            )}
          </p>
          <span className="inline-block mt-2 text-xs font-semibold px-2.5 py-1 rounded-full bg-orange-100 text-orange-600">
            {status.plan === "premium" ? "Premium" : "Free Plan"}
          </span>
        </div>

        {status.plan !== "premium" && (
          <form action="/api/upgrade-premium" method="POST">
            <button
              type="submit"
              className="bg-gradient-to-r from-orange-500 to-rose-500 text-white font-semibold px-6 py-3 rounded-xl hover:shadow-lg transition-all"
            >
              Upgrade to Premium
            </button>
          </form>
        )}
      </div>

      {/* Likes summary */}
      <div className="grid sm:grid-cols-2 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <p className="text-sm text-gray-500 mb-1">Total Recipes Added</p>
          <p className="text-3xl font-bold text-gray-900">
            {overview.totalRecipes}
          </p>
        </div>
        <div className="bg-gradient-to-r from-orange-50 to-rose-50 border border-orange-100 rounded-2xl p-6">
          <p className="text-sm text-orange-600 mb-1">Total Likes Received</p>
          <p className="text-3xl font-bold text-orange-600 flex items-center gap-2">
            <Heart className="w-7 h-7 fill-orange-500 text-orange-500" />
            {overview.totalLikes}
          </p>
        </div>
      </div>

      {status.limitReached ? (
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 text-center mb-10">
          <p className="text-gray-700 font-medium mb-3">
            Free plan এ সর্বোচ্চ {status.limit}টি রেসিপি যোগ করা যায়। আরও
            রেসিপি যোগ করতে Premium এ আপগ্রেড করো।
          </p>
          <form action="/api/upgrade-premium" method="POST">
            <button
              type="submit"
              className="bg-gradient-to-r from-orange-500 to-rose-500 text-white font-semibold px-6 py-3 rounded-xl hover:shadow-lg transition-all"
            >
              Upgrade to Premium
            </button>
          </form>
        </div>
      ) : (
        <div className="mb-10">
          <AddRecipe />
        </div>
      )}

      {/* Recipe-wise likes breakdown */}
      <h2 className="text-xl font-bold dark:text-gray-400 text-gray-900 mb-4">
        Recipe-wise Likes
      </h2>

      {overview.recipes.length === 0 ? (
        <p className="text-gray-500 py-10 text-center">
          তুমি এখনো কোনো রেসিপি যোগ করোনি।
        </p>
      ) : (
        <div className="space-y-3">
          {overview.recipes
            .sort((a, b) => (b.like || 0) - (a.like || 0))
            .map((recipe) => (
              <div
                key={recipe._id}
                className="flex items-center gap-4 bg-white border border-gray-100 rounded-xl p-4 shadow-sm"
              >
                <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
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
                      <ImageOff className="w-6 h-6" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate">
                    {recipe.recipeName}
                  </p>
                  {recipe.likedBy?.length > 0 && (
                    <p className="text-xs text-gray-400 truncate">
                      লাইক দিয়েছে:{" "}
                      {recipe.likedBy.map((l) => l.userName).join(", ")}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-1.5 bg-rose-50 text-rose-600 px-3 py-1.5 rounded-full text-sm font-semibold flex-shrink-0">
                  <Heart className="w-4 h-4 fill-rose-500" />
                  {recipe.like || 0}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default CustomerDashboard;
