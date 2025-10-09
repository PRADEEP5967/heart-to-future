import { motion } from "framer-motion";
import { Sparkles, Heart, Users, Target, Rocket, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const values = [
  {
    icon: Heart,
    title: "Authenticity",
    description: "We believe in genuine self-reflection and honest conversations with your future self.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your thoughts are sacred. We use end-to-end encryption to keep them safe.",
  },
  {
    icon: Target,
    title: "Growth Mindset",
    description: "Track your personal development and celebrate how far you've come.",
  },
  {
    icon: Users,
    title: "Community",
    description: "Join thousands of dreamers on their journey of self-discovery.",
  },
];

const stats = [
  { number: "10K+", label: "Active Users" },
  { number: "50K+", label: "Capsules Created" },
  { number: "95%", label: "User Satisfaction" },
  { number: "100+", label: "Countries" },
];

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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Our Story</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gradient">
              Helping You Connect
              <br />
              with Your Future Self
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Dear Future Me was born from a simple idea: what if you could send a message to yourself in the future? We've built a platform that makes this magical experience accessible to everyone.
            </p>
          </motion.div>
        </section>

        {/* Stats Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <p className="text-4xl md:text-5xl font-bold text-gradient mb-2">{stat.number}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Story Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card p-8 md:p-12 rounded-3xl border-2 shadow-card"
          >
            <Rocket className="w-12 h-12 text-primary mb-6" />
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-4">
              We created Dear Future Me because we believe that reflection is one of the most powerful tools for personal growth. In our fast-paced world, it's easy to lose sight of where we've been and where we're going.
            </p>
            <p className="text-lg text-muted-foreground mb-4">
              Our platform gives you a way to pause, reflect, and set intentions for your future self. Whether you're setting goals, recording memories, or simply expressing your thoughts, we're here to make sure those moments are preserved and delivered exactly when you need them.
            </p>
            <p className="text-lg text-muted-foreground">
              Join thousands of dreamers who are using time capsules to become more mindful, intentional, and connected to their journey.
            </p>
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
            <h2 className="text-4xl font-bold text-gradient mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 h-full shadow-card hover:shadow-soft transition-all duration-300 border-2 text-center group">
                  <div className="p-3 rounded-full bg-primary/10 w-fit mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
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
              Start Your Journey Today
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join our community of dreamers and discover who you'll become.
            </p>
            <Link to="/auth">
              <Button size="lg" className="text-lg py-6 px-10 rounded-full shadow-soft">
                Create Your First Capsule
              </Button>
            </Link>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
