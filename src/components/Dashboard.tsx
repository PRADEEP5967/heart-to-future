import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Plus, LogOut, Calendar, Target, Lock, Unlock, User, Settings, Mic } from "lucide-react";
import { auth, User as AuthUser } from "@/lib/auth";
import { ThemeToggle } from "./ThemeToggle";
import { ViewCapsule } from "./ViewCapsule";
import { Profile } from "./Profile";
import { MemoryBubbles } from "./MemoryBubbles";
import { GlassCard } from "./GlassCard";

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
}

interface DashboardProps {
  onCreateCapsule: () => void;
  onLogout: () => void;
}

export const Dashboard = ({ onCreateCapsule, onLogout }: DashboardProps) => {
  const [capsules, setCapsules] = useState<Capsule[]>([]);
  const [selectedCapsule, setSelectedCapsule] = useState<Capsule | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const currentUser = auth.getUser();
    setUser(currentUser);
    if (currentUser) {
      const allCapsules = JSON.parse(localStorage.getItem("capsules") || "[]");
      const userCapsules = allCapsules.filter((c: Capsule) => c.userId === currentUser.id);
      setCapsules(userCapsules);
    }
  }, []);

  const openCapsule = (capsule: Capsule) => {
    const updatedCapsules = capsules.map(c => 
      c.id === capsule.id ? { ...c, status: "opened" as const } : c
    );
    localStorage.setItem("capsules", JSON.stringify(updatedCapsules));
    setCapsules(updatedCapsules);
    setSelectedCapsule({ ...capsule, status: "opened" });
  };

  const activeCapsules = capsules.filter(c => c.status === "sealed");
  const openedCapsules = capsules.filter(c => c.status === "opened");
  const drafts = JSON.parse(localStorage.getItem("capsule-draft") || "null");

  const allGoals = JSON.parse(localStorage.getItem("goals") || "[]");
  const userGoals = allGoals.filter((g: any) => 
    capsules.some(c => c.id === g.capsuleId)
  );
  const completedGoals = userGoals.filter((g: any) => g.completed).length;
  const totalGoals = userGoals.length;
  const goalsProgress = totalGoals > 0 ? (completedGoals / totalGoals) * 100 : 0;

  if (selectedCapsule) {
    return <ViewCapsule capsule={selectedCapsule} onBack={() => setSelectedCapsule(null)} />;
  }

  if (showProfile) {
    return <Profile onBack={() => setShowProfile(false)} />;
  }

  return (
    <div className="min-h-screen gradient-warm relative overflow-hidden">
      <MemoryBubbles />
      
      <div className="max-w-6xl mx-auto space-y-8 animate-fade-in relative z-10 px-4 py-12">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-5xl font-bold text-gradient mb-2 flex items-center gap-3">
              <Sparkles className="w-12 h-12" />
              Dear Future Me
            </h1>
            <p className="text-xl text-muted-foreground font-handwritten">
              Hi {user?.displayName}, you have {activeCapsules.length} {activeCapsules.length === 1 ? 'memory' : 'memories'} waiting for {new Date().getFullYear() + 1} 🌠
            </p>
          </div>
          <div className="flex gap-2">
            <ThemeToggle />
            <Button variant="outline" size="icon" onClick={() => setShowProfile(true)}>
              <User className="w-5 h-5" />
            </Button>
            <Button variant="outline" onClick={onLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <GlassCard className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-gradient-to-br from-primary to-primary/50">
                  <Lock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold">{activeCapsules.length}</p>
                  <p className="text-sm text-muted-foreground">Sealed Capsules</p>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <GlassCard className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-gradient-to-br from-accent to-accent/50">
                  <Unlock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold">{openedCapsules.length}</p>
                  <p className="text-sm text-muted-foreground">Opened Capsules</p>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <GlassCard className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-gradient-to-br from-secondary to-secondary/50">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-3xl font-bold">{completedGoals}/{totalGoals}</p>
                  <p className="text-sm text-muted-foreground mb-2">Goals Achieved</p>
                  <Progress value={goalsProgress} className="h-2" />
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Create Button */}
        <Button
          onClick={onCreateCapsule}
          size="lg"
          className="w-full text-lg py-6 rounded-full shadow-soft transition-smooth hover:scale-105"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create New Time Capsule
        </Button>

        {/* Tabs */}
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="opened">Delivered</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            <Card className="p-6 shadow-card gradient-card border-2">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Lock className="w-6 h-6 text-primary" />
                Sealed Capsules
              </h2>
              {activeCapsules.length === 0 ? (
                <p className="text-muted-foreground">No active capsules. Create your first one!</p>
              ) : (
                <div className="grid gap-4">
                  {activeCapsules.map((capsule) => {
                    const isLocked = new Date(capsule.openDate) > new Date();
                    return (
                      <div
                        key={capsule.id}
                        className="p-5 bg-muted/20 rounded-lg border-2 flex justify-between items-center transition-smooth hover:shadow-card"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-semibold">{capsule.title}</h3>
                            {capsule.isGoal && (
                              <Badge variant="secondary" className="text-xs">
                                <Target className="w-3 h-3 mr-1" />
                                Goals
                              </Badge>
                            )}
                            {capsule.voiceNote && (
                              <Badge variant="outline" className="text-xs">
                                <Mic className="w-3 h-3 mr-1" />
                                Voice
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                            <Calendar className="w-4 h-4" />
                            Opens on {new Date(capsule.openDate).toLocaleDateString()}
                          </p>
                        </div>
                        {isLocked ? (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Lock className="w-5 h-5" />
                            <span className="text-sm">Locked</span>
                          </div>
                        ) : (
                          <Button onClick={() => openCapsule(capsule)} className="shadow-soft">
                            <Unlock className="w-4 h-4 mr-2" />
                            Open Now
                          </Button>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="opened">
            <Card className="p-6 shadow-card gradient-card border-2">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Unlock className="w-6 h-6 text-accent" />
                Opened Capsules
              </h2>
              {openedCapsules.length === 0 ? (
                <p className="text-muted-foreground">No opened capsules yet.</p>
              ) : (
                <div className="grid gap-4">
                  {openedCapsules.map((capsule) => (
                    <div
                      key={capsule.id}
                      className="p-5 bg-muted/20 rounded-lg border-2 cursor-pointer transition-smooth hover:shadow-card"
                      onClick={() => setSelectedCapsule(capsule)}
                    >
                      <h3 className="text-lg font-semibold">{capsule.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Opened from {new Date(capsule.openDate).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="drafts">
            <Card className="p-6 shadow-card gradient-card border-2">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Settings className="w-6 h-6 text-muted-foreground" />
                Your Drafts
              </h2>
              {!drafts || !drafts.title ? (
                <p className="text-muted-foreground">No drafts saved.</p>
              ) : (
                <div className="p-5 bg-muted/20 rounded-lg border-2">
                  <h3 className="text-lg font-semibold">{drafts.title || "Untitled Draft"}</h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {drafts.message?.substring(0, 100)}...
                  </p>
                  <Button onClick={onCreateCapsule} className="mt-4">
                    Continue Editing
                  </Button>
                </div>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
