import { Upload, Search, Repeat } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const steps = [
  {
    icon: Upload,
    title: "Yeteneğini Paylaş",
    description: "Paylaşmak istediğin yeteneğini ekle ve detaylarını gir.",
  },
  {
    icon: Search,
    title: "Keşfet",
    description: "Öğrenmek istediğin yeteneğe sahip kişileri bul.",
  },
  {
    icon: Repeat,
    title: "İletişime Geç",
    description: "Mesajlaş, anlaş ve yetenek takasını gerçekleştir!",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 px-4 bg-muted/30 relative overflow-hidden">
      <div className="container mx-auto">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Nasıl Çalışır?
        </motion.h2>
        <motion.p 
          className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Üç basit adımda takasa başla
        </motion.p>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card className="border-2 shadow-card transition-all duration-300 hover:shadow-primary card-3d h-full relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardContent className="pt-8 text-center relative z-10">
                  <motion.div 
                    className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <step.icon className="w-8 h-8 text-primary" />
                  </motion.div>
                  <h3 className="text-2xl font-semibold mb-3 text-foreground">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
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
