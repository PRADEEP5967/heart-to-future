import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, MessageCircle, Calendar, Search, Filter, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

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

export default function DiscoveryPage() {
  const [capsules, setCapsules] = useState<Capsule[]>([]);
  const [filteredCapsules, setFilteredCapsules] = useState<Capsule[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [themeFilter, setThemeFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("recent");

  useEffect(() => {
    loadCapsules();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [capsules, searchQuery, themeFilter, sortBy]);

  const loadCapsules = () => {
    const allCapsules = JSON.parse(localStorage.getItem("capsules") || "[]");
    const publicCapsules = allCapsules.filter(
      (c: Capsule) => c.isPublic && c.status === "opened"
    );
    setCapsules(publicCapsules);
  };

  const applyFilters = () => {
    let filtered = [...capsules];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (c) =>
          c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.userName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Theme filter
    if (themeFilter !== "all") {
      filtered = filtered.filter((c) => c.theme === themeFilter);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "popular":
          return (b.reactions?.length || 0) - (a.reactions?.length || 0);
        case "commented":
          return (b.commentsCount || 0) - (a.commentsCount || 0);
        case "recent":
        default:
          return new Date(b.openDate).getTime() - new Date(a.openDate).getTime();
      }
    });

    setFilteredCapsules(filtered);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen gradient-warm">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12 mt-20">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-gradient">
              Discover Time Capsules
            </h1>
            <p className="text-lg text-muted-foreground">
              Explore memories and stories shared by the community
            </p>
          </div>

          {/* Filters */}
          <Card className="p-6 shadow-card">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search capsules..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={themeFilter} onValueChange={setThemeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Themes</SelectItem>
                  <SelectItem value="modern">Modern</SelectItem>
                  <SelectItem value="vintage">Vintage</SelectItem>
                  <SelectItem value="minimalist">Minimalist</SelectItem>
                  <SelectItem value="cosmic">Cosmic</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="commented">Most Commented</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="w-4 h-4" />
              <span>Showing {filteredCapsules.length} capsules</span>
            </div>
          </Card>

          {/* Capsules Grid */}
          {filteredCapsules.length === 0 ? (
            <Card className="p-12 text-center">
              <TrendingUp className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No capsules found</h3>
              <p className="text-muted-foreground">
                Try adjusting your filters or search query
              </p>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredCapsules.map((capsule, index) => {
                const theme = capsule.theme || "modern";
                const styles = THEME_STYLES[theme];
                const reactionCount = capsule.reactions?.length || 0;
                const commentCount = capsule.commentsCount || 0;

                return (
                  <motion.div
                    key={capsule.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card
                      className={`p-5 cursor-pointer hover:shadow-lg transition-all border-2 ${styles.border} bg-gradient-to-br ${styles.gradient}`}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <Avatar>
                          <AvatarFallback className="bg-primary/10">
                            {capsule.userName?.[0]?.toUpperCase() || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold truncate">
                            {capsule.userName || "Anonymous"}
                          </p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(capsule.openDate)}
                          </p>
                        </div>
                        <Badge variant="outline" className={`${styles.accent} text-xs`}>
                          {theme}
                        </Badge>
                      </div>

                      <h3 className="text-lg font-bold mb-2 line-clamp-2">
                        {capsule.title}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                        {capsule.message.substring(0, 120)}...
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
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
