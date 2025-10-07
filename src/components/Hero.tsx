import { Button } from "@/components/ui/button";
import { Mail, Clock, Heart } from "lucide-react";

interface HeroProps {
  onCreateCapsule: () => void;
  onViewCapsules: () => void;
}

export const Hero = ({ onCreateCapsule, onViewCapsules }: HeroProps) => {
  return (
    <div className="min-h-screen gradient-warm flex items-center justify-center px-4 py-20">
      <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
        <div className="inline-block">
          <div className="p-4 rounded-full bg-primary/10 mb-6 inline-block animate-float">
            <Mail className="w-12 h-12 text-primary" />
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-gradient leading-tight">
          Dear Future Me
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Write a letter to your future self. Set your hopes, dreams, and goals in a digital time capsule, 
          and open it when the moment arrives.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
          <Button 
            onClick={onCreateCapsule}
            size="lg" 
            className="text-lg px-8 py-6 rounded-full shadow-soft transition-smooth hover:scale-105"
          >
            <Heart className="w-5 h-5 mr-2" />
            Create Your Time Capsule
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            onClick={onViewCapsules}
            className="text-lg px-8 py-6 rounded-full border-2 transition-smooth hover:scale-105"
          >
            <Clock className="w-5 h-5 mr-2" />
            View My Capsules
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 max-w-3xl mx-auto">
          <div className="space-y-3 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg">Write Your Heart</h3>
            <p className="text-sm text-muted-foreground">
              Pour your thoughts, dreams, and feelings into a letter
            </p>
          </div>

          <div className="space-y-3 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mx-auto">
              <Clock className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="font-semibold text-lg">Choose When</h3>
            <p className="text-sm text-muted-foreground">
              Pick a future date to unlock your memories
            </p>
          </div>

          <div className="space-y-3 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mx-auto">
              <Heart className="w-6 h-6 text-accent-foreground" />
            </div>
            <h3 className="font-semibold text-lg">Rediscover Joy</h3>
            <p className="text-sm text-muted-foreground">
              Open your capsule and reflect on your journey
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
