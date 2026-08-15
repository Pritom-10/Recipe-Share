import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getAdminReports } from "@/lib/actions/admin";
import ReportsTable from "./ReportsTable";

const ManageReportsPage = async ({ searchParams }) => {
  const params = await searchParams;
  const page = Number(params?.page) || 1;

  const headersList = await headers();
  const { token } = await auth.api.getToken({ headers: headersList });

  const result = await getAdminReports(token, page);

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
      <h1 className="text-3xl font-bold mb-2">Manage Reports</h1>
      <p className="text-gray-500 mb-8">
        ইউজারদের রিপোর্ট করা রেসিপিগুলো এখানে রিভিউ করো।
      </p>

      <ReportsTable
        key={page}
        initialReports={result.data}
        totalPage={result.total_page}
        currentPage={result.page}
      />
    </div>
  );
};

export default ManageReportsPage;
