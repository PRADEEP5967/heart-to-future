import { useState, useEffect } from "react";
import { Auth } from "@/components/Auth";
import { Dashboard } from "@/components/Dashboard";
import { CreateCapsule } from "@/components/CreateCapsule";
import { Hero } from "@/components/Hero";
import { auth } from "@/lib/auth";

type View = "hero" | "auth" | "dashboard" | "create";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<View>("hero");

  useEffect(() => {
    const user = auth.getUser();
    if (user) {
      setIsAuthenticated(true);
      setCurrentView("dashboard");
    }
  }, []);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setCurrentView("dashboard");
  };

  const handleLogout = () => {
    auth.logout();
    setIsAuthenticated(false);
    setCurrentView("hero");
  };

  const handleGetStarted = () => {
    setCurrentView("auth");
  };

  if (currentView === "hero") {
    return <Hero onGetStarted={handleGetStarted} />;
  }

  if (!isAuthenticated || currentView === "auth") {
    return <Auth onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <>
      {currentView === "dashboard" && (
        <Dashboard
          onCreateCapsule={() => setCurrentView("create")}
          onLogout={handleLogout}
        />
      )}
      {currentView === "create" && (
        <CreateCapsule onBack={() => setCurrentView("dashboard")} />
      )}
    </>
  );
};

export default Index;
