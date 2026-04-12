const roles = [
  { label: "Frontend Developer", emoji: "??" },
  { label: "Backend Developer", emoji: "???" },
  { label: "Full-Stack Developer", emoji: "??" },
  { label: "Data Analyst", emoji: "??" },
  { label: "UI/UX Designer", emoji: "??" },
  { label: "Product Manager", emoji: "???" },
  { label: "DevOps Engineer", emoji: "??" },
  { label: "Machine Learning Engineer", emoji: "??" },
];

const interviewTypes = ["Technical", "Behavioral", "Mixed"];
const difficulties = [
  { label: "Easy", display: "? Rookie", color: "var(--success)" },
  { label: "Medium", display: "?? Warrior", color: "var(--warning)" },
  { label: "Hard", display: "?? Legend", color: "var(--danger)" },
];
const questionCounts = [3, 5, 10];

function RoleSelector({ config, onChange, onStart, loading }) {
  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="text-center">
        <div className="eyebrow">? QUEST PREP SCREEN ?</div>
        <h1 className="pixel-heading mt-5 text-[18px] leading-[1.8] text-white md:text-[24px]">
          Pick Your Class
          <br />
          And Start The Run
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[var(--text-muted)]">
          Choose your job class, set the quest type, and launch a mock interview that feels like a boss battle with feedback.
        </p>
      </div>

      <div className="space-y-3">
        <div className="section-label">? Choose Your Class</div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {roles.map(({ label, emoji }) => {
            const selected = config.role === label;
            return (
              <button
                key={label}
                type="button"
                onClick={() => onChange("role", label)}
                className={`game-card p-4 text-center hover:scale-[1.04] ${selected ? "game-card-selected" : ""}`}
              >
                <span className="mb-3 block text-[32px]">{emoji}</span>
                <span className="bubble-heading text-[13px] text-[var(--text-lavender)]">{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <OptionGroup
          label="? Quest Type"
          options={interviewTypes}
          value={config.interviewType}
          onSelect={(value) => onChange("interviewType", value)}
        />

        <div className="game-card p-5">
          <div className="section-label mb-4">? Difficulty</div>
          <div className="flex flex-wrap gap-3">
            {difficulties.map((difficulty) => {
              const selected = config.difficulty === difficulty.label;
              return (
                <button
                  key={difficulty.label}
                  type="button"
                  onClick={() => onChange("difficulty", difficulty.label)}
                  className="rounded-[10px] border-2 px-4 py-3 text-sm transition"
                  style={{
                    borderColor: selected ? difficulty.color : "var(--purple-muted)",
                    color: selected ? difficulty.color : "var(--text-dim)",
                    background: selected ? "rgba(255,255,255,0.03)" : "transparent",
                    boxShadow: selected && difficulty.label === "Hard" ? "0 0 14px rgba(248, 113, 113, 0.25)" : "none",
                  }}
                >
                  <span className="bubble-heading">{difficulty.display}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="game-card p-5">
          <div className="section-label mb-4">? Rounds</div>
          <div className="flex flex-wrap gap-3">
            {questionCounts.map((count) => {
              const selected = config.count === count;
              return (
                <button
                  key={count}
                  type="button"
                  onClick={() => onChange("count", count)}
                  className="rounded-[10px] border-2 px-4 py-3 text-sm transition"
                  style={{
                    borderColor: selected ? "var(--purple-bright)" : "var(--purple-muted)",
                    background: selected ? "var(--purple-main)" : "transparent",
                    color: selected ? "#fff" : "var(--text-dim)",
                  }}
                >
                  <span className="bubble-heading">{count} Rounds</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button type="button" disabled={!config.role || loading} onClick={onStart} className="btn-primary w-full max-w-md justify-center">
          {loading ? "Generating Quest..." : "? Start Quest"}
        </button>
      </div>
    </div>
  );
}

function OptionGroup({ label, options, value, onSelect }) {
  return (
    <div className="game-card p-5">
      <div className="section-label mb-4">{label}</div>
      <div className="flex flex-wrap gap-3">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onSelect(option)}
            className="rounded-full border-2 px-4 py-2 text-sm transition bubble-heading"
            style={{
              borderColor: value === option ? "var(--purple-bright)" : "var(--purple-muted)",
              background: value === option ? "var(--purple-main)" : "transparent",
              color: value === option ? "#fff" : "var(--text-dim)",
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

