import {getServerSession} from "@/lib/getServerSession";
import { getAdminReports } from "@/lib/actions/admin";
import ReportsTable from "./ReportsTable";

const ManageReportsPage = async ({ searchParams }) => {
  const params = await searchParams;
  const page = Number(params?.page) || 1;


  const result = await getAdminReports( page);

  const session = await getServerSession();

  if (!session?.user) {
    return (
      <div className="text-center py-20 text-red-500">Need to Login</div>
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
      <h1 className="text-3xl font-bold mb-2">Manage Reports</h1>
      <p className="text-gray-500 mb-8">
        Review reported recipes from users here
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
