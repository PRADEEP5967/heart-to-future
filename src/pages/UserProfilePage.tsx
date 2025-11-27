import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Calendar, Heart, MessageCircle, Mail, Edit } from "lucide-react";
import { motion } from "framer-motion";
import { auth } from "@/lib/auth";

interface UserProfile {
  userId: string;
  displayName: string;
  email: string;
  bio?: string;
  avatar?: string;
  joinedDate: string;
}

interface Capsule {
  id: string;
  userId: string;
  userName: string;
  title: string;
  message: string;
  openDate: string;
  status: "sealed" | "opened";
  createdAt: string;
  theme?: "modern" | "vintage" | "minimalist" | "cosmic";
  isPublic?: boolean;
  reactions?: Array<{ userId: string; type: string }>;
  commentsCount?: number;
}

const THEME_STYLES = {
  modern: {
    gradient: "from-blue-500/10 to-cyan-500/10",
    border: "border-blue-500/30",
    accent: "text-blue-600 dark:text-blue-400",
  },
  vintage: {
    gradient: "from-amber-600/10 to-orange-700/10",
    border: "border-amber-600/30",
    accent: "text-amber-700 dark:text-amber-400",
  },
  minimalist: {
    gradient: "from-slate-500/10 to-gray-600/10",
    border: "border-slate-500/30",
    accent: "text-slate-700 dark:text-slate-300",
  },
  cosmic: {
    gradient: "from-purple-600/10 to-pink-600/10",
    border: "border-purple-600/30",
    accent: "text-purple-600 dark:text-purple-400",
  },
};

export default function UserProfilePage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const currentUser = auth.getUser();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [publicCapsules, setPublicCapsules] = useState<Capsule[]>([]);
  const isOwnProfile = currentUser?.id === userId;

  useEffect(() => {
    loadUserProfile();
    loadUserCapsules();
  }, [userId]);

  const loadUserProfile = () => {
    const profiles = JSON.parse(localStorage.getItem("userProfiles") || "{}");
    if (profiles[userId!]) {
      setProfile(profiles[userId!]);
    } else {
      // Create basic profile from auth data if it doesn't exist
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find((u: any) => u.id === userId);
      if (user) {
        const newProfile: UserProfile = {
          userId: user.id,
          displayName: user.displayName || user.email,
          email: user.email,
          joinedDate: user.createdAt || new Date().toISOString(),
        };
        setProfile(newProfile);
      }
    }
  };

  const loadUserCapsules = () => {
    const allCapsules = JSON.parse(localStorage.getItem("capsules") || "[]");
    const userPublicCapsules = allCapsules.filter(
      (c: Capsule) => c.userId === userId && c.isPublic && c.status === "opened"
    );
    setPublicCapsules(userPublicCapsules);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  if (!profile) {
    return (
      <div className="min-h-screen gradient-warm">
        <Navbar />
        <main className="container mx-auto px-4 py-12 mt-20">
          <Card className="max-w-2xl mx-auto p-12 text-center">
            <h2 className="text-2xl font-bold mb-2">User Not Found</h2>
            <p className="text-muted-foreground mb-6">
              This user profile doesn't exist
            </p>
            <Button onClick={() => navigate(-1)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  const totalReactions = publicCapsules.reduce(
    (sum, capsule) => sum + (capsule.reactions?.length || 0),
    0
  );

  return (
    <div className="min-h-screen gradient-warm">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12 mt-20">
        <div className="max-w-4xl mx-auto space-y-8">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          {/* Profile Header */}
          <Card className="p-8 shadow-card">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <Avatar className="w-24 h-24 border-4 border-primary/20">
                {profile.avatar ? (
                  <AvatarImage src={profile.avatar} alt={profile.displayName} />
                ) : (
                  <AvatarFallback className="bg-primary/10 text-3xl">
                    {profile.displayName?.[0]?.toUpperCase() || "U"}
                  </AvatarFallback>
                )}
              </Avatar>

              <div className="flex-1 space-y-4">
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div>
                    <h1 className="text-3xl font-bold">{profile.displayName}</h1>
                    <p className="text-muted-foreground flex items-center gap-2 mt-1">
                      <Mail className="w-4 h-4" />
                      {profile.email}
                    </p>
                  </div>
                  
                  {isOwnProfile && (
                    <Button
                      variant="outline"
                      onClick={() => navigate("/profile/edit")}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  )}
                </div>

                {profile.bio && (
                  <p className="text-base leading-relaxed">{profile.bio}</p>
                )}

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {formatDate(profile.joinedDate)}</span>
                </div>

                <Separator />

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">
                      {publicCapsules.length}
                    </p>
                    <p className="text-sm text-muted-foreground">Public Capsules</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">
                      {totalReactions}
                    </p>
                    <p className="text-sm text-muted-foreground">Total Reactions</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">
                      {publicCapsules.reduce(
                        (sum, c) => sum + (c.commentsCount || 0),
                        0
                      )}
                    </p>
                    <p className="text-sm text-muted-foreground">Total Comments</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Public Capsules Feed */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Public Capsules</h2>
            
            {publicCapsules.length === 0 ? (
              <Card className="p-12 text-center">
                <Calendar className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-xl font-semibold mb-2">No Public Capsules</h3>
                <p className="text-muted-foreground">
                  {isOwnProfile
                    ? "You haven't shared any capsules publicly yet"
                    : "This user hasn't shared any capsules publicly"}
                </p>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {publicCapsules.map((capsule, index) => {
                  const theme = capsule.theme || "modern";
                  const styles = THEME_STYLES[theme];
                  const reactionCount = capsule.reactions?.length || 0;
                  const commentCount = capsule.commentsCount || 0;

                  return (
                    <motion.div
                      key={capsule.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card
                        className={`p-5 cursor-pointer hover:shadow-lg transition-all border-2 ${styles.border} bg-gradient-to-br ${styles.gradient}`}
                        onClick={() => navigate(`/shared/${capsule.id}`)}
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className={`${styles.accent} text-xs`}>
                              {theme}
                            </Badge>
                            <p className="text-xs text-muted-foreground">
                              {new Date(capsule.openDate).toLocaleDateString()}
                            </p>
                          </div>

                          <h3 className="text-xl font-bold line-clamp-2">
                            {capsule.title}
                          </h3>
                          
                          <p className="text-muted-foreground text-sm line-clamp-3">
                            {capsule.message.substring(0, 150)}...
                          </p>

                          <div className="flex items-center gap-4 pt-3 border-t border-border">
                            <div className="flex items-center gap-2 text-sm">
                              <Heart className="w-4 h-4 text-red-500" />
                              <span>{reactionCount}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <MessageCircle className="w-4 h-4" />
                              <span>{commentCount}</span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
