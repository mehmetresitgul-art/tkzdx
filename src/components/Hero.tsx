import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import takazadeIcon from "@/assets/takazade-icon.png";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Hero = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleGetStarted = () => {
    if (session) {
      navigate("/kesfet");
    } else {
      navigate("/auth");
    }
  };

  const handleHowItWorks = () => {
    const howItWorksSection = document.getElementById("how-it-works");
    howItWorksSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative pt-32 pb-20 px-4 overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/10 animate-gradient" />
      
      {/* Floating orbs */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl"
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"
        animate={{
          y: [0, 30, 0],
          x: [0, -20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <div className="container mx-auto text-center relative z-10">
        <motion.div 
          className="flex justify-center mb-8"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="animate-glow rounded-full">
            <img 
              src={takazadeIcon} 
              alt="Takazade Icon" 
              className="w-24 h-24 md:w-32 md:h-32 animate-[float_3s_ease-in-out_infinite]" 
            />
          </div>
        </motion.div>
        
        <motion.h1 
          className="text-5xl md:text-7xl font-bold mb-6 text-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Yeteneklerini <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-gradient">Paylaş</span>,
          <br />Fırsatları Yakala!
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Yeteneklerini başkalarıyla takas et. Takazade ile yeni beceriler öğren, deneyimlerini paylaş.
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white shadow-lg hover:shadow-xl animate-glow"
            onClick={handleGetStarted}
          >
            Hemen Başla
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-2 border-primary/50 hover:border-primary hover:bg-primary/5"
            onClick={handleHowItWorks}
          >
            Nasıl Çalışır?
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
