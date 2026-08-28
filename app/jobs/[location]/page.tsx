import { getJobsByLocation } from '@/lib/data';
import Link from 'next/link';
import { MapPin, Briefcase } from 'lucide-react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

const ALLOWED_LOCATIONS = ['noida', 'greater-noida', 'gurugram', 'gurgaon'];

export async function generateMetadata({ params }: { params: Promise<{ location: string }> }): Promise<Metadata> {
  const { location } = await params;
  if (!ALLOWED_LOCATIONS.includes(location.toLowerCase())) {
    return { title: 'Location Not Found' };
  }
  
  const formattedLocation = location.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  return {
    title: `Jobs in ${formattedLocation}`,
    description: `Browse the latest active jobs and career opportunities in ${formattedLocation}. Apply now!`,
  };
}

export default async function LocationJobsPage({ params }: { params: Promise<{ location: string }> }) {
  const { location } = await params;
  
  if (!ALLOWED_LOCATIONS.includes(location.toLowerCase())) {
    notFound();
  }

  const formattedLocation = location.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  
  let jobs = [];
  try {
    jobs = await getJobsByLocation(location);
  } catch (error) {
    console.error("Failed to load jobs:", error);
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-4 text-sm text-gray-500 flex items-center gap-2">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link href="/jobs" className="hover:text-blue-600">Jobs</Link>
          <span>/</span>
          <span className="text-gray-900">{formattedLocation}</span>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-8 mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Jobs in {formattedLocation}</h1>
          <p className="text-gray-600">Discover the latest opportunities in your area.</p>
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
              <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs currently available</h3>
              <p className="text-gray-500">Check back later for new opportunities in {formattedLocation}.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
