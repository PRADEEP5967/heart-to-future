import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Lock,
  LockOpen,
  Plus,
  LogOut,
  User,
  Calendar,
  Target,
  FileText,
  Mic,
  Sparkles,
} from "lucide-react";
import { auth, User as AuthUser } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";

interface Capsule {
  id: string;
  userId: string;
  title: string;
  message: string;
  openDate: string;
  status: "sealed" | "opened";
  isGoal: boolean;
  voiceNote?: string;
  createdAt: string;
}

interface Goal {
  id: string;
  capsuleId: string;
  title: string;
  completed: boolean;
  completedAt?: string;
}

interface DashboardProps {
  onCreateCapsule: () => void;
  onLogout: () => void;
}

export const Dashboard = ({ onCreateCapsule, onLogout }: DashboardProps) => {
  const [capsules, setCapsules] = useState<Capsule[]>([]);
  const [selectedCapsule, setSelectedCapsule] = useState<Capsule | null>(null);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [user, setUser] = useState<AuthUser | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const currentUser = auth.getUser();
    setUser(currentUser);
    loadCapsules(currentUser?.id);
  }, []);

  const loadCapsules = (userId?: string) => {
    if (!userId) return;
    const allCapsules = JSON.parse(localStorage.getItem("capsules") || "[]");
    const userCapsules = allCapsules.filter((c: Capsule) => c.userId === userId);
    setCapsules(userCapsules);

    const allGoals = JSON.parse(localStorage.getItem("goals") || "[]");
    setGoals(allGoals);
  };

  const canOpen = (capsule: Capsule) => {
    return new Date(capsule.openDate) <= new Date();
  };

  const handleOpenCapsule = (capsule: Capsule) => {
    if (!canOpen(capsule)) {
      const daysLeft = Math.ceil(
        (new Date(capsule.openDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
      );
      toast({
        title: "Not yet! 🔒",
        description: `This capsule opens in ${daysLeft} days.`,
        variant: "destructive",
      });
      return;
    }

    const updatedCapsules = capsules.map((c) =>
      c.id === capsule.id ? { ...c, status: "opened" as const } : c
    );
    setCapsules(updatedCapsules);

    const allCapsules = JSON.parse(localStorage.getItem("capsules") || "[]");
    const globalUpdated = allCapsules.map((c: Capsule) =>
      c.id === capsule.id ? { ...c, status: "opened" } : c
    );
    localStorage.setItem("capsules", JSON.stringify(globalUpdated));

    setSelectedCapsule({ ...capsule, status: "opened" });

    toast({
      title: "✨ Time Capsule Opened!",
      description: "Here's your message from the past.",
    });
  };

  const activeCapsules = capsules.filter((c) => c.status === "sealed");
  const openedCapsules = capsules.filter((c) => c.status === "opened");

  const getCapsuleGoals = (capsuleId: string) => {
    return goals.filter((g) => g.capsuleId === capsuleId);
  };

  const completedGoalsCount = goals.filter((g) => g.completed).length;
  const totalGoalsCount = goals.length;
  const goalsProgress = totalGoalsCount > 0 ? (completedGoalsCount / totalGoalsCount) * 100 : 0;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const daysUntil = (dateStr: string) => {
    const days = Math.ceil((new Date(dateStr).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return days;
  };

  return (
    <div className="min-h-screen gradient-warm">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gradient flex items-center gap-2">
              <Sparkles className="w-6 h-6" />
              Dear Future Me
            </h1>
            <p className="text-sm text-muted-foreground">
              Hi {user?.displayName}, you have {activeCapsules.length} memories waiting 🌠
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon">
              <User className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onLogout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 shadow-card border-2">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-primary/10">
                <Lock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{activeCapsules.length}</p>
                <p className="text-sm text-muted-foreground">Active Capsules</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-card border-2">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-secondary/10">
                <LockOpen className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{openedCapsules.length}</p>
                <p className="text-sm text-muted-foreground">Opened Capsules</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-card border-2">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-accent/10">
                <Target className="w-6 h-6 text-accent-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-2xl font-bold">{completedGoalsCount}/{totalGoalsCount}</p>
                <p className="text-sm text-muted-foreground mb-2">Goals Achieved</p>
                <Progress value={goalsProgress} className="h-2" />
              </div>
            </div>
          </Card>
        </div>

        {/* Create Button */}
        <Button
          onClick={onCreateCapsule}
          size="lg"
          className="w-full md:w-auto text-lg py-6 px-8 rounded-full shadow-soft transition-smooth hover:scale-105"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create New Time Capsule
        </Button>

        {/* Capsules Tabs */}
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="active">
              <Lock className="w-4 h-4 mr-2" />
              Active ({activeCapsules.length})
            </TabsTrigger>
            <TabsTrigger value="opened">
              <LockOpen className="w-4 h-4 mr-2" />
              Opened ({openedCapsules.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="mt-6 space-y-4">
            {activeCapsules.length === 0 ? (
              <Card className="p-12 text-center shadow-card border-2">
                <Lock className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-xl font-semibold mb-2">No active capsules</h3>
                <p className="text-muted-foreground">
                  Create your first time capsule to get started!
                </p>
              </Card>
            ) : (
              activeCapsules.map((capsule) => (
                <Card
                  key={capsule.id}
                  className="p-6 shadow-card border-2 hover:shadow-soft transition-smooth cursor-pointer"
                  onClick={() => handleOpenCapsule(capsule)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-semibold">{capsule.title}</h3>
                        {capsule.isGoal && (
                          <Badge variant="secondary">
                            <Target className="w-3 h-3 mr-1" />
                            Goals
                          </Badge>
                        )}
                        {capsule.voiceNote && (
                          <Badge variant="outline">
                            <Mic className="w-3 h-3 mr-1" />
                            Voice
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Opens {formatDate(capsule.openDate)}
                        </span>
                        {canOpen(capsule) ? (
                          <Badge className="bg-green-500">Ready to Open!</Badge>
                        ) : (
                          <span>{daysUntil(capsule.openDate)} days remaining</span>
                        )}
                      </div>
                    </div>
                    <div className="p-3 rounded-full bg-primary/10">
                      <Lock className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="opened" className="mt-6 space-y-4">
            {openedCapsules.length === 0 ? (
              <Card className="p-12 text-center shadow-card border-2">
                <LockOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-xl font-semibold mb-2">No opened capsules yet</h3>
                <p className="text-muted-foreground">
                  Your memories are waiting to be unlocked!
                </p>
              </Card>
            ) : (
              openedCapsules.map((capsule) => {
                const capsuleGoals = getCapsuleGoals(capsule.id);
                return (
                  <Card
                    key={capsule.id}
                    className="p-6 shadow-card border-2 hover:shadow-soft transition-smooth"
                  >
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-2">{capsule.title}</h3>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Opened on {formatDate(capsule.openDate)}
                          </p>
                        </div>
                        <LockOpen className="w-6 h-6 text-secondary" />
                      </div>

                      <div className="prose prose-sm max-w-none">
                        <p className="whitespace-pre-wrap font-serif leading-relaxed">
                          {capsule.message}
                        </p>
                      </div>

                      {capsule.voiceNote && (
                        <div className="p-4 bg-muted/30 rounded-lg">
                          <p className="text-sm font-medium mb-2 flex items-center gap-2">
                            <Mic className="w-4 h-4" />
                            Voice Note
                          </p>
                          <audio controls className="w-full" src={capsule.voiceNote} />
                        </div>
                      )}

                      {capsuleGoals.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-sm font-semibold flex items-center gap-2">
                            <Target className="w-4 h-4" />
                            Goals ({capsuleGoals.filter(g => g.completed).length}/{capsuleGoals.length} completed)
                          </p>
                          <div className="space-y-2">
                            {capsuleGoals.map((goal) => (
                              <div
                                key={goal.id}
                                className={`p-3 rounded-lg border ${
                                  goal.completed ? "bg-green-50 border-green-200" : "bg-muted/30"
                                }`}
                              >
                                <p className={goal.completed ? "line-through text-muted-foreground" : ""}>
                                  {goal.title}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                );
              })
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
