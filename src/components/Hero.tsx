import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Mail, Clock, Heart, Shield, FileText, Calendar, Eye, Palette } from "lucide-react";
import { MemoryBubbles } from "./MemoryBubbles";
import { Link } from "react-router-dom";

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <div className="min-h-screen gradient-warm relative overflow-hidden pt-16">
      <MemoryBubbles />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-20">
        {/* Hero Section */}
        <div className="text-center space-y-8 mb-20 animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="p-6 bg-primary/10 rounded-full animate-float">
              <Sparkles className="w-20 h-20 text-primary" />
            </div>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold text-gradient mb-6">
            Dear Future Me
          </h1>
          
          <p className="text-2xl md:text-3xl text-muted-foreground font-handwritten max-w-3xl mx-auto">
            Send messages through time to your future self. Set goals, record memories, and discover who you'll become.
          </p>
          
          <Button
            onClick={onGetStarted}
            size="lg"
            className="text-xl py-8 px-12 rounded-full shadow-soft transition-smooth hover:scale-105 mt-8"
          >
            <Sparkles className="w-6 h-6 mr-3" />
            Start Your Journey
          </Button>

          <div className="flex justify-center gap-2 flex-wrap mt-6">
            <Badge variant="secondary" className="text-sm py-2 px-4">
              ✨ Templates Included
            </Badge>
            <Badge variant="secondary" className="text-sm py-2 px-4">
              🔒 End-to-End Encrypted
            </Badge>
            <Badge variant="secondary" className="text-sm py-2 px-4">
              📅 Timeline View
            </Badge>
            <Badge variant="secondary" className="text-sm py-2 px-4">
              👁️ Preview Mode
            </Badge>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          <div className="p-6 bg-card/80 backdrop-blur rounded-2xl border-2 shadow-card transition-smooth hover:shadow-soft hover:scale-105">
            <div className="p-3 bg-primary/10 rounded-full w-fit mb-4">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Smart Templates</h3>
            <p className="text-muted-foreground">
              Pre-filled prompts for gratitude, goals, and life milestones to inspire you.
            </p>
          </div>

          <div className="p-6 bg-card/80 backdrop-blur rounded-2xl border-2 shadow-card transition-smooth hover:shadow-soft hover:scale-105">
            <div className="p-3 bg-accent/10 rounded-full w-fit mb-4">
              <Calendar className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-xl font-bold mb-2">Timeline View</h3>
            <p className="text-muted-foreground">
              Visualize your journey with a beautiful chronological timeline of all capsules.
            </p>
          </div>

          <div className="p-6 bg-card/80 backdrop-blur rounded-2xl border-2 shadow-card transition-smooth hover:shadow-soft hover:scale-105">
            <div className="p-3 bg-secondary/10 rounded-full w-fit mb-4">
              <Eye className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Preview Mode</h3>
            <p className="text-muted-foreground">
              Peek at locked capsules with blurred previews without opening them.
            </p>
          </div>

          <div className="p-6 bg-card/80 backdrop-blur rounded-2xl border-2 shadow-card transition-smooth hover:shadow-soft hover:scale-105">
            <div className="p-3 bg-primary/10 rounded-full w-fit mb-4">
              <Palette className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Custom Themes</h3>
            <p className="text-muted-foreground">
              Choose from modern, vintage, minimalist, or cosmic visual styles.
            </p>
          </div>
        </div>

        {/* Features Link */}
        <div className="mt-12 text-center">
          <Link to="/features">
            <Button variant="outline" size="lg" className="rounded-full">
              Explore All Features →
            </Button>
          </Link>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center p-12 bg-card/80 backdrop-blur rounded-3xl border-2 shadow-card">
          <h2 className="text-4xl font-bold text-gradient mb-4">
            What will you tell your future self?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 font-handwritten">
            Your story is still being written. Start your first time capsule today.
          </p>
          <Button
            onClick={onGetStarted}
            size="lg"
            className="text-lg py-6 px-10 rounded-full shadow-soft transition-smooth hover:scale-105"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Get Started Free
          </Button>
        </div>
      </div>
    </div>
  );
};
