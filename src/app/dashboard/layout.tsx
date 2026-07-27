import { requireAuth } from "@/features/auth/utils/server-auth";
import { DashboardNavigation } from "@/features/dashboard/components/DashboardNavigation";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAuth();
  
  return (
    <div className="min-h-screen bg-[hsl(340,20%,98%)] relative overflow-hidden font-sans pb-20 md:pb-0 flex flex-col md:flex-row">
      {/* Soft Premium Background Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-pink-200/25 blur-[150px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-200/20 blur-[150px] rounded-full pointer-events-none z-0" />

      {/* Navigation (Sidebar on Desktop, Bottom Bar on Mobile) */}
      <DashboardNavigation user={user} />
      
      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative z-10 w-full h-full">
        {children}
      </main>
    </div>
  );
}
