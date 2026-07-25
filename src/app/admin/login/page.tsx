import { AdminLoginForm } from "@/features/admin/components/AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 bg-gradient-to-br from-background to-primary/5">
      <div className="max-w-md w-full space-y-8 bg-card p-10 rounded-3xl border border-foreground/10 shadow-2xl relative overflow-hidden">
        {/* Decorative flair */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl" />
        
        <div className="relative text-center">
          <div className="w-16 h-16 bg-foreground text-background rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-foreground/20">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
            </svg>
          </div>
          <h2 className="text-3xl font-playfair font-bold text-foreground">HamariKahani Admin</h2>
          <p className="text-muted-foreground mt-2 text-sm">Restricted Enterprise Portal</p>
        </div>

        <div className="relative">
          <AdminLoginForm />
        </div>
      </div>
    </div>
  );
}
