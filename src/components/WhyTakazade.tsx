import { Shield, Zap, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const features = [
  {
    icon: Shield,
    title: "Güvenli",
    description: "Kimlik doğrulama sistemi ile güvenli yetenek takas deneyimi.",
  },
  {
    icon: Zap,
    title: "Kolay",
    description: "Direkt mesajlaşma ile öğrenmek istediğin kişilerle kolayca iletişime geç.",
  },
  {
    icon: Globe,
    title: "Topluluk",
    description: "Yeteneklerini paylaşarak ve yeni beceriler öğrenerek büyüyen bir topluluğun parçası ol.",
  },
];

const WhyTakazade = () => {
  return (
    <section id="neden-takazade" className="py-20 px-4 bg-muted/30 relative overflow-hidden">
      <motion.div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <div className="container mx-auto relative z-10">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Neden Takazade?
        </motion.h2>
        <motion.p 
          className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Takas platformlarında lider olmamızın sebepleri
        </motion.p>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, rotateY: -20 }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="border-2 shadow-card transition-all duration-500 hover:shadow-secondary card-3d h-full group relative overflow-hidden">
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-primary opacity-0 group-hover:opacity-10"
                  style={{ backgroundSize: "200% 200%" }}
                  animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <CardContent className="pt-8 text-center relative z-10">
                  <motion.div 
                    className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-secondary/20 to-primary/20 flex items-center justify-center"
                    whileHover={{ 
                      scale: 1.2, 
                      rotate: 360,
                      boxShadow: "0 0 25px rgba(0, 208, 156, 0.5)"
                    }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <feature.icon className="w-8 h-8 text-secondary" />
                  </motion.div>
                  <h3 className="text-2xl font-semibold mb-3 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyTakazade;
