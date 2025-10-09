import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { auth } from "@/lib/auth";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.getUser();
    if (user) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleGetStarted = () => {
    navigate("/auth");
  };

  return (
    <>
      <Navbar />
      <Hero onGetStarted={handleGetStarted} />
      <Footer />
    </>
  );
};

export default Index;
