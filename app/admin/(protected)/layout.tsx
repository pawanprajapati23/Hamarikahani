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
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-xl z-20 relative">
        <div className="h-20 flex items-center px-8 border-b border-slate-800">
          <Link href="/" className="font-extrabold text-2xl tracking-tight text-white flex items-center gap-2">
            <span className="bg-blue-600 text-white w-8 h-8 rounded flex items-center justify-center text-lg">H</span>
            Hamarikahani
          </Link>
        </div>
        
        <div className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Management
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <Link href="/admin" className="flex items-center px-4 py-3 text-slate-300 hover:bg-blue-600 hover:text-white rounded-xl transition-all group">
            <LayoutDashboard className="w-5 h-5 mr-3 text-slate-400 group-hover:text-blue-100 transition-colors" />
            <span className="font-medium">Dashboard</span>
          </Link>
          <Link href="/admin/jobs" className="flex items-center px-4 py-3 text-slate-300 hover:bg-blue-600 hover:text-white rounded-xl transition-all group">
            <Briefcase className="w-5 h-5 mr-3 text-slate-400 group-hover:text-blue-100 transition-colors" />
            <span className="font-medium">Manage Jobs</span>
          </Link>
          <Link href="#" className="flex items-center px-4 py-3 text-slate-300 hover:bg-blue-600 hover:text-white rounded-xl transition-all group opacity-50 cursor-not-allowed">
            <Settings className="w-5 h-5 mr-3 text-slate-400 group-hover:text-blue-100 transition-colors" />
            <span className="font-medium">Settings (Soon)</span>
          </Link>
        </nav>
        
        <div className="p-6 border-t border-slate-800 bg-slate-950/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white shadow-inner">
              PP
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-white truncate">Pawan Prajapati</p>
              <p className="text-xs text-slate-400 truncate">{session.user?.email}</p>
            </div>
          </div>
          <Link href="/api/auth/signout" className="flex items-center justify-center w-full px-4 py-2.5 bg-slate-800 hover:bg-red-600 text-slate-300 hover:text-white rounded-lg transition-colors font-medium text-sm">
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto h-screen relative">
        {children}
      </main>
    </div>
  );
}
