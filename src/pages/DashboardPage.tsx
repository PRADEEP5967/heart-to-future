import { useState } from "react";
import { Dashboard } from "@/components/Dashboard";
import { CreateCapsule } from "@/components/CreateCapsule";
import { useNavigate } from "react-router-dom";
import { auth } from "@/lib/auth";

type View = "dashboard" | "create";

export default function DashboardPage() {
  const [currentView, setCurrentView] = useState<View>("dashboard");
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.logout();
    navigate("/");
  };

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
}
