import { NextResponse } from 'next/server';
import { db } from '@/lib/firebaseAdmin';
import { GoogleGenAI } from '@google/genai';

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function GET(request: Request) {
  try {
    // SECURITY: Uncomment this in production to secure your cron route!
    // const authHeader = request.headers.get('authorization');
    // if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    // ==========================================
    // TASK 1: AUTO-DELETE EXPIRED JOBS FROM FIRESTORE
    // ==========================================
    const today = new Date();
    const jobsRef = db.collection('jobs');
    
    // Query where expiresAt is less than today
    const snapshot = await jobsRef.where('expiresAt', '<', today).get();
    let deletedCount = 0;
    
    if (!snapshot.empty) {
      const batch = db.batch();
      snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
        deletedCount++;
      });
      await batch.commit();
    }
    console.log(`Deleted ${deletedCount} expired jobs.`);

    // ==========================================
    // TASK 2: FETCH NEW DATA & AI PROCESSING
    // ==========================================
    // TODO: Replace this dummy text with your actual internet fetch logic
    // const response = await fetch('https://some-job-board.com/api/jobs');
    // const rawJobsText = await response.text(); 
    
    // Temporary dummy text to test the system
    const rawJobsText = `
      Hiring a React Developer at TechCorp Noida. Requires 2 years experience. 
      Apply before 2026-12-31. Salary is 10LPA. Link: https://techcorp.com/jobs/react-dev
    `;

    const prompt = `
      Extract job postings from the following text and return a JSON array. 
      Format exactly like this: 
      [{ "title": "...", "company": "...", "location": "...", "description": "...", "expiresAt": "YYYY-MM-DD", "sourceUrl": "..." }]
      If no expiry date is found, set 'expiresAt' to 30 days from today.
      
      Raw Data: ${rawJobsText}
    `;

    const aiResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    let jobsData: any[] = [];
    try {
      const text = aiResponse.text();
      const jsonMatch = text.match(/\[.*\]/s);
      if (jsonMatch) {
          jobsData = JSON.parse(jsonMatch[0]);
      } else {
          jobsData = JSON.parse(text.replace(/```json/g, '').replace(/```/g, ''));
      }
    } catch (e) {
      console.error("AI output JSON parse error", e);
    }

    // ==========================================
    // TASK 3: PUBLISH TO FIRESTORE (AVOID DUPLICATES)
    // ==========================================
    let addedCount = 0;
    
    for (const job of jobsData) {
      const jobUrl = job.sourceUrl || `https://hamarikahani.in/auto/${Date.now()}`;
      
      // Generating a safe Document ID from the URL (base64 encoded) to avoid slashes in ID
      const docId = Buffer.from(jobUrl).toString('base64').replace(/[/+=]/g, '');
      const jobDoc = jobsRef.doc(docId);
      
      const docSnap = await jobDoc.get();
      // Only insert if it doesn't already exist
      if (!docSnap.exists) {
        await jobDoc.set({
          title: job.title || '',
          company: job.company || '',
          location: job.location || '',
          description: job.description || '',
          sourceUrl: jobUrl,
          expiresAt: job.expiresAt ? new Date(job.expiresAt) : new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000), // Default 30 days
          createdAt: new Date(),
        });
        addedCount++;
      }
    }

    return NextResponse.json({ 
      success: true, 
      deleted: deletedCount,
      added: addedCount 
    });

  } catch (error) {
    console.error("Cron Job Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
