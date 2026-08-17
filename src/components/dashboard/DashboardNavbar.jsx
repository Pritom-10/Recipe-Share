
"use client";
import ThemeToggle from "@/components/ThemeToggle";
import { authClient } from "@/lib/auth-client";
import { Avatar, Dropdown, Label } from "@heroui/react";
import { useRouter } from "next/navigation";
import { Bell } from "lucide-react";
import { BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";

const DashboardNavbar = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/");
  };

  const handleMenuAction = (key) => {
    if (key === "profile") {
      router.push("/dashboard/customer/profile");
    }
  };

  const greetingName = user?.name?.split(" ")[0] || "there";

  return (
    <header className="sticky top-0 z-10 backdrop-blur-2xl bg-white/50 dark:bg-gray-900/60 border-b border-white/60 dark:border-gray-800 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Welcome back, {greetingName}
              <span className="ml-1">👋</span>
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Here&apos;s what&apos;s happening today.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button className="p-2.5 rounded-xl bg-white/70 border border-white/60 text-gray-500 hover:text-orange-600 hover:bg-white transition-colors shadow-sm">
            <Bell className="w-4.5 h-4.5" />
          </button>

          {user && (
            <Dropdown>
              <Dropdown.Trigger className="rounded-full ring-2 ring-white/70 hover:ring-orange-300 transition-all">
                <Avatar size="sm" aria-label="Menu">
                  <Avatar.Image
                    referrerPolicy="no-referrer"
                    alt={user.name}
                    src={user?.image}
                  />
                  <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
                </Avatar>
              </Dropdown.Trigger>
              <Dropdown.Popover className="backdrop-blur-2xl bg-white/70 border border-white/60 rounded-2xl shadow-xl">
                <div className="px-3 pt-3 pb-2">
                  <div className="flex items-center gap-2">
                    <Avatar size="sm">
                      <Avatar.Image alt={user?.name} src={user?.image} />
                      <Avatar.Fallback delayMs={600}>
                        {user.name.charAt(0)}
                      </Avatar.Fallback>
                    </Avatar>
                    <div className="flex flex-col gap-0">
                      <p className="text-sm leading-5 font-semibold text-gray-900">
                        {user?.name}
                      </p>
                      <p className="text-xs leading-none text-gray-500">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                </div>

                <Dropdown.Menu onAction={handleMenuAction}>
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
          )}
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;
