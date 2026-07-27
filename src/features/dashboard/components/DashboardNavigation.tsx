"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutTemplate, Home, Settings, LogOut, Plus, Sparkles, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "@/features/auth/api/actions";

export function DashboardNavigation({ user }: { user: any }) {
  const pathname = usePathname();
  
  const userName = user.auth.user_metadata?.full_name || user.auth.email?.split('@')[0] || "User";
  const avatarUrl = user.auth.user_metadata?.avatar_url;
  
  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: Home, exact: true },
    { name: "Settings", href: "/dashboard/settings", icon: Settings, exact: false },
  ];

  return (
    <>
      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-xl border-t border-slate-100 z-50 px-6 py-3 flex justify-between items-center shadow-[0_-10px_40px_rgba(0,0,0,0.03)] pb-safe">
        {navItems.map((item) => {
          const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
          return (
            <Link key={item.name} href={item.href} className="flex flex-col items-center gap-1 group">
              <div className={`p-2 rounded-2xl transition-all duration-300 ${isActive ? 'bg-pink-50 text-pink-600' : 'text-slate-400 group-hover:bg-slate-50 group-hover:text-slate-600'}`}>
                <item.icon className="w-5 h-5" />
              </div>
              <span className={`text-[10px] font-medium transition-colors ${isActive ? 'text-pink-600 font-bold' : 'text-slate-400 group-hover:text-slate-600'}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
        
        {/* Mobile Create Button */}
        <Link href="/" className="flex flex-col items-center gap-1 -mt-6">
          <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center shadow-xl shadow-pink-500/30 text-white transform hover:scale-105 transition-transform">
            <Plus className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-bold text-pink-600 mt-1">Create</span>
        </Link>
        
        {/* Mobile Logout */}
        <form action={signOut}>
          <button type="submit" className="flex flex-col items-center gap-1 group">
            <div className="p-2 rounded-2xl text-slate-400 group-hover:bg-rose-50 group-hover:text-rose-500 transition-all duration-300">
              <LogOut className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-medium text-slate-400 group-hover:text-rose-500 transition-colors">Logout</span>
          </button>
        </form>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-72 bg-white/60 backdrop-blur-2xl border-r border-white/50 p-8 flex-col gap-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-20 h-screen sticky top-0">
        <div className="flex items-center gap-4">
          {avatarUrl ? (
            <img src={avatarUrl} alt={userName} className="w-12 h-12 rounded-2xl object-cover shadow-sm border border-slate-100" />
          ) : (
            <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl flex items-center justify-center shadow-sm border border-white">
              <UserIcon className="w-6 h-6 text-pink-500" />
            </div>
          )}
          <div>
            <p className="text-sm font-bold text-slate-800">{userName}</p>
            <p className="text-xs text-slate-400 truncate w-36">{user.auth.email}</p>
          </div>
        </div>
        
        <nav className="flex flex-col gap-2 flex-grow">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3 pl-3">Menu</p>
          {navItems.map((item) => {
            const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
            return (
              <Button key={item.name} variant="ghost" className={`justify-start rounded-xl h-12 transition-all ${isActive ? 'bg-pink-50 text-pink-600 font-semibold shadow-sm' : 'text-slate-500 hover:text-slate-800 hover:bg-white hover:shadow-sm'}`} asChild>
                <Link href={item.href}>
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              </Button>
            );
          })}
        </nav>
        
        <div className="mt-auto space-y-4">
          <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-5 rounded-3xl shadow-xl shadow-pink-500/20 mb-6 text-center space-y-3 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
            <Sparkles className="w-6 h-6 text-white/90 mx-auto animate-pulse" />
            <h4 className="text-sm font-bold text-white">Create New Surprise</h4>
            <p className="text-xs text-white/70 leading-relaxed px-2">Make their day special with a premium template.</p>
            <Button className="w-full rounded-2xl bg-white text-pink-600 hover:bg-pink-50 shadow-lg mt-2 h-11" asChild>
              <Link href="/"><Plus className="w-4 h-4 mr-2" /> Start Creating</Link>
            </Button>
          </div>

          <form action={signOut}>
            <Button variant="ghost" className="w-full justify-start text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors h-12">
              <LogOut className="w-5 h-5 mr-3" /> Log out
            </Button>
          </form>
        </div>
      </aside>
    </>
  );
}
