import { motion } from "framer-motion";
import { Shield, Lock, Eye, Database, UserCheck } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";

const sections = [
  {
    icon: Database,
    title: "Information We Collect",
    content: "We collect information you provide directly to us, including your name, email address, and the content of your time capsules. We also automatically collect certain information about your device and how you interact with our services.",
  },
  {
    icon: Lock,
    title: "How We Use Your Information",
    content: "We use your information to provide, maintain, and improve our services, to communicate with you, and to protect the security and integrity of our platform. Your capsule content is encrypted and only accessible to you.",
  },
  {
    icon: Shield,
    title: "Data Security",
    content: "We implement industry-standard security measures to protect your data, including end-to-end encryption for all capsule content, secure data transmission, and regular security audits.",
  },
  {
    icon: Eye,
    title: "Your Privacy Rights",
    content: "You have the right to access, update, or delete your personal information at any time. You can also export your data or request account deletion through your profile settings.",
  },
  {
    icon: UserCheck,
    title: "Data Sharing",
    content: "We do not sell your personal information. We only share data with service providers who help us operate our platform, and only to the extent necessary to provide our services.",
  },
];

export default function Privacy() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4"
          >
            <Shield className="w-16 h-16 mx-auto text-primary" />
            <h1 className="text-5xl md:text-6xl font-bold text-gradient">
              Privacy Policy
            </h1>
            <p className="text-lg text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
          </motion.div>
        </section>

        {/* Content Sections */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-8 shadow-card border-2">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <section.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-3">{section.title}</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}

          {/* Additional Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 shadow-card border-2">
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at{" "}
                <a href="mailto:privacy@dearfutureme.com" className="text-primary hover:underline">
                  privacy@dearfutureme.com
                </a>
              </p>
            </Card>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
