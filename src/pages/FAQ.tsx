import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is Dear Future Me?",
    answer: "Dear Future Me is a time capsule platform that allows you to write messages, set goals, and record voice notes for your future self. You choose when to open each capsule, creating meaningful connections across time.",
  },
  {
    question: "How does the time lock work?",
    answer: "When creating a capsule, you select an opening date. Your capsule will remain locked until that date arrives. Once the date is reached, you'll be able to open and view your message, goals, and voice notes.",
  },
  {
    question: "Is my data secure and private?",
    answer: "Absolutely! We use end-to-end encryption to protect your messages. All your capsules are encrypted before being stored, and only you have the ability to decrypt and read them.",
  },
  {
    question: "Can I add voice recordings to my capsules?",
    answer: "Yes! You can record voice messages using your device's microphone. These recordings are saved securely with your capsule and can be played back when you open it in the future.",
  },
  {
    question: "What are goal-based capsules?",
    answer: "Goal-based capsules allow you to create a list of goals alongside your message. When you open the capsule in the future, you can mark goals as completed and track your progress over time.",
  },
  {
    question: "Can I edit or delete a capsule after creating it?",
    answer: "Once a capsule is sealed, it cannot be edited to preserve the authenticity of your message to your future self. However, you can always create a new capsule with updated thoughts.",
  },
  {
    question: "What happens if I forget about a capsule?",
    answer: "When your capsule's opening date arrives, you'll receive a notification (if enabled). You can also view all your active and opened capsules in your dashboard at any time.",
  },
  {
    question: "Is there a limit to how many capsules I can create?",
    answer: "No! You can create as many time capsules as you'd like. Whether it's one per year or one per month, we're here to support your journey of self-reflection.",
  },
  {
    question: "Can I share my capsules with others?",
    answer: "Currently, all capsules are private and only accessible to you. We believe in the personal nature of self-reflection, but we're exploring group capsule features for the future.",
  },
  {
    question: "What if I want to delete my account?",
    answer: "You can delete your account at any time from your profile settings. Please note that this will permanently delete all your capsules and cannot be undone.",
  },
];

export default function FAQ() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Help Center</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gradient">
              Frequently Asked
              <br />
              Questions
            </h1>
            <p className="text-xl text-muted-foreground">
              Find answers to common questions about Dear Future Me
            </p>
          </motion.div>
        </section>

        {/* FAQ Accordion */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-card border-2 rounded-lg px-6 shadow-card hover:shadow-soft transition-all"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-4">
                    <span className="font-semibold">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
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
            <h2 className="text-3xl font-bold text-gradient mb-4">
              Still Have Questions?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              We're here to help! Get started today and explore all the features.
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
