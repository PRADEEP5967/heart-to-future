import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Save, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/lib/auth";

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

  return (
    <div className="min-h-screen gradient-warm px-4 py-12">
      <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <Card className="p-8 shadow-card gradient-card border-2">
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gradient mb-2 flex items-center gap-2">
                <User className="w-8 h-8" />
                Your Profile
              </h2>
              <p className="text-muted-foreground">
                Dreamer since {new Date(auth.getUser()?.createdAt || Date.now()).getFullYear()} 🌠
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="text-lg border-2"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  disabled
                  className="text-lg border-2 bg-muted/50"
                />
                <p className="text-sm text-muted-foreground">
                  Email cannot be changed
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell your future self who you are today..."
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="min-h-[120px] text-base border-2"
                />
              </div>
            </div>

            <Button
              onClick={handleSave}
              size="lg"
              className="w-full text-lg py-6 rounded-full shadow-soft transition-smooth hover:scale-105"
            >
              <Save className="w-5 h-5 mr-2" />
              Save Changes
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
