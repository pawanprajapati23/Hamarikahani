import { db } from './firebaseAdmin';

// Note: Ensure functions only run in Server Components or Server Actions

export async function getRecentJobs(limit = 6) {
  try {
    const today = new Date();
    const snapshot = await db.collection('jobs')
      .where('expiresAt', '>=', today)
      .get();
      
    if (snapshot.empty) return [];
    
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        slug: data.slug || doc.id,
        title: data.title || 'Job Opening',
        companyName: data.company || 'Unknown Company',
        location: data.location || 'India',
        description: data.description || '',
        createdAt: data.createdAt?.toDate(),
        expiresAt: data.expiresAt?.toDate(),
        postedAt: data.createdAt?.toDate(),
        status: 'ACTIVE',
        // Optional mapped fields if missing
        skills: data.skills || [],
        experienceText: data.experience || '',
        salaryText: data.salary || '',
      };
    }).sort((a: any, b: any) => (b.postedAt?.getTime() || 0) - (a.postedAt?.getTime() || 0)).slice(0, limit);
  } catch (error) {
    console.error("Error fetching recent jobs:", error);
    return [];
  }
}

export async function searchJobs(q: string, location: string, category: string) {
  try {
    const today = new Date();
    let queryRef: any = db.collection('jobs').where('expiresAt', '>=', today);

    // Note: Firestore doesn't support full-text search directly without an extension (like Algolia).
    // For a simple implementation, we will fetch all active jobs and filter them in memory.
    // If the database grows large, you should implement Algolia or Typesense.
    const snapshot = await queryRef.get();
    
    let jobs = snapshot.docs.map((doc: any) => {
      const data = doc.data();
      return {
        id: doc.id,
        slug: data.slug || doc.id,
        title: data.title || 'Job Opening',
        companyName: data.company || 'Unknown Company',
        location: data.location || 'India',
        description: data.description || '',
        createdAt: data.createdAt?.toDate(),
        expiresAt: data.expiresAt?.toDate(),
        postedAt: data.createdAt?.toDate(),
        status: 'ACTIVE',
        category: data.category || '',
        skills: data.skills || [],
      };
    });

    if (q) {
      const lowerQ = q.toLowerCase();
      jobs = jobs.filter((job: any) => 
        job.title.toLowerCase().includes(lowerQ) || 
        job.companyName.toLowerCase().includes(lowerQ) || 
        job.description.toLowerCase().includes(lowerQ)
      );
    }

    if (location) {
      const lowerLoc = location.toLowerCase().replace(" ", "-");
      jobs = jobs.filter((job: any) => job.location.toLowerCase().replace(" ", "-").includes(lowerLoc));
    }

    if (category) {
      const catFormatted = category.toLowerCase().replace(" jobs", "");
      jobs = jobs.filter((job: any) => (job.category || '').toLowerCase() === catFormatted);
    }

    return jobs.sort((a: any, b: any) => (b.postedAt?.getTime() || 0) - (a.postedAt?.getTime() || 0));
  } catch (error) {
    console.error("Error searching jobs:", error);
    return [];
  }
}

export async function getJobsByLocation(location: string) {
  return await searchJobs("", location, "");
}

export async function getJobBySlug(slug: string) {
  try {
    // 1. Try to fetch by document ID if slug is the docId
    let docRef = db.collection('jobs').doc(slug);
    let docSnap = await docRef.get();

    if (!docSnap.exists) {
      // 2. Try fetching by slug field
      const snapshot = await db.collection('jobs').where('slug', '==', slug).limit(1).get();
      if (snapshot.empty) return null;
      docSnap = snapshot.docs[0];
    }

    const data = docSnap.data() as any;
    return {
      id: docSnap.id,
      slug: data.slug || docSnap.id,
      title: data.title || 'Job Opening',
      companyName: data.company || 'Unknown Company',
      location: data.location || 'India',
      description: data.description || '',
      createdAt: data.createdAt?.toDate(),
      expiresAt: data.expiresAt?.toDate(),
      postedAt: data.createdAt?.toDate(),
      sourceUrl: data.sourceUrl || '',
      sourceName: data.sourceName || 'HamaraKahani Jobs',
      applyUrl: data.applyUrl || data.sourceUrl || '#',
      status: 'ACTIVE',
      skills: data.skills || [],
      experienceText: data.experience || '',
      salaryText: data.salary || '',
      employmentType: data.employmentType || 'FULL_TIME',
      city: data.city || data.location,
      state: data.state || '',
      country: data.country || 'IN',
      salaryMin: data.salaryMin || null,
      salaryMax: data.salaryMax || null,
      isRemote: data.isRemote || false,
    };
  } catch (error) {
    console.error("Error fetching job by slug:", error);
    return null;
  }
}
