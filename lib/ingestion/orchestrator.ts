import { prisma } from '@/lib/db';
import { processJobWithGemini } from './gemini';
import crypto from 'crypto';

function generateDuplicateHash(title: string, company: string, location: string) {
  const normalizedString = `${title.toLowerCase().trim()}|${company.toLowerCase().trim()}|${location.toLowerCase().trim()}`;
  return crypto.createHash('sha256').update(normalizedString).digest('hex');
}

export async function processAndSaveJob(rawJob: {
  title: string;
  company: string;
  location: string;
  description: string;
  url: string;
  applyUrl: string;
  sourceName: string;
  sourceId?: string;
  postedAt?: Date;
}) {
  console.log(`Processing job: ${rawJob.title} at ${rawJob.company}`);

  // 1. Initial Deduplication (Hash Check)
  const duplicateHash = generateDuplicateHash(rawJob.title, rawJob.company, rawJob.location);
  
  const existingJob = await prisma.job.findFirst({
    where: {
      OR: [
        { duplicateHash },
        ...(rawJob.sourceId ? [{ sourceJobId: rawJob.sourceId, sourceName: rawJob.sourceName }] : []),
        { applyUrl: rawJob.applyUrl }
      ]
    }
  });

  if (existingJob) {
    console.log(`Duplicate found for: ${rawJob.title} (${existingJob.id})`);
    // Update last verified time
    await prisma.job.update({
      where: { id: existingJob.id },
      data: { lastVerifiedAt: new Date(), status: 'ACTIVE' }
    });
    return { status: 'duplicate', id: existingJob.id };
  }

  // 2. AI Processing via Gemini
  const aiProcessed = await processJobWithGemini(rawJob.description, rawJob.url);
  
  if (!aiProcessed) {
    console.log(`AI Processing failed for: ${rawJob.title}`);
    return { status: 'failed_ai' };
  }

  // 3. Validation
  if (!aiProcessed.isRelevant || aiProcessed.confidence < 0.7) {
    console.log(`Job rejected by AI as irrelevant/low confidence: ${rawJob.title}`);
    return { status: 'rejected_by_ai' };
  }

  // 4. Save to Database
  try {
    // Generate a URL-friendly slug
    const baseSlug = `${aiProcessed.title}-${aiProcessed.companyName}-${aiProcessed.city || 'noida'}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
      
    const uniqueSlug = `${baseSlug}-${crypto.randomBytes(3).toString('hex')}`;

    const newJob = await prisma.job.create({
      data: {
        slug: uniqueSlug,
        title: aiProcessed.title,
        companyName: aiProcessed.companyName,
        description: rawJob.description,
        shortDescription: aiProcessed.shortDescription,
        location: aiProcessed.location || rawJob.location,
        city: aiProcessed.city,
        category: aiProcessed.category,
        experienceMin: aiProcessed.experienceMin,
        experienceMax: aiProcessed.experienceMax,
        experienceText: aiProcessed.experienceText,
        education: aiProcessed.education,
        skills: aiProcessed.skills || [],
        salaryMin: aiProcessed.salaryMin,
        salaryMax: aiProcessed.salaryMax,
        salaryText: aiProcessed.salaryText,
        employmentType: aiProcessed.employmentType,
        workMode: aiProcessed.workMode,
        sourceName: rawJob.sourceName,
        sourceUrl: rawJob.url,
        originalJobUrl: rawJob.url,
        applyUrl: rawJob.applyUrl,
        sourceJobId: rawJob.sourceId,
        duplicateHash,
        postedAt: rawJob.postedAt || new Date(),
        lastVerifiedAt: new Date(),
        status: 'ACTIVE',
      }
    });

    console.log(`Successfully ingested job: ${newJob.title} (${newJob.id})`);
    return { status: 'success', id: newJob.id };
  } catch (error) {
    console.error("Database save failed:", error);
    return { status: 'error_db' };
  }
}
