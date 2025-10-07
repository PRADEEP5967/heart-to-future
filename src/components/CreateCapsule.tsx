import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CreateCapsuleProps {
  onBack: () => void;
}

interface CapsuleData {
  title: string;
  message: string;
  openDate: string;
}

export const CreateCapsule = ({ onBack }: CreateCapsuleProps) => {
  const [capsule, setCapsule] = useState<CapsuleData>({
    title: "",
    message: "",
    openDate: "",
  });
  const { toast } = useToast();

  // Auto-save to localStorage
  useEffect(() => {
    const draft = localStorage.getItem("capsule-draft");
    if (draft) {
      setCapsule(JSON.parse(draft));
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (capsule.title || capsule.message) {
        localStorage.setItem("capsule-draft", JSON.stringify(capsule));
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [capsule]);

  const handleSave = () => {
    if (!capsule.title || !capsule.message || !capsule.openDate) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields before saving.",
        variant: "destructive",
      });
      return;
    }

    const capsules = JSON.parse(localStorage.getItem("capsules") || "[]");
    const newCapsule = {
      ...capsule,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: "sealed",
    };
    
    capsules.push(newCapsule);
    localStorage.setItem("capsules", JSON.stringify(capsules));
    localStorage.removeItem("capsule-draft");

    toast({
      title: "Time capsule created! 🎉",
      description: `Your message will be unlocked on ${new Date(capsule.openDate).toLocaleDateString()}.`,
    });

    setCapsule({ title: "", message: "", openDate: "" });
    onBack();
  };

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const minDateStr = minDate.toISOString().split("T")[0];

  return (
    <div className="min-h-screen gradient-warm px-4 py-12">
      <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <Card className="p-8 shadow-card border-2">
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gradient mb-2">
                Create Your Time Capsule
              </h2>
              <p className="text-muted-foreground">
                Write a message to your future self. What do you hope to remember? What dreams do you have?
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title" className="text-base font-semibold">
                Give it a title
              </Label>
              <Input
                id="title"
                placeholder="e.g., My Dreams for 2026, A Letter to Future Me"
                value={capsule.title}
                onChange={(e) => setCapsule({ ...capsule, title: e.target.value })}
                className="text-lg border-2 focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-base font-semibold">
                Your message
              </Label>
              <Textarea
                id="message"
                placeholder="Dear Future Me,&#10;&#10;I hope when you read this..."
                value={capsule.message}
                onChange={(e) => setCapsule({ ...capsule, message: e.target.value })}
                className="min-h-[300px] text-base leading-relaxed border-2 focus:ring-2 focus:ring-primary/20 font-serif"
              />
              <p className="text-sm text-muted-foreground">
                {capsule.message.length} characters · Auto-saving...
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="openDate" className="text-base font-semibold">
                When should this open?
              </Label>
              <Input
                id="openDate"
                type="date"
                min={minDateStr}
                value={capsule.openDate}
                onChange={(e) => setCapsule({ ...capsule, openDate: e.target.value })}
                className="text-lg border-2 focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                onClick={handleSave}
                size="lg"
                className="flex-1 text-lg py-6 rounded-full shadow-soft transition-smooth hover:scale-105"
              >
                <Send className="w-5 h-5 mr-2" />
                Seal Time Capsule
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
