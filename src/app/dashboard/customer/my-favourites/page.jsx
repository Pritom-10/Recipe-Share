import { getServerToken } from "@/lib/getServerToken";
import { getServerSession } from "@/lib/getServerSession";
import FavouritesGrid from "./FavouritesGrid";
import MyRecipesPagination from "../my-recipes/MyRecipesPagination";

const SERVER_URL = process.env.SERVER_URL;
const LIMIT = 8;

const MyFavouritesPage = async ({ searchParams }) => {
  const token = await getServerToken();
    const params = await searchParams;
  const page = Number(params?.page) || 1;

  const session = await getServerSession();

  if (!session?.user) {
    return (
      <div className="text-center py-20 text-red-500">
       Need to be logged in to view favourite recipes.
      </div>
    );
  }

  const res = await fetch(
    `${SERVER_URL}/customer/my-favourites?page=${page}&limit=${LIMIT}`,
    {
      cache: "no-store",
      headers: { authorization: `Bearer ${token}` },
    },
  );

  if (!res.ok) {
    return (
      <div className="text-center py-20 text-red-500">
        Recipe Loaded Problem. Please try again later.
      </div>
    );
  }

  const { data, total_page, page: currentPage } = await res.json();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">My Favourites</h1>
      <p className="text-gray-500 mb-8">
        Recipes you&apos;ve added to your favourites.
      </p>

      {data.length === 0 ? (
        <p className="text-center text-gray-500 py-16">
          You have not added any recipes to your favourites yet. Start exploring and add your favourite recipes to see them here!
        </p>
      ) : (
        <>
          <FavouritesGrid recipes={data} />
          <MyRecipesPagination
            currentPage={currentPage}
            totalPages={total_page}
          />
        </>
      )}
    </div>
  );
};

export default MyFavouritesPage;