export const mockJobs = [
  {
    id: "job-1",
    slug: "frontend-developer-react-noida",
    title: "Frontend Developer (React/Next.js)",
    companyName: "TechSphere Solutions",
    location: "Noida",
    category: "it",
    experienceText: "2-4 Years",
    salaryText: "₹6,00,000 - ₹12,00,000",
    description: "We are looking for a skilled React Developer with Next.js experience. You will be building user interfaces for a modern SaaS platform. Required skills: React, TypeScript, Tailwind CSS.",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    postedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1), // 1 day ago
    status: "ACTIVE"
  },
  {
    id: "job-2",
    slug: "customer-support-executive-gurugram",
    title: "Customer Support Executive (Voice Process)",
    companyName: "Global BPO Services",
    location: "Gurugram",
    category: "bpo",
    experienceText: "0-1 Years (Freshers Welcome)",
    salaryText: "₹2,50,000 - ₹3,50,000",
    description: "Hiring for an international voice process. Excellent English communication skills are required. Night shifts involved. Cab facility provided.",
    skills: ["Communication", "English", "Customer Service", "BPO"],
    postedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    status: "ACTIVE"
  },
  {
    id: "job-3",
    slug: "marketing-intern-greater-noida",
    title: "Digital Marketing Intern",
    companyName: "Creative Edge Agency",
    location: "Greater Noida",
    category: "internship",
    experienceText: "Fresher",
    salaryText: "₹10,000 / month (Stipend)",
    description: "Looking for a highly motivated digital marketing intern. You will learn and work on SEO, Social Media Management, and Google Ads.",
    skills: ["SEO", "Social Media", "Marketing", "Content Writing"],
    postedAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    status: "ACTIVE"
  },
  {
    id: "job-4",
    slug: "backend-node-developer-gurugram",
    title: "Backend Developer (Node.js)",
    companyName: "FinTech Innovations",
    location: "Gurugram",
    category: "it",
    experienceText: "3-5 Years",
    salaryText: "₹12,00,000 - ₹18,00,000",
    description: "Join our core platform team to build scalable microservices. Must have strong experience in Node.js, Express, and PostgreSQL.",
    skills: ["Node.js", "Express", "PostgreSQL", "Microservices"],
    postedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    status: "ACTIVE"
  },
  {
    id: "job-5",
    slug: "sales-executive-noida",
    title: "Field Sales Executive",
    companyName: "RetailCorp India",
    location: "Noida",
    category: "sales",
    experienceText: "1-3 Years",
    salaryText: "₹3,00,000 - ₹5,00,000 + Incentives",
    description: "Responsible for B2B sales in the Noida region. Must have a two-wheeler and local market knowledge.",
    skills: ["Sales", "B2B", "Communication", "Negotiation"],
    postedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    status: "ACTIVE"
  },
  {
    id: "job-6",
    slug: "data-entry-operator-greater-noida",
    title: "Data Entry Operator",
    companyName: "FastTrack Logistics",
    location: "Greater Noida",
    category: "fresher",
    experienceText: "0-2 Years",
    salaryText: "₹15,000 - ₹20,000 / month",
    description: "Looking for candidates with good typing speed (minimum 40 WPM) and basic knowledge of MS Excel.",
    skills: ["Data Entry", "MS Excel", "Typing"],
    postedAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
    status: "ACTIVE"
  }
];

export async function getRecentJobs(limit = 6) {
  return mockJobs
    .filter(job => job.status === "ACTIVE")
    .sort((a, b) => b.postedAt.getTime() - a.postedAt.getTime())
    .slice(0, limit);
}

export async function searchJobs(q: string, location: string, category: string) {
  let filtered = mockJobs.filter(job => job.status === "ACTIVE");
  
  if (q) {
    const query = q.toLowerCase();
    filtered = filtered.filter(job => 
      job.title.toLowerCase().includes(query) || 
      job.companyName.toLowerCase().includes(query) ||
      job.skills.some(skill => skill.toLowerCase().includes(query))
    );
  }
  
  if (location) {
    filtered = filtered.filter(job => job.location.toLowerCase().replace(" ", "-") === location.toLowerCase());
  }
  
  if (category) {
    // For 'it' category map to 'it jobs' etc.
    const catFormatted = category.toLowerCase().replace(" jobs", "");
    filtered = filtered.filter(job => job.category === catFormatted);
  }
  
  return filtered.sort((a, b) => b.postedAt.getTime() - a.postedAt.getTime());
}

export async function getJobsByLocation(location: string) {
  return mockJobs
    .filter(job => job.status === "ACTIVE" && job.location.toLowerCase().replace(" ", "-") === location.toLowerCase())
    .sort((a, b) => b.postedAt.getTime() - a.postedAt.getTime());
}

export async function getJobBySlug(slug: string) {
  return mockJobs.find(job => job.slug === slug);
}
