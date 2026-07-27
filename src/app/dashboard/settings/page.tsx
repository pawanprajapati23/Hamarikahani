import { requireAuth } from "@/features/auth/utils/server-auth";
import { UserProfile } from "@/features/dashboard/components/UserProfile";

export default async function SettingsPage() {
  const user = await requireAuth();
  const userName = user.auth.user_metadata?.full_name || user.auth.email?.split('@')[0] || "User";
  
  return (
    <div className="p-4 sm:p-8 lg:p-12 max-w-4xl mx-auto space-y-10">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3 font-playfair tracking-tight text-slate-800">
          Account Settings
        </h1>
        <p className="text-slate-500 text-lg">Manage your personal information and preferences.</p>
      </div>
      
      <div className="bg-white/60 backdrop-blur-xl rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-pink-100/30 overflow-hidden">
        <div className="p-8 border-b border-pink-100/30">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Profile</h2>
          <div className="max-w-md">
            <UserProfile initialName={userName} email={user.auth.email || ""} />
          </div>
        </div>
        
        <div className="p-8 border-b border-pink-100/30 bg-slate-50/30">
          <h2 className="text-xl font-bold text-slate-800 mb-2">Email Address</h2>
          <p className="text-slate-500 text-sm mb-6">The email address associated with your account.</p>
          <div className="max-w-md bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-600 font-medium">
            {user.auth.email}
          </div>
        </div>
        
        <div className="p-8 bg-rose-50/30">
          <h2 className="text-xl font-bold text-rose-600 mb-2">Danger Zone</h2>
          <p className="text-slate-500 text-sm mb-6">Permanently delete your account and all your created surprises.</p>
          <button className="px-6 py-3 bg-white border border-rose-200 text-rose-600 font-bold rounded-full hover:bg-rose-50 hover:border-rose-300 transition-all hover:scale-[0.97]">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
