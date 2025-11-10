import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lock, Calendar, Eye } from "lucide-react";
import { motion } from "framer-motion";

interface CapsulePreviewProps {
  capsule: {
    id: string;
    title: string;
    openDate: string;
    theme?: string;
    isGoal: boolean;
  };
  onClose: () => void;
}

const THEME_COLORS = {
  modern: "from-blue-500 to-cyan-500",
  vintage: "from-amber-600 to-orange-700",
  minimalist: "from-slate-500 to-gray-600",
  cosmic: "from-purple-600 to-pink-600",
};

export const CapsulePreview = ({ capsule, onClose }: CapsulePreviewProps) => {
  const daysUntilOpen = Math.ceil(
    (new Date(capsule.openDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  const theme = (capsule.theme || "modern") as keyof typeof THEME_COLORS;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="max-w-2xl w-full"
      >
        <Card className="p-8 space-y-6 border-2">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="text-sm">
              <Lock className="w-3 h-3 mr-1" />
              Locked Preview
            </Badge>
            <Badge variant="outline" className="capitalize">
              {theme}
            </Badge>
          </div>

          <div className="space-y-4">
            <div
              className={`h-32 rounded-xl bg-gradient-to-br ${
                THEME_COLORS[theme]
              } relative overflow-hidden`}
            >
              <div className="absolute inset-0 backdrop-blur-xl bg-white/10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Lock className="w-16 h-16 text-white/80" />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold blur-sm select-none">
                {capsule.title.split("").map(() => "█").join("")}
              </h3>
              <div className="space-y-1 blur-sm select-none">
                <p className="text-muted-foreground">████████████████████████</p>
                <p className="text-muted-foreground">██████████████████</p>
                <p className="text-muted-foreground">███████████████████████████</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">
                Opens on {new Date(capsule.openDate).toLocaleDateString()}
              </span>
            </div>

            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <Eye className="w-8 h-8 mx-auto mb-2 text-primary" />
              <p className="font-semibold mb-1">
                {daysUntilOpen > 0 ? `${daysUntilOpen} days until unlock` : "Ready to open!"}
              </p>
              <p className="text-sm text-muted-foreground">
                Your message is safely sealed and waiting for you
              </p>
            </div>
          </div>

          <Button onClick={onClose} className="w-full" size="lg">
            Close Preview
          </Button>
        </Card>
      </motion.div>
    </motion.div>
  );
};
