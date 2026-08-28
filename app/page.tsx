import Link from 'next/link';
import { Search, MapPin, Briefcase } from 'lucide-react';
import { getRecentJobs } from '@/lib/data';

export const revalidate = 60; // Revalidate the page every 60 seconds

export default async function HomePage() {
  const recentJobs = await getRecentJobs();

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-slate-900 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container relative mx-auto max-w-4xl text-center z-10">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-800/50 text-blue-200 text-sm font-semibold mb-6 border border-blue-700/50 backdrop-blur-sm">
            Top Job Platform in India
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
            Discover Your Next <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Big Opportunity</span>
          </h1>
          <p className="text-lg md:text-2xl mb-12 text-slate-300 max-w-3xl mx-auto">
            Hamarikahani connects elite talent with the fastest-growing startups and enterprises. Let AI find the perfect role for you.
          </p>
          
          <form action="/jobs" method="GET" className="bg-white p-3 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-3 max-w-3xl mx-auto transform hover:scale-[1.01] transition-transform">
            <div className="flex-1 flex items-center px-4 bg-slate-50 rounded-xl border border-slate-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition-all">
              <Search className="text-slate-400 w-5 h-5 mr-3" />
              <input 
                type="text" 
                name="q"
                placeholder="Job title, keywords, or company" 
                className="w-full py-4 bg-transparent outline-none text-slate-800 font-medium placeholder-slate-400"
              />
            </div>
            <div className="flex-1 flex items-center px-4 bg-slate-50 rounded-xl border border-slate-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition-all">
              <MapPin className="text-slate-400 w-5 h-5 mr-3" />
              <select name="location" className="w-full py-4 bg-transparent outline-none text-slate-800 font-medium">
                <option value="">Any Location</option>
                <option value="noida">Noida</option>
                <option value="greater-noida">Greater Noida</option>
                <option value="gurugram">Gurugram</option>
                <option value="remote">Remote</option>
              </select>
            </div>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-xl transition-all shadow-lg shadow-blue-600/30">
              Search
            </button>
          </form>
          
          <div className="mt-10 text-sm text-slate-400 font-medium">
            Trusted by companies worldwide | Founded by Pawan Prajapati
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-16 bg-white px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold mb-8 text-center text-slate-800">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {['IT Jobs', 'Fresher Jobs', 'BPO Jobs', 'Internship', 'Work From Home', '10th/12th Pass'].map((cat) => (
              <Link 
                key={cat} 
                href={`/jobs?category=${encodeURIComponent(cat.toLowerCase())}`}
                className="border border-slate-200 rounded-xl p-4 text-center hover:shadow-lg hover:border-blue-400 transition-all group cursor-pointer bg-slate-50"
              >
                <Briefcase className="w-8 h-8 mx-auto mb-3 text-slate-400 group-hover:text-blue-600 transition-colors" />
                <span className="font-semibold text-slate-700 group-hover:text-blue-700 block">{cat}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Jobs */}
      <section className="py-16 bg-slate-50 px-4 border-t border-slate-200">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-2xl font-bold text-slate-800">Recently Added Jobs</h2>
            <Link href="/jobs" className="text-blue-600 hover:text-blue-800 hover:underline font-semibold transition-colors">View All &rarr;</Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentJobs.length > 0 ? recentJobs.map((job: any) => (
              <Link key={job.id} href={`/job/${job.slug}`} className="block group">
                <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl hover:border-blue-300 transition-all h-full flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg text-slate-900 line-clamp-2 group-hover:text-blue-600 transition-colors">{job.title}</h3>
                      <p className="text-slate-500 font-semibold mt-1">{job.companyName}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-6 flex-grow">
                    <div className="flex items-center text-slate-600 text-sm font-medium">
                      <MapPin className="w-4 h-4 mr-2 text-slate-400" />
                      {job.location}
                    </div>
                    {job.experienceText && (
                      <div className="flex items-center text-slate-600 text-sm font-medium">
                        <Briefcase className="w-4 h-4 mr-2 text-slate-400" />
                        {job.experienceText}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                    <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-1 rounded">
                      {job.postedAt ? new Date(job.postedAt).toLocaleDateString() : 'Recently'}
                    </span>
                    <span className="text-blue-600 text-sm font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">Apply Now <span aria-hidden="true">&rarr;</span></span>
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
