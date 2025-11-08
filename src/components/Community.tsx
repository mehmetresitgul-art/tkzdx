import { Users, Heart, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const stats = [
  {
    icon: Users,
    value: "10.000+",
    label: "Aktif Kullanıcı",
  },
  {
    icon: Heart,
    value: "50.000+",
    label: "Başarılı Takas",
  },
  {
    icon: TrendingUp,
    value: "100.000+",
    label: "Mutlu Anlar",
  },
];

const Community = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <section id="topluluk" className="py-20 px-4 relative overflow-hidden">
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <div className="container mx-auto relative z-10">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Büyüyen Topluluğumuz
        </motion.h2>
        <motion.p 
          className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Binlerce kullanıcı Takazade ile değerli deneyimler yaşıyor
        </motion.p>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              className="text-center"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.15,
                type: "spring",
                stiffness: 200
              }}
              onViewportEnter={() => setIsVisible(true)}
            >
              <motion.div 
                className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-secondary/20 to-primary/20 flex items-center justify-center relative"
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: "0 0 30px rgba(108, 99, 255, 0.4)"
                }}
                animate={{
                  boxShadow: [
                    "0 0 0px rgba(108, 99, 255, 0)",
                    "0 0 20px rgba(108, 99, 255, 0.3)",
                    "0 0 0px rgba(108, 99, 255, 0)"
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.3
                }}
              >
                <stat.icon className="w-10 h-10 text-secondary" />
              </motion.div>
              <motion.div 
                className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: index * 0.15 + 0.3 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Community;
