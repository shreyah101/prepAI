import {
  ArrowRight,
  BarChart3,
  Bot,
  Brain,
  Code2,
  Cpu,
  Database,
  Flame,
  Layers,
  Layout,
  Server,
  ShieldCheck,
  Sparkles,
  Terminal,
  Zap,
} from "lucide-react";

const roleCards = [
  {
    id: "frontend",
    label: "Frontend Developer",
    category: "WEB & UI",
    icon: Layout,
    accent: "bg-neo-yellow",
    badgeAccent: "bg-neo-yellow",
    sub: "React 19, Next.js, TypeScript & Performance",
    desc: "Component lifecycle, state management, CSS architecture, web vitals, and modern browser rendering optimizations.",
  },
  {
    id: "backend",
    label: "Backend Developer",
    category: "DISTRIBUTED SYSTEMS",
    icon: Server,
    accent: "bg-neo-pink",
    badgeAccent: "bg-neo-pink",
    sub: "Node.js, Go, Microservices & Database Tuning",
    desc: "REST/gRPC APIs, indexing strategies, caching mechanisms, concurrency control, and scalable system architectures.",
  },
  {
    id: "fullstack",
    label: "Full-Stack Developer",
    category: "END-TO-END",
    icon: Layers,
    accent: "bg-neo-cyan",
    badgeAccent: "bg-neo-cyan",
    sub: "Full-Stack Architecture & Cloud Integrations",
    desc: "End-to-end software delivery, state sync, auth flows, database migrations, and CI/CD deployment pipelines.",
  },
  {
    id: "ml",
    label: "Machine Learning Engineer",
    category: "AI & ML",
    icon: Brain,
    accent: "bg-neo-purple",
    badgeAccent: "bg-neo-purple",
    sub: "LLMs, PyTorch, Model Serving & Vectors",
    desc: "Prompt engineering, embeddings, transformer architectures, fine-tuning, retrieval augmented generation, and evaluation.",
  },
  {
    id: "devops",
    label: "DevOps Engineer",
    category: "INFRASTRUCTURE",
    icon: Terminal,
    accent: "bg-neo-green",
    badgeAccent: "bg-neo-green",
    sub: "Docker, Kubernetes, Terraform & CI/CD",
    desc: "Infrastructure as Code, container orchestration, zero-downtime rollouts, monitoring, and cloud security best practices.",
  },
  {
    id: "data",
    label: "Data Analyst",
    category: "ANALYTICS & SQL",
    icon: BarChart3,
    accent: "bg-neo-orange",
    badgeAccent: "bg-neo-orange",
    sub: "Advanced SQL, Python Pandas & Data Viz",
    desc: "Window functions, ETL pipelines, cohort retention, statistical significance, and executive business dashboards.",
  },
  {
    id: "uiux",
    label: "UI/UX Designer",
    category: "PRODUCT DESIGN",
    icon: Sparkles,
    accent: "bg-neo-rose",
    badgeAccent: "bg-neo-rose",
    sub: "Design Systems, User Research & Prototyping",
    desc: "Usability heuristics, interaction patterns, wireframing, typography, design tokens, and user journey mapping.",
  },
  {
    id: "pm",
    label: "Product Manager",
    category: "STRATEGY & METRICS",
    icon: ShieldCheck,
    accent: "bg-neo-cream",
    badgeAccent: "bg-neo-cream",
    sub: "Roadmapping, Product Sense & Growth Metrics",
    desc: "Feature prioritization frameworks (RICE), metric definition, stakeholder management, and product launch strategy.",
  },
];

const interviewTypes = [
  { label: "Technical", desc: "Core algorithms, coding & architecture" },
  { label: "Behavioral", desc: "STAR method, teamwork & scenarios" },
  { label: "Mixed", desc: "Combined tech + leadership questions" },
];

const difficulties = [
  { label: "Easy", tag: "ROOKIE", color: "bg-neo-green", desc: "Junior / Entry Level (0-1 YOE)" },
  { label: "Medium", tag: "WARRIOR", color: "bg-neo-yellow", desc: "Mid Level (2-4 YOE)" },
  { label: "Hard", tag: "LEGEND", color: "bg-neo-pink", desc: "Senior / Staff Level (5+ YOE)" },
];

const questionCounts = [3, 5, 10];

function RoleSelector({ config, onChange, onStart, loading }) {
  return (
    <div className="space-y-8">
      {/* Top Banner Step indicator (Seatzy Style) */}
      <div className="neo-banner-step">
        <span className="flex h-5 w-5 items-center justify-center rounded-full border border-black bg-black font-mono text-[11px] text-white">
          i
        </span>
        <span>
          STEP 1: SELECT YOUR TARGET JOB ROLE, INTERVIEW FOCUS & DIFFICULTY SETTING.
        </span>
      </div>

      {/* Role Catalog Grid (Seatzy Style Explore Cards) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="neo-badge neo-badge-yellow">TARGET ROLE</span>
            <span className="font-mono text-xs font-bold text-neutral-600">
              CLICK ANY ROLE CARD TO SELECT
            </span>
          </div>
          <span className="font-mono text-xs font-extrabold uppercase bg-black text-neo-yellow px-2 py-0.5 border border-black">
            8 ROLES READY
          </span>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {roleCards.map((role) => {
            const Icon = role.icon;
            const isSelected = config.role === role.label;

            return (
              <button
                key={role.id}
                type="button"
                onClick={() => onChange("role", role.label)}
                className={`flex flex-col justify-between p-5 text-left transition ${
                  isSelected
                    ? "neo-card-selected bg-amber-50/50"
                    : "neo-card neo-card-hover"
                }`}
              >
                <div>
                  {/* Top Bar: Icon + Category Badge */}
                  <div className="flex items-start justify-between gap-2">
                    <div
                      className={`flex h-12 w-12 items-center justify-center border-2 border-black ${role.accent} shadow-neo-sm`}
                    >
                      <Icon className="h-6 w-6 stroke-[2.2] text-black" />
                    </div>
                    <span className="border border-black bg-black px-2 py-0.5 font-mono text-[9px] font-bold uppercase text-white">
                      {role.category}
                    </span>
                  </div>

                  {/* Title & Sub */}
                  <h3 className="mt-4 font-black text-base uppercase tracking-tight text-black">
                    {role.label}
                  </h3>
                  <p className="mt-1 font-mono text-[11px] font-bold text-neutral-700">
                    {role.sub}
                  </p>

                  <p className="mt-2 text-xs leading-relaxed text-neutral-600 line-clamp-2">
                    {role.desc}
                  </p>
                </div>

                {/* Bottom Select Indicator */}
                <div className="mt-4 pt-3 border-t-2 border-dashed border-neutral-300 flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold uppercase text-neutral-500">
                    {isSelected ? "✓ SELECTED" : "SELECT ROLE"}
                  </span>
                  <span
                    className={`flex h-6 w-6 items-center justify-center border-2 border-black font-bold text-xs ${
                      isSelected ? "bg-neo-yellow text-black" : "bg-white text-black"
                    }`}
                  >
                    →
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Configuration Strip (Interview Type, Difficulty, Rounds) */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Quest / Interview Type */}
        <div className="neo-card p-5 space-y-3">
          <div className="flex items-center gap-2">
            <span className="neo-badge neo-badge-cyan">TYPE *</span>
            <span className="font-mono text-xs font-bold text-black">INTERVIEW FOCUS</span>
          </div>

          <div className="space-y-2">
            {interviewTypes.map((type) => {
              const active = config.interviewType === type.label;
              return (
                <button
                  key={type.label}
                  type="button"
                  onClick={() => onChange("interviewType", type.label)}
                  className={`w-full flex items-center justify-between p-2.5 border-2 border-black text-left font-mono text-xs transition ${
                    active
                      ? "bg-neo-yellow font-bold shadow-neo-sm text-black"
                      : "bg-white hover:bg-neutral-100 text-neutral-800"
                  }`}
                >
                  <div>
                    <div className="font-bold uppercase">{type.label}</div>
                    <div className="text-[10px] text-neutral-600">{type.desc}</div>
                  </div>
                  <span className="font-bold">{active ? "●" : "○"}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Difficulty */}
        <div className="neo-card p-5 space-y-3">
          <div className="flex items-center gap-2">
            <span className="neo-badge neo-badge-pink">LEVEL *</span>
            <span className="font-mono text-xs font-bold text-black">TARGET DIFFICULTY</span>
          </div>

          <div className="space-y-2">
            {difficulties.map((diff) => {
              const active = config.difficulty === diff.label;
              return (
                <button
                  key={diff.label}
                  type="button"
                  onClick={() => onChange("difficulty", diff.label)}
                  className={`w-full flex items-center justify-between p-2.5 border-2 border-black text-left font-mono text-xs transition ${
                    active
                      ? `${diff.color} font-bold shadow-neo-sm text-black`
                      : "bg-white hover:bg-neutral-100 text-neutral-800"
                  }`}
                >
                  <div>
                    <div className="font-bold uppercase">
                      {diff.label} <span className="text-[10px] opacity-75">[{diff.tag}]</span>
                    </div>
                    <div className="text-[10px] text-neutral-600">{diff.desc}</div>
                  </div>
                  <span className="font-bold">{active ? "●" : "○"}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Rounds */}
        <div className="neo-card p-5 space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="neo-badge neo-badge-green">ROUNDS *</span>
              <span className="font-mono text-xs font-bold text-black">QUESTION COUNT</span>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2">
              {questionCounts.map((count) => {
                const active = config.count === count;
                return (
                  <button
                    key={count}
                    type="button"
                    onClick={() => onChange("count", count)}
                    className={`border-2 border-black py-3 text-center font-mono font-bold transition ${
                      active
                        ? "bg-neo-yellow shadow-neo-sm text-black"
                        : "bg-white hover:bg-neutral-100 text-neutral-800"
                    }`}
                  >
                    <div className="text-lg">{count}</div>
                    <div className="text-[10px] uppercase text-neutral-600">ROUNDS</div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="border border-black bg-neutral-100 p-2.5 font-mono text-[11px] text-neutral-700">
            Estimated duration: ~{config.count * 3} mins with instant AI multi-axis evaluation.
          </div>
        </div>
      </div>

      {/* Start Action Bar */}
      <div className="neo-card bg-[#111111] p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="border border-neo-yellow bg-neo-yellow px-2 py-0.5 font-mono text-[10px] font-bold text-black uppercase">
              {config.role || "NO ROLE SELECTED"}
            </span>
            <span className="font-mono text-xs text-neutral-400">
              {config.interviewType} • {config.difficulty} • {config.count} Rounds
            </span>
          </div>
          <h4 className="font-black uppercase text-lg text-white">
            Ready To Launch Interview Arena?
          </h4>
        </div>

        <button
          type="button"
          disabled={!config.role || loading}
          onClick={onStart}
          className="w-full sm:w-auto btn-neo btn-neo-yellow text-sm px-8 py-3 font-black flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
              GENERATING QUESTIONS...
            </>
          ) : (
            <>
              <Zap className="h-4 w-4 fill-black" />
              START MOCK INTERVIEW
              <ArrowRight className="h-4 w-4 stroke-[3]" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default RoleSelector;
