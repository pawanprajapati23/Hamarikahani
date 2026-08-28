# HamaraKahani Jobs 🚀

A production-ready job aggregation platform built for Noida, Greater Noida, and Gurugram. 

## 🌟 Features

- **Automated AI Ingestion**: Fetches jobs from APIs/Feeds and structures them automatically using **Google Gemini AI**.
- **Serverless Database**: Powered by **Firebase Firestore** via the Firebase Admin SDK.
- **Auto-Cleanup**: Automated Cron jobs to automatically remove expired jobs from the platform.
- **Duplicate Detection**: Prevents duplicate jobs from cluttering the search results using unique source URLs.
- **SEO Ready**: Next.js App Router, dynamic metadata, and lightning-fast rendering.

## 🛠 Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: Firebase Firestore (NoSQL)
- **AI Processing**: Google GenAI (`@google/genai`)
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js / Firebase Auth

## 📁 Project Architecture

- **`app/`**: Next.js App Router containing frontend pages.
- **`lib/firebaseAdmin.ts`**: Initializes the Firebase Admin SDK securely for backend access.
- **`app/api/cron/job-manager/route.ts`**: The core ETL Engine (Extract, Transform, Load). This endpoint runs daily to:
  1. Delete expired jobs from Firestore.
  2. Fetch new job postings.
  3. Extract structured JSON using Gemini AI.
  4. Deduplicate and publish to Firestore.

## 🚀 Getting Started

### 1. Environment Setup
Create a `.env.local` file in the root of the project and add your variables:
```bash
cp .env.example .env.local
```
Make sure to fill in your Firebase Service Account keys and Gemini API key.

### 2. Install Dependencies
```bash
npm install
```
*(Or use `bun install` since `bun.lock` is present)*

### 3. Run the Development Server
```bash
npm run dev
```

### 4. Test the Cron Job Locally
Visit `http://localhost:3000/api/cron/job-manager` in your browser to trigger the automated scraping, AI processing, and database cleaning pipeline.

## 🌐 Production Deployment

This application is ready to be deployed on Vercel.

1. Deploy the app to Vercel.
2. Add your environment variables in the Vercel Dashboard.
3. Configure **Vercel Cron** by adding a `vercel.json` to trigger the `/api/cron/job-manager` endpoint daily. 
4. Pass the `CRON_SECRET` to secure the route from unauthorized access.

---
*Built with ❤️ for the HamaraKahani Community.*
