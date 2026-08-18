"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Receipt } from "lucide-react";

const TransactionsTable = ({ initialTransactions, totalPage, currentPage }) => {
  const [transactions, setTransactions] = useState(initialTransactions);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTransactions(initialTransactions);
  }, [initialTransactions]);

  const goToPage = (page) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`${pathname}?${params.toString()}`);
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatAmount = (amount) => {
    if (!amount) return "N/A";
    return `$${(amount / 100).toFixed(2)}`;
  };

  const statusStyle = {
    completed:
      "bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400",
    pending: "bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400",
    failed: "bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400",
  };

  return (
    <div>
      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400 text-left">
            <tr>
              <th className="px-5 py-3 font-medium">User</th>
              <th className="px-5 py-3 font-medium">Recipe</th>
              <th className="px-5 py-3 font-medium">Amount</th>
              <th className="px-5 py-3 font-medium">Date</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Transaction ID</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-10 text-gray-400 dark:text-gray-500"
                >
                  <Receipt className="w-8 h-8 mx-auto mb-2 opacity-40" />
                  No transactions found.
                </td>
              </tr>
            ) : (
              transactions.map((tx) => (
                <tr
                  key={tx._id}
                  className="border-t border-gray-100 dark:border-gray-700"
                >
                  <td className="px-5 py-3">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {tx.userName || "N/A"}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      {tx.userEmail || tx.userId}
                    </p>
                  </td>
                  <td className="px-5 py-3 text-gray-900 dark:text-white font-medium">
                    {tx.recipeName}
                  </td>
                  <td className="px-5 py-3 text-gray-700 dark:text-gray-300 font-semibold">
                    {formatAmount(tx.amount)}
                  </td>
                  <td className="px-5 py-3 text-gray-500 dark:text-gray-400">
                    {formatDate(tx.createdAt)}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${
                        statusStyle[tx.status] || statusStyle.completed
                      }`}
                    >
                      {tx.status || "completed"}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-gray-400 dark:text-gray-500 font-mono text-xs truncate max-w-[140px]">
                    {tx.session_id}
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

export default TransactionsTable;
