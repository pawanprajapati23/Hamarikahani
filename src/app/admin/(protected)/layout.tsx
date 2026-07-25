import { requireAdmin } from "@/features/auth/utils/server-auth";
import { AdminSidebar } from "@/features/admin/components/AdminSidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // If the user isn't logged in, or is not the admin, redirect to /admin/login
  await requireAdmin(true);

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Admin Sidebar Navigation */}
      <AdminSidebar />
      
      {/* Main Admin Content Area */}
      <div className="flex-1 overflow-x-hidden flex flex-col">
        {/* Top Header */}
        <header className="h-16 border-b border-slate-200 bg-white flex items-center px-8 justify-between shrink-0">
          <h1 className="font-playfair font-bold text-xl text-slate-800">Admin Portal</h1>
          <div className="flex items-center gap-4">
            <div className="text-sm font-medium text-slate-500">pavnkumarprajapati2000@gmail.com</div>
            <div className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center text-white text-xs font-bold">A</div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
