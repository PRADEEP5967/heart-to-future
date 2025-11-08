import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Save, User, Mail, Calendar, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/lib/auth";
import { GlassCard } from "./GlassCard";
import { MemoryBubbles } from "./MemoryBubbles";

interface ProfileProps {
  onBack: () => void;
}

export const Profile = ({ onBack }: ProfileProps) => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    bio: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    const user = auth.getUser();
    if (user) {
      setProfile({
        name: user.displayName,
        email: user.email,
        bio: user.bio || "",
      });
    }
  }, []);

  const handleSave = () => {
    auth.updateProfile({ displayName: profile.name, bio: profile.bio });
    toast({
      title: "Profile updated! ✨",
      description: "Your changes have been saved.",
    });
  };

  const user = auth.getUser();
  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="min-h-screen gradient-warm relative overflow-hidden">
      <MemoryBubbles />
      
      <div className="max-w-4xl mx-auto space-y-8 px-4 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4 hover:scale-105 transition-transform"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </motion.div>

        {/* Profile Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <GlassCard className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <Avatar className="w-24 h-24 border-4 border-primary/20 shadow-soft">
                  <AvatarFallback className="text-3xl font-bold bg-gradient-to-br from-primary to-secondary text-white">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-2 -right-2"
                >
                  <Sparkles className="w-8 h-8 text-primary" />
                </motion.div>
              </motion.div>

              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl font-bold text-gradient mb-2">
                  {profile.name || "Your Profile"}
                </h1>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-3">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Dreamer since {new Date(user?.createdAt || Date.now()).getFullYear()}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    {profile.email}
                  </Badge>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Edit Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <GlassCard className="p-8">
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-6">
                <User className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">Edit Profile</h2>
              </div>

              <div className="space-y-5">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-2"
                >
                  <Label htmlFor="name" className="text-base font-semibold">
                    Display Name
                  </Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="text-lg border-2 transition-all focus:scale-[1.01]"
                    placeholder="Your name"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-2"
                >
                  <Label htmlFor="email" className="text-base font-semibold">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      disabled
                      className="text-lg border-2 bg-muted/30 pl-10 cursor-not-allowed"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <span>🔒</span> Email cannot be changed for security reasons
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-2"
                >
                  <Label htmlFor="bio" className="text-base font-semibold">
                    Personal Bio
                  </Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell your future self who you are today... What are your dreams? What matters to you right now?"
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    className="min-h-[140px] text-base border-2 transition-all focus:scale-[1.01] resize-none"
                  />
                  <p className="text-sm text-muted-foreground">
                    {profile.bio.length}/500 characters
                  </p>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Button
                  onClick={handleSave}
                  size="lg"
                  className="w-full text-lg py-6 rounded-full shadow-soft transition-smooth hover:scale-105"
                >
                  <Save className="w-5 h-5 mr-2" />
                  Save Changes
                </Button>
              </motion.div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Stats Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <GlassCard className="p-6">
            <h3 className="text-xl font-bold mb-4">Account Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Total Capsules", value: JSON.parse(localStorage.getItem("capsules") || "[]").filter((c: any) => c.userId === user?.id).length },
                { label: "Goals Created", value: JSON.parse(localStorage.getItem("goals") || "[]").length },
                { label: "Days Active", value: Math.floor((Date.now() - new Date(user?.createdAt || Date.now()).getTime()) / (1000 * 60 * 60 * 24)) },
                { label: "Drafts Saved", value: localStorage.getItem("capsule-draft") ? 1 : 0 },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="text-center p-4 bg-background/30 rounded-xl border"
                >
                  <p className="text-3xl font-bold text-primary">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
};
