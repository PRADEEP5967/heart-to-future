import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Lock, Unlock, Eye } from "lucide-react";
import { motion } from "framer-motion";

interface Capsule {
  id: string;
  userId: string;
  title: string;
  message: string;
  openDate: string;
  createdAt: string;
  status: "sealed" | "opened";
  theme?: "modern" | "vintage" | "minimalist" | "cosmic";
  isGoal: boolean;
  voiceNote?: string;
  files?: Array<{ name: string; data: string; type: string }>;
}

interface TimelineProps {
  capsules: Capsule[];
  onViewCapsule: (capsule: Capsule) => void;
  onPreviewCapsule: (capsule: Capsule) => void;
}

const THEME_COLORS = {
  modern: "from-blue-500 to-cyan-500",
  vintage: "from-amber-600 to-orange-700",
  minimalist: "from-slate-500 to-gray-600",
  cosmic: "from-purple-600 to-pink-600",
};

export const Timeline = ({ capsules, onViewCapsule, onPreviewCapsule }: TimelineProps) => {
  const sortedCapsules = [...capsules].sort(
    (a, b) => new Date(a.openDate).getTime() - new Date(b.openDate).getTime()
  );

  const now = new Date();

  return (
    <div className="relative space-y-8 py-8">
      {/* Timeline line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent" />

      {sortedCapsules.map((capsule, index) => {
        const openDate = new Date(capsule.openDate);
        const isLocked = openDate > now;
        const isPast = openDate < now;

        return (
          <motion.div
            key={capsule.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative pl-20"
          >
            {/* Timeline dot */}
            <div
              className={`absolute left-6 top-6 w-5 h-5 rounded-full border-4 border-background ${
                isPast
                  ? "bg-green-500"
                  : isLocked
                  ? "bg-primary"
                  : "bg-yellow-500 animate-pulse"
              }`}
            />

            <Card className="p-6 hover:shadow-lg transition-shadow border-2">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {isLocked ? (
                      <Lock className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <Unlock className="w-4 h-4 text-green-500" />
                    )}
                    <h3 className="text-xl font-bold">{capsule.title}</h3>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>Opens {openDate.toLocaleDateString()}</span>
                    <span className="mx-2">•</span>
                    <Clock className="w-4 h-4" />
                    <span>Created {new Date(capsule.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Badge
                    variant={isPast ? "default" : isLocked ? "secondary" : "outline"}
                    className="capitalize"
                  >
                    {isPast ? "Opened" : isLocked ? "Locked" : "Ready"}
                  </Badge>
                  <Badge variant="outline" className="capitalize">
                    {capsule.theme}
                  </Badge>
                </div>
              </div>

              <div
                className={`h-24 rounded-lg bg-gradient-to-br ${
                  THEME_COLORS[(capsule.theme || "modern") as keyof typeof THEME_COLORS]
                } mb-4 relative overflow-hidden`}
              >
                {isLocked && (
                  <div className="absolute inset-0 backdrop-blur-sm bg-white/10 flex items-center justify-center">
                    <Lock className="w-8 h-8 text-white/80" />
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                {!isLocked ? (
                  <Button
                    onClick={() => onViewCapsule(capsule)}
                    className="flex-1"
                    variant="default"
                  >
                    <Unlock className="w-4 h-4 mr-2" />
                    Open Capsule
                  </Button>
                ) : (
                  <Button
                    onClick={() => onPreviewCapsule(capsule)}
                    className="flex-1"
                    variant="outline"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                )}
              </div>
            </Card>
          </motion.div>
        );
      })}

      {sortedCapsules.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-lg">No capsules yet. Create your first time capsule!</p>
        </div>
      )}
    </div>
  );
};
