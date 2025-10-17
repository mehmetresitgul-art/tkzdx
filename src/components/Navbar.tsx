import { Button } from "@/components/ui/button";
import logo from "@/assets/takazade-logo.png";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Takazade" className="h-8" />
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#nasil-calisir" className="text-foreground hover:text-primary transition-smooth">
              Nasıl Çalışır?
            </a>
            <a href="#topluluk" className="text-foreground hover:text-primary transition-smooth">
              Topluluk
            </a>
            <a href="#neden-takazade" className="text-foreground hover:text-primary transition-smooth">
              Neden Takazade?
            </a>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" className="hidden md:inline-flex">
              Giriş Yap
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-primary">
              Üye Ol
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
