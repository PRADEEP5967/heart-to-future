import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Heart, TrendingUp, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface Capsule {
  id: string;
  userId: string;
  userName: string;
  title: string;
  message: string;
  openDate: string;
  status: "sealed" | "opened";
  createdAt: string;
  theme?: "modern" | "vintage" | "minimalist" | "cosmic";
  isPublic?: boolean;
  isGoal: boolean;
  reactions?: Array<{ userId: string; type: string }>;
  commentsCount?: number;
}

interface TrendingCapsulesProps {
  onViewCapsule: (capsule: Capsule) => void;
  limit?: number;
}

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

export const TrendingCapsules = ({ onViewCapsule, limit = 6 }: TrendingCapsulesProps) => {
  const [trendingCapsules, setTrendingCapsules] = useState<Capsule[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadTrendingCapsules();
  }, []);

  const loadTrendingCapsules = () => {
    const allCapsules = JSON.parse(localStorage.getItem("capsules") || "[]");
    const publicOpenedCapsules = allCapsules.filter(
      (c: Capsule) => c.isPublic && c.status === "opened"
    );

    // Sort by reaction count
    const sorted = publicOpenedCapsules.sort((a: Capsule, b: Capsule) => {
      const aCount = a.reactions?.length || 0;
      const bCount = b.reactions?.length || 0;
      return bCount - aCount;
    });

    setTrendingCapsules(sorted.slice(0, limit));
  };

  if (trendingCapsules.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <TrendingUp className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold">Trending Capsules</h2>
        <Badge variant="secondary" className="ml-auto">
          <Sparkles className="w-3 h-3 mr-1" />
          Popular
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {trendingCapsules.map((capsule, index) => {
          const theme = capsule.theme || "modern";
          const styles = THEME_STYLES[theme];
          const reactionCount = capsule.reactions?.length || 0;

          return (
            <motion.div
              key={capsule.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`p-5 cursor-pointer hover:shadow-lg transition-all border-2 ${styles.border} bg-gradient-to-br ${styles.gradient}`}
                onClick={() => onViewCapsule(capsule)}
              >
                <div className="flex items-center gap-3 mb-3">
                  <Avatar 
                    className="w-8 h-8 cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/profile/${capsule.userId}`);
                    }}
                  >
                    <AvatarFallback className="bg-primary/10 text-xs">
                      {capsule.userName?.[0]?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p 
                      className="font-semibold text-sm truncate cursor-pointer hover:text-primary transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/profile/${capsule.userId}`);
                      }}
                    >
                      {capsule.userName || "Anonymous"}
                    </p>
                  </div>
                  <Badge variant="outline" className={`${styles.accent} text-xs`}>
                    #{index + 1}
                  </Badge>
                </div>

                <h3 className="text-lg font-bold mb-2 line-clamp-1">
                  {capsule.title}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                  {capsule.message.substring(0, 100)}...
                </p>

                <div className="flex items-center gap-2 text-sm">
                  <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                  <span className="font-semibold">{reactionCount}</span>
                  <span className="text-muted-foreground">reactions</span>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
