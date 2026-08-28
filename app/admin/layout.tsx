import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LogOut, LayoutDashboard, Briefcase, Settings } from "lucide-react";
import { authOptions } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-800">
          <Link href="/" className="font-bold text-xl text-blue-400">
            HK Admin
          </Link>
        </div>
        <nav className="flex-1 py-6 space-y-2 px-3">
          <Link href="/admin" className="flex items-center px-3 py-2 text-gray-300 hover:bg-gray-800 rounded-md">
            <LayoutDashboard className="w-5 h-5 mr-3" />
            Dashboard
          </Link>
          <Link href="/admin/jobs" className="flex items-center px-3 py-2 text-gray-300 hover:bg-gray-800 rounded-md">
            <Briefcase className="w-5 h-5 mr-3" />
            Manage Jobs
          </Link>
          <Link href="/admin/settings" className="flex items-center px-3 py-2 text-gray-300 hover:bg-gray-800 rounded-md">
            <Settings className="w-5 h-5 mr-3" />
            Settings
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-800">
          <div className="text-sm text-gray-400 mb-4 px-2 truncate">{session.user?.email}</div>
          <Link href="/api/auth/signout" className="flex items-center px-3 py-2 text-red-400 hover:bg-gray-800 rounded-md transition-colors">
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
