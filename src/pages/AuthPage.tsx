import { useState } from "react";
import { Auth } from "@/components/Auth";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function AuthPage() {
  const navigate = useNavigate();

  const handleAuthSuccess = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 flex items-center justify-center pt-24 pb-16 px-4"
      >
        <div className="w-full max-w-md">
          <Auth onAuthSuccess={handleAuthSuccess} />
        </div>
      </motion.main>

      <Footer />
    </div>
  );
}
