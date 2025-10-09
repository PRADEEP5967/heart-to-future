import { Button } from "@/components/ui/button";
import { Sparkles, Mail, Clock, Heart, Shield } from "lucide-react";
import { MemoryBubbles } from "./MemoryBubbles";

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
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          <div className="p-6 bg-card/80 backdrop-blur rounded-2xl border-2 shadow-card transition-smooth hover:shadow-soft hover:scale-105">
            <div className="p-3 bg-primary/10 rounded-full w-fit mb-4">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Write Letters</h3>
            <p className="text-muted-foreground">
              Pen heartfelt messages to your future self with our beautiful editor.
            </p>
          </div>

          <div className="p-6 bg-card/80 backdrop-blur rounded-2xl border-2 shadow-card transition-smooth hover:shadow-soft hover:scale-105">
            <div className="p-3 bg-accent/10 rounded-full w-fit mb-4">
              <Clock className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-xl font-bold mb-2">Time Lock</h3>
            <p className="text-muted-foreground">
              Set when your capsule opens - 1 month, 1 year, or even 10 years from now.
            </p>
          </div>

          <div className="p-6 bg-card/80 backdrop-blur rounded-2xl border-2 shadow-card transition-smooth hover:shadow-soft hover:scale-105">
            <div className="p-3 bg-secondary/10 rounded-full w-fit mb-4">
              <Heart className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Voice Notes</h3>
            <p className="text-muted-foreground">
              Record voice messages to hear your past self speak to you.
            </p>
          </div>

          <div className="p-6 bg-card/80 backdrop-blur rounded-2xl border-2 shadow-card transition-smooth hover:shadow-soft hover:scale-105">
            <div className="p-3 bg-primary/10 rounded-full w-fit mb-4">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Private & Secure</h3>
            <p className="text-muted-foreground">
              Your messages are encrypted and only you can read them.
            </p>
          </div>
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
