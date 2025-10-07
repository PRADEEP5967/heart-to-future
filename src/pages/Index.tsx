import { useState, useEffect } from "react";
import { Auth } from "@/components/Auth";
import { Dashboard } from "@/components/Dashboard";
import { CreateCapsule } from "@/components/CreateCapsule";
import { auth } from "@/lib/auth";

type View = "dashboard" | "create";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<View>("dashboard");

  useEffect(() => {
    const user = auth.getUser();
    setIsAuthenticated(!!user);
  }, []);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    auth.logout();
    setIsAuthenticated(false);
    setCurrentView("dashboard");
  };

  if (!isAuthenticated) {
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
