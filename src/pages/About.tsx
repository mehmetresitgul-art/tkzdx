import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Users, Target, Heart, Leaf } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 text-foreground">
            Hakkımızda
          </h1>
          <p className="text-xl text-center text-muted-foreground mb-16">
            Takazade, yeteneklerin değer bulduğu, bilginin özgürce paylaşıldığı bir platformdur.
          </p>

          <section className="mb-16">
            <h2 className="text-3xl font-semibold mb-6 text-foreground">Misyonumuz</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              Takazade olarak, insanların sahip oldukları yetenekleri para kullanmadan 
              paylaşabilecekleri ve karşılıklı olarak yeni beceriler öğrenebilecekleri 
              bir topluluk oluşturmayı hedefliyoruz.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Para odaklı olmayan bir ekonomi modeli ile herkesin hem öğretici hem de 
              öğrenci olabileceği, sürdürülebilir bir eğitim ve paylaşım ekosistemi 
              yaratıyoruz.
            </p>
          </section>

          <section className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-card rounded-lg p-6 border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Vizyonumuz</h3>
              <p className="text-muted-foreground">
                Herkesin eşit erişime sahip olduğu, yeteneklerin özgürce dolaştığı 
                ve bilginin herkese ait olduğu bir dünya hayal ediyoruz.
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 border border-border">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Topluluğumuz</h3>
              <p className="text-muted-foreground">
                Farklı yeteneklere sahip binlerce kullanıcı, Takazade'de bir araya 
                gelerek birbirlerinden öğreniyor ve deneyimlerini paylaşıyor.
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 border border-border">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Değerlerimiz</h3>
              <p className="text-muted-foreground">
                Paylaşım, dayanışma, eşitlik ve sürdürülebilirlik temel değerlerimizdir. 
                Herkesin değerli olduğuna inanıyoruz.
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Leaf className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Sürdürülebilirlik</h3>
              <p className="text-muted-foreground">
                Sadece eğitimde değil, hayatın her alanında sürdürülebilir ve 
                çevre dostu bir yaklaşımı destekliyoruz.
              </p>
            </div>
          </section>

          <section className="bg-muted/30 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              Bize Katılın
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Takazade topluluğuna katılarak sen de yeteneklerini paylaş, 
              yeni beceriler öğren ve sürdürülebilir bir geleceğe katkıda bulun.
            </p>
            <Button 
              onClick={() => window.location.href = "/auth"}
              size="lg"
              className="touch-manipulation active:scale-95"
            >
              Hemen Başla
            </Button>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
