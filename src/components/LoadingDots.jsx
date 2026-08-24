import { Terminal } from "lucide-react";

function LoadingDots({ label = "Analyzing your response with Groq LLaMA 3.3..." }) {
  return (
    <div className="neo-card p-4 flex items-center justify-between gap-4 bg-neo-yellow">
      <div className="flex items-center gap-2 font-mono text-xs font-black uppercase text-black">
        <Terminal className="h-4 w-4" />
        <span>{label}</span>
      </div>
      <div className="flex items-center gap-1.5">
        {[0, 1, 2, 3].map((index) => (
          <span
            key={index}
            className="h-3 w-3 border border-black bg-black animate-pulse"
            style={{ animationDelay: `${index * 150}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

export default LoadingDots;
