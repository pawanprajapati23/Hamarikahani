import { db } from '../lib/firebaseAdmin';
import * as cheerio from 'cheerio';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

const TARGETS = [
  'https://boards.greenhouse.io/discord',
  'https://jobs.lever.co/stripe',
  'https://boards.greenhouse.io/reddit',
  'https://jobs.lever.co/notion',
  'https://boards.greenhouse.io/figma',
  'https://jobs.lever.co/canva',
  'https://www.ycombinator.com/jobs',
  'https://boards.greenhouse.io/pinterest',
  'https://jobs.lever.co/plaid'
];

const generateSlug = (title: string, company: string, location: string) => {
  const base = `${title} ${company} ${location}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `${base}-${Math.floor(Math.random() * 10000)}`;
};

async function runScraper() {
  console.log("🚀 Starting Aggressive AI Batch Scraping Job...");
  let totalAdded = 0;

  for (const url of TARGETS) {
    console.log(`\n[+] Scraping: ${url}`);
    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' } });
      if (!res.ok) {
        console.log(`  - Failed to load ${url} (Status: ${res.status})`);
        continue;
      }
      const html = await res.text();
      const $ = cheerio.load(html);
      $('script, style, noscript, iframe, nav, footer').remove();
      
      let text = $('body').text().replace(/\s+/g, ' ').trim();
      text = text.substring(0, 15000);

      console.log(`  - Page loaded. Sending ${text.length} chars to NVIDIA AI...`);

      const prompt = `
        Extract up to 8 real job postings from the following scraped career page text and return a JSON array. 
        Format exactly like this: 
        [{ "title": "...", "company": "...", "location": "...", "description": "...", "expiresAt": "YYYY-MM-DD", "sourceUrl": "...", "category": "it" }]
        If no company name is found, infer it from the text or URL.
        If no expiry date is found, set 'expiresAt' to 30 days from today. Make sure 'description' is a solid 2-3 sentence summary.
        
        Raw Data: ${text}
      `;

      const payload = {
        model: "moonshotai/kimi-k3",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 4000,
        temperature: 0.1,
        stream: false,
        reasoning_effort: "low"
      };

      const aiRes = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.NVIDIA_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!aiRes.ok) {
        console.log(`  - AI Request failed: ${await aiRes.text()}`);
        continue;
      }

      const aiData = await aiRes.json();
      const content = aiData.choices?.[0]?.message?.content || "";
      
      let jobsData: any[] = [];
      try {
        const jsonMatch = content.match(/\[.*\]/s);
        if (jsonMatch) {
            jobsData = JSON.parse(jsonMatch[0]);
        } else {
            jobsData = JSON.parse(content.replace(/```json/g, '').replace(/```/g, ''));
        }
      } catch (e) {
        console.log("  - Could not parse AI JSON output.");
        continue;
      }

      console.log(`  - AI found ${jobsData.length} jobs.`);

      for (const job of jobsData) {
        // Fallback to the main URL if AI didn't find a specific job link
        const jobUrl = job.sourceUrl && job.sourceUrl.startsWith('http') ? job.sourceUrl : url;
        
        // Since we might get the same generic URL, we also check Title & Company to avoid dupes if sourceUrl is generic
        const slug = generateSlug(job.title || 'job', job.company || 'company', job.location || 'india');
        
        const existingBySlug = await db.collection('jobs').doc(slug).get();
        
        if (!existingBySlug.exists) {
          await db.collection('jobs').doc(slug).set({
            title: job.title || 'Unknown Title',
            company: job.company || 'Unknown Company',
            location: job.location || 'Unknown Location',
            description: job.description || 'No description provided.',
            sourceUrl: jobUrl,
            slug: slug,
            expiresAt: job.expiresAt ? new Date(job.expiresAt) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            createdAt: new Date(),
            category: job.category || 'it',
            employmentType: job.employmentType || 'FULL_TIME'
          });
          totalAdded++;
          console.log(`    + Added: ${job.title} at ${job.company}`);
        } else {
          console.log(`    - Skipped (Duplicate): ${job.title}`);
        }
      }

    } catch (e) {
      console.error(`  - Error processing ${url}:`, (e as Error).message);
    }

    console.log("  - Sleeping for 10 seconds to avoid rate limits...");
    await sleep(10000);
  }

  console.log(`\n✅ Batch Scraping Complete! Total Jobs Added: ${totalAdded}`);
  process.exit(0);
}

runScraper();
