import { getJobBySlug } from '@/lib/data';
import { notFound } from 'next/navigation';
import { MapPin, Briefcase, Building, Clock, ExternalLink, ShieldCheck, Calendar } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  let job: any = null;
  try {
    job = await getJobBySlug(slug);
  } catch (error) {
    console.error("DB Error:", error);
  }
  
  if (!job) return { title: 'Job Not Found' };
  
  return {
    title: `${job.title} at ${job.companyName}`,
    description: job.shortDescription || `Apply for ${job.title} at ${job.companyName} in ${job.location}`,
  };
}

export default async function JobDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let job: any = null;
  try {
    job = await getJobBySlug(slug);
  } catch (error) {
    console.error("DB Error:", error);
  }

  if (!job) {
    notFound();
  }

  // Schema.org JobPosting structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description,
    datePosted: job.postedAt?.toISOString() || new Date().toISOString(),
    validThrough: job.expiresAt?.toISOString() || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    employmentType: job.employmentType || 'FULL_TIME',
    hiringOrganization: {
      '@type': 'Organization',
      name: job.companyName,
      logo: job.companyLogo || undefined,
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: job.city || job.location,
        addressRegion: job.state,
        addressCountry: job.country || 'IN',
      },
    },
    baseSalary: job.salaryMin ? {
      '@type': 'MonetaryAmount',
      currency: 'INR',
      value: {
        '@type': 'QuantitativeValue',
        minValue: job.salaryMin,
        maxValue: job.salaryMax || undefined,
        unitText: 'YEAR'
      }
    } : undefined
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-4 text-sm text-gray-500 flex items-center gap-2">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link href="/jobs" className="hover:text-blue-600">Jobs</Link>
          <span>/</span>
          <span className="text-gray-900 truncate">{job.title}</span>
        </div>

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          {/* Header */}
          <div className="p-6 md:p-8 border-b">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
            <div className="text-lg font-medium text-blue-700 mb-6 flex items-center">
              <Building className="w-5 h-5 mr-2" />
              {job.companyName}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600 mb-8">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-gray-400 mt-0.5" />
                <div>
                  <span className="block font-medium text-gray-900">Location</span>
                  {job.location} {job.isRemote && <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded ml-2">Remote Allowed</span>}
                </div>
              </div>
              
              {job.experienceText && (
                <div className="flex items-start">
                  <Briefcase className="w-5 h-5 mr-3 text-gray-400 mt-0.5" />
                  <div>
                    <span className="block font-medium text-gray-900">Experience</span>
                    {job.experienceText}
                  </div>
                </div>
              )}
              
              {job.salaryText && (
                <div className="flex items-start">
                  <div className="w-5 h-5 mr-3 text-gray-400 mt-0.5 flex items-center justify-center font-bold">₹</div>
                  <div>
                    <span className="block font-medium text-gray-900">Salary</span>
                    {job.salaryText}
                  </div>
                </div>
              )}
              
              {job.employmentType && (
                <div className="flex items-start">
                  <Clock className="w-5 h-5 mr-3 text-gray-400 mt-0.5" />
                  <div>
                    <span className="block font-medium text-gray-900">Employment Type</span>
                    {job.employmentType}
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t">
              <a 
                href={job.applyUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                Apply Now <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Job Description</h2>
            <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">
              {job.description}
            </div>

            {job.skills && job.skills.length > 0 && (
              <div className="mt-8">
                <h3 className="font-bold text-gray-900 mb-3">Key Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill: string) => (
                    <span key={skill} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Footer Metadata */}
          <div className="bg-gray-50 p-6 border-t text-sm text-gray-500">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-green-600" />
                <span>
                  Source: <a href={job.sourceUrl} target="_blank" rel="noopener noreferrer" className="hover:underline font-medium text-gray-700">{job.sourceName}</a>
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>Posted: {job.postedAt ? new Date(job.postedAt).toLocaleDateString() : 'Recently'}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 text-xs text-gray-400 bg-white p-4 border rounded">
              <strong>Disclaimer:</strong> HamaraKahani Jobs is an aggregator. We do not represent {job.companyName}. All applications are processed directly on the employer's or original source's website. Please verify job details independently before applying.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
