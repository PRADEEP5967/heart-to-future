import { motion } from "framer-motion";
import { HelpCircle, Sparkles } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    category: "Getting Started",
    questions: [
      {
        question: "What is Dear Future Me?",
        answer: "Dear Future Me is a digital time capsule platform that allows you to write letters, set goals, and record messages to your future self. You can schedule when these messages will be delivered, creating meaningful connections across time.",
      },
      {
        question: "How do I create my first time capsule?",
        answer: "Simply sign up for an account, click 'Create New Time Capsule,' write your message, optionally record a voice note, set a future opening date, and seal it. Your capsule will be safely stored until the date you chose.",
      },
    ],
  },
  {
    category: "Features & Functionality",
    questions: [
      {
        question: "How does the time lock work?",
        answer: "When you create a time capsule, you choose a future date when it should be opened. The capsule remains locked until that date arrives, at which point you'll receive a notification and can open it to read your message from the past.",
      },
      {
        question: "Can I create voice notes?",
        answer: "Absolutely! In addition to written messages, you can record voice notes using your device's microphone. This adds a personal touch and lets you hear your past self's voice when you open the capsule.",
      },
      {
        question: "What are goal-based capsules?",
        answer: "Goal-based capsules allow you to set specific goals for your future self. When you open the capsule, you can mark which goals you've achieved, track your progress with beautiful progress indicators, and reflect on your growth over time.",
      },
      {
        question: "Can I save drafts?",
        answer: "Yes! The platform automatically saves your drafts as you write. You can return to your draft at any time from the Drafts tab in your dashboard and continue editing before sealing your capsule.",
      },
    ],
  },
  {
    category: "Privacy & Security",
    questions: [
      {
        question: "Is my data secure and private?",
        answer: "Yes! All your messages are encrypted end-to-end before being stored. Only you can decrypt and read your time capsules. We take your privacy seriously and never share your personal information or capsule content with anyone.",
      },
      {
        question: "Can anyone else read my capsules?",
        answer: "No. Your capsules are encrypted with your unique encryption key. Even if someone gained access to our database, they wouldn't be able to read your messages without your account credentials.",
      },
    ],
  },
  {
    category: "Managing Capsules",
    questions: [
      {
        question: "Can I edit a capsule after creating it?",
        answer: "Once a capsule is sealed, it cannot be edited. This preserves the authenticity of your message and prevents you from changing what you told your future self. However, you can save and edit drafts before sealing.",
      },
      {
        question: "Is there a limit to how many capsules I can create?",
        answer: "No, there's no limit! Create as many time capsules as you'd like. Whether it's monthly reflections, yearly goals, or special occasion messages, you're free to create unlimited capsules.",
      },
      {
        question: "What happens if I forget to check my capsule?",
        answer: "Don't worry! When a capsule's opening date arrives, we'll send you a notification. The capsule will remain available in your dashboard for you to open whenever you're ready - there's no expiration date.",
      },
      {
        question: "Can I delete a capsule?",
        answer: "Yes, you can delete capsules from your dashboard at any time. However, once deleted, a capsule cannot be recovered, so make sure you're certain before deleting.",
      },
    ],
  },
];

export default function FAQ() {
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
            className="text-center space-y-6"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <HelpCircle className="w-20 h-20 mx-auto text-primary" />
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-bold text-gradient">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about creating and managing your time capsules.
            </p>
          </motion.div>
        </section>

        {/* FAQ Sections */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {faqs.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
            >
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <h2 className="text-2xl font-bold text-gradient">{category.category}</h2>
                </div>
                <div className="h-1 w-20 bg-gradient-sunset rounded-full" />
              </div>

              <Accordion type="single" collapsible className="space-y-4">
                {category.questions.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <AccordionItem
                      value={`item-${categoryIndex}-${index}`}
                      className="bg-card border-2 rounded-xl px-6 shadow-card hover:shadow-soft transition-all hover:scale-[1.01]"
                    >
                      <AccordionTrigger className="text-lg font-semibold hover:text-primary py-5">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed pb-5 text-base">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </motion.div>
          ))}

          {/* Contact Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 shadow-card border-2 text-center bg-gradient-to-br from-primary/5 to-secondary/5">
              <h3 className="text-2xl font-bold mb-3">Still have questions?</h3>
              <p className="text-muted-foreground mb-6">
                We're here to help! Reach out to our support team and we'll get back to you as soon as possible.
              </p>
              <a href="mailto:support@dearfutureme.com">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-gradient-sunset text-white font-semibold rounded-full shadow-soft"
                >
                  Contact Support
                </motion.button>
              </a>
            </Card>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
