# Hacklanta '26
### UnOfficial Event Landing Page

> Atlanta's flagship collegiate cyber festival and hackathon — October 9–11, 2026 at Atlanta Tech Square.

---

## 🌐 Event Overview

**Hacklanta '26** is the South's premier student-run collegiate hackathon and high-voltage technology festival. Over the course of 36 continuous hours, 1,000+ emerging developers, designers, hardware hackers, and domain researchers convene in the heart of Atlanta’s Tech Square to build boundary-pushing software, autonomous systems, creative computing tools, and civic impact solutions. 

With $45,000+ in bounties, industry mentorship from leading engineering teams, round-the-clock catering, and vibrant music and hardware side quests, Hacklanta '26 redefines the collegiate hackathon as an immersive cyber-festival.

---

## ✨ Web Platform Highlights

- **Interactive 3D Lanyard Pass & Integrated 8-Step Application**:
  - Realistic 3D badge physics with pointer tilt, spring elasticity, and holographic color-dodge sheen.
  - Interactive card flip mechanics seamlessly bridging the festival ID badge and an 8-step participant application flow.
  - Full application state management covering applicant identity, academic background, track specialization, team matchmaking preferences, swag logistics, and motivation essays.
  - Sticky bottom action dock with safe padding, real-time input validation, duplicate email prevention, and celebratory festival confetti.

- **Clean Dynamic Sponsor & Community Partner Grid**:
  - Borderless, glassmorphic partner showcase presenting Title, Supporting, and Community partners in responsive modern card grids.
  - Dedicated *"Become a Partner"* interactive modal capturing enterprise inquiries directly into dedicated sponsor lead pipelines.

- **Interactive FAQ & Event Navigation**:
  - Dynamic expandable accordion addressing participant eligibility, travel grants, hardware labs, and team formation.
  - Floating top navigation with live active section tracking, mobile drawer navigation, and official Major League Hacking (MLH) trust credentials.

- **Supabase Database Integration**:
  - Full-stack integration via Supabase MCP with Row Level Security (RLS) enforcement.
  - Secure storage for participant applications (`participants` table) and corporate sponsorship leads (`sponsors_leads` table).
  - Dynamic remote content delivery for partner logos (`sponsors_list` table) and frequently asked questions (`faqs` table).

---

## 🛠️ Tech Stack

- **Frontend & UI**: React 18, Vite 5, Tailwind CSS, Framer Motion, Canvas Confetti, Lucide Icons
- **Backend & Database**: Supabase (PostgreSQL with Row Level Security & MCP Server integration)
- **Deployment Target**: Vercel

---

© 2026 Hacklanta Organizing Committee. Official Major League Hacking (MLH) Member Event.
