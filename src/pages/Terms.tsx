import { motion } from "framer-motion";
import { FileText, AlertCircle, CheckCircle, Ban, UserX } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";

const sections = [
  {
    icon: CheckCircle,
    title: "Acceptance of Terms",
    content: "By accessing and using Dear Future Me, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.",
  },
  {
    icon: UserX,
    title: "Account Responsibilities",
    content: "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized access.",
  },
  {
    icon: Ban,
    title: "Prohibited Uses",
    content: "You may not use our services for any illegal purposes, to transmit harmful content, to violate intellectual property rights, or to interfere with the platform's operation.",
  },
  {
    icon: FileText,
    title: "Content Ownership",
    content: "You retain all rights to the content you create in your time capsules. By using our service, you grant us a license to store and transmit your content as necessary to provide our services.",
  },
  {
    icon: AlertCircle,
    title: "Limitation of Liability",
    content: "Dear Future Me is provided 'as is' without warranties of any kind. We are not liable for any indirect, incidental, or consequential damages arising from your use of our services.",
  },
];

export default function Terms() {
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
            <FileText className="w-16 h-16 mx-auto text-primary" />
            <h1 className="text-5xl md:text-6xl font-bold text-gradient">
              Terms of Service
            </h1>
            <p className="text-lg text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Please read these terms carefully before using Dear Future Me.
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

          {/* Additional Sections */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 shadow-card border-2">
              <h2 className="text-2xl font-bold mb-4">Changes to Terms</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through the platform.
              </p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 shadow-card border-2">
              <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                For questions about these Terms of Service, please contact us at{" "}
                <a href="mailto:legal@dearfutureme.com" className="text-primary hover:underline">
                  legal@dearfutureme.com
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
