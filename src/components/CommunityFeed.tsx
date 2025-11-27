import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Heart, MessageCircle, Calendar, Sparkles, Lock } from "lucide-react";
import { auth } from "@/lib/auth";
import { motion } from "framer-motion";

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

interface CommunityFeedProps {
  onViewCapsule: (capsule: Capsule) => void;
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

export const CommunityFeed = ({ onViewCapsule }: CommunityFeedProps) => {
  const [publicCapsules, setPublicCapsules] = useState<Capsule[]>([]);
  const currentUser = auth.getUser();

  useEffect(() => {
    loadPublicCapsules();
  }, []);

  const loadPublicCapsules = () => {
    const allCapsules = JSON.parse(localStorage.getItem("capsules") || "[]");
    const openedPublicCapsules = allCapsules.filter(
      (c: Capsule) => c.isPublic && c.status === "opened"
    );
    setPublicCapsules(openedPublicCapsules);
  };

  const handleReaction = (capsuleId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentUser) return;

    const allCapsules = JSON.parse(localStorage.getItem("capsules") || "[]");
    const updatedCapsules = allCapsules.map((c: Capsule) => {
      if (c.id === capsuleId) {
        const reactions = c.reactions || [];
        const existingReaction = reactions.find(r => r.userId === currentUser.id);
        
        if (existingReaction) {
          return {
            ...c,
            reactions: reactions.filter(r => r.userId !== currentUser.id),
          };
        } else {
          return {
            ...c,
            reactions: [...reactions, { userId: currentUser.id, type: "heart" }],
          };
        }
      }
      return c;
    });

    localStorage.setItem("capsules", JSON.stringify(updatedCapsules));
    loadPublicCapsules();
  };

  const hasReacted = (capsule: Capsule) => {
    if (!currentUser) return false;
    return capsule.reactions?.some(r => r.userId === currentUser.id) || false;
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (publicCapsules.length === 0) {
    return (
      <div className="text-center py-12">
        <Lock className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
        <h3 className="text-xl font-semibold mb-2">No Public Capsules Yet</h3>
        <p className="text-muted-foreground">
          Be the first to share your opened capsule with the community!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Sparkles className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold">Community Feed</h2>
        <Badge variant="secondary" className="ml-auto">
          {publicCapsules.length} Public Capsules
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {publicCapsules.map((capsule, index) => {
          const theme = capsule.theme || "modern";
          const styles = THEME_STYLES[theme];
          const reactionCount = capsule.reactions?.length || 0;
          const commentCount = capsule.commentsCount || 0;

          return (
            <motion.div
              key={capsule.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`p-6 cursor-pointer hover:shadow-lg transition-all border-2 ${styles.border} bg-gradient-to-br ${styles.gradient}`}
                onClick={() => onViewCapsule(capsule)}
              >
                {/* User Info */}
                <div className="flex items-center gap-3 mb-4">
                  <Avatar>
                    <AvatarFallback className="bg-primary/10">
                      {capsule.userName?.[0]?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold">{capsule.userName || "Anonymous"}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      Opened {formatDate(capsule.openDate)}
                    </p>
                  </div>
                  <Badge variant="outline" className={styles.accent}>
                    {theme}
                  </Badge>
                </div>

                {/* Capsule Content Preview */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold mb-2">{capsule.title}</h3>
                  <p className="text-muted-foreground line-clamp-3">
                    {capsule.message.substring(0, 150)}...
                  </p>
                </div>

                {/* Interaction Bar */}
                <div className="flex items-center gap-4 pt-4 border-t border-border">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2"
                    onClick={(e) => handleReaction(capsule.id, e)}
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        hasReacted(capsule) ? "fill-red-500 text-red-500" : ""
                      }`}
                    />
                    {reactionCount > 0 && <span>{reactionCount}</span>}
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <MessageCircle className="w-4 h-4" />
                    {commentCount > 0 && <span>{commentCount}</span>}
                  </Button>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
