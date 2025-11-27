import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Lock, Sparkles, ArrowLeft, Heart } from "lucide-react";
import { decryptData } from "@/lib/encryption";
import { useToast } from "@/hooks/use-toast";
import { CapsuleComments } from "@/components/CapsuleComments";
import confetti from "canvas-confetti";

interface Capsule {
  id: string;
  title: string;
  message: string;
  userName: string;
  openDate: string;
  createdAt: string;
  theme?: "modern" | "vintage" | "minimalist" | "cosmic";
  shareToken?: string;
  sharePassword?: string;
  reactions?: Array<{ userId: string; type: string }>;
  comments?: Array<{ id: string; userId: string; userName: string; text: string; createdAt: string }>;
}

const THEME_STYLES = {
  modern: {
    gradient: "from-blue-500/10 to-cyan-500/10",
    border: "border-blue-500/30",
  },
  vintage: {
    gradient: "from-amber-600/10 to-orange-700/10",
    border: "border-amber-600/30",
  },
  minimalist: {
    gradient: "from-slate-500/10 to-gray-600/10",
    border: "border-slate-500/30",
  },
  cosmic: {
    gradient: "from-purple-600/10 to-pink-600/10",
    border: "border-purple-600/30",
  },
};

export default function SharedCapsulePage() {
  const { shareToken } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [capsule, setCapsule] = useState<Capsule | null>(null);
  const [password, setPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [decryptedMessage, setDecryptedMessage] = useState("");

  useEffect(() => {
    loadSharedCapsule();
  }, [shareToken]);

  const loadSharedCapsule = () => {
    const allCapsules = JSON.parse(localStorage.getItem("capsules") || "[]");
    const shared = allCapsules.find((c: Capsule) => c.shareToken === shareToken);

    if (shared) {
      setCapsule(shared);
      // If no password required, unlock immediately
      if (!shared.sharePassword) {
        unlockCapsule(shared);
      }
    }
  };

  const unlockCapsule = (capsuleData: Capsule) => {
    try {
      const decrypted = decryptData(capsuleData.message);
      setDecryptedMessage(decrypted);
      setIsUnlocked(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#9b87f5', '#f97794', '#fbbf24'],
      });
    } catch {
      setDecryptedMessage(capsuleData.message);
      setIsUnlocked(true);
    }
  };

  const handlePasswordSubmit = () => {
    if (!capsule) return;

    if (password === capsule.sharePassword) {
      unlockCapsule(capsule);
      toast({
        title: "Access granted",
        description: "You can now view this capsule",
      });
    } else {
      toast({
        title: "Incorrect password",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  if (!capsule) {
    return (
      <div className="min-h-screen gradient-warm">
        <Navbar />
        <main className="container mx-auto px-4 py-12 mt-20">
          <Card className="max-w-2xl mx-auto p-12 text-center">
            <Lock className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h2 className="text-2xl font-bold mb-2">Capsule Not Found</h2>
            <p className="text-muted-foreground mb-6">
              This capsule doesn't exist or has been removed
            </p>
            <Button onClick={() => navigate("/")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  const theme = capsule.theme || "modern";
  const themeStyle = THEME_STYLES[theme];

  // Password protected view
  if (capsule.sharePassword && !isUnlocked) {
    return (
      <div className="min-h-screen gradient-warm">
        <Navbar />
        <main className="container mx-auto px-4 py-12 mt-20">
          <Card className="max-w-md mx-auto p-8">
            <div className="text-center mb-6">
              <Lock className="w-16 h-16 mx-auto mb-4 text-primary" />
              <h2 className="text-2xl font-bold mb-2">Password Protected</h2>
              <p className="text-muted-foreground">
                This capsule requires a password to view
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="password">Enter Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handlePasswordSubmit()}
                  placeholder="Enter password"
                />
              </div>
              <Button onClick={handlePasswordSubmit} className="w-full">
                Unlock Capsule
              </Button>
            </div>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  // Unlocked capsule view
  return (
    <div className="min-h-screen gradient-warm">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12 mt-20">
        <div className="max-w-3xl mx-auto space-y-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>

          <Card className={`p-8 shadow-card border-2 bg-gradient-to-br ${themeStyle.gradient}`}>
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Sparkles className="w-8 h-8 text-primary" />
                  <h1 className="text-4xl font-bold text-gradient">
                    {capsule.title}
                  </h1>
                  <Badge variant="secondary" className="capitalize ml-auto">
                    {theme}
                  </Badge>
                </div>
                <p className="text-muted-foreground">
                  Shared by {capsule.userName || "Anonymous"} • Opened {new Date(capsule.openDate).toLocaleDateString()}
                </p>
              </div>

              <div className="prose prose-lg max-w-none">
                <div className={`bg-card/50 p-6 rounded-lg border-2 ${themeStyle.border} font-handwritten text-lg leading-relaxed whitespace-pre-wrap`}>
                  {decryptedMessage}
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-sm">
                  <Heart className="w-4 h-4 text-red-500" />
                  <span>{capsule.reactions?.length || 0} reactions</span>
                </div>
              </div>
            </div>
          </Card>

          {capsule.comments && <CapsuleComments capsuleId={capsule.id} />}
        </div>
      </main>

      <Footer />
    </div>
  );
}
