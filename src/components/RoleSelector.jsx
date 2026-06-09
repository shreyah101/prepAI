import {
  Code2,
  Database,
  Globe,
  HardDrive,
  LayoutTemplate,
  MonitorPlay,
  Palette,
  Settings,
} from "lucide-react";

const roles = [
  { label: "Frontend Developer", icon: <LayoutTemplate className="h-8 w-8" />, color: "var(--neon-cyan)" },
  { label: "Backend Developer", icon: <Database className="h-8 w-8" />, color: "var(--neon-purple)" },
  { label: "Full-Stack Developer", icon: <Globe className="h-8 w-8" />, color: "var(--neon-pink)" },
  { label: "Data Analyst", icon: <MonitorPlay className="h-8 w-8" />, color: "var(--info)" },
  { label: "UI/UX Designer", icon: <Palette className="h-8 w-8" />, color: "var(--neon-cyan)" },
  { label: "Product Manager", icon: <Code2 className="h-8 w-8" />, color: "var(--neon-purple)" },
  { label: "DevOps Engineer", icon: <Settings className="h-8 w-8" />, color: "var(--neon-pink)" },
  { label: "Machine Learning", icon: <HardDrive className="h-8 w-8" />, color: "var(--info)" },
];

const interviewTypes = ["Technical", "Behavioral", "Mixed"];
const difficulties = [
  { label: "Easy", display: "Rookie", color: "var(--success)" },
  { label: "Medium", display: "Warrior", color: "var(--warning)" },
  { label: "Hard", display: "Legend", color: "var(--danger)" },
];
const questionCounts = [3, 5, 10];

function RoleSelector({ config, onChange, onStart, loading }) {
  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="text-center">
        <h2 className="hero-subtitle text-[24px] md:text-[40px] text-white">
          CHOOSE YOUR <span className="text-[var(--neon-purple)]">EXPERIENCE</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-[12px] font-bold uppercase tracking-[0.1em] text-[var(--text-muted)]">
          SELECT HOW YOU WANT TO PLAY
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4 mt-8">
        {roles.map(({ label, icon, color }) => {
          const selected = config.role === label;
          return (
            <button
              key={label}
              type="button"
              onClick={() => onChange("role", label)}
              className={`game-card flex flex-col items-center justify-center p-8 text-center transition-all ${
                selected ? "game-card-selected" : ""
              }`}
              style={{
                borderColor: selected ? color : undefined,
                boxShadow: selected ? `0 0 20px ${color}40` : undefined,
              }}
            >
              <div
                className="mb-4 flex h-16 w-16 items-center justify-center rounded-[12px] border bg-[var(--bg-deep)]"
                style={{
                  borderColor: selected ? color : "var(--border-subtle)",
                  color: selected ? color : "var(--text-dim)",
                  boxShadow: selected ? `0 0 15px ${color}40` : "none",
                }}
              >
                {icon}
              </div>
              <span className="pixel-heading text-[14px] text-white">{label}</span>
            </button>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3 mt-8">
        <OptionGroup
          label="QUEST TYPE"
          options={interviewTypes}
          value={config.interviewType}
          onSelect={(value) => onChange("interviewType", value)}
        />

        <div className="game-card p-6">
          <div className="section-label mb-4 text-[var(--neon-cyan)]">DIFFICULTY MULTIPLIER</div>
          <div className="flex flex-wrap gap-3">
            {difficulties.map((difficulty) => {
              const selected = config.difficulty === difficulty.label;
              return (
                <button
                  key={difficulty.label}
                  type="button"
                  onClick={() => onChange("difficulty", difficulty.label)}
                  className="rounded-[8px] border px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all"
                  style={{
                    borderColor: selected ? difficulty.color : "var(--border-subtle)",
                    color: selected ? difficulty.color : "var(--text-muted)",
                    background: selected ? "rgba(255,255,255,0.05)" : "transparent",
                    boxShadow: selected ? `0 0 10px ${difficulty.color}40` : "none",
                  }}
                >
                  {difficulty.display}
                </button>
              );
            })}
          </div>
        </div>

        <div className="game-card p-6">
          <div className="section-label mb-4 text-[var(--neon-purple)]">ROUNDS</div>
          <div className="flex flex-wrap gap-3">
            {questionCounts.map((count) => {
              const selected = config.count === count;
              return (
                <button
                  key={count}
                  type="button"
                  onClick={() => onChange("count", count)}
                  className="rounded-[8px] border px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all"
                  style={{
                    borderColor: selected ? "var(--neon-purple)" : "var(--border-subtle)",
                    background: selected ? "rgba(168,85,247,0.1)" : "transparent",
                    color: selected ? "var(--text-main)" : "var(--text-muted)",
                    boxShadow: selected ? "0 0 10px var(--neon-purple-dim)" : "none",
                  }}
                >
                  {count}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <button
          type="button"
          disabled={!config.role || loading}
          onClick={onStart}
          className="btn-primary w-full max-w-md"
        >
          {loading ? "INITIALIZING..." : "▶ ENTER STAGE"}
        </button>
      </div>
    </div>
  );
}

function OptionGroup({ label, options, value, onSelect }) {
  return (
    <div className="game-card p-6">
      <div className="section-label mb-4 text-[var(--neon-pink)]">{label}</div>
      <div className="flex flex-wrap gap-3">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onSelect(option)}
            className="rounded-[8px] border px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all"
            style={{
              borderColor: value === option ? "var(--neon-pink)" : "var(--border-subtle)",
              background: value === option ? "rgba(244,63,94,0.1)" : "transparent",
              color: value === option ? "var(--text-main)" : "var(--text-muted)",
              boxShadow: value === option ? "0 0 10px var(--neon-pink-dim)" : "none",
            }}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default RoleSelector;

