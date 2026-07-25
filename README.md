# HamariKahani ✨

Building memories that last forever. 

HamariKahani is a premium digital storytelling platform designed to help people craft beautiful, emotional surprise web pages for their loved ones. I built this because I wanted a way to create something deeply personal without needing to be a designer or a coder. No hassle—just pure emotion.

## Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Database:** PostgreSQL via Supabase
- **ORM:** Drizzle ORM
- **Styling:** Tailwind CSS + Framer Motion
- **UI Components:** shadcn/ui
- **State Management:** Zustand
- **Payments:** Razorpay 
- **Media:** Cloudinary

## Core Features
- 🎨 **Universal Story Editor:** A highly responsive drag-and-drop canvas. Add text, images, videos, and emotional quotes.
- 📱 **Mobile-First Design:** Buttery-smooth experience across all devices, from the landing page to the editor canvas.
- 🔒 **Secure Auth:** Powered by Supabase Auth with Google OAuth & Email Magic Links.
- ⚡ **Performance:** Heavily optimized for Core Web Vitals with GPU-accelerated Framer Motion layouts.
- 🌍 **Custom Slugs:** Claim unique, permanent URLs (e.g., `hamarikahani.in/s/sarah-25th`).
- 💳 **Seamless Payments:** Integrated Razorpay checkout flow for lifetime hosting.

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Setup environment variables:**
   Create a `.env.local` file and add your keys:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
   DATABASE_URL=your_postgres_url
   ```

3. **Database Setup:**
   Push the schema to your Postgres instance:
   ```bash
   npx drizzle-kit push
   ```

4. **Run the app:**
   ```bash
   npm run dev
   ```

---
*Built with ❤️ for digital storytelling.*
