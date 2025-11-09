import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import takazadeIcon from "@/assets/takazade-icon.png";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
const Hero = () => {
  const {
    t
  } = useTranslation();
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
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground">
          {t('hero.title').includes('Paylaş') ? (
            <>
              yeteneklerini <span style={{ color: '#00D09C' }}>Pay</span>
              <span style={{ color: '#6C63FF' }}>laş</span>,
              <br />
              Fırsatları Yakala!!
            </>
          ) : (
            <>
              <span style={{ color: '#00D09C' }}>Sh</span>
              <span style={{ color: '#6C63FF' }}>are</span> Your Talents,
              <br />
              Seize Opportunities!!
            </>
          )}
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          {t('hero.subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto px-4">
          <Button size="xl" onClick={handleGetStarted} className="bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-secondary border-2 border-purple w-full sm:w-auto touch-manipulation active:scale-95">
            {t('hero.getStarted')}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button size="xl" variant="outline" className="border-2 border-[#6C63FF] w-full sm:w-auto touch-manipulation active:scale-95" onClick={handleHowItWorks}>
            {t('hero.howItWorks')}
          </Button>
        </div>
      </div>
    </section>;
};
export default Hero;