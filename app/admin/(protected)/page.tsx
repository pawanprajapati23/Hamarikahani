import { db } from "@/lib/firebaseAdmin";
import { Briefcase, CheckCircle, Clock, AlertTriangle } from "lucide-react";

export default async function AdminDashboard() {
  const jobsRef = db.collection('jobs');
  const [totalSnap] = await Promise.all([
    jobsRef.count().get(),
  ]);

  const totalJobs = totalSnap.data().count;
  const activeJobs = totalJobs; // All fetched are active right now
  const expiredJobs = 0; // Handled by cron
  const pendingJobs = 0;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Jobs</p>
              <p className="text-2xl font-bold text-gray-900">{totalJobs}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Active Jobs</p>
              <p className="text-2xl font-bold text-gray-900">{activeJobs}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-gray-100 text-gray-600 mr-4">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Expired Jobs</p>
              <p className="text-2xl font-bold text-gray-900">{expiredJobs}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Review</p>
              <p className="text-2xl font-bold text-gray-900">{pendingJobs}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="px-6 py-5 border-b flex justify-between items-center">
          <h2 className="font-bold text-gray-900 text-lg">System Controls</h2>
        </div>
        <div className="p-6">
          <form action="/api/cron/job-manager" method="GET" target="_blank">
            <input type="hidden" name="token" value="use-header-in-real-app-or-build-ui" />
            <p className="text-gray-600 mb-4">
              The ingestion pipeline normally runs daily via cron. You can trigger it manually here.
            </p>
            <div className="text-sm bg-gray-50 p-4 rounded text-gray-700 border font-mono break-all">
              curl -X GET {process.env.APP_URL || 'http://localhost:3000'}/api/cron/job-manager \<br/>
              &nbsp;&nbsp;-H "Authorization: Bearer YOUR_CRON_SECRET"
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
