<div align="center">

<img src="https://img.shields.io/badge/PrepAI-Mock%20Interview%20Simulator-7c3aed?style=for-the-badge&logo=react&logoColor=white" alt="PrepAI" />

<br/>
<br/>

```
 ____                    _    ___
|  _ \ _ __ ___ _ __   / \  |_ _|
| |_) | '__/ _ \ '_ \ / _ \  | |
|  __/| | |  __/ |_) / ___ \ | |
|_|   |_|  \___| .__/_/   \_\___|
                |_|
```

### Practice Interviews. Earn XP. Land the Job.

**An AI-powered mock interview simulator with role-specific question generation,  
multi-axis answer scoring, and gamified session tracking.**

<br/>

[![React](https://img.shields.io/badge/React%2018-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![JWT](https://img.shields.io/badge/JWT-Session%20Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![Groq](https://img.shields.io/badge/Groq%20LLaMA%203.3%2070B-f55036?style=for-the-badge&logo=meta&logoColor=white)](https://groq.com/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-Neo--Brutalist-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

</div>

---

## What is PrepAI?

PrepAI is a **Neo-Brutalist mock interview simulator** built for students and career job seekers. Select a job role, choose your difficulty, and face AI-generated interview questions powered by Groq LLaMA 3.3 70B — then get **instant multi-dimensional feedback** on every answer. Track your XP, level up your profile, and build interview confidence one round at a time.

> Built as a portfolio project by **Shreya Sundli**.  

---

## Features

| Feature | Description |
|---|---|
| **8+ Job Roles** | Frontend, Backend, Full-Stack, Data Analyst, ML Engineer, UI/UX, PM, DevOps |
| **AI Question Generation** | Role-specific, difficulty-adjusted questions via Groq LLaMA 3.3 70B |
| **Multi-Axis Scoring** | Answers scored on Relevance, Depth, Clarity, and Practical Examples |
| **Model Benchmark Answers** | AI-generated ideal answer shown after each submission |
| **Battle Reports** | Full session breakdown with S/A/B/C rank system and diagnostic audit |
| **Quest Log** | Complete history of past sessions with slide-out inspection drawer |
| **JWT Session Auth** | Client-side signed HMAC-SHA256 JWT session tokens |
| **XP & Leveling** | Gamified progression system with gem and XP rewards |
| **Neo-Brutalist UI** | High-contrast grid, solid black borders, and hard offset drop shadows |

---

## Tech Stack

```
Frontend          →  React 18 + Vite + Tailwind CSS + Lucide Icons
AI / LLM          →  Groq API  (llama-3.3-70b-versatile)
Authentication    →  Client-Side HMAC-SHA256 JWT Session Tokens
Storage           →  Local / Browser Persistence & SessionStore
Design System     →  Neo-Brutalism (Paper Grid, Solid Borders, Hard Shadows)
Fonts             →  Plus Jakarta Sans + Space Grotesk + Space Mono + Inter
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- A [Groq API key](https://console.groq.com) (free tier available)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/shreyasundli/prepai.git
cd prepai

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Fill in your Groq API key (see below)

# 4. Start the dev server
npm run dev
```

### Environment Variables

Create a `.env` file in the root with your Groq API key:

```env
VITE_GROQ_API_KEY=your_groq_api_key_here
```

> Never commit your `.env` file. It's already in `.gitignore`.

---

## Project Structure

```
prepai/
├── src/
│   ├── components/       # Reusable Neo-Brutalist UI components
│   │   ├── Navbar.jsx
│   │   ├── AuthModal.jsx
│   │   ├── RoleSelector.jsx
│   │   ├── QuestionCard.jsx
│   │   ├── AnswerInput.jsx
│   │   ├── FeedbackCard.jsx
│   │   ├── ScoreGauge.jsx
│   │   ├── ProgressBar.jsx
│   │   ├── LoadingDots.jsx
│   │   └── SessionHistory.jsx
│   ├── pages/            # Route-level page components
│   │   ├── LandingPage.jsx
│   │   ├── InterviewPage.jsx
│   │   ├── ResultsPage.jsx
│   │   └── HistoryPage.jsx
│   ├── context/          # JWT Auth Context
│   │   └── AuthContext.jsx
│   ├── hooks/            # Custom React hooks
│   │   ├── useAuth.js
│   │   └── useGroq.js
│   ├── lib/              # Utilities & storage
│   │   ├── jwt.js
│   │   ├── groq.js
│   │   ├── prompts.js
│   │   └── sessionStore.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── tailwind.config.js
└── package.json
```

---

## License

MIT © **Shreya Sundli**
