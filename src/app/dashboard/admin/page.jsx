import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getAdminOverview } from "@/lib/actions/admin";
import { Users, ChefHat, Crown, Flag } from "lucide-react";

const AdminDashboard = async () => {
  const headersList = await headers();
  const { token } = await auth.api.getToken({ headers: headersList });

  const stats = await getAdminOverview(token);

  if (stats.msg) {
    return (
      <div className="text-center py-20 text-red-500">
        {stats.msg === "Forbidden: Admins only"
          ? "তোমার এই পেজ দেখার অনুমতি নেই।"
          : "লগইন করা প্রয়োজন।"}
      </div>
    );
  }

  const cards = [
    {
      label: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      color: "from-blue-500 to-indigo-500",
    },
    {
      label: "Total Recipes",
      value: stats.totalRecipes,
      icon: ChefHat,
      color: "from-orange-500 to-rose-500",
    },
    {
      label: "Total Premium Members",
      value: stats.totalPremiumMembers,
      icon: Crown,
      color: "from-amber-400 to-yellow-500",
    },
    {
      label: "Total Reports",
      value: stats.totalReports,
      icon: Flag,
      color: "from-red-500 to-rose-600",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
      <p className="text-gray-500 mb-8">
        প্ল্যাটফর্মের সামগ্রিক অবস্থা এখানে দেখো।
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm"
          >
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-r ${color} flex items-center justify-center mb-4`}
            >
              <Icon className="w-6 h-6 text-white" />
            </div>
            <p className="text-sm text-gray-500 mb-1">{label}</p>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
