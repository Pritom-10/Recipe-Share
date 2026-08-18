import {getServerSession} from "@/lib/getServerSession";
import { getAdminRecipes } from "@/lib/actions/admin";
import RecipesTable from "./RecipesTable";

const ManageRecipesPage = async ({ searchParams }) => {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const search = params?.search || "";



  const result = await getAdminRecipes( page, search);

 const session = await getServerSession();

  if (!session?.user) {
    return (
      <div className="text-center py-20 text-red-500">
        Need to Login

      </div>
    );
  }

  if (session.user.role !== "admin") {
    return (
      <div className="text-center py-20 text-red-500">
        You are not permited for this page
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">Manage Recipes</h1>
      <p className="text-gray-500 mb-8">
        View all users recipes here to edit, delete, or feature them
      </p>
      <p className="text-sm text-gray-400 mb-4">
        Total: {result.total_data} recipes
      </p>

      <RecipesTable
        key={`${page}-${search}`}
        initialRecipes={result.data}
        totalPage={result.total_page}
        currentPage={result.page}
        initialSearch={search}
      />
    </div>
  );
};

export default ManageRecipesPage;
