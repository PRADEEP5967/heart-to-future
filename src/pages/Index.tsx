import { useState } from "react";
import { Hero } from "@/components/Hero";
import { CreateCapsule } from "@/components/CreateCapsule";
import { ViewCapsules } from "@/components/ViewCapsules";

type View = "hero" | "create" | "view";

const Index = () => {
  const [currentView, setCurrentView] = useState<View>("hero");

  return (
    <>
      {currentView === "hero" && (
        <Hero
          onCreateCapsule={() => setCurrentView("create")}
          onViewCapsules={() => setCurrentView("view")}
        />
      )}
      {currentView === "create" && (
        <CreateCapsule onBack={() => setCurrentView("hero")} />
      )}
      {currentView === "view" && (
        <ViewCapsules onBack={() => setCurrentView("hero")} />
      )}
    </>
  );
};

export default Index;
