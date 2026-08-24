# PrepAI

PrepAI is an AI-powered mock interview simulator designed for candidates and developers preparing for technical and behavioral interviews. The platform dynamically generates role-specific interview questions, performs multi-axis scoring on submissions, provides benchmark model answers, and tracks user progress through a gamified XP system.

Built by **Shreya Sundli**.

---

## Overview

Technical interviews require structured communication, domain knowledge, and practical problem solving. PrepAI simulates real-world interview environments by generating tailored questions across 8 industry disciplines using Groq's high-speed LLaMA 3.3 70B model. Every submission is analyzed across key scoring criteria to give candidates actionable feedback before real interviews.

---

## Core Features

- **8 Target Job Disciplines**: Covers Frontend, Backend, Full-Stack, Machine Learning, DevOps, Data Analyst, UI/UX Designer, and Product Manager roles.
- **Dynamic Question Generation**: Generates technical and STAR-method behavioral questions dynamically adjusted to selected difficulty levels (Junior, Mid, Senior).
- **Multi-Axis Answer Scoring**: Evaluates each response across Relevance, Depth, Clarity, and Practical Examples.
- **Model Benchmark Answers**: Provides recommended benchmark answers and communication tips after each round.
- **Battle Reports**: Summarizes completed sessions with overall scores, performance ratings, and category breakdowns.
- **Quest Log History**: Archives completed interview sessions with inspection drawers to review past answers and improvement tips.
- **Client-Side JWT Authentication**: Secure HMAC-SHA256 session token management with local persistence.
- **Gamified Progression**: Tracks candidate XP, gems, and level milestones as interview rounds are completed.
- **Neo-Brutalist Interface**: High-contrast layout with bold typography, solid borders, and structured component cards.

---

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide React Icons
- **AI Inference Engine**: Groq API (`llama-3.3-70b-versatile`)
- **Authentication**: Client-side HMAC-SHA256 JWT sessions
- **Storage & State**: Browser LocalStorage & SessionStorage
- **Design System**: Neo-Brutalism (Paper Grid, Solid Borders, Offset Shadows)
- **Deployment**: Vercel ready

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A Groq API Key (available at [console.groq.com](https://console.groq.com))

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/shreyah101/prepAI.git
   cd prepAI
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create your environment configuration file:
   ```bash
   cp .env.example .env
   ```

4. Add your Groq API key to `.env`:
   ```env
   VITE_GROQ_API_KEY=your_groq_api_key_here
   ```

5. Start the local development server:
   ```bash
   npm run dev
   ```

---

## Project Structure

```
prepAI/
├── public/               # Static assets and icons
├── src/
│   ├── components/       # UI components (Navbar, RoleSelector, QuestionCard, AuthModal, etc.)
│   ├── context/          # JWT Authentication Context and Session Provider
│   ├── hooks/            # Custom React hooks (useAuth, useGroq)
│   ├── lib/              # Core utilities (jwt.js, groq.js, prompts.js, sessionStore.js)
│   ├── pages/            # Page views (LandingPage, InterviewPage, ResultsPage, HistoryPage)
│   ├── App.jsx           # App routing and layout configuration
│   ├── index.css         # Design system tokens and styling rules
│   └── main.jsx          # Application entry point
├── .env.example          # Environment variables template
├── tailwind.config.js    # Tailwind CSS configuration
├── vercel.json           # Vercel deployment configuration
├── vite.config.js        # Vite configuration
└── package.json          # Project dependencies and scripts
```

---

## Deployment on Vercel

1. Import the repository into your Vercel account.
2. Under **Project Settings** -> **Environment Variables**, add:
   - `VITE_GROQ_API_KEY`: Your Groq API key
3. Deploy the project. The included `vercel.json` ensures all client-side routes resolve properly.

---

## License

MIT License - Copyright (c) Shreya Sundli
