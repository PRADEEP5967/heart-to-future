import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Save, Upload, User } from "lucide-react";
import { auth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";

interface UserProfile {
  userId: string;
  displayName: string;
  email: string;
  bio?: string;
  avatar?: string;
  joinedDate: string;
}

export default function ProfileEditPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const currentUser = auth.getUser();
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      navigate("/auth");
      return;
    }
    loadProfile();
  }, [currentUser]);

  const loadProfile = () => {
    if (!currentUser) return;

    const profiles = JSON.parse(localStorage.getItem("userProfiles") || "{}");
    const profile = profiles[currentUser.id];

    if (profile) {
      setDisplayName(profile.displayName || "");
      setBio(profile.bio || "");
      setAvatar(profile.avatar || "");
    } else {
      setDisplayName(currentUser.displayName || "");
    }
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Avatar must be less than 2MB",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    if (!currentUser) return;

    setIsLoading(true);

    const profiles = JSON.parse(localStorage.getItem("userProfiles") || "{}");
    
    const updatedProfile: UserProfile = {
      userId: currentUser.id,
      displayName: displayName.trim() || currentUser.displayName,
      email: currentUser.email,
      bio: bio.trim(),
      avatar: avatar,
      joinedDate: profiles[currentUser.id]?.joinedDate || new Date().toISOString(),
    };

    profiles[currentUser.id] = updatedProfile;
    localStorage.setItem("userProfiles", JSON.stringify(profiles));

    // Update user's display name in auth if changed
    if (displayName.trim() && displayName !== currentUser.displayName) {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const updatedUsers = users.map((u: any) => 
        u.id === currentUser.id ? { ...u, displayName: displayName.trim() } : u
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      
      // Update current user session
      auth.updateProfile({ displayName: displayName.trim() });
    }

    // Update user name in all their capsules
    const allCapsules = JSON.parse(localStorage.getItem("capsules") || "[]");
    const updatedCapsules = allCapsules.map((c: any) => 
      c.userId === currentUser.id ? { ...c, userName: displayName.trim() || currentUser.displayName } : c
    );
    localStorage.setItem("capsules", JSON.stringify(updatedCapsules));

    setIsLoading(false);

    toast({
      title: "Profile updated",
      description: "Your profile has been saved successfully",
    });

    navigate(`/profile/${currentUser.id}`);
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen gradient-warm">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12 mt-20">
        <div className="max-w-2xl mx-auto space-y-6">
          <Button
            variant="ghost"
            onClick={() => navigate(`/profile/${currentUser.id}`)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Profile
          </Button>

          <Card className="p-8 shadow-card">
            <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <User className="w-8 h-8 text-primary" />
              Edit Profile
            </h1>

            <div className="space-y-6">
              {/* Avatar Upload */}
              <div className="flex items-center gap-6">
                <Avatar className="w-24 h-24 border-4 border-primary/20">
                  {avatar ? (
                    <AvatarImage src={avatar} alt={displayName} />
                  ) : (
                    <AvatarFallback className="bg-primary/10 text-3xl">
                      {displayName?.[0]?.toUpperCase() || currentUser.displayName?.[0]?.toUpperCase() || "U"}
                    </AvatarFallback>
                  )}
                </Avatar>
                
                <div className="flex-1">
                  <Label htmlFor="avatar" className="cursor-pointer">
                    <Button variant="outline" className="gap-2" asChild>
                      <span>
                        <Upload className="w-4 h-4" />
                        Upload Avatar
                      </span>
                    </Button>
                  </Label>
                  <Input
                    id="avatar"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarUpload}
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    JPG, PNG or GIF. Max size 2MB.
                  </p>
                </div>
              </div>

              {/* Display Name */}
              <div className="space-y-2">
                <Label htmlFor="displayName">Display Name</Label>
                <Input
                  id="displayName"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Your name"
                  maxLength={50}
                />
                <p className="text-xs text-muted-foreground">
                  {displayName.length}/50 characters
                </p>
              </div>

              {/* Email (read-only) */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={currentUser.email}
                  disabled
                  className="bg-muted"
                />
                <p className="text-xs text-muted-foreground">
                  Email cannot be changed
                </p>
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell us about yourself..."
                  rows={4}
                  maxLength={500}
                  className="resize-none"
                />
                <p className="text-xs text-muted-foreground">
                  {bio.length}/500 characters
                </p>
              </div>

              {/* Save Button */}
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleSaveProfile}
                  disabled={isLoading}
                  className="flex-1"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate(`/profile/${currentUser.id}`)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
