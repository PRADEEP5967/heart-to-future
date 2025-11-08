import { motion } from "framer-motion";
import { Heart, Target, Users, Sparkles, Shield, Zap, Globe, Award } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { GlassCard } from "@/components/GlassCard";

const values = [
  {
    icon: Heart,
    title: "Empathy First",
    description: "We believe in creating tools that help people connect with their emotions and aspirations.",
    gradient: "from-rose-500 to-pink-500",
  },
  {
    icon: Shield,
    title: "Privacy Matters",
    description: "Your thoughts are personal. We use end-to-end encryption to keep them safe.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Target,
    title: "Growth Minded",
    description: "We're here to help you track your progress and celebrate your achievements.",
    gradient: "from-purple-500 to-indigo-500",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Built with feedback from dreamers and goal-setters around the world.",
    gradient: "from-amber-500 to-orange-500",
  },
];

const stats = [
  { icon: Users, value: "10K+", label: "Active Users" },
  { icon: Sparkles, value: "50K+", label: "Capsules Created" },
  { icon: Globe, value: "120+", label: "Countries" },
  { icon: Award, value: "98%", label: "User Satisfaction" },
];

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function About() {
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
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="inline-block"
            >
              <Sparkles className="w-16 h-16 text-primary" />
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold text-gradient">
              Connecting You with
              <br />
              Your Future Self
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Dear Future Me was born from a simple idea: what if you could send a message to yourself in the future? We've built a platform that makes this magical experience accessible to everyone.
            </p>
          </motion.div>
        </section>

        {/* Stats Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="p-6 text-center hover:scale-105 transition-transform">
                  <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                  <p className="text-4xl font-bold text-gradient mb-2">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Story Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <GlassCard className="p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-8 h-8 text-primary" />
                <h2 className="text-3xl font-bold text-gradient">Our Story</h2>
              </div>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  Dear Future Me was born from a simple yet profound idea: <span className="text-primary font-semibold">what if we could talk to our future selves?</span> 
                  What would we say? What advice would we give? What dreams would we share?
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  In 2024, our team of dreamers, developers, and designers came together to create a platform that 
                  makes this possible. We wanted to build something <span className="text-secondary font-semibold">beautiful, secure, and meaningful</span>—a 
                  digital time capsule that helps people reflect on their journey and connect with who 
                  they're becoming.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  Today, thousands of people worldwide use Dear Future Me to write letters, set goals, 
                  and preserve memories. Every capsule opened is a moment of <span className="text-accent font-semibold">reflection, growth, and discovery</span>. 
                  Some are surprised by how far they've come, others are inspired to keep pushing forward.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="pt-4"
                >
                  <Badge variant="secondary" className="text-base px-4 py-2">
                    <Zap className="w-4 h-4 mr-2" />
                    Join the journey of self-discovery
                  </Badge>
                </motion.div>
              </div>
            </GlassCard>
          </motion.div>
        </section>

        {/* Values Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map((value, index) => (
              <motion.div key={index} variants={itemVariants}>
                <GlassCard className="p-6 h-full hover:scale-105 transition-all duration-300 group">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${value.gradient} w-fit mb-4 group-hover:scale-110 transition-transform`}>
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden"
          >
            <GlassCard className="p-12 text-center border-2">
              {/* Background gradient effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 -z-10" />
              
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="inline-block mb-6"
              >
                <Sparkles className="w-16 h-16 text-primary" />
              </motion.div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
                Start Your Journey Today
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of dreamers creating meaningful connections with their future selves. 
                Your story begins now.
              </p>
              
              <Link to="/auth">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="text-lg py-6 px-10 rounded-full shadow-soft">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Create Your First Capsule
                  </Button>
                </motion.div>
              </Link>
            </GlassCard>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
