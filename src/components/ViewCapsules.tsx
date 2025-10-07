import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Lock, Mail, Calendar } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ViewCapsulesProps {
  onBack: () => void;
}

interface Capsule {
  id: string;
  title: string;
  message: string;
  openDate: string;
  createdAt: string;
  status: "sealed" | "opened";
}

export const ViewCapsules = ({ onBack }: ViewCapsulesProps) => {
  const [capsules, setCapsules] = useState<Capsule[]>([]);
  const [selectedCapsule, setSelectedCapsule] = useState<Capsule | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("capsules");
    if (stored) {
      setCapsules(JSON.parse(stored));
    }
  }, []);

  const canOpen = (capsule: Capsule) => {
    return new Date(capsule.openDate) <= new Date();
  };

  const handleOpen = (capsule: Capsule) => {
    if (canOpen(capsule)) {
      setSelectedCapsule(capsule);
      setIsDialogOpen(true);
      
      // Mark as opened
      const updatedCapsules = capsules.map(c => 
        c.id === capsule.id ? { ...c, status: "opened" as const } : c
      );
      setCapsules(updatedCapsules);
      localStorage.setItem("capsules", JSON.stringify(updatedCapsules));
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const daysUntil = (dateStr: string) => {
    const diff = new Date(dateStr).getTime() - new Date().getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="min-h-screen gradient-warm px-4 py-12">
      <div className="max-w-4xl mx-auto animate-fade-in">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="mb-8">
          <h2 className="text-4xl font-bold text-gradient mb-2">Your Time Capsules</h2>
          <p className="text-muted-foreground">
            {capsules.length === 0
              ? "You haven't created any time capsules yet."
              : `You have ${capsules.length} capsule${capsules.length > 1 ? "s" : ""} waiting for you.`}
          </p>
        </div>

        <div className="grid gap-6">
          {capsules.map((capsule) => {
            const isLocked = !canOpen(capsule);
            const days = daysUntil(capsule.openDate);

            return (
              <Card
                key={capsule.id}
                className="p-6 shadow-card border-2 transition-smooth hover:shadow-soft cursor-pointer"
                onClick={() => !isLocked && handleOpen(capsule)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      {isLocked ? (
                        <Lock className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <Mail className="w-5 h-5 text-primary" />
                      )}
                      <h3 className="text-xl font-semibold">{capsule.title}</h3>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>Opens on {formatDate(capsule.openDate)}</span>
                    </div>

                    {isLocked && days > 0 && (
                      <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        {days} day{days !== 1 ? "s" : ""} to go
                      </div>
                    )}

                    {!isLocked && capsule.status === "sealed" && (
                      <div className="inline-block px-3 py-1 rounded-full bg-accent/20 text-accent-foreground text-sm font-medium">
                        Ready to open! ✨
                      </div>
                    )}

                    {capsule.status === "opened" && (
                      <div className="inline-block px-3 py-1 rounded-full bg-secondary/20 text-secondary text-sm font-medium">
                        Opened
                      </div>
                    )}
                  </div>

                  {!isLocked && (
                    <Button
                      size="sm"
                      className="rounded-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpen(capsule);
                      }}
                    >
                      Open
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gradient">
              {selectedCapsule?.title}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground">
              <p>Written on {selectedCapsule && formatDate(selectedCapsule.createdAt)}</p>
              <p>Opened on {selectedCapsule && formatDate(selectedCapsule.openDate)}</p>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="whitespace-pre-wrap font-serif leading-relaxed">
                {selectedCapsule?.message}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
