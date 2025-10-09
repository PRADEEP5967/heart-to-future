import { motion } from "framer-motion";
import { Mail, Clock, Heart, Shield, Target, Sparkles, Mic, Brain, Lock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const features = [
  {
    icon: Mail,
    title: "Write Letters",
    description: "Pen heartfelt messages to your future self with our beautiful, distraction-free editor.",
    gradient: "from-primary to-secondary",
  },
  {
    icon: Clock,
    title: "Time Lock",
    description: "Set when your capsule opens - 1 month, 1 year, or even 10 years from now.",
    gradient: "from-accent to-primary",
  },
  {
    icon: Mic,
    title: "Voice Notes",
    description: "Record voice messages to hear your past self speak to you in the future.",
    gradient: "from-secondary to-primary",
  },
  {
    icon: Shield,
    title: "Private & Secure",
    description: "Your messages are encrypted end-to-end. Only you can read them.",
    gradient: "from-primary to-accent",
  },
  {
    icon: Target,
    title: "Goal Tracking",
    description: "Turn your capsules into goal lists and track your achievements over time.",
    gradient: "from-accent to-secondary",
  },
  {
    icon: Brain,
    title: "AI Reflections",
    description: "Get thoughtful AI-generated reflections from your future self.",
    gradient: "from-secondary to-accent",
  },
  {
    icon: Lock,
    title: "Auto-Save Drafts",
    description: "Never lose your thoughts. We automatically save your drafts as you write.",
    gradient: "from-primary to-secondary",
  },
  {
    icon: Zap,
    title: "Instant Notifications",
    description: "Get notified when it's time to open your time capsules.",
    gradient: "from-accent to-primary",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export default function Features() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Powerful Features</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gradient">
              Everything You Need to
              <br />
              Connect with Your Future
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Dear Future Me combines powerful features with beautiful design to help you create meaningful connections with your future self.
            </p>
          </motion.div>
        </section>

        {/* Features Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="p-6 h-full shadow-card hover:shadow-soft transition-all duration-300 hover:scale-105 border-2 group">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.gradient} w-fit mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center bg-card p-12 rounded-3xl border-2 shadow-card"
          >
            <Sparkles className="w-16 h-16 mx-auto mb-6 text-primary" />
            <h2 className="text-4xl font-bold text-gradient mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Create your first time capsule today and discover who you'll become.
            </p>
            <Link to="/auth">
              <Button size="lg" className="text-lg py-6 px-10 rounded-full shadow-soft">
                Get Started Free
              </Button>
            </Link>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
