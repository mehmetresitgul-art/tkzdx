import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/takazade-logo.png";
const Navbar = () => {
  const [user, setUser] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    supabase.auth.getSession().then(({
      data: {
        session
      }
    }) => {
      setUser(session?.user ?? null);
    });
    const {
      data: {
        subscription
      }
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);
  return <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Takazade" className="h-8" />
          </Link>
          
          {user ? <div className="hidden md:flex items-center gap-8">
              <Link to="/" className="text-foreground hover:text-primary transition-smooth">
                Ana Sayfa
              </Link>
              <Link to="/kesfet" className="text-foreground hover:text-primary transition-smooth">
                Keşfet
              </Link>
              <Link to="/profil" className="text-foreground hover:text-primary transition-smooth">
                Profilim
              </Link>
              <Link to="/mesajlar" className="text-foreground hover:text-primary transition-smooth">
                Mesajlar
              </Link>
              <Link to="/iletisim" className="text-foreground hover:text-primary transition-smooth">
                İletişim
              </Link>
            </div> : <div className="hidden md:flex items-center gap-8">
              
              
              
              
            </div>}

          <div className="flex items-center gap-4">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="touch-manipulation">
                  <Menu className="h-7 w-7" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <nav className="flex flex-col gap-1 mt-8">
                  {user ? <>
                      <Link to="/" className="text-foreground hover:text-primary hover:bg-accent/50 transition-smooth py-4 px-3 text-lg rounded-md active:bg-accent touch-manipulation" onClick={() => setIsOpen(false)}>
                        Ana Sayfa
                      </Link>
                      <Link to="/kesfet" className="text-foreground hover:text-primary hover:bg-accent/50 transition-smooth py-4 px-3 text-lg rounded-md active:bg-accent touch-manipulation" onClick={() => setIsOpen(false)}>
                        Keşfet
                      </Link>
                      <Link to="/profil" className="text-foreground hover:text-primary hover:bg-accent/50 transition-smooth py-4 px-3 text-lg rounded-md active:bg-accent touch-manipulation" onClick={() => setIsOpen(false)}>
                        Profilim
                      </Link>
                      <Link to="/mesajlar" className="text-foreground hover:text-primary hover:bg-accent/50 transition-smooth py-4 px-3 text-lg rounded-md active:bg-accent touch-manipulation" onClick={() => setIsOpen(false)}>
                        Mesajlar
                      </Link>
                      <Link to="/iletisim" className="text-foreground hover:text-primary hover:bg-accent/50 transition-smooth py-4 px-3 text-lg rounded-md active:bg-accent touch-manipulation" onClick={() => setIsOpen(false)}>
                        İletişim
                      </Link>
                    </> : <>
                      <a href="#nasil-calisir" className="text-foreground hover:text-primary hover:bg-accent/50 transition-smooth py-4 px-3 text-lg rounded-md active:bg-accent touch-manipulation" onClick={() => setIsOpen(false)}>
                        Nasıl Çalışır?
                      </a>
                      <a href="#topluluk" className="text-foreground hover:text-primary hover:bg-accent/50 transition-smooth py-4 px-3 text-lg rounded-md active:bg-accent touch-manipulation" onClick={() => setIsOpen(false)}>
                        Topluluk
                      </a>
                      <a href="#neden-takazade" className="text-foreground hover:text-primary hover:bg-accent/50 transition-smooth py-4 px-3 text-lg rounded-md active:bg-accent touch-manipulation" onClick={() => setIsOpen(false)}>
                        Neden Takazade?
                      </a>
                      <Link to="/iletisim" className="text-foreground hover:text-primary hover:bg-accent/50 transition-smooth py-4 px-3 text-lg rounded-md active:bg-accent touch-manipulation" onClick={() => setIsOpen(false)}>
                        İletişim
                      </Link>
                    </>}
                  <div className="flex flex-col gap-3 mt-6">
                    {user ? <Button size="lg" onClick={() => {
                    setIsOpen(false);
                    navigate("/profil");
                  }} className="bg-primary hover:bg-primary/90 w-full min-h-[52px]">
                        Hesabım
                      </Button> : <>
                        <Button size="lg" variant="ghost" onClick={() => {
                      setIsOpen(false);
                      navigate("/auth");
                    }} className="w-full min-h-[52px]">
                          Giriş Yap
                        </Button>
                        <Button size="lg" onClick={() => {
                      setIsOpen(false);
                      navigate("/auth");
                    }} className="bg-primary hover:bg-primary/90 w-full min-h-[52px]">
                          Üye Ol
                        </Button>
                      </>}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
            
            {user ? <Button onClick={() => navigate("/profil")} className="bg-primary hover:bg-primary/90 hidden md:inline-flex">
                Hesabım
              </Button> : <>
                <Button variant="ghost" onClick={() => navigate("/auth")} className="hidden md:inline-flex">
                  Giriş Yap
                </Button>
                <Button onClick={() => navigate("/auth")} className="bg-primary hover:bg-primary/90 hidden md:inline-flex">
                  Üye Ol
                </Button>
              </>}
          </div>
        </div>
      </div>
    </nav>;
};
export default Navbar;