import logo from "@/assets/takazade-logo.png";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  return <footer className="bg-card border-t border-border py-12 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
      <div className="container mx-auto relative z-10">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <img src={logo} alt="Takazade" className="h-8 mb-4" />
            <p className="text-muted-foreground text-sm">
              Takasla, kazan, paylaş. Sürdürülebilir bir gelecek için birlikte.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Hızlı Linkler</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-smooth">Hakkımızda</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-smooth">Nasıl Çalışır</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-smooth">Blog</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-smooth">İletişim</a></li>
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
              <motion.a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-smooth"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Facebook className="w-5 h-5" />
              </motion.a>
              <motion.a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-smooth"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-smooth"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-smooth"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Takazade. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>;
};
export default Footer;