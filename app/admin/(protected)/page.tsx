import { db } from "@/lib/firebaseAdmin";
import { Briefcase, CheckCircle, Clock, Database, ExternalLink, RefreshCw } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const jobsRef = db.collection('jobs');
  
  // Fetch stats and recent jobs concurrently
  const [totalSnap, recentJobsSnap] = await Promise.all([
    jobsRef.count().get(),
    jobsRef.orderBy('createdAt', 'desc').limit(5).get()
  ]);

  const totalJobs = totalSnap.data().count;
  const recentJobs = recentJobsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as any[];

  return (
    <div className="p-8 md:p-12 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Executive Dashboard</h1>
          <p className="text-slate-500 mt-2">Overview of platform metrics and recent ingestion activity.</p>
        </div>
        <a 
          href="/api/cron/job-manager" 
          target="_blank"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold shadow-lg shadow-blue-500/30 transition-all active:scale-95"
        >
          <RefreshCw className="w-4 h-4" />
          Trigger AI Scraper
        </a>
      </div>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex items-center">
          <div className="p-4 rounded-xl bg-blue-50 text-blue-600 mr-5">
            <Database className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Total Indexed Jobs</p>
            <p className="text-3xl font-black text-slate-900 mt-1">{totalJobs}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex items-center">
          <div className="p-4 rounded-xl bg-green-50 text-green-600 mr-5">
            <CheckCircle className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Active Listings</p>
            <p className="text-3xl font-black text-slate-900 mt-1">{totalJobs}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex items-center">
          <div className="p-4 rounded-xl bg-purple-50 text-purple-600 mr-5">
            <Briefcase className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Scraped Sources</p>
            <p className="text-3xl font-black text-slate-900 mt-1">12+</p>
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h2 className="font-bold text-slate-900 text-lg">Recently Ingested Jobs</h2>
          <Link href="/admin/jobs" className="text-blue-600 font-semibold text-sm hover:underline">
            View All Data &rarr;
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-sm border-b border-slate-100">
                <th className="px-8 py-4 font-semibold">Job Title</th>
                <th className="px-8 py-4 font-semibold">Company</th>
                <th className="px-8 py-4 font-semibold">Location</th>
                <th className="px-8 py-4 font-semibold">Date Added</th>
                <th className="px-8 py-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentJobs.map((job) => (
                <tr key={job.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-4 font-semibold text-slate-900">{job.title}</td>
                  <td className="px-8 py-4 text-slate-600">{job.company}</td>
                  <td className="px-8 py-4 text-slate-600">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                      {job.location}
                    </span>
                  </td>
                  <td className="px-8 py-4 text-slate-500 text-sm">
                    {job.createdAt?.toDate ? job.createdAt.toDate().toLocaleDateString() : 'Just now'}
                  </td>
                  <td className="px-8 py-4 text-right">
                    <a href={`/job/${job.slug}`} target="_blank" rel="noreferrer" className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800">
                      View <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  </td>
                </tr>
              ))}
              {recentJobs.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-8 py-12 text-center text-slate-500">
                    No jobs found. Click 'Trigger AI Scraper' to fetch data.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
