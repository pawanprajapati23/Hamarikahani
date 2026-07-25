import { requireAdmin } from "@/features/auth/utils/server-auth";
import { Mail, Send, Users, Activity, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default async function AdminEmailsPage() {
  await requireAdmin(true);
  
  // Note: To fetch actual logs, you'd use the Resend API or query your own email_logs table if you kept one.
  // For the dashboard UI, we display the email campaign manager.

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-sans text-slate-800">Email Operations</h1>
          <p className="text-slate-500 mt-1">Broadcast newsletters and manage transactional emails via Resend</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Email Composer */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Send className="w-5 h-5 text-indigo-600" /> New Broadcast Campaign
            </h2>
            
            <form className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Audience Segment</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700">
                  <option value="all">All Users (Total Database)</option>
                  <option value="premium">Premium Users (Has Purchase)</option>
                  <option value="free">Free Users (No Purchase)</option>
                  <option value="inactive">Inactive Users ({">"}30 days)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Subject Line</label>
                <Input 
                  placeholder="e.g. Exciting New Features on HamariKahani!" 
                  className="bg-slate-50 border-slate-200 px-4 py-6"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Email Body (Markdown/HTML)</label>
                <textarea 
                  rows={8}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700 resize-y"
                  placeholder="Hello {{name}}, we're thrilled to announce..."
                ></textarea>
                <p className="text-xs text-slate-500 text-right">Supports Handlebars {"{{variables}}"}</p>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <Button type="button" variant="outline" className="h-12 px-6 rounded-xl">Send Test Email</Button>
                <Button type="button" className="bg-indigo-600 hover:bg-indigo-700 h-12 px-8 rounded-xl font-bold shadow-lg shadow-indigo-200">
                  Blast Campaign 🚀
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Stats & Logs */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 p-6 rounded-2xl">
            <h3 className="font-bold text-indigo-900 mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-600" /> Deliverability Stats
            </h3>
            <div className="space-y-4">
              <div className="bg-white/60 p-4 rounded-xl border border-indigo-100/50">
                <p className="text-sm font-medium text-slate-500">Sent (30d)</p>
                <p className="text-2xl font-bold text-slate-800">12,450</p>
              </div>
              <div className="bg-white/60 p-4 rounded-xl border border-indigo-100/50">
                <p className="text-sm font-medium text-slate-500">Open Rate</p>
                <p className="text-2xl font-bold text-emerald-600">42.8%</p>
              </div>
              <div className="bg-white/60 p-4 rounded-xl border border-indigo-100/50">
                <p className="text-sm font-medium text-slate-500">Bounce Rate</p>
                <p className="text-2xl font-bold text-rose-600">1.2%</p>
              </div>
            </div>
            
            <a href="https://resend.com/emails" target="_blank" rel="noreferrer" className="mt-6 flex items-center justify-center gap-2 w-full bg-white border border-indigo-200 text-indigo-700 font-medium py-3 rounded-xl hover:bg-indigo-50 transition-colors">
              View Logs on Resend <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-2xl">
             <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-slate-500" /> Audience Health
            </h3>
            <div className="flex items-center justify-between py-2 border-b border-slate-100">
              <span className="text-sm text-slate-600">Total Subscribers</span>
              <span className="font-bold text-slate-800">8,942</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-slate-100">
              <span className="text-sm text-slate-600">Unsubscribed</span>
              <span className="font-bold text-rose-600">124</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-slate-600">Spam Complaints</span>
              <span className="font-bold text-rose-600">2</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
