import { MetadataRoute } from 'next';
import { db } from '@/lib/firebaseAdmin';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://hamarikahani.in';

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/jobs`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  try {
    // Fetch active jobs from Firestore
    const jobsRef = db.collection('jobs');
    const today = new Date();
    
    // We only want jobs that have not expired
    const snapshot = await jobsRef.where('expiresAt', '>=', today).get();

    const jobUrls: MetadataRoute.Sitemap = snapshot.docs.map((doc) => {
      const data = doc.data();
      const slug = data.slug || doc.id;
      return {
        url: `${baseUrl}/job/${slug}`,
        lastModified: data.createdAt ? data.createdAt.toDate() : new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
      };
    });

    return [...staticRoutes, ...jobUrls];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return staticRoutes;
  }
}
