import {
  ArrowDown,
  ArrowRight,
  BarChart3,
  Brain,
  CheckCircle2,
  Code2,
  Compass,
  Cpu,
  Flame,
  KeyRound,
  Layers,
  Layout,
  Minus,
  Play,
  Server,
  ShieldCheck,
  Sparkles,
  Square,
  Terminal,
  Trophy,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const rolesList = [
  {
    id: "frontend",
    title: "Frontend Developer",
    sub: "React 19, Next.js, Web Vitals & TypeScript",
    desc: "Component lifecycle, state management, CSS architecture, web vitals, and rendering optimization.",
    tag: "WEB & UI",
    icon: Layout,
    accent: "bg-neo-yellow",
  },
  {
    id: "backend",
    title: "Backend Developer",
    sub: "Node.js, Go, Microservices & Database Tuning",
    desc: "REST/gRPC APIs, indexing strategies, caching mechanisms, concurrency control, and scalability.",
    tag: "DISTRIBUTED SYSTEMS",
    icon: Server,
    accent: "bg-neo-pink",
  },
  {
    id: "fullstack",
    title: "Full-Stack Developer",
    sub: "Full-Stack Architecture & Cloud Integrations",
    desc: "End-to-end software delivery, state sync, auth flows, database migrations, and CI/CD pipelines.",
    tag: "END-TO-END",
    icon: Layers,
    accent: "bg-neo-cyan",
  },
  {
    id: "ml",
    title: "Machine Learning Engineer",
    sub: "LLMs, PyTorch, Model Serving & Vectors",
    desc: "Prompt engineering, embeddings, transformer architectures, fine-tuning, and RAG evaluation.",
    tag: "AI & ML",
    icon: Brain,
    accent: "bg-neo-purple",
  },
  {
    id: "devops",
    title: "DevOps Engineer",
    sub: "Docker, Kubernetes, Terraform & CI/CD",
    desc: "Infrastructure as Code, container orchestration, zero-downtime rollouts, and cloud security.",
    tag: "INFRASTRUCTURE",
    icon: Terminal,
    accent: "bg-neo-green",
  },
  {
    id: "data",
    title: "Data Analyst",
    sub: "Advanced SQL, Python Pandas & Data Viz",
    desc: "Window functions, ETL pipelines, cohort retention, statistical significance, and dashboards.",
    tag: "ANALYTICS & SQL",
    icon: BarChart3,
    accent: "bg-neo-orange",
  },
  {
    id: "uiux",
    title: "UI/UX Designer",
    sub: "Design Systems, User Research & Figma",
    desc: "Usability heuristics, interaction patterns, wireframing, design tokens, and user journey mapping.",
    tag: "PRODUCT DESIGN",
    icon: Sparkles,
    accent: "bg-neo-rose",
  },
  {
    id: "pm",
    title: "Product Manager",
    sub: "Roadmapping, Product Sense & Growth",
    desc: "Feature prioritization (RICE), metric definition, stakeholder alignment, and product execution.",
    tag: "STRATEGY & METRICS",
    icon: ShieldCheck,
    accent: "bg-neo-cream",
  },
];

const featureHighlights = [
  {
    title: "8 TAILORED JOB ROLES",
    desc: "Curated role-specific technical & behavioral interview prompts adapted dynamically to chosen difficulty levels.",
    badge: "ROLE COVERAGE",
    color: "bg-neo-yellow",
    icon: Terminal,
  },
  {
    title: "GROQ LLaMA 3.3 70B",
    desc: "Ultra-fast sub-second question generation and deep analytical scoring powered by Groq's high-speed LPU inference.",
    badge: "SUB-SECOND AI",
    color: "bg-neo-cyan",
    icon: Zap,
  },
  {
    title: "MULTI-AXIS EVALUATION",
    desc: "Every answer is scored across Relevance, Depth, Clarity, and Practical Examples, with comprehensive Model Benchmark Answers.",
    badge: "DETAILED AUDIT",
    color: "bg-neo-pink",
    icon: Trophy,
  },
];

function LandingPage() {
  const { user, openAuthModal, loading } = useAuth();
  const navigate = useNavigate();

  const handleStartRole = (roleTitle) => {
    if (!user) {
      openAuthModal(roleTitle);
    } else {
      navigate("/interview", { state: { preselectRole: roleTitle } });
    }
  };

  const scrollToRoles = () => {
    const el = document.getElementById("roles-directory");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-12 pb-20">
      {/* ============================================================ */}
      {/* HERO SECTION: Cool Cyber Background + Bouncing prepAI.exe Window */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden border-b-[3px] border-black hero-cyber-bg px-4 py-12 sm:py-16 md:py-20 text-white">
        {/* Floating Decorative Neo-Badges in Background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-[5%] top-[12%] hidden lg:flex items-center gap-1.5 border-2 border-black bg-neo-yellow px-3 py-1 font-mono text-xs font-black uppercase text-black shadow-neo animate-float-slow">
            <Zap className="h-3.5 w-3.5 fill-black" />
            <span>LLaMA 3.3 70B ENGINE</span>
          </div>

          <div
            className="absolute right-[6%] top-[18%] hidden lg:flex items-center gap-1.5 border-2 border-black bg-neo-cyan px-3 py-1 font-mono text-xs font-black uppercase text-black shadow-neo animate-float-slow"
            style={{ animationDelay: "1.5s" }}
          >
            <Trophy className="h-3.5 w-3.5" />
            <span>MULTI-AXIS AUDIT</span>
          </div>

          <div
            className="absolute left-[8%] bottom-[15%] hidden lg:flex items-center gap-1.5 border-2 border-black bg-neo-pink px-3 py-1 font-mono text-xs font-black uppercase text-black shadow-neo animate-float-slow"
            style={{ animationDelay: "3s" }}
          >
            <Terminal className="h-3.5 w-3.5" />
            <span>8 INDUSTRY ROLES</span>
          </div>

          <div
            className="absolute right-[8%] bottom-[12%] hidden lg:flex items-center gap-1.5 border-2 border-black bg-white px-3 py-1 font-mono text-xs font-black uppercase text-black shadow-neo animate-float-slow"
            style={{ animationDelay: "2s" }}
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>BY SHREYA SUNDLI</span>
          </div>
        </div>

        <div className="relative mx-auto max-w-4xl z-10">
          {/* Top Status Bar Tag */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 border-2 border-black bg-neo-yellow px-3 py-1 font-mono text-xs font-black uppercase text-black shadow-neo-sm">
                <Compass className="h-3.5 w-3.5" />
                SYSTEM READY
              </span>
              <span className="hidden sm:inline-flex border-2 border-white bg-black px-3 py-1 font-mono text-xs font-bold uppercase text-white">
                AI INTERVIEW ARENA • REAL-TIME MOCK RUNS
              </span>
            </div>

            <span className="border-2 border-black bg-neo-cyan px-3 py-1 font-mono text-xs font-extrabold uppercase text-black shadow-neo-sm">
              GROQ LPU ACCELERATED
            </span>
          </div>

          {/* ============================================================ */}
          {/* BOUNCING prepAI.exe WINDOW */}
          {/* ============================================================ */}
          <div className="neo-window neo-window-dark animate-bounce-open overflow-hidden">
            {/* Window Titlebar */}
            <div className="flex items-center justify-between border-b-2 border-black bg-[#1f1f23] px-4 py-2.5 select-none">
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center border border-neo-yellow bg-neo-yellow text-black font-black text-xs">
                  ⚡
                </span>
                <span className="font-mono text-xs font-black uppercase tracking-wider text-neo-yellow">
                  prepAI.exe — EXECUTABLE SIMULATOR v2.4
                </span>
              </div>

              {/* Window Controls */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  title="Minimize"
                  className="flex h-6 w-6 items-center justify-center border border-black bg-[#333338] text-white hover:bg-neutral-600 transition"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <button
                  type="button"
                  title="Maximize"
                  className="flex h-6 w-6 items-center justify-center border border-black bg-[#333338] text-white hover:bg-neutral-600 transition"
                >
                  <Square className="h-2.5 w-2.5" />
                </button>
                <button
                  type="button"
                  title="Close"
                  className="flex h-6 w-6 items-center justify-center border border-black bg-red-500 text-black hover:bg-red-600 transition font-bold"
                >
                  <X className="h-3.5 w-3.5 stroke-[3]" />
                </button>
              </div>
            </div>

            {/* Window Content Body */}
            <div className="p-6 sm:p-8 md:p-10 space-y-6 bg-[#111111]">
              {/* Giant Bouncing Heading */}
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 border border-neo-yellow bg-black px-2.5 py-0.5 font-mono text-[11px] font-bold text-neo-yellow uppercase">
                  <span>● STATUS: INITIALIZED</span>
                  <span>•</span>
                  <span>AI ENGINE ONLINE</span>
                </div>

                <h1 className="font-black italic uppercase tracking-tight text-4xl sm:text-5xl md:text-6xl text-white leading-none">
                  prepAI<span className="text-neo-yellow">.exe</span>
                </h1>

                <p className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-300 max-w-2xl leading-relaxed">
                  AI-POWERED MOCK INTERVIEW SIMULATOR & REAL-TIME EVALUATION ARENA
                </p>
              </div>

              {/* Project About Brief */}
              <div className="border-2 border-black bg-[#1a1a1e] p-4 sm:p-5 font-mono text-xs leading-relaxed text-neutral-300 space-y-2.5 shadow-neo-sm">
                <div className="flex items-center gap-2 text-white font-bold uppercase">
                  <Terminal className="h-4 w-4 text-neo-yellow" />
                  <span>PROJECT BRIEF:</span>
                </div>
                <p>
                  Built by <strong className="text-neo-yellow font-black">Shreya Sundli</strong>, <strong>PrepAI</strong> is an intelligent mock interview platform engineered for students and developers. Select your target engineering discipline, face dynamically generated technical & behavioral challenges powered by <strong>Groq LLaMA 3.3 70B</strong>, and receive instant <strong>multi-axis diagnostic scoring</strong>, benchmark solutions, and XP rewards.
                </p>
              </div>

              {/* 3 Interactive Highlight Pills */}
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="border-2 border-black bg-white p-3 text-black shadow-neo-sm">
                  <div className="font-mono text-[10px] font-bold text-neutral-500 uppercase">
                    DISCIPLINES
                  </div>
                  <div className="font-black text-sm uppercase">8 TARGET ROLES</div>
                </div>

                <div className="border-2 border-black bg-neo-yellow p-3 text-black shadow-neo-sm">
                  <div className="font-mono text-[10px] font-bold text-black uppercase">
                    LLM ENGINE
                  </div>
                  <div className="font-black text-sm uppercase">LLaMA 3.3 70B</div>
                </div>

                <div className="border-2 border-black bg-neo-cyan p-3 text-black shadow-neo-sm">
                  <div className="font-mono text-[10px] font-bold text-black uppercase">
                    EVALUATION
                  </div>
                  <div className="font-black text-sm uppercase">4-AXIS SCORING</div>
                </div>
              </div>

              {/* Primary Call to Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  type="button"
                  onClick={scrollToRoles}
                  className="btn-neo btn-neo-yellow text-xs sm:text-sm font-black py-3.5 px-6 flex items-center justify-center gap-2"
                >
                  <Play className="h-4 w-4 fill-black" />
                  <span>PROCEED TO ROLES DIRECTORY</span>
                  <ArrowDown className="h-4 w-4 stroke-[3]" />
                </button>

                <button
                  type="button"
                  onClick={() => openAuthModal()}
                  className="btn-neo btn-neo-white text-xs sm:text-sm font-black py-3.5 px-6 flex items-center justify-center gap-2 hover:bg-neo-cyan"
                >
                  <KeyRound className="h-4 w-4" />
                  <span>{user ? `LOGGED IN AS ${user.displayName?.split(" ")[0] || "CANDIDATE"}` : "SIGN IN / SIGN UP"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* ROLES DIRECTORY: 4X2 GRID OF ALL 8 DISCIPLINES */}
      {/* ============================================================ */}
      <div id="roles-directory" className="mx-auto max-w-7xl space-y-10 px-4 sm:px-6 scroll-mt-20">
        {/* Metric Strip */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatBox
            label="TOTAL SIMULATIONS"
            value="500+"
            badge="ACTIVE RUNS"
            color="bg-neo-yellow"
          />
          <StatBox
            label="JOB DISCIPLINES"
            value="8 ROLES"
            badge="4X2 MATRIX"
            color="bg-neo-cyan"
          />
          <StatBox
            label="EVALUATION SPEED"
            value="< 1.2s"
            badge="GROQ LPU"
            color="bg-neo-pink"
          />
          <StatBox
            label="ACCURACY METRICS"
            value="4-AXIS"
            badge="BENCHMARKED"
            color="bg-neo-purple"
          />
        </div>

        {/* Roles Catalog Section (4X2 Grid Fit) */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-black pb-3">
            <div className="flex items-center gap-2">
              <span className="border-2 border-black bg-neo-yellow px-2.5 py-0.5 font-mono text-xs font-black uppercase text-black">
                ROLE DIRECTORY
              </span>
              <h2 className="font-black text-xl uppercase tracking-tight text-black">
                SELECT A ROLE TO BEGIN MOCK INTERVIEW (8 DISCIPLINES)
              </h2>
            </div>
            <span className="font-mono text-xs font-bold text-neutral-600">
              CLICK ANY ROLE CARD TO LAUNCH
            </span>
          </div>

          {/* 4x2 Grid Layout */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {rolesList.map((role) => {
              const Icon = role.icon;
              return (
                <div
                  key={role.id}
                  className="neo-card neo-card-hover p-5 flex flex-col justify-between space-y-4 bg-white"
                >
                  <div>
                    {/* Top Bar: Icon + Category Badge */}
                    <div className="flex items-start justify-between gap-2">
                      <div
                        className={`flex h-11 w-11 items-center justify-center border-2 border-black ${role.accent} shadow-neo-sm`}
                      >
                        <Icon className="h-5 w-5 stroke-[2.2] text-black" />
                      </div>
                      <span className="border border-black bg-black px-2 py-0.5 font-mono text-[9px] font-bold uppercase text-white">
                        {role.tag}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h3 className="mt-3.5 font-black text-base uppercase tracking-tight text-black">
                      {role.title}
                    </h3>
                    <p className="mt-1 font-mono text-[11px] font-bold text-neutral-700">
                      {role.sub}
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-neutral-600 line-clamp-2">
                      {role.desc}
                    </p>
                  </div>

                  {/* Bottom Action Button */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => handleStartRole(role.title)}
                      className="btn-neo btn-neo-white w-full text-xs font-black py-2 flex items-center justify-between hover:bg-neo-yellow"
                    >
                      <span>START INTERVIEW</span>
                      <span className="flex h-5 w-5 items-center justify-center border border-black bg-black text-white font-bold text-xs">
                        →
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center gap-2 border-b-2 border-black pb-3">
            <span className="border-2 border-black bg-neo-cyan px-2.5 py-0.5 font-mono text-xs font-black uppercase text-black">
              HOW PREPAI WORKS
            </span>
            <h2 className="font-black text-xl uppercase tracking-tight text-black">
              BUILT FOR HIGH-STAKES TECH CANDIDATES
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {featureHighlights.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.title}
                  className="neo-card p-6 space-y-3 bg-white"
                >
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex h-10 w-10 items-center justify-center border-2 border-black ${feat.color} shadow-neo-sm`}
                    >
                      <Icon className="h-5 w-5 text-black stroke-[2.2]" />
                    </div>
                    <span className="border border-black bg-neutral-100 px-2 py-0.5 font-mono text-[9px] font-bold uppercase text-neutral-700">
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="font-black text-base uppercase tracking-tight text-black">
                    {feat.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-neutral-600 font-mono">
                    {feat.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatBox({ label, value, badge, color }) {
  return (
    <div className="neo-card p-5 space-y-2 bg-white">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] font-black uppercase text-neutral-500">
          {label}
        </span>
        <span className={`border border-black ${color} px-2 py-0.5 font-mono text-[9px] font-bold text-black uppercase shadow-neo-sm`}>
          {badge}
        </span>
      </div>
      <div className="font-black text-3xl font-mono text-black">
        {value}
      </div>
    </div>
  );
}

export default LandingPage;
