import { Upload, Search, Repeat } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

const HowItWorks = () => {
  const { t } = useTranslation();
  
  const steps = [
    {
      icon: Upload,
      title: t('howItWorks.step1Title'),
      description: t('howItWorks.step1Desc'),
    },
    {
      icon: Search,
      title: t('howItWorks.step2Title'),
      description: t('howItWorks.step2Desc'),
    },
    {
      icon: Repeat,
      title: t('howItWorks.step3Title'),
      description: t('howItWorks.step3Desc'),
    },
  ];

  return (
    <section id="how-it-works" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground">
          {t('howItWorks.title')}
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          {t('howItWorks.subtitle')}
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <Card key={index} className="group border-2 shadow-card transition-smooth hover:shadow-primary hover:-translate-y-2 hover:scale-105 active:scale-95 touch-manipulation">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="w-8 h-8 text-primary group-hover:rotate-12 transition-transform duration-300" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold mb-3 text-foreground">{step.title}</h3>
                <p className="text-base text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
