
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import MyRecipesGrid from "./MyRecipesGrid";
import MyRecipesPagination from "./MyRecipesPagination";

const SERVER_URL = process.env.NEXT_PUBLIC_BASE_URL;
const LIMIT = 8;

const MyRecipesPage = async ({ searchParams }) => {
  const params = await searchParams;
  const page = Number(params?.page) || 1;

  const headersList = await headers();

  const { token } = await auth.api.getToken({
    headers: headersList,
  });

  if (!token) {
    return (
      <div className="text-center py-20 text-red-500">Need to Login</div>
    );
  }

  const res = await fetch(
    `${SERVER_URL}/customer/my-recipes?page=${page}&limit=${LIMIT}`,
    {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!res.ok) {
    return (
      <div className="text-center py-20 text-red-500">
        Failed to load recipes.
      </div>
    );
  }

  const { data, total_page, page: currentPage } = await res.json();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">My Recipes</h1>
      <p className="text-gray-500 mb-8">
        Recipes you&apos;ve added to the platform.
      </p>

      {data.length === 0 ? (
        <p className="text-center text-gray-500 py-16">
          You have not shared any recipes yet!
        </p>
      ) : (
        <>
          <MyRecipesGrid recipes={data} />
          <MyRecipesPagination
            currentPage={currentPage}
            totalPages={total_page}
          />
        </>
      )}
    </div>
  );
};

export default MyRecipesPage;
