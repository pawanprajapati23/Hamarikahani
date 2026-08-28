import { db } from "@/lib/firebaseAdmin";
import { ExternalLink, Search } from "lucide-react";
import DeleteJobButton from "./DeleteJobButton";

export default async function AdminJobsPage({
  searchParams
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const resolvedParams = await searchParams;
  const q = resolvedParams.q?.toLowerCase() || '';
  
  let jobsRef: any = db.collection('jobs').orderBy('createdAt', 'desc').limit(100);
  const snapshot = await jobsRef.get();
  
  let jobs = snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() })) as any[];

  if (q) {
    jobs = jobs.filter(j => 
      j.title?.toLowerCase().includes(q) || 
      j.company?.toLowerCase().includes(q)
    );
  }

  return (
    <div className="p-8 md:p-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Manage Jobs</h1>
          <p className="text-slate-500 mt-2">View, search, and remove job listings from the platform.</p>
        </div>
        
        <form method="GET" className="flex items-center bg-white rounded-lg border border-slate-200 px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
          <Search className="w-5 h-5 text-slate-400 mr-2" />
          <input 
            type="text" 
            name="q" 
            defaultValue={q}
            placeholder="Search jobs or companies..." 
            className="bg-transparent outline-none text-sm w-64"
          />
          <button type="submit" className="hidden">Search</button>
        </form>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-sm border-b border-slate-100">
                <th className="px-6 py-4 font-semibold">Job Title</th>
                <th className="px-6 py-4 font-semibold">Company</th>
                <th className="px-6 py-4 font-semibold">Location</th>
                <th className="px-6 py-4 font-semibold">Added</th>
                <th className="px-6 py-4 font-semibold">Expires</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {jobs.map((job) => (
                <tr key={job.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-900">{job.title}</td>
                  <td className="px-6 py-4 text-slate-600 font-medium">{job.company}</td>
                  <td className="px-6 py-4 text-slate-500">{job.location}</td>
                  <td className="px-6 py-4 text-slate-500 text-sm">
                    {job.createdAt?.toDate ? job.createdAt.toDate().toLocaleDateString() : '-'}
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-sm">
                    {job.expiresAt?.toDate ? job.expiresAt.toDate().toLocaleDateString() : '-'}
                  </td>
                  <td className="px-6 py-4 text-right flex items-center justify-end gap-4">
                    <a href={`/job/${job.slug}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-800 transition-colors">
                      <ExternalLink className="w-5 h-5" />
                    </a>
                    <DeleteJobButton jobId={job.id} />
                  </td>
                </tr>
              ))}
              {jobs.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    No jobs found matching your search.
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
