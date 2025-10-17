import { Upload, Search, Repeat } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    icon: Upload,
    title: "Eşyanı Ekle",
    description: "Takas etmek istediğin eşyanın fotoğrafını yükle ve bilgilerini gir.",
  },
  {
    icon: Search,
    title: "Arama Yap",
    description: "İstediğin eşyayı bul ve takas teklifinde bulun.",
  },
  {
    icon: Repeat,
    title: "Takas Et",
    description: "Anlaşmaya var, buluş ve takasını gerçekleştir!",
  },
];

const HowItWorks = () => {
  return (
    <section id="nasil-calisir" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground">
          Nasıl Çalışır?
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Üç basit adımda takasa başla
        </p>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <Card key={index} className="border-2 shadow-card transition-smooth hover:shadow-primary">
              <CardContent className="pt-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-foreground">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
