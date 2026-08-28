import Link from 'next/link';
import { Search, MapPin, Briefcase } from 'lucide-react';
import { getRecentJobs } from '@/lib/data';

export const revalidate = 60; // Revalidate the page every 60 seconds

export default async function HomePage() {
  const recentJobs = await getRecentJobs();

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-20 px-4 border-b-4 border-orange-500">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Find Jobs in Noida, Greater Noida & Gurugram
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-blue-200">
            The smartest way to discover active local opportunities.
          </p>
          
          <form action="/jobs" method="GET" className="bg-white p-2 rounded-lg shadow-lg flex flex-col md:flex-row gap-2">
            <div className="flex-1 flex items-center px-4 bg-gray-50 rounded border focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
              <Search className="text-gray-400 w-5 h-5 mr-2" />
              <input 
                type="text" 
                name="q"
                placeholder="Job title, company, or keyword" 
                className="w-full py-3 bg-transparent outline-none text-gray-800 placeholder-gray-500"
              />
            </div>
            <div className="flex-1 flex items-center px-4 bg-gray-50 rounded border focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
              <MapPin className="text-gray-400 w-5 h-5 mr-2" />
              <select name="location" className="w-full py-3 bg-transparent outline-none text-gray-800">
                <option value="">Any Location</option>
                <option value="noida">Noida</option>
                <option value="greater-noida">Greater Noida</option>
                <option value="gurugram">Gurugram</option>
              </select>
            </div>
            <button type="submit" className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-8 rounded transition-colors shadow-lg shadow-orange-500/30">
              Search Jobs
            </button>
          </form>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-16 bg-white px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {['IT Jobs', 'Fresher Jobs', 'BPO Jobs', 'Internship', 'Work From Home', '10th/12th Pass'].map((cat) => (
              <Link 
                key={cat} 
                href={`/jobs?category=${encodeURIComponent(cat.toLowerCase())}`}
                className="border rounded-lg p-4 text-center hover:shadow-md hover:border-orange-300 transition-all group cursor-pointer"
              >
                <Briefcase className="w-8 h-8 mx-auto mb-3 text-blue-600 group-hover:text-orange-500" />
                <span className="font-medium text-gray-700 group-hover:text-orange-600 block">{cat}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Jobs */}
      <section className="py-16 bg-gray-50 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Recently Added Jobs</h2>
            <Link href="/jobs" className="text-orange-600 hover:underline font-medium">View All &rarr;</Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentJobs.length > 0 ? recentJobs.map((job: any) => (
              <Link key={job.id} href={`/job/${job.slug}`} className="block">
                <div className="bg-white border rounded-xl p-6 hover:shadow-lg transition-shadow h-full flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 line-clamp-2 group-hover:text-blue-700 transition-colors">{job.title}</h3>
                      <p className="text-orange-600 font-medium mt-1">{job.companyName}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-6 flex-grow">
                    <div className="flex items-center text-gray-600 text-sm">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                      {job.location}
                    </div>
                    {job.experienceText && (
                      <div className="flex items-center text-gray-600 text-sm">
                        <Briefcase className="w-4 h-4 mr-2 text-gray-400" />
                        {job.experienceText}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t">
                    <span className="text-xs text-gray-500">
                      {job.postedAt ? new Date(job.postedAt).toLocaleDateString() : 'Recently'}
                    </span>
                    <span className="text-orange-600 text-sm font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">Apply Now <span aria-hidden="true">&rarr;</span></span>
                  </div>
                </div>
              </Link>
            )) : (
              <div className="col-span-full text-center py-12 text-gray-500">
                No active jobs found. Our automated system might be processing new opportunities.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
