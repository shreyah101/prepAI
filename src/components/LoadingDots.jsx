function LoadingDots({ label = "Analyzing your answer..." }) {
  return (
    <div className="game-card flex items-center justify-between gap-4 px-4 py-3 text-sm text-[var(--text-muted)]">
      <span className="bubble-heading text-[14px]">{label}</span>
      <div className="flex gap-2">
        {[0, 1, 2].map((index) => (
          <span
            key={index}
            className="h-2 w-2 rounded-sm bg-[var(--pink-bright)] animate-pulse"
            style={{ animationDelay: `${index * 140}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

export default LoadingDots;

