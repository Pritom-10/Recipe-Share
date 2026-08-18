"use client";

import { useState, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { updateReportStatus, removeReportedRecipe } from "@/lib/actions/admin";
import { CheckCircle, XCircle, Trash2 } from "lucide-react";

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
        const result = await updateReportStatus(reportId, status);
        if (!result.success) throw new Error();
        toast.success("Report status updated successfully");
      } catch (error) {
        setReports(prev);
        toast.error("Something went wrong");
      }
    });
  };

  const handleRemoveRecipe = (report) => {
    if (
      !confirm(
        `Are you sure you want to permanently delete the recipe "${report.recipeName}"?`,
      )
    )
      return;

    const prev = reports;
    setReports((r) =>
      r.map((rep) =>
        rep._id === report._id ? { ...rep, status: "resolved" } : rep,
      ),
    );

    startTransition(async () => {
      try {
        const result = await removeReportedRecipe(report._id);
        if (!result.success) throw new Error();
        toast.success("Recipe deleted successfully");
      } catch (error) {
        setReports(prev);
        toast.error("Something went wrong");
      }
    });
  };

  const statusStyle = {
    pending: "bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400",
    resolved:
      "bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400",
    dismissed: "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400",
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
                  No reports found. All recipes are in good standing.
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
                      className="font-medium text-gray-900 dark:text-white hover:text-orange-600 dark:hover:text-orange-400 hover:underline"
                    >
                      {report.recipeName}
                    </Link>
                  </td>
                  <td className="px-5 py-3 text-gray-600 dark:text-gray-300">
                    <p>{report.reason}</p>
                    {report.details && (
                      <p
                        className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 max-w-50 truncate"
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
                          className="p-2 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-950 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                          title="Resolve"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() =>
                            handleStatusChange(report._id, "dismissed")
                          }
                          disabled={isPending}
                          className="p-2 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                          title="Dismiss"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleRemoveRecipe(report)}
                          disabled={isPending}
                          className="p-2 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-300 hover:bg-rose-50 dark:hover:bg-rose-950 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                          title="Remove Recipe"
                        >
                          <Trash2 className="w-4 h-4" />
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
