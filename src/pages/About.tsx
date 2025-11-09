import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Users, Target, Heart, Leaf, User } from "lucide-react";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 text-foreground mt-12">
            {t('about.title')}
          </h1>
          <p className="text-xl text-center text-muted-foreground mb-16">
            {t('about.subtitle')}
          </p>

          <section className="mb-16">
            <h2 className="text-3xl font-semibold mb-6 text-foreground">{t('about.missionTitle')}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              {t('about.missionText1')}
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('about.missionText2')}
            </p>
          </section>

          <section className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-card rounded-lg p-6 border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">{t('about.visionTitle')}</h3>
              <p className="text-muted-foreground">
                {t('about.visionDesc')}
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 border border-border">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">{t('about.communityTitle')}</h3>
              <p className="text-muted-foreground">
                {t('about.communityDesc')}
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 border border-border">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">{t('about.valuesTitle')}</h3>
              <p className="text-muted-foreground">
                {t('about.valuesDesc')}
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Leaf className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">{t('about.sustainabilityTitle')}</h3>
              <p className="text-muted-foreground">
                {t('about.sustainabilityDesc')}
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 border border-border md:col-span-2">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                <User className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">{t('about.founderTitle')}</h3>
              <p className="text-muted-foreground">
                {t('about.founderDesc')}
              </p>
            </div>
          </section>

          <section className="bg-muted/30 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              {t('about.joinTitle')}
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              {t('about.joinDesc')}
            </p>
            <Button 
              onClick={() => window.location.href = "/auth"}
              size="lg"
              className="touch-manipulation active:scale-95"
            >
              {t('about.joinButton')}
            </Button>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
