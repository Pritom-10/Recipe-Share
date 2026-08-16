import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getUsers } from "@/lib/actions/admin";
import UsersTable from "./UsersTable";

const ManageUsersPage = async ({ searchParams }) => {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const search = params?.search || "";

  const headersList = await headers();
  const { token } = await auth.api.getToken({ headers: headersList });

  const result = await getUsers(token, page, search);

  if (result.msg) {
    return (
      <div className="text-center py-20 text-red-500">
        {result.msg === "Forbidden: Admins only"
          ? "তোমার এই পেজ দেখার অনুমতি নেই।"
          : "লগইন করা প্রয়োজন।"}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">Manage Users</h1>
      <p className="text-gray-500 mb-8">
        সব ইউজার এখানে দেখো এবং ব্লক/আনব্লক করো।
      </p>

      <UsersTable
        key={`${page}-${search}`}
        initialUsers={result.data}
        totalPage={result.total_page}
        currentPage={result.page}
        initialSearch={search}
      />
    </div>
  );
};

export default ManageUsersPage;
