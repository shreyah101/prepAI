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

### ⚡ Practice Interviews. Earn XP. Land the Job.

**An AI-powered mock interview simulator with role-specific question generation,  
multi-axis answer scoring, and gamified session tracking.**

<br/>

[![Live Demo](https://img.shields.io/badge/🌐%20Live%20Demo-PrepAI-success?style=for-the-badge)](https://prep-ai-flame-eight.vercel.app/)
[![React](https://img.shields.io/badge/React%2018-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Groq](https://img.shields.io/badge/Groq%20LLaMA%203.3%2070B-f55036?style=for-the-badge&logo=meta&logoColor=white)](https://groq.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

</div>

---

## 🎮 What is PrepAI?

PrepAI is a **gamified mock interview simulator** built for students and early-career job seekers. Select a job role, choose your difficulty, and face AI-generated interview questions — then get **instant multi-dimensional feedback** on every answer. Track your XP, level up your profile, and build interview confidence one quest at a time.

> Built as a portfolio project by a 2nd-year B.Tech CSE student at VIT Vellore.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎭 **8+ Job Roles** | Frontend, Backend, Full-Stack, Data Analyst, ML Engineer, UI/UX, PM, DevOps |
| 🤖 **AI Question Generation** | Role-specific, difficulty-adjusted questions via Groq LLaMA 3.3 70B |
| ⚔️ **Multi-Axis Scoring** | Answers scored on Relevance, Depth, Clarity, and Use of Examples |
| 📖 **Model Answers** | AI-generated ideal answer shown after each submission |
| 🏆 **Battle Reports** | Full session breakdown with S/A/B/C rank system |
| 📜 **Quest Log** | Complete history of past sessions saved to Firestore |
| 🔐 **Google Auth** | One-click sign in via Firebase Authentication |
| ⚡ **XP & Leveling** | Gamified progression system with gem rewards |
| 🎮 **Pixel Art UI** | Codedex × Roblox inspired pixel-adventure design theme |

---

## 🛠️ Tech Stack

```
Frontend          →  React 18 + Vite + Tailwind CSS
AI / LLM          →  Groq API  (llama-3.3-70b-versatile)
Authentication    →  Firebase Authentication (Google Sign-In)
Database          →  Cloud Firestore
Deployment        →  Vercel
Fonts             →  Press Start 2P + Fredoka One + Inter
```

---

## 📸 Screenshots

> *(Add your screenshots here)*

| Landing Page | Role Selector | Interview Q&A |
|:---:|:---:|:---:|
| ![Landing](./screenshots/landing.png) | ![Roles](./screenshots/roles.png) | ![Interview](./screenshots/interview.png) |

| Feedback Card | Battle Report | Quest Log |
|:---:|:---:|:---:|
| ![Feedback](./screenshots/feedback.png) | ![Results](./screenshots/results.png) | ![History](./screenshots/history.png) |

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- A [Groq API key](https://console.groq.com) (free tier available)
- A [Firebase project](https://console.firebase.google.com) with Auth + Firestore enabled

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/shreyasundli/prepai.git
cd prepai

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Fill in your keys (see below)

# 4. Start the dev server
npm run dev
```

### Environment Variables

Create a `.env` file in the root with the following:

```env
VITE_GROQ_API_KEY=your_groq_api_key_here

VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

> ⚠️ Never commit your `.env` file. It's already in `.gitignore`.

---

## 🗂️ Project Structure

```
prepai/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── RoleSelector.jsx
│   │   ├── QuestionCard.jsx
│   │   ├── AnswerInput.jsx
│   │   ├── FeedbackCard.jsx
│   │   ├── ScoreGauge.jsx
│   │   └── SessionHistory.jsx
│   ├── pages/            # Route-level page components
│   │   ├── LandingPage.jsx
│   │   ├── InterviewPage.jsx
│   │   ├── ResultsPage.jsx
│   │   └── HistoryPage.jsx
│   ├── hooks/            # Custom React hooks
│   │   ├── useGroq.js
│   │   └── useAuth.js
│   ├── lib/              # API clients & utilities
│   │   ├── groq.js
│   │   ├── firebase.js
│   │   └── prompts.js    # All Groq prompt templates
│   ├── context/
│   │   └── AuthContext.jsx
│   └── App.jsx
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 🤖 How the AI Works

PrepAI uses **two carefully engineered Groq prompts**:

### 1. Question Generation
At the start of each session, a single API call generates all questions as structured JSON — role-specific, difficulty-adjusted, and topic-varied.

```
Role: Frontend Developer  |  Difficulty: Warrior  |  Type: Mixed
→ Returns JSON array of {id, question, type, topic}
```

### 2. Answer Scoring
After each answer submission, the AI evaluates the response across **4 dimensions**:

| Dimension | Max Points | What it checks |
|---|---|---|
| Relevance | 3 | Does the answer address the question? |
| Depth | 3 | Is it detailed and specific? |
| Clarity | 2 | Is it well-structured? |
| Examples | 2 | Does it include concrete examples? |

Returns: `score (0–10)`, `verdict`, `strengths`, `improvements`, `model_answer`, `tip`

---

## 🏆 Rank System

| Score | Rank | Badge |
|---|---|---|
| 9–10 | S Rank | 🌟 |
| 7–8  | A Rank | ⭐ |
| 5–6  | B Rank | 🔷 |
| 0–4  | C Rank | 🔸 |

---

## 🗺️ Roadmap

- [x] Role-based question generation
- [x] Multi-axis AI answer scoring  
- [x] Firebase auth + session history
- [x] Gamified XP & rank system
- [x] Pixel art adventure UI theme
- [ ] 🎙️ Voice mode (Web Speech API)
- [ ] 💻 In-browser code editor for technical questions
- [ ] 🔥 Daily streak tracker
- [ ] 📊 Progress analytics dashboard
- [ ] 🏅 Shareable result cards for LinkedIn

---

## 🙌 Acknowledgements

- [Groq](https://groq.com) — blazing fast LLaMA inference
- [Firebase](https://firebase.google.com) — auth + database
- [Vercel](https://vercel.com) — deployment
- [Codedex.io](https://codedex.io) — pixel art design inspiration
- [Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P) — the perfect retro font

---

## 👩‍💻 Author

**Shreya Sundli**  
B.Tech CSE @ VIT Vellore  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://linkedin.com/in/shreya-sundli-aa899a330)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=flat&logo=github&logoColor=white)](https://github.com/shreyasundli)
[![Portfolio](https://img.shields.io/badge/Portfolio-ec4899?style=flat&logo=vercel&logoColor=white)](https://shreya-cv.netlify.app)

---

<div align="center">

Made with 💜 and way too much ✨ prompt engineering ✨

⭐ **Star this repo if you found it useful!**

</div>
