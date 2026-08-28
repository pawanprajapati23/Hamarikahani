import { searchJobs } from '@/lib/data';
import Link from 'next/link';
import { Search, MapPin, Briefcase } from 'lucide-react';

export const metadata = {
  title: 'Search Jobs',
  description: 'Browse the latest jobs in Noida, Greater Noida, and Gurugram.',
};

export const revalidate = 60; // Revalidate the page every 60 seconds

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; location?: string; category?: string; page?: string }>;
}) {
  const resolvedParams = await searchParams;
  const q = resolvedParams.q?.toLowerCase() || '';
  const location = resolvedParams.location?.toLowerCase() || '';
  const category = resolvedParams.category?.toLowerCase() || '';
  const page = parseInt(resolvedParams.page || '1');
  const take = 20;

  let jobs = [];
  let totalJobs = 0;

  try {
    const filteredJobs = await searchJobs(q, location, category);
    totalJobs = filteredJobs.length;
    
    // Pagination
    const startIndex = (page - 1) * take;
    jobs = filteredJobs.slice(startIndex, startIndex + take);
    
  } catch (error) {
    console.error("Failed to fetch jobs:", error);
  }

  const totalPages = Math.ceil(totalJobs / take);

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Search Header */}
        <div className="bg-white p-6 rounded-xl shadow-sm border mb-8">
          <form method="GET" className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Keywords</label>
              <div className="flex items-center px-4 bg-gray-50 rounded border focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
                <Search className="text-gray-400 w-5 h-5 mr-2" />
                <input 
                  type="text" 
                  name="q"
                  defaultValue={q}
                  placeholder="Job title, company, skills" 
                  className="w-full py-2.5 bg-transparent outline-none text-gray-800"
                />
              </div>
            </div>
            
            <div className="md:w-1/3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <div className="flex items-center px-4 bg-gray-50 rounded border focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
                <MapPin className="text-gray-400 w-5 h-5 mr-2" />
                <select name="location" defaultValue={location} className="w-full py-2.5 bg-transparent outline-none text-gray-800">
                  <option value="">All Locations</option>
                  <option value="noida">Noida</option>
                  <option value="greater noida">Greater Noida</option>
                  <option value="gurugram">Gurugram</option>
                </select>
              </div>
            </div>
            
            <div className="md:w-32 flex items-end">
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded transition-colors">
                Search
              </button>
            </div>
          </form>
        </div>

        {/* Results */}
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full">
            <div className="mb-6 flex justify-between items-center">
              <h1 className="text-xl font-bold text-gray-800">
                {totalJobs} {totalJobs === 1 ? 'Job' : 'Jobs'} Found
              </h1>
            </div>

            <div className="space-y-4">
              {jobs.map((job: any) => (
                <Link key={job.id} href={`/job/${job.slug}`} className="block">
                  <div className="bg-white border rounded-lg p-5 hover:border-blue-300 hover:shadow-md transition-all flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-grow">
                      <h2 className="font-bold text-lg text-blue-700">{job.title}</h2>
                      <p className="text-gray-700 font-medium">{job.companyName}</p>
                      
                      <div className="flex flex-wrap gap-y-2 gap-x-4 mt-3 text-sm text-gray-600">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                          {job.location}
                        </div>
                        {job.experienceText && (
                          <div className="flex items-center">
                            <Briefcase className="w-4 h-4 mr-1 text-gray-400" />
                            {job.experienceText}
                          </div>
                        )}
                      </div>
                      
                      {job.skills && job.skills.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {job.skills.slice(0, 5).map((skill: string) => (
                            <span key={skill} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                              {skill}
                            </span>
                          ))}
                          {job.skills.length > 5 && (
                            <span className="text-xs text-gray-500 py-1">+{job.skills.length - 5} more</span>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex md:flex-col justify-between items-center md:items-end md:min-w-[120px]">
                      <span className="bg-blue-50 text-blue-700 font-medium px-4 py-2 rounded text-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        View Job
                      </span>
                      <span className="text-xs text-gray-400 mt-2">
                        {job.postedAt ? new Date(job.postedAt).toLocaleDateString() : ''}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}

              {jobs.length === 0 && (
                <div className="text-center py-20 bg-white rounded-lg border">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs match your search</h3>
                  <p className="text-gray-500">Try adjusting your keywords or location filters.</p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-10">
                <div className="flex space-x-2">
                  {page > 1 && (
                    <Link 
                      href={`/jobs?q=${q}&location=${location}&category=${category}&page=${page - 1}`}
                      className="px-4 py-2 border rounded hover:bg-gray-50 font-medium text-gray-700"
                    >
                      Previous
                    </Link>
                  )}
                  <span className="px-4 py-2 border rounded bg-blue-50 text-blue-700 font-medium">
                    Page {page} of {totalPages}
                  </span>
                  {page < totalPages && (
                    <Link 
                      href={`/jobs?q=${q}&location=${location}&category=${category}&page=${page + 1}`}
                      className="px-4 py-2 border rounded hover:bg-gray-50 font-medium text-gray-700"
                    >
                      Next
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
