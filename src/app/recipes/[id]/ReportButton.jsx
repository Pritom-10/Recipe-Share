// app/recipes/[id]/ReportButton.jsx
"use client";

import { useState } from "react";
import { Flag, X } from "lucide-react";
import toast from "react-hot-toast";
import { reportRecipe } from "@/lib/actions/recipe-interactions";
import { authClient } from "@/lib/auth-client";

const REASONS = ["Spam", "Offensive Content", "Copyright Issue"];

const ReportButton = ({ recipeId }) => {
  const { data: session } = authClient.useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");
  const [details, setDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpen = () => {
    if (!session?.user) {
      toast.error("Report the recipe by logging in");
      return;
    }
    setIsOpen(true);
  };

  const handleSubmit = async () => {
    if (!selectedReason) {
      toast.error("Please select a reason");
      return;
    }

    setIsSubmitting(true);
    try {
      const { data } = await authClient.token();
      const token = data?.token;

      const result = await reportRecipe(
        recipeId,
        selectedReason,
        details,
        token,
      );

      if (result.success) {
        toast.success("Report submitted successfully, thank you!");
        setIsOpen(false);
        setSelectedReason("");
        setDetails("");
      } else {
        toast.error(result.error || "Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:border-rose-200 hover:text-rose-600 transition-all"
      >
        <Flag className="w-4 h-4" />
        Report
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 dark:text-white">
                Report Recipe
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              কেন এই রেসিপিটা রিপোর্ট করছ, একটা কারণ বেছে নাও:
            </p>

            <div className="space-y-2 mb-4">
              {REASONS.map((reason) => (
                <label
                  key={reason}
                  className="flex items-center gap-2.5 text-sm text-gray-700 dark:text-gray-300 cursor-pointer p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <input
                    type="radio"
                    name="reason"
                    checked={selectedReason === reason}
                    onChange={() => setSelectedReason(reason)}
                    className="w-4 h-4 text-rose-500 focus:ring-rose-400"
                  />
                  {reason}
                </label>
              ))}
            </div>

            <div className="mb-6">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                Additional details (optional)
              </label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                rows={3}
                placeholder="বিস্তারিত লিখতে পারো, যেমন কোথায় সমস্যা মনে হয়েছে..."
                className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 resize-none"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-rose-500 text-white font-semibold py-2.5 rounded-xl hover:bg-rose-600 transition-colors disabled:opacity-60"
            >
              {isSubmitting ? "Submitting..." : "Submit Report"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ReportButton;
