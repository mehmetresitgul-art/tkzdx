import { Shield, Zap, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Shield,
    title: "Güvenli",
    description: "Kimlik doğrulama ve değerlendirme sistemi ile güvenli takas deneyimi.",
  },
  {
    icon: Zap,
    title: "Hızlı",
    description: "Anında eşleşme algoritması ile istediğin ürünü hızlıca bul.",
  },
  {
    icon: Globe,
    title: "Çevre Dostu",
    description: "Kullanılmayan eşyaları değerlendirerek çevreye katkıda bulun.",
  },
];

const WhyTakazade = () => {
  return (
    <section id="neden-takazade" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground">
          Neden Takazade?
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Takas platformlarında lider olmamızın sebepleri
        </p>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="border-2 shadow-card transition-smooth hover:shadow-secondary">
              <CardContent className="pt-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-secondary/10 flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyTakazade;
