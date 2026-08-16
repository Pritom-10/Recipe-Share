
"use client";
import ThemeToggle from "@/components/ThemeToggle";
import { authClient } from "@/lib/auth-client";
import { Avatar, Button, Dropdown, Label } from "@heroui/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { MdDashboard } from "react-icons/md";
import Logo from "@/components/Logo";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: session } = authClient.useSession();
  const user = session?.user;
  const role = user?.role || "customer";
  const dashboardHref =
    role === "admin" ? "/dashboard/admin" : "/dashboard/customer";

  const pathname = usePathname();
  const router = useRouter();

  if (pathname.includes("dashboard")) {
    return null;
  }



  const handleMenuAction = (key) => {
    if (key === "dashboard") {
      router.push(dashboardHref);
    } else if (key === "profile") {
      router.push("/dashboard/profile");
    }
  };


  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/");
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/recipes", label: "Browse Recipes" },
  ];

  return (
    <div>
      <div className="bg-black p-1 text-white"></div>

      <nav className="fixed top-0 left-0 right-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
        <header className="mx-auto flex h-16 max-w-7xl items-center justify-between px-2">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
            <Link href={"/"}>
              <div className="flex items-center gap-2.5">
                <Logo className="w-9 h-9" />
                <span className="text-lg font-bold tracking-tight text-gray-900">
                  Tech Bazaar
                </span>
              </div>
            </Link>
          </div>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-colors ${
                      isActive
                        ? "text-orange-600"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full bg-gradient-to-r from-orange-500 to-rose-500" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {!user && (
            <div className="hidden items-center gap-3 md:flex">
              <Link
                href="/signin"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                Login
              </Link>
              <Link href="/signup">
                <Button className="!bg-gradient-to-r !from-orange-500 !to-rose-500 !text-white !border-0 !rounded-xl !px-5 hover:!shadow-md transition-all">
                  Sign Up
                </Button>
              </Link>
              <ThemeToggle />
            </div>
          )}

          {user && (
            <div className="hidden items-center gap-4 md:flex">
              <ThemeToggle />
              <Dropdown>
                <Dropdown.Trigger className="rounded-full">
                  <Avatar size="sm" aria-label="Menu">
                    <Avatar.Image
                      referrerPolicy="no-referrer"
                      alt="John Doe"
                      src={user?.image}
                    />
                    <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
                  </Avatar>
                </Dropdown.Trigger>
                <Dropdown.Popover>
                  <div className="px-3 pt-3 pb-1">
                    <div className="flex items-center gap-2">
                      <Avatar size="sm">
                        <Avatar.Image alt={user?.name} src={user?.image} />
                        <Avatar.Fallback delayMs={600}>JD</Avatar.Fallback>
                      </Avatar>
                      <div className="flex flex-col gap-0">
                        <p className="text-sm leading-5 font-medium">
                          {user?.name}
                        </p>
                        <p className="text-xs leading-none text-muted">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Dropdown.Menu onAction={handleMenuAction}>
                    <Dropdown.Item id="dashboard" textValue="Dashboard">
                      <MdDashboard />
                      <Label>Dashboard</Label>
                    </Dropdown.Item>

                    <Dropdown.Item id="profile" textValue="Profile">
                      <CgProfile />
                      <Label>Profile</Label>
                    </Dropdown.Item>

                    <Dropdown.Item
                      id="logout"
                      textValue="Logout"
                      variant="danger"
                      onClick={handleSignOut}
                    >
                      <BiLogOut />
                      <Label>Logout</Label>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>
            </div>
          )}
        </header>

        {isMenuOpen && (
          <div className="border-t border-separator md:hidden">
            <ul className="flex flex-col gap-1 p-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block py-2.5 text-sm font-medium text-gray-700"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {user && (
                <li>
                  <Link
                    href={dashboardHref}
                    className="block py-2.5 text-sm font-medium text-orange-600"
                  >
                    Dashboard
                  </Link>
                </li>
              )}
              {!user ? (
                <li className="mt-3 flex flex-col gap-2 border-t border-separator pt-4">
                  <Link
                    href="/signin"
                    className="block py-2 text-sm font-medium"
                  >
                    Login
                  </Link>
                  <Link href="/signup">
                    <Button className="!w-full !bg-gradient-to-r !from-orange-500 !to-rose-500 !text-white !border-0 !rounded-xl">
                      Sign Up
                    </Button>
                  </Link>
                </li>
              ) : (
                <li className="mt-3 flex flex-col gap-2 border-t border-separator pt-4">
                  <Link
                    href="/dashboard/profile"
                    className="block py-2 text-sm font-medium"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block py-2 text-left text-sm font-medium text-danger"
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        )}
      </nav>
      <div className="h-16" />
    </div>
  );
};

export default Navbar;
