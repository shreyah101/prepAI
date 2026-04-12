import {
  BarChart2,
  Brain,
  Briefcase,
  Cloud,
  Code2,
  Layers,
  PenTool,
  Server,
} from "lucide-react";

const roles = [
  { label: "Frontend Developer", icon: Code2 },
  { label: "Backend Developer", icon: Server },
  { label: "Full-Stack Developer", icon: Layers },
  { label: "Data Analyst", icon: BarChart2 },
  { label: "UI/UX Designer", icon: PenTool },
  { label: "Product Manager", icon: Briefcase },
  { label: "DevOps Engineer", icon: Cloud },
  { label: "Machine Learning Engineer", icon: Brain },
];

const interviewTypes = ["Technical", "Behavioral", "Mixed"];
const difficulties = ["Easy", "Medium", "Hard"];
const questionCounts = [3, 5, 10];

function RoleSelector({ config, onChange, onStart, loading }) {
  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div className="space-y-3 text-center">
        <div className="eyebrow">Interview setup</div>
        <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
          What are you preparing for?
        </h1>
        <p className="mx-auto max-w-2xl text-base leading-7 text-slate-300">
          Pick a role, choose the interview style, and generate a practice loop that feels close to the real thing.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {roles.map(({ label, icon: Icon }) => {
          const selected = config.role === label;
          return (
            <button
              key={label}
              type="button"
              onClick={() => onChange("role", label)}
              className={`role-card ${selected ? "role-card-active" : ""}`}
            >
              <Icon className="h-6 w-6" />
              <span>{label}</span>
            </button>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <OptionGroup
          label="Interview type"
          options={interviewTypes}
          value={config.interviewType}
          onSelect={(value) => onChange("interviewType", value)}
        />
        <OptionGroup
          label="Difficulty"
          options={difficulties}
          value={config.difficulty}
          onSelect={(value) => onChange("difficulty", value)}
        />
        <div className="glass-panel p-5">
          <label className="mb-4 block text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            Questions
          </label>
          <input
            type="range"
            min="0"
            max={questionCounts.length - 1}
            value={questionCounts.indexOf(config.count)}
            onChange={(event) => onChange("count", questionCounts[Number(event.target.value)])}
            className="w-full accent-indigo-400"
          />
          <div className="mt-4 flex items-center justify-between text-sm text-slate-300">
            {questionCounts.map((count) => (
              <span key={count} className={config.count === count ? "text-white" : ""}>
                {count}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          disabled={!config.role || loading}
          onClick={onStart}
          className="primary-button w-full max-w-xs justify-center"
        >
          {loading ? "Generating questions..." : "Start Interview"}
        </button>
      </div>
    </div>
  );
}

function OptionGroup({ label, options, value, onSelect }) {
  return (
    <div className="glass-panel p-5">
      <div className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">{label}</div>
      <div className="flex flex-wrap gap-3">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onSelect(option)}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              value === option
                ? "border-indigo-300 bg-indigo-400/15 text-indigo-100"
                : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default RoleSelector;
