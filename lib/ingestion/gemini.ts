import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const JOB_SCHEMA = {
  type: "object",
  properties: {
    title: { type: "string" },
    companyName: { type: "string" },
    city: { type: "string" },
    location: { type: "string" },
    category: { type: "string" },
    experienceMin: { type: "number", nullable: true },
    experienceMax: { type: "number", nullable: true },
    experienceText: { type: "string", nullable: true },
    education: { type: "string", nullable: true },
    skills: { type: "array", items: { type: "string" } },
    salaryMin: { type: "number", nullable: true },
    salaryMax: { type: "number", nullable: true },
    salaryText: { type: "string", nullable: true },
    employmentType: { type: "string", nullable: true },
    workMode: { type: "string", nullable: true },
    shortDescription: { type: "string" },
    isRelevant: { type: "boolean" },
    confidence: { type: "number" }
  },
  required: ["title", "companyName", "location", "isRelevant", "confidence", "shortDescription"]
};

export async function processJobWithGemini(rawJobContent: string, rawUrl: string) {
  // Truncate content to avoid high costs, job descriptions shouldn't be larger than a few KB
  const truncatedContent = rawJobContent.slice(0, 4000); 

  const prompt = `
You are a job data extraction expert for HamaraKahani Jobs, focusing on Noida, Greater Noida, and Gurugram (India).
Extract structured information from the following job listing.

Requirements:
1. Do NOT invent or hallucinate information. If a field is not present, return null.
2. Clean up the job title (e.g., remove "URGENT", asterisks, or job codes).
3. "city" should ideally be "Noida", "Greater Noida", or "Gurugram". 
4. "isRelevant" should be true ONLY IF the job is located in or around Noida, Greater Noida, Delhi NCR, or Gurugram, AND is a legitimate job opportunity (not spam/MLM).
5. "skills" should be a list of 3-8 key technical or soft skills mentioned.
6. "workMode" should be exactly "REMOTE", "HYBRID", or "ONSITE".
7. "employmentType" should be exactly "FULL_TIME", "PART_TIME", "INTERNSHIP", or "CONTRACT".

Source URL for context: ${rawUrl}

Job Listing Content:
---
${truncatedContent}
---
  `;

  try {
    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: JOB_SCHEMA as any,
        temperature: 0.1,
      }
    });

    if (response.text) {
      return JSON.parse(response.text);
    }
    return null;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
}

export async function searchJobsWithGemini(query: string) {
  const prompt = `
Search the web for the latest active job postings matching this query: "${query}".
Find at least 5 different, specific job postings that are currently active in India (especially NCR/Noida/Gurugram if applicable).
For each job, extract the details based on the schema provided. 
IMPORTANT: You MUST include the actual URL ('url') where the job is posted, and an 'applyUrl' if available. 
If 'applyUrl' is not found, use the 'url' as 'applyUrl'.
Make sure 'shortDescription' is a compelling 2-line summary of the role.
`;

  const SEARCH_RESULTS_SCHEMA = {
    type: "array",
    description: "List of jobs found on the web",
    items: {
      type: "object",
      properties: {
        title: { type: "string" },
        company: { type: "string" },
        location: { type: "string" },
        description: { type: "string", description: "A solid paragraph describing the role." },
        url: { type: "string", description: "The actual source URL of this job posting." },
        applyUrl: { type: "string" },
        sourceName: { type: "string", description: "The name of the website where this was found (e.g., LinkedIn, Indeed, Naukri)." }
      },
      required: ["title", "company", "location", "description", "url", "applyUrl", "sourceName"]
    }
  };

  try {
    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: SEARCH_RESULTS_SCHEMA as any,
        temperature: 0.3,
      }
    });

    if (response.text) {
      return JSON.parse(response.text);
    }
    return [];
  } catch (error) {
    console.error("Gemini Search API Error:", error);
    return [];
  }
}
