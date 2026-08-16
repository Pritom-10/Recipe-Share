import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export default function RootLayout({ children }) {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-rose-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
     
      <div className="fixed top-0 left-0 w-96 h-96 bg-orange-400/30 rounded-full blur-3xl -z-0" />
      <div className="fixed top-1/3 left-1/4 w-96 h-96 bg-rose-400/25 rounded-full blur-3xl -z-0" />
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-amber-300/25 rounded-full blur-3xl -z-0" />
      <div className="fixed top-2/3 right-1/4 w-72 h-72 bg-orange-300/25 rounded-full blur-3xl -z-0" />

      {/* Navbar এর ঠিক পেছনে, উপরের strip জুড়ে */}
      <div className="fixed top-0 left-1/3 w-96 h-72 bg-rose-400/30 rounded-full blur-3xl -z-0" />
      <div className="fixed top-0 right-0 w-96 h-72 bg-orange-400/30 rounded-full blur-3xl -z-0" />
      <div className="fixed top-0 right-1/4 w-80 h-64 bg-amber-300/30 rounded-full blur-3xl -z-0" />

      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 z-10">
        <DashboardSidebar />
      </aside>

      {/* Main Content Area */}
      <div className="ml-64 min-h-screen flex flex-col relative z-10">
        {/* Navbar */}
        <DashboardNavbar />

        {/* Page Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
