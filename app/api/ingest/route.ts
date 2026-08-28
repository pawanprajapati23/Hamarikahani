import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { processAndSaveJob } from '@/lib/ingestion/orchestrator';
import { searchJobsWithGemini } from '@/lib/ingestion/gemini';

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    // Allow either the env variable or a simple 'test' token for manual triggering
    const validSecret = process.env.CRON_SECRET || 'test';
    
    if (authHeader !== `Bearer ${validSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log("Starting scheduled job ingestion using Gemini Search...");
    
    // 1. Ask Gemini to search for real latest jobs
    const searchQueries = [
      "latest frontend developer jobs in Noida Delhi Gurugram 2026",
      "latest customer support BPO jobs in Gurugram 2026",
      "latest sales marketing jobs in Delhi NCR"
    ];
    
    // Pick a random query or run a few (for now, just pick one randomly to keep API costs down per run)
    const randomQuery = searchQueries[Math.floor(Math.random() * searchQueries.length)];
    console.log(`Searching for: ${randomQuery}`);
    
    const rawJobs = await searchJobsWithGemini(randomQuery);
    
    let processed = 0;
    let added = 0;

    // 2. Process each job found by Gemini Search
    if (rawJobs && rawJobs.length > 0) {
      for (const rawJob of rawJobs) {
        processed++;
        // Generate a pseudo sourceId since these are from web search
        const sourceId = `geminisearch-${Date.now()}-${Math.random().toString(36).substring(7)}`;
        
        const enrichedJob = {
          ...rawJob,
          sourceName: rawJob.sourceName || 'Web Search',
          sourceId,
          postedAt: new Date()
        };
        
        const result = await processAndSaveJob(enrichedJob);
        if (result.status === 'success') {
          added++;
        }
      }
    }

    // 3. Mark old jobs as expired (Simplified to avoid Firestore Index requirement)
    // Any job not verified in the last 7 days is considered expired
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const activeJobsQuery = await db.collection('jobs')
      .where('status', '==', 'ACTIVE')
      .get();
      
    const batch = db.batch();
    let expiredCount = 0;
    
    activeJobsQuery.docs.forEach((doc) => {
      const data = doc.data();
      const lastVerified = data.lastVerifiedAt?.toDate ? data.lastVerifiedAt.toDate() : new Date();
      if (lastVerified < sevenDaysAgo) {
        batch.update(doc.ref, { status: 'EXPIRED' });
        expiredCount++;
      }
    });
    
    if (expiredCount > 0) {
      await batch.commit();
    }

    console.log(`Ingestion complete. Processed: ${processed}, Added: ${added}, Expired: ${expiredCount}`);

    return NextResponse.json({ 
      success: true, 
      stats: { processed, added, expired: expiredCount } 
    });
  } catch (error: any) {
    console.error("Ingestion failed:", error);
    return NextResponse.json({ error: 'Internal Server Error', details: error.message || String(error), stack: error.stack }, { status: 500 });
  }
}
