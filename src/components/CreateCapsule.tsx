import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Send, Mic, MicOff, Plus, X, Target, Sparkles, Loader2, Palette, FileText, Upload, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAudioRecorder } from "@/hooks/useAudioRecorder";
import { auth } from "@/lib/auth";
import { encryptData } from "@/lib/encryption";
import { TypeAnimation } from 'react-type-animation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CreateCapsuleProps {
  onBack: () => void;
}

interface CapsuleData {
  title: string;
  message: string;
  openDate: string;
  isGoal: boolean;
  voiceNote?: string;
  theme: "modern" | "vintage" | "minimalist" | "cosmic";
  files?: Array<{ name: string; data: string; type: string }>;
  isPublic?: boolean;
}

const TEMPLATES = {
  gratitude: {
    title: "My Gratitude Journal",
    message: "Dear Future Me,\n\nToday I am grateful for:\n\n1. \n2. \n3. \n\nThree things that made me smile today:\n\n\n\nWhat I learned about myself:\n\n\n\nWith love and gratitude,\nPresent Me",
  },
  goals: {
    title: "My Goals & Dreams",
    message: "Dear Future Me,\n\nBy the time you read this, I hope to have achieved:\n\n🎯 Career Goals:\n\n\n💪 Personal Growth:\n\n\n❤️ Relationships:\n\n\n🌟 Dreams:\n\n\n\nI believe in you!\nPresent Me",
  },
  milestone: {
    title: "Life Milestone Celebration",
    message: "Dear Future Me,\n\nToday marks an important moment in my journey:\n\nWhat happened:\n\n\nHow I feel:\n\n\nWho was there:\n\n\nWhat I want to remember:\n\n\nMy hopes for the future:\n\n\n\nCheers to this moment!\nPresent Me",
  },
  custom: {
    title: "",
    message: "",
  },
};

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
    theme: "modern",
    files: [],
    isPublic: false,
  });
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoalTitle, setNewGoalTitle] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<keyof typeof TEMPLATES>("custom");
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

  const maxTitleLength = 100;
  const maxMessageLength = 5000;

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

  const handleTemplateChange = (template: keyof typeof TEMPLATES) => {
    setSelectedTemplate(template);
    if (template !== "custom") {
      setCapsule({
        ...capsule,
        title: TEMPLATES[template].title,
        message: TEMPLATES[template].message,
      });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Files must be under 10MB",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const fileData = {
          name: file.name,
          data: encryptData(event.target?.result as string),
          type: file.type,
        };
        setCapsule((prev) => ({
          ...prev,
          files: [...(prev.files || []), fileData],
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeFile = (index: number) => {
    setCapsule((prev) => ({
      ...prev,
      files: prev.files?.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async () => {
    if (!capsule.title || !capsule.message || !capsule.openDate) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields before saving.",
        variant: "destructive",
      });
      return;
    }

    if (capsule.title.length > maxTitleLength) {
      toast({
        title: "Title too long",
        description: `Title must be ${maxTitleLength} characters or less.`,
        variant: "destructive",
      });
      return;
    }

    if (capsule.message.length > maxMessageLength) {
      toast({
        title: "Message too long",
        description: `Message must be ${maxMessageLength} characters or less.`,
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

    setIsSaving(true);

    try {
      const capsules = JSON.parse(localStorage.getItem("capsules") || "[]");
      const capsuleId = Date.now().toString();
      
      const newCapsule = {
        ...capsule,
        id: capsuleId,
        userId: user.id,
        userName: user.displayName || user.email,
        message: encryptData(capsule.message),
        voiceNote: audioURL,
        createdAt: new Date().toISOString(),
        status: "sealed",
        reactions: [],
        comments: [],
        commentsCount: 0,
      };
      
      capsules.push(newCapsule);
      localStorage.setItem("capsules", JSON.stringify(capsules));

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

      setCapsule({ title: "", message: "", openDate: "", isGoal: false, theme: "modern", files: [] });
      setGoals([]);
      setSelectedTemplate("custom");
      clearRecording();
      onBack();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save time capsule. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
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

            <div className="space-y-3 p-4 bg-muted/30 rounded-lg border-2">
              <Label className="text-base font-semibold flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Choose a Template (Optional)
              </Label>
              <Select value={selectedTemplate} onValueChange={handleTemplateChange}>
                <SelectTrigger className="border-2">
                  <SelectValue placeholder="Select a template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="custom">✨ Start from Scratch</SelectItem>
                  <SelectItem value="gratitude">🙏 Gratitude Journal</SelectItem>
                  <SelectItem value="goals">🎯 Goal Setting</SelectItem>
                  <SelectItem value="milestone">🌟 Life Milestone</SelectItem>
                </SelectContent>
              </Select>
              {selectedTemplate !== "custom" && (
                <p className="text-sm text-muted-foreground">
                  Template loaded! Feel free to customize it.
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="title" className="text-base font-semibold">
                Give it a title
              </Label>
              <Input
                id="title"
                placeholder="e.g., My Dreams for 2026, A Letter to Future Me"
                value={capsule.title}
                onChange={(e) => {
                  if (e.target.value.length <= maxTitleLength) {
                    setCapsule({ ...capsule, title: e.target.value });
                  }
                }}
                className="text-lg border-2 focus:ring-2 focus:ring-primary/20"
                maxLength={maxTitleLength}
              />
              <p className="text-xs text-muted-foreground">
                {capsule.title.length}/{maxTitleLength} characters
              </p>
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
                onChange={(e) => {
                  if (e.target.value.length <= maxMessageLength) {
                    setCapsule({ ...capsule, message: e.target.value });
                  }
                }}
                className="min-h-[300px] text-base leading-relaxed border-2 focus:ring-2 focus:ring-primary/20 font-handwritten"
                maxLength={maxMessageLength}
              />
              <p className="text-sm text-muted-foreground">
                {capsule.message.length}/{maxMessageLength} characters · Auto-saving... 🔒 Encrypted
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

            {/* File Attachments */}
            <div className="space-y-3 p-4 bg-muted/30 rounded-lg border-2">
              <Label className="text-base font-semibold flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Attach Photos & Files (Optional)
              </Label>
              <p className="text-sm text-muted-foreground">
                Add photos, documents, or any files to your capsule (max 10MB each)
              </p>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("file-upload")?.click()}
                  className="flex-1"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Choose Files
                </Button>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  accept="image/*,.pdf,.doc,.docx,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
              {capsule.files && capsule.files.length > 0 && (
                <div className="space-y-2">
                  {capsule.files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-background rounded-lg border"
                    >
                      <div className="flex items-center gap-2">
                        {file.type.startsWith("image/") ? (
                          <ImageIcon className="w-4 h-4 text-primary" />
                        ) : (
                          <FileText className="w-4 h-4 text-primary" />
                        )}
                        <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFile(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
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

            {/* Theme Selection */}
            <div className="space-y-3 p-4 bg-muted/30 rounded-lg border-2">
              <Label className="text-base font-semibold flex items-center gap-2">
                <Palette className="w-4 h-4" />
                Choose a Theme
              </Label>
              <p className="text-sm text-muted-foreground">
                Select a visual style for your time capsule
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                {[
                  { 
                    name: "modern" as const, 
                    label: "Modern", 
                    gradient: "from-blue-500 to-cyan-500",
                    description: "Clean & contemporary"
                  },
                  { 
                    name: "vintage" as const, 
                    label: "Vintage", 
                    gradient: "from-amber-600 to-orange-700",
                    description: "Nostalgic & warm"
                  },
                  { 
                    name: "minimalist" as const, 
                    label: "Minimalist", 
                    gradient: "from-slate-500 to-gray-600",
                    description: "Simple & elegant"
                  },
                  { 
                    name: "cosmic" as const, 
                    label: "Cosmic", 
                    gradient: "from-purple-600 to-pink-600",
                    description: "Dreamy & mystical"
                  },
                ].map((theme) => (
                  <button
                    key={theme.name}
                    type="button"
                    onClick={() => setCapsule({ ...capsule, theme: theme.name })}
                    className={`
                      p-4 rounded-xl border-2 transition-all hover:scale-105
                      ${capsule.theme === theme.name 
                        ? `border-primary shadow-soft scale-105` 
                        : `border-border hover:border-primary/50`
                      }
                    `}
                  >
                    <div className={`w-full h-12 rounded-lg bg-gradient-to-br ${theme.gradient} mb-3`} />
                    <p className="font-semibold text-sm">{theme.label}</p>
                    <p className="text-xs text-muted-foreground mt-1">{theme.description}</p>
                    {capsule.theme === theme.name && (
                      <Badge variant="secondary" className="mt-2 w-full">
                        Selected
                      </Badge>
                    )}
                  </button>
                ))}
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
                disabled={isSaving || !capsule.title || !capsule.message || !capsule.openDate}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Sealing...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Seal Time Capsule
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
