import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground">
          Takasla, Kazan, <span className="text-primary">Paylaş</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          Kullanmadığın eşyalarını değerli hale getir. Takazade ile takas yap, toplulukla buluş.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-secondary">
            Hemen Başla
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button size="lg" variant="outline" className="border-2">
            Nasıl Çalışır?
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
