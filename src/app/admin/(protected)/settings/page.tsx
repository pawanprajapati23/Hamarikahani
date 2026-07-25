import { requireAdmin } from "@/features/auth/utils/server-auth";
import { db } from "@/db/drizzle";
import { siteSettings } from "@/db/schema";
import { Settings, Save, Globe, Shield, CreditCard, Layout, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default async function AdminSettingsPage() {
  await requireAdmin(true);

  // Fetch settings or initialize empty defaults
  const settingsRecords = await db.select().from(siteSettings);
  const settings = settingsRecords.reduce((acc, s) => ({ ...acc, [s.key]: s.value }), {} as any);

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-sans text-slate-800">System Settings</h1>
          <p className="text-slate-500 mt-1">Configure global application variables and integrations</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700">
          <Save className="w-4 h-4 mr-2" /> Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Settings Nav */}
        <div className="lg:col-span-1 space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-white border border-indigo-200 text-indigo-700 rounded-xl font-medium shadow-sm">
            <Globe className="w-5 h-5 text-indigo-600" /> General / SEO
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-100 text-slate-600 rounded-xl font-medium transition-colors">
            <CreditCard className="w-5 h-5 text-slate-400" /> Payment Gateway
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-100 text-slate-600 rounded-xl font-medium transition-colors">
            <Layout className="w-5 h-5 text-slate-400" /> Brand Identity
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-100 text-slate-600 rounded-xl font-medium transition-colors">
            <Shield className="w-5 h-5 text-slate-400" /> Security
          </button>
        </div>

        {/* Settings Form */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 space-y-6">
            <h2 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-4">General / SEO Configuration</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Site Name</label>
                <Input defaultValue={settings.siteName || "HamariKahani"} className="bg-slate-50 border-slate-200" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Support Email</label>
                <Input defaultValue={settings.supportEmail || "support@hamarikahani.in"} className="bg-slate-50 border-slate-200" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-slate-700">SEO Meta Title</label>
                <Input defaultValue={settings.seoTitle || "HamariKahani - Craft Unforgettable Memories"} className="bg-slate-50 border-slate-200" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-slate-700">SEO Meta Description</label>
                <textarea 
                  rows={3}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700"
                  defaultValue={settings.seoDescription || "Create beautiful digital stories and surprises for your loved ones."}
                />
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 space-y-6">
            <h2 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-4 flex items-center gap-2">
              Legal Pages
            </h2>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium text-slate-700">Terms of Service URL</label>
                  <span className="text-xs text-indigo-600 cursor-pointer hover:underline">Auto-generate</span>
                </div>
                <Input defaultValue={settings.termsUrl || "https://hamarikahani.in/terms"} className="bg-slate-50 border-slate-200" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Privacy Policy URL</label>
                <Input defaultValue={settings.privacyUrl || "https://hamarikahani.in/privacy"} className="bg-slate-50 border-slate-200" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Refund Policy URL</label>
                <Input defaultValue={settings.refundUrl || "https://hamarikahani.in/refund"} className="bg-slate-50 border-slate-200" />
              </div>
            </div>
          </div>
          
          <div className="bg-rose-50 border border-rose-100 rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-bold text-rose-800 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5" /> Danger Zone
            </h2>
            <p className="text-sm text-rose-600">Maintenance mode blocks all public traffic and disables new signups. Only Administrators can bypass maintenance mode.</p>
            <Button variant="destructive" className="bg-rose-600 hover:bg-rose-700 font-bold">
              Enable Maintenance Mode
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}
