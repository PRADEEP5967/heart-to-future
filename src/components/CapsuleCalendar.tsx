import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Lock, Target, Mic, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "./GlassCard";

interface Capsule {
  id: string;
  userId: string;
  title: string;
  message: string;
  openDate: string;
  status: "sealed" | "opened";
  isGoal: boolean;
  voiceNote?: string;
  createdAt: string;
  theme?: "modern" | "vintage" | "minimalist" | "cosmic";
}

interface CapsuleCalendarProps {
  capsules: Capsule[];
  onCapsuleClick: (capsule: Capsule) => void;
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const THEME_COLORS = {
  modern: "from-blue-500 to-cyan-500",
  vintage: "from-amber-600 to-orange-700",
  minimalist: "from-slate-500 to-gray-600",
  cosmic: "from-purple-600 to-pink-600",
};

export const CapsuleCalendar = ({ capsules, onCapsuleClick }: CapsuleCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay();

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDate(null);
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDate(null);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(null);
  };

  // Create a map of dates to capsules
  const capsulesByDate = useMemo(() => {
    const map: { [key: string]: Capsule[] } = {};
    capsules.forEach((capsule) => {
      const date = new Date(capsule.openDate);
      const dateKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      if (!map[dateKey]) {
        map[dateKey] = [];
      }
      map[dateKey].push(capsule);
    });
    return map;
  }, [capsules]);

  const getCapsuleForDate = (day: number): Capsule[] => {
    const dateKey = `${year}-${month}-${day}`;
    return capsulesByDate[dateKey] || [];
  };

  const selectedDayCapsules = selectedDate
    ? getCapsuleForDate(selectedDate.getDate())
    : [];

  const calendarDays = [];
  // Empty cells before the first day of month
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null);
  }
  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  const isSelected = (day: number) => {
    return (
      selectedDate &&
      day === selectedDate.getDate() &&
      month === selectedDate.getMonth() &&
      year === selectedDate.getFullYear()
    );
  };

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <CalendarIcon className="w-8 h-8 text-primary" />
            </motion.div>
            <h2 className="text-2xl font-bold text-gradient">
              {MONTHS[month]} {year}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={goToToday}
              className="shadow-soft"
            >
              Today
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={previousMonth}
              className="hover:scale-110 transition-transform"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={nextMonth}
              className="hover:scale-110 transition-transform"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {/* Day headers */}
          {DAYS.map((day) => (
            <div
              key={day}
              className="text-center font-semibold text-sm text-muted-foreground py-2"
            >
              {day}
            </div>
          ))}

          {/* Calendar days */}
          {calendarDays.map((day, index) => {
            if (day === null) {
              return <div key={`empty-${index}`} className="aspect-square" />;
            }

            const dayCapsules = getCapsuleForDate(day);
            const hasCapsules = dayCapsules.length > 0;
            const today = isToday(day);
            const selected = isSelected(day);

            return (
              <motion.div
                key={day}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <button
                  onClick={() => {
                    const clickedDate = new Date(year, month, day);
                    setSelectedDate(
                      selected ? null : clickedDate
                    );
                  }}
                  className={`
                    w-full aspect-square rounded-xl p-2 transition-all
                    ${today ? "ring-2 ring-primary ring-offset-2" : ""}
                    ${selected ? "bg-primary text-primary-foreground shadow-soft scale-105" : "bg-card hover:bg-muted"}
                    ${hasCapsules ? "border-2 border-primary/30" : "border"}
                  `}
                >
                  <div className="flex flex-col items-center justify-center h-full">
                    <span className="text-sm font-semibold">{day}</span>
                    {hasCapsules && (
                      <div className="flex gap-1 mt-1 flex-wrap justify-center">
                        {dayCapsules.slice(0, 3).map((capsule, idx) => (
                          <div
                            key={idx}
                            className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${
                              THEME_COLORS[capsule.theme || "modern"]
                            }`}
                          />
                        ))}
                        {dayCapsules.length > 3 && (
                          <span className="text-[8px] text-muted-foreground">
                            +{dayCapsules.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>
      </GlassCard>

      {/* Selected Date Capsules */}
      <AnimatePresence>
        {selectedDate && selectedDayCapsules.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <GlassCard className="p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Capsules on {MONTHS[selectedDate.getMonth()]} {selectedDate.getDate()}, {selectedDate.getFullYear()}
              </h3>
              <div className="space-y-3">
                {selectedDayCapsules.map((capsule, index) => (
                  <motion.div
                    key={capsule.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => onCapsuleClick(capsule)}
                    className={`
                      p-4 rounded-xl border-2 cursor-pointer transition-all
                      hover:shadow-soft hover:scale-[1.02]
                      bg-gradient-to-br ${THEME_COLORS[capsule.theme || "modern"]} bg-opacity-5
                    `}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{capsule.title}</h4>
                          <Badge
                            variant="secondary"
                            className="text-xs capitalize"
                          >
                            {capsule.theme || "modern"}
                          </Badge>
                        </div>
                        <div className="flex gap-2 mt-2">
                          {capsule.status === "sealed" && (
                            <Badge variant="outline" className="text-xs">
                              <Lock className="w-3 h-3 mr-1" />
                              Sealed
                            </Badge>
                          )}
                          {capsule.isGoal && (
                            <Badge variant="secondary" className="text-xs">
                              <Target className="w-3 h-3 mr-1" />
                              Goals
                            </Badge>
                          )}
                          {capsule.voiceNote && (
                            <Badge variant="outline" className="text-xs">
                              <Mic className="w-3 h-3 mr-1" />
                              Voice
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div
                        className={`w-3 h-3 rounded-full bg-gradient-to-br ${
                          THEME_COLORS[capsule.theme || "modern"]
                        }`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend */}
      <GlassCard className="p-4">
        <h4 className="text-sm font-semibold mb-3">Theme Colors</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.entries(THEME_COLORS).map(([theme, gradient]) => (
            <div key={theme} className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${gradient}`} />
              <span className="text-sm capitalize">{theme}</span>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};
