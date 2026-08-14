"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";

const DashboardSidebar = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const role = user?.role || "customer";

  const navMenu = {
    customer: [
      {
        title: "Overview",
        href: "/dashboard/customer",
      },
      {
        title: "My Recipes",
        href: "/dashboard/customer/my-recipes",
      },
      {
        title: "Add Recipe ",
        href: "/dashboard/customer/add-recipe",
      },

      {
        title: "My Favorites",
        href: "/dashboard/customer/my-favourites",
      },
      {
        title: "My purchased recipes",
        href: "/dashboard/customer/my-purchased",
      },
      {
        title: "Profile",
        href: "/dashboard/customer/profile",
      },
    ],

    admin: [
      {
        title: "Overview",
        href: "/dashboard/admin",
      },
      {
        title: "Manage Users",
        href: "/dashboard/admin/users",
      },
      {
        title: "Manage Recipes",
        href: "/dashboard/admin/manage-recipes",
      },
      {
        title: "Reports",
        href: "/dashboard/admin/reports",
      },
    ],
  };

  const menu = navMenu[role];

  return (
    <div>
      <nav className="p-4 space-y-2">
        {menu.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="block px-4 py-2 rounded hover:bg-gray-100"
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default DashboardSidebar;
