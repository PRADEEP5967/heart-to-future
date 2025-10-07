import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Lock, User, Sparkles } from "lucide-react";
import { auth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";

interface AuthProps {
  onAuthSuccess: () => void;
}

export const Auth = ({ onAuthSuccess }: AuthProps) => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = auth.login(loginEmail, loginPassword);
    
    if (user) {
      toast({
        title: `Welcome back, ${user.displayName}! ✨`,
        description: "Your time capsules are waiting for you.",
      });
      onAuthSuccess();
    } else {
      toast({
        title: "Invalid credentials",
        description: "Please check your email and password.",
        variant: "destructive",
      });
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const user = auth.signup(signupEmail, signupPassword, signupName);
      toast({
        title: `Welcome, ${user.displayName}! 🎉`,
        description: "Your account has been created. Start creating time capsules!",
      });
      onAuthSuccess();
    } catch (error) {
      toast({
        title: "Signup failed",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center gradient-warm px-4 py-12">
      <div className="w-full max-w-md space-y-8 animate-scale-in">
        <div className="text-center space-y-2">
          <h1 className="text-5xl font-bold text-gradient flex items-center justify-center gap-2">
            <Sparkles className="w-10 h-10" />
            Dear Future Me
          </h1>
          <p className="text-muted-foreground text-lg">
            Your digital time capsule awaits
          </p>
        </div>

        <Card className="p-8 shadow-card border-2">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="you@example.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                    className="border-2"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password" className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Password
                  </Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                    className="border-2"
                  />
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Sign In
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Display Name
                  </Label>
                  <Input
                    id="signup-name"
                    placeholder="John Doe"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    required
                    className="border-2"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="you@example.com"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    required
                    className="border-2"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Password
                  </Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="••••••••"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    required
                    minLength={6}
                    className="border-2"
                  />
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Create Account
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </Card>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            "The best time to plant a tree was 20 years ago.
            <br />
            The second best time is now." 🌱
          </p>
        </div>
      </div>
    </div>
  );
};
