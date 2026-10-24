# hacklanta26

> The Official Landing Page & Application Platform for **Hacklanta '26** — Atlanta's largest collegiate cyber festival and hackathon at Tech Square (October 9–11, 2026).

---

## 🚀 Overview

**Hacklanta '26** brings together over 1,000+ collegiate builders, designers, researchers, and engineers for 36 hours of high-voltage creation. Built with a futuristic psychedelic cyberpunk aesthetic, rich micro-interactions, 3D physics badge cards, and a seamless Supabase full-stack database backend.

---

## ✨ Key Features

1. **Interactive 3D Lanyard Card & 8-Step Application**:
   - Realistic 3D badge physics with spring inertia, holographic sheen, and pointer tilt.
   - Card flip animation (Front ID card ⇄ Back 8-step participant registration).
   - Seamless continuous lanyard strap extending to the top of the viewport.
   - 8-Step comprehensive application flow:
     - **Step 1**: Personal Identity (First & Last Name, Phone Number).
     - **Step 2**: Contact & Profiles (Email, GitHub, LinkedIn).
     - **Step 3**: Education & Role (Institution, Graduation Year, Experience).
     - **Step 4**: Tracks & Technical Specialization (Frontend, Backend, AI/ML, UI/UX, Cybersecurity, Tech Stack).
     - **Step 5**: Team Preference (Applying with a team or seeking team matchmaking).
     - **Step 6**: Logistics & Merch (T-Shirt size, dietary requirements).
     - **Step 7**: Motivation & Project Idea Essay.
     - **Step 8**: Review & MLH Code of Conduct / Privacy Policy acceptance.
   - Fixed sticky dock action bar with responsive padding so navigation buttons are never cut off on mobile or desktop.
   - Real-time Supabase insertion with loading spinners, duplicate email prevention, and festival rainbow confetti on success.

2. **Sponsor & Partner Lead Inquiries ("Become a Partner")**:
   - Dedicated glassmorphism **Partner Modal** for corporate sponsors and community partners.
   - Captures company name, contact person, work email, preferred sponsorship tier (Title, Supporting, Community, Custom), and custom messaging.
   - Submits directly into the `sponsors_leads` Supabase table.

3. **Dynamic Content Delivery from Supabase**:
   - **Sponsors List**: Fetched in real-time from the `sponsors_list` table categorized by tiers (Title, Supporting, Community) with clean borderless card grids.
   - **Interactive FAQs**: Accordion FAQ items loaded dynamically from the `faqs` table with fallback caching.

4. **Zero Dead Links & Full MLH Integration**:
   - Verified links to MLH 2027 Season, MLH Code of Conduct, and Privacy Policy.
   - Smooth scrolling anchors across all sections (`#home`, `#what-is-hacklanta`, `#tracks`, `#prizes`, `#sponsors`, `#faq`).

---

## 🛠️ Tech Stack

- **Framework**: React 18, Vite 5
- **Styling**: Tailwind CSS 3, Custom CSS Design System
- **Animation & Physics**: Framer Motion, GSAP, Canvas Confetti
- **Icons**: Lucide React
- **Backend / Database**: Supabase (PostgreSQL with Row Level Security)
- **Deployment**: Vercel Ready

---

## 🗄️ Database Schema & RLS Policies

All tables reside in the Supabase `public` schema protected by Row Level Security (RLS):

- **`participants`**: Stores applicant registrations.
  - *RLS*: Public `INSERT` allowed; `SELECT`/`UPDATE`/`DELETE` restricted to authenticated admins.
- **`sponsors_leads`**: Stores partnership inquiry leads.
  - *RLS*: Public `INSERT` allowed.
- **`sponsors_list`**: Stores sponsor company logos, tiers, and display orders.
  - *RLS*: Public `SELECT` (read-only) allowed.
- **`faqs`**: Stores hackathon questions, answers, and categories.
  - *RLS*: Public `SELECT` (read-only) allowed.

---

## ⚙️ Environment Variables (Vercel & Local)

To run locally or deploy to **Vercel**, create a `.env` or `.env.local` file (or set in the Vercel Dashboard under **Project Settings > Environment Variables**):

```env
# Supabase Project URL & Anon Key (Vite Frontend)
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

# Next.js Compatibility (if deploying under Next.js runtime)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

> **Note**: An example template is provided in `.env.example`. Never commit your live `.env` file to version control.

---

## 🏃 Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the local dev server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Preview the production build**:
   ```bash
   npm run preview
   ```

---

## 📄 License & Conduct

- Official MLH Member Event — adhering to the [MLH Code of Conduct](https://static.mlh.io/docs/mlh-code-of-conduct.pdf).
- All Rights Reserved © 2026 Hacklanta Organizing Committee.
