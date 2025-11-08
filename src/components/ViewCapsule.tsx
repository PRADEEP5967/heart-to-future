import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Sparkles, Target, Palette } from "lucide-react";
import { decryptData } from "@/lib/encryption";
import confetti from "canvas-confetti";

const THEME_STYLES = {
  modern: {
    gradient: "from-blue-500/10 to-cyan-500/10",
    border: "border-blue-500/30",
    accent: "text-blue-600 dark:text-blue-400",
  },
  vintage: {
    gradient: "from-amber-600/10 to-orange-700/10",
    border: "border-amber-600/30",
    accent: "text-amber-700 dark:text-amber-400",
  },
  minimalist: {
    gradient: "from-slate-500/10 to-gray-600/10",
    border: "border-slate-500/30",
    accent: "text-slate-700 dark:text-slate-300",
  },
  cosmic: {
    gradient: "from-purple-600/10 to-pink-600/10",
    border: "border-purple-600/30",
    accent: "text-purple-600 dark:text-purple-400",
  },
};

interface Goal {
  id: string;
  title: string;
  completed: boolean;
}

interface Capsule {
  id: string;
  title: string;
  message: string;
  openDate: string;
  isGoal: boolean;
  voiceNote?: string;
  createdAt: string;
  theme?: "modern" | "vintage" | "minimalist" | "cosmic";
}

interface ViewCapsuleProps {
  capsule: Capsule;
  onBack: () => void;
}

export const ViewCapsule = ({ capsule, onBack }: ViewCapsuleProps) => {
  const [isOpening, setIsOpening] = useState(true);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [decryptedMessage, setDecryptedMessage] = useState("");

  useEffect(() => {
    // Decrypt message
    try {
      setDecryptedMessage(decryptData(capsule.message));
    } catch {
      setDecryptedMessage(capsule.message);
    }

    // Load goals if this is a goal capsule
    if (capsule.isGoal) {
      const allGoals = JSON.parse(localStorage.getItem("goals") || "[]");
      const capsuleGoals = allGoals.filter((g: any) => g.capsuleId === capsule.id);
      setGoals(capsuleGoals);
    }

    // Opening animation
    setTimeout(() => {
      setIsOpening(false);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#9b87f5', '#f97794', '#fbbf24'],
      });
    }, 2000);
  }, [capsule]);

  const toggleGoal = (goalId: string) => {
    const allGoals = JSON.parse(localStorage.getItem("goals") || "[]");
    const updatedGoals = allGoals.map((g: any) => {
      if (g.id === goalId) {
        return { ...g, completed: !g.completed, completedAt: !g.completed ? new Date().toISOString() : null };
      }
      return g;
    });
    localStorage.setItem("goals", JSON.stringify(updatedGoals));
    
    setGoals(goals.map(g => 
      g.id === goalId ? { ...g, completed: !g.completed } : g
    ));

    if (!goals.find(g => g.id === goalId)?.completed) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    }
  };

  const completedGoals = goals.filter(g => g.completed).length;
  const totalGoals = goals.length;
  const progress = totalGoals > 0 ? (completedGoals / totalGoals) * 100 : 0;

  if (isOpening) {
    return (
      <div className="min-h-screen gradient-warm flex items-center justify-center px-4">
        <div className="text-center space-y-6 animate-scale-in">
          <div className="relative">
            <div className="absolute inset-0 animate-ping">
              <Sparkles className="w-24 h-24 mx-auto text-primary opacity-50" />
            </div>
            <Sparkles className="w-24 h-24 mx-auto text-primary" />
          </div>
          <h2 className="text-4xl font-bold text-gradient animate-pulse">
            Opening your time capsule...
          </h2>
          <p className="text-lg text-muted-foreground">
            Prepare to relive your memories ✨
          </p>
        </div>
      </div>
    );
  }

  const theme = capsule.theme || "modern";
  const themeStyle = THEME_STYLES[theme];

  return (
    <div className="min-h-screen gradient-warm px-4 py-12">
      <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <Card className={`p-8 shadow-card border-2 bg-gradient-to-br ${themeStyle.gradient}`}>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-bold text-gradient">
                  {capsule.title}
                </h1>
                <Badge variant="secondary" className="capitalize">
                  <Palette className="w-3 h-3 mr-1" />
                  {theme}
                </Badge>
              </div>
              <p className="text-muted-foreground">
                Created on {new Date(capsule.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <div className={`bg-card/50 p-6 rounded-lg border-2 ${themeStyle.border} font-handwritten text-lg leading-relaxed whitespace-pre-wrap`}>
                {decryptedMessage}
              </div>
            </div>

            {capsule.voiceNote && (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Your Voice Note</h3>
                <audio controls className="w-full" src={capsule.voiceNote} />
              </div>
            )}

            {capsule.isGoal && goals.length > 0 && (
              <div className="space-y-4 p-6 bg-muted/30 rounded-lg border-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Target className="w-6 h-6 text-primary" />
                    Your Goals Progress
                  </h3>
                  <span className="text-2xl font-bold text-primary">
                    {completedGoals}/{totalGoals}
                  </span>
                </div>
                
                <Progress value={progress} className="h-3" />
                
                <div className="space-y-3 mt-4">
                  {goals.map((goal) => (
                    <div
                      key={goal.id}
                      className="flex items-center gap-3 p-3 bg-background rounded-lg border transition-smooth hover:shadow-card"
                    >
                      <Checkbox
                        id={goal.id}
                        checked={goal.completed}
                        onCheckedChange={() => toggleGoal(goal.id)}
                      />
                      <label
                        htmlFor={goal.id}
                        className={`flex-1 cursor-pointer text-base ${
                          goal.completed ? "line-through text-muted-foreground" : ""
                        }`}
                      >
                        {goal.title}
                      </label>
                    </div>
                  ))}
                </div>

                {progress === 100 && (
                  <div className="mt-4 p-4 bg-primary/10 rounded-lg text-center">
                    <p className="text-lg font-semibold text-primary">
                      🎉 Congratulations! You've achieved all your goals! 🎉
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};
