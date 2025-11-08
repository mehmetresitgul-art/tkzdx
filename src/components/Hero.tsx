import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import takazadeIcon from "@/assets/takazade-icon.png";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
const Hero = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<any>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({
      data: {
        session
      }
    }) => {
      setSession(session);
    });
    const {
      data: {
        subscription
      }
    } = supabase.auth.onAuthStateChange((_event, session) => {
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
    howItWorksSection?.scrollIntoView({
      behavior: "smooth"
    });
  };
  return <section className="pt-32 pb-20 px-4">
      <div className="container mx-auto text-center">
        <div className="flex justify-center mb-8">
          <img src={takazadeIcon} alt="Takazade Icon" className="w-24 h-24 md:w-32 md:h-32 animate-[float_3s_ease-in-out_infinite]" />
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground">YetenekleriniPaylaş,
Fırsatları Yakala!<span><span style={{
            color: '#6C63FF'
          }}>Pay</span><span style={{
            color: '#00D09C'
          }}>laş</span></span>, Öğren
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          Yeteneklerini başkalarıyla takas et. Takazade ile yeni beceriler öğren, deneyimlerini paylaş.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-secondary" onClick={handleGetStarted}>
            Hemen Başla
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button size="lg" variant="outline" className="border-2" onClick={handleHowItWorks}>
            Nasıl Çalışır?
          </Button>
        </div>
      </div>
    </section>;
};
export default Hero;