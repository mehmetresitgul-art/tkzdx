import logo from "@/assets/takazade-logo.png";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
const Footer = () => {
  return <footer className="bg-card border-t border-border py-12 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <img src={logo} alt="Takazade" className="h-8 mb-4" />
            <p className="text-muted-foreground text-sm">Takasla, kazan, paylaş.
Sürdürülebilir bir gelecek için birlikte.</p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Hızlı Linkler</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/hakkimizda" className="text-muted-foreground hover:text-primary transition-smooth">Hakkımızda</a></li>
              <li><a href="#nasil-calisir" className="text-muted-foreground hover:text-primary transition-smooth">Nasıl Çalışır</a></li>
              
              <li><a href="/iletisim" className="text-muted-foreground hover:text-primary transition-smooth">İletişim</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Kurumsal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-smooth">Kullanım Şartları</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-smooth">Gizlilik Politikası</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-smooth">Çerez Politikası</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Sosyal Medya</h4>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-smooth">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-smooth">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/takazadecom" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-smooth">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-smooth">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 Takazade | 23rd Floor, New York, USATüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>;
};
export default Footer;