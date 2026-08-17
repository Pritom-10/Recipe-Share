"use client";

import { useState, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { updateReportStatus } from "@/lib/actions/admin";
import { authClient } from "@/lib/auth-client";
import { CheckCircle, XCircle } from "lucide-react";

const ReportsTable = ({ initialReports, totalPage, currentPage }) => {
  const [reports, setReports] = useState(initialReports);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const goToPage = (page) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleStatusChange = (reportId, status) => {
    const prev = reports;
    setReports((r) =>
      r.map((rep) => (rep._id === reportId ? { ...rep, status } : rep)),
    );

    startTransition(async () => {
      try {
        const { data } = await authClient.token();
        const token = data?.token;

        const result = await updateReportStatus(reportId, status, token);
        if (!result.success) throw new Error();
        toast.success("রিপোর্ট আপডেট হয়েছে");
      } catch (error) {
        setReports(prev);
        toast.error("কিছু একটা সমস্যা হয়েছে");
      }
    });
  };

  const statusStyle = {
    pending: "bg-amber-50 text-amber-600",
    resolved: "bg-emerald-50 text-emerald-600",
    dismissed: "bg-gray-100 text-gray-500",
  };

  return (
    <div>
      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400 text-left">
            <tr>
              <th className="px-5 py-3 font-medium">Recipe</th>
              <th className="px-5 py-3 font-medium">Reason</th>
              <th className="px-5 py-3 font-medium">Reported By</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-10 text-gray-400 dark:text-gray-500"
                >
                  কোনো রিপোর্ট নেই।
                </td>
              </tr>
            ) : (
              reports.map((report) => (
                <tr
                  key={report._id}
                  className="border-t border-gray-100 dark:border-gray-700"
                >
                  <td className="px-5 py-3">
                    <Link
                      href={`/recipes/${report.recipeId}`}
                      className="font-medium text-gray-900 hover:text-orange-600 hover:underline"
                    >
                      {report.recipeName}
                    </Link>
                  </td>
                  <td className="px-5 py-3 text-gray-600 dark:text-gray-300">
                    <p>{report.reason}</p>
                    {report.details && (
                      <p
                        className="text-xs text-gray-400 mt-0.5 max-w-50 truncate"
                        title={report.details}
                      >
                        {report.details}
                      </p>
                    )}
                  </td>
                  <td className="px-5 py-3 text-gray-600 dark:text-gray-300">
                    {report.reportedByName}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${statusStyle[report.status]}`}
                    >
                      {report.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    {report.status === "pending" && (
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() =>
                            handleStatusChange(report._id, "resolved")
                          }
                          disabled={isPending}
                          className="p-2 rounded-lg bg-gray-50 text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                          title="Resolve"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() =>
                            handleStatusChange(report._id, "dismissed")
                          }
                          disabled={isPending}
                          className="p-2 rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors"
                          title="Dismiss"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPage > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          {Array.from({ length: totalPage }).map((_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i + 1)}
              className={`px-3 py-1.5 rounded border text-sm ${
                currentPage === i + 1
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800 dark:border-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReportsTable;
