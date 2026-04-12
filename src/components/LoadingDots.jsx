function LoadingDots({ label = "Analyzing your answer..." }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-indigo-400/20 bg-slate-900/60 px-4 py-3 text-sm text-slate-200">
      <span>{label}</span>
      <div className="flex gap-1">
        {[0, 1, 2].map((index) => (
          <span
            key={index}
            className="h-2 w-2 animate-pulse rounded-full bg-indigo-300"
            style={{ animationDelay: `${index * 120}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

export default LoadingDots;
