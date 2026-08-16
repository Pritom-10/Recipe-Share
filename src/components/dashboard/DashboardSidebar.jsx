"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ChefHat,
  PlusCircle,
  Heart,
  ShoppingBag,
  User,
  Users,
  Flag,
  UtensilsCrossed,
} from "lucide-react";

const iconMap = {
  Overview: LayoutDashboard,
  "My Recipes": ChefHat,
  "Add Recipe ": PlusCircle,
  "My Favorites": Heart,
  "My purchased recipes": ShoppingBag,
  Profile: User,
  "Manage Users": Users,
  "Manage Recipes": UtensilsCrossed,
  Reports: Flag,
};

const DashboardSidebar = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const pathname = usePathname();

  const role = user?.role || "customer";

  const navMenu = {
    customer: [
      { title: "Overview", href: "/dashboard/customer" },
      { title: "My Recipes", href: "/dashboard/customer/my-recipes" },
      { title: "Add Recipe ", href: "/dashboard/customer/add-recipe" },
      { title: "My Favorites", href: "/dashboard/customer/my-favourites" },
      {
        title: "My purchased recipes",
        href: "/dashboard/customer/my-purchased",
      },
      { title: "Profile", href: "/dashboard/customer/profile" },
    ],
    admin: [
      { title: "Overview", href: "/dashboard/admin" },
      { title: "Manage Users", href: "/dashboard/admin/users" },
      { title: "Manage Recipes", href: "/dashboard/admin/recipes" },
      { title: "Reports", href: "/dashboard/admin/reports" },
    ],
  };

  const menu = navMenu[role];

  return (
    <aside className="h-full w-64 backdrop-blur-2xl bg-white/50 border-r border-white/60">
      <div className="px-6 py-6 flex items-center gap-2 border-b border-white/60">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 flex items-center justify-center shadow-md">
          <ChefHat className="w-5 h-5 text-white" />
        </div>
        <span className="font-bold text-gray-900">
          {role === "admin" ? "Admin Panel" : "Dashboard"}
        </span>
      </div>

      <nav className="p-4 space-y-1.5">
        {menu.map((item) => {
          const Icon = iconMap[item.title] || LayoutDashboard;
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard/customer" &&
              item.href !== "/dashboard/admin" &&
              pathname.startsWith(item.href));

          return (
            <Link
              key={item.title}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-md shadow-orange-200"
                  : "text-gray-600 hover:bg-white/70 hover:text-gray-900"
              }`}
            >
              <Icon className="w-4.5 h-4.5 flex-shrink-0" />
              {item.title.trim()}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
