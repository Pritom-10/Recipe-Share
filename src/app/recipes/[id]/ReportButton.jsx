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
      toast.error("Report করতে হলে লগইন করো");
      return;
    }
    setIsOpen(true);
  };

  const resetAndClose = () => {
    setSelectedReason("");
    setDetails("");
    setIsOpen(false);
  };

  const handleSubmit = async () => {
    if (!selectedReason) {
      toast.error("একটা reason বেছে নাও");
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
        toast.success("রিপোর্ট জমা হয়েছে, ধন্যবাদ");
        resetAndClose();
      } else {
        toast.error(result.error || "কিছু একটা সমস্যা হয়েছে");
      }
    } catch (error) {
      toast.error("কিছু একটা সমস্যা হয়েছে");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-gray-200 bg-white text-gray-500 hover:border-rose-200 hover:text-rose-600 transition-all"
      >
        <Flag className="w-4 h-4" />
        Report
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">Report Recipe</h3>
              <button
                onClick={resetAndClose}
                className="text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-gray-500 mb-4">
              কেন এই রেসিপিটা রিপোর্ট করছ, একটা কারণ বেছে নাও:
            </p>

            <div className="space-y-2 mb-4">
              {REASONS.map((reason) => (
                <label
                  key={reason}
                  className="flex items-center gap-2.5 text-sm text-gray-700 cursor-pointer p-2.5 rounded-lg hover:bg-gray-50"
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
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                বিস্তারিত (ঐচ্ছিক)
              </label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="সমস্যাটা একটু বিস্তারিত লেখো..."
                rows={3}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 resize-none"
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
