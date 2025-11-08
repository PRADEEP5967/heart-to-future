import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Palette, Sparkles } from "lucide-react";

export const FeatureHighlights = () => {
  const highlights = [
    {
      icon: Calendar,
      title: "Calendar View",
      description: "Visualize all your scheduled capsules on an interactive calendar",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Palette,
      title: "Custom Themes",
      description: "Choose from Modern, Vintage, Minimalist, or Cosmic styles",
      color: "from-purple-600 to-pink-600",
    },
    {
      icon: Sparkles,
      title: "Color Coded",
      description: "Each theme has its own unique color for easy identification",
      color: "from-amber-600 to-orange-700",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <Card className="p-4 bg-gradient-to-br from-primary/5 to-secondary/5 border-2">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">New Features!</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-3">
          {highlights.map((highlight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-2"
            >
              <div className={`p-2 rounded-lg bg-gradient-to-br ${highlight.color}`}>
                <highlight.icon className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-semibold text-sm">{highlight.title}</p>
                <p className="text-xs text-muted-foreground">{highlight.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
};
