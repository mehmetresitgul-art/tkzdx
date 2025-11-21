import { Upload, Search, Repeat, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useState } from "react";

const HowItWorks = () => {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState(0);
  
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
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground"
        >
          {t('howItWorks.title')}
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto"
        >
          {t('howItWorks.subtitle')}
        </motion.p>
        
        {/* Interactive Step Navigator */}
        <div className="flex justify-center items-center gap-4 mb-12 max-w-2xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              <motion.button
                onClick={() => setActiveStep(index)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                  activeStep === index 
                    ? 'bg-primary text-primary-foreground scale-110 shadow-lg shadow-primary/50' 
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {index + 1}
              </motion.button>
              {index < steps.length - 1 && (
                <ArrowRight className="w-6 h-6 mx-2 text-muted-foreground" />
              )}
            </div>
          ))}
        </div>

        {/* Animated Active Step Display */}
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
          className="max-w-2xl mx-auto mb-16"
        >
          <Card className="border-2 border-primary/20 shadow-lg">
            <CardContent className="pt-12 pb-12 text-center">
              <motion.div 
                className="w-24 h-24 mx-auto mb-8 rounded-full bg-primary/10 flex items-center justify-center"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                {(() => {
                  const StepIcon = steps[activeStep].icon;
                  return <StepIcon className="w-12 h-12 text-primary" />;
                })()}
              </motion.div>
              <h3 className="text-3xl font-bold mb-4 text-foreground">{steps[activeStep].title}</h3>
              <p className="text-lg text-muted-foreground">{steps[activeStep].description}</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* All Steps Grid */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <Card 
                className="group border-2 shadow-card transition-smooth hover:shadow-primary hover:-translate-y-2 hover:scale-105 active:scale-95 touch-manipulation cursor-pointer"
                onClick={() => setActiveStep(index)}
              >
                <CardContent className="pt-8 pb-8 text-center">
                  <motion.div 
                    className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <step.icon className="w-8 h-8 text-primary" />
                  </motion.div>
                  <h3 className="text-xl md:text-2xl font-semibold mb-3 text-foreground">{step.title}</h3>
                  <p className="text-base text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
