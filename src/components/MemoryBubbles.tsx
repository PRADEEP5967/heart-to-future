import { Sparkles } from "lucide-react";

const quotes = [
  "Your future is created by what you do today",
  "Dream big, start small",
  "The best time to plant a tree was 20 years ago. The second best time is now",
  "Every moment is a fresh beginning",
  "Believe in your future self",
  "Your story is still being written",
];

export const MemoryBubbles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {quotes.map((quote, i) => (
        <div
          key={i}
          className="absolute animate-float opacity-40"
          style={{
            left: `${(i * 15) % 90}%`,
            top: `${(i * 20) % 80}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${3 + i * 0.5}s`,
          }}
        >
          <div className="bg-primary/10 backdrop-blur-sm rounded-full p-4 border border-primary/20 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground/70 max-w-[200px]">
              {quote}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
