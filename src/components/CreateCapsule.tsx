import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Send, Mic, MicOff, Plus, X, Target, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAudioRecorder } from "@/hooks/useAudioRecorder";
import { auth } from "@/lib/auth";
import { encryptData } from "@/lib/encryption";
import { TypeAnimation } from 'react-type-animation';

interface CreateCapsuleProps {
  onBack: () => void;
}

interface CapsuleData {
  title: string;
  message: string;
  openDate: string;
  isGoal: boolean;
  voiceNote?: string;
}

interface Goal {
  id: string;
  title: string;
}

export const CreateCapsule = ({ onBack }: CreateCapsuleProps) => {
  const [capsule, setCapsule] = useState<CapsuleData>({
    title: "",
    message: "",
    openDate: "",
    isGoal: false,
  });
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoalTitle, setNewGoalTitle] = useState("");
  const { toast } = useToast();
  const {
    isRecording,
    audioURL,
    duration,
    startRecording,
    stopRecording,
    clearRecording,
    formatTime,
  } = useAudioRecorder();

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

  const addGoal = () => {
    if (!newGoalTitle.trim()) return;
    
    const newGoal: Goal = {
      id: Date.now().toString(),
      title: newGoalTitle,
    };
    
    setGoals([...goals, newGoal]);
    setNewGoalTitle("");
  };

  const removeGoal = (id: string) => {
    setGoals(goals.filter((g) => g.id !== id));
  };

  const handleSave = () => {
    if (!capsule.title || !capsule.message || !capsule.openDate) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields before saving.",
        variant: "destructive",
      });
      return;
    }

    const user = auth.getUser();
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to create a time capsule.",
        variant: "destructive",
      });
      return;
    }

    const capsules = JSON.parse(localStorage.getItem("capsules") || "[]");
    const capsuleId = Date.now().toString();
    
    const newCapsule = {
      ...capsule,
      id: capsuleId,
      userId: user.id,
      message: encryptData(capsule.message),
      voiceNote: audioURL,
      createdAt: new Date().toISOString(),
      status: "sealed",
    };
    
    capsules.push(newCapsule);
    localStorage.setItem("capsules", JSON.stringify(capsules));

    // Save goals if this is a goal capsule
    if (capsule.isGoal && goals.length > 0) {
      const existingGoals = JSON.parse(localStorage.getItem("goals") || "[]");
      const newGoals = goals.map((g) => ({
        id: g.id,
        capsuleId,
        userId: user.id,
        title: g.title,
        completed: false,
      }));
      existingGoals.push(...newGoals);
      localStorage.setItem("goals", JSON.stringify(existingGoals));
    }

    localStorage.removeItem("capsule-draft");

    toast({
      title: "Time capsule created! 🎉",
      description: `Your message will be unlocked on ${new Date(capsule.openDate).toLocaleDateString()}.`,
    });

    setCapsule({ title: "", message: "", openDate: "", isGoal: false });
    setGoals([]);
    clearRecording();
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
              <h2 className="text-3xl font-bold text-gradient mb-2 flex items-center gap-2">
                <Sparkles className="w-8 h-8" />
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
              {!capsule.message && (
                <div className="mb-2 text-muted-foreground font-handwritten text-lg">
                  <TypeAnimation
                    sequence={[
                      'Dear Future Me,\n\nI hope when you read this...',
                      1000,
                    ]}
                    wrapper="div"
                    speed={50}
                    style={{ whiteSpace: 'pre-line' }}
                  />
                </div>
              )}
              <Textarea
                id="message"
                placeholder="Dear Future Me,&#10;&#10;I hope when you read this..."
                value={capsule.message}
                onChange={(e) => setCapsule({ ...capsule, message: e.target.value })}
                className="min-h-[300px] text-base leading-relaxed border-2 focus:ring-2 focus:ring-primary/20 font-handwritten"
              />
              <p className="text-sm text-muted-foreground">
                {capsule.message.length} characters · Auto-saving... 🔒 Encrypted
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

            {/* Voice Recording */}
            <div className="space-y-2">
              <Label className="text-base font-semibold flex items-center gap-2">
                <Mic className="w-4 h-4" />
                Voice Note (Optional)
              </Label>
              <div className="flex gap-2">
                {!audioURL ? (
                  <Button
                    type="button"
                    onClick={isRecording ? stopRecording : startRecording}
                    variant={isRecording ? "destructive" : "outline"}
                    className="flex-1"
                  >
                    {isRecording ? (
                      <>
                        <MicOff className="w-4 h-4 mr-2" />
                        Stop Recording ({formatTime(duration)})
                      </>
                    ) : (
                      <>
                        <Mic className="w-4 h-4 mr-2" />
                        Start Recording
                      </>
                    )}
                  </Button>
                ) : (
                  <div className="flex-1 flex items-center gap-2">
                    <audio controls className="flex-1" src={audioURL} />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={clearRecording}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Goal Tracker */}
            <div className="space-y-3 p-4 bg-muted/30 rounded-lg border-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isGoal"
                  checked={capsule.isGoal}
                  onCheckedChange={(checked) =>
                    setCapsule({ ...capsule, isGoal: checked as boolean })
                  }
                />
                <Label htmlFor="isGoal" className="text-base font-semibold cursor-pointer flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Turn this into a Goals Tracker
                </Label>
              </div>

              {capsule.isGoal && (
                <div className="space-y-3 mt-3">
                  <p className="text-sm text-muted-foreground">
                    Add goals you want to achieve by the time this capsule opens
                  </p>
                  
                  <div className="flex gap-2">
                    <Input
                      placeholder="e.g., Learn a new language"
                      value={newGoalTitle}
                      onChange={(e) => setNewGoalTitle(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addGoal();
                        }
                      }}
                      className="flex-1"
                    />
                    <Button type="button" onClick={addGoal} size="icon">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  {goals.length > 0 && (
                    <div className="space-y-2">
                      {goals.map((goal) => (
                        <div
                          key={goal.id}
                          className="flex items-center justify-between p-2 bg-background rounded-lg border"
                        >
                          <span className="text-sm">{goal.title}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeGoal(goal.id)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
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
