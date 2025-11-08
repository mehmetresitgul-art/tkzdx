import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/takazade-logo.png";

const Navbar = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Takazade" className="h-8" />
          </Link>
          
          {user ? (
            <div className="hidden md:flex items-center gap-8">
              <Link to="/kesfet" className="text-foreground hover:text-primary transition-smooth">
                Keşfet
              </Link>
              <Link to="/profil" className="text-foreground hover:text-primary transition-smooth">
                Profilim
              </Link>
              <Link to="/mesajlar" className="text-foreground hover:text-primary transition-smooth">
                Mesajlar
              </Link>
            </div>
          ) : (
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
          )}

          <div className="flex items-center gap-4">
            {user ? (
              <Button onClick={() => navigate("/profil")} className="bg-primary hover:bg-primary/90">
                Hesabım
              </Button>
            ) : (
              <>
                <Button variant="ghost" onClick={() => navigate("/auth")} className="hidden md:inline-flex">
                  Giriş Yap
                </Button>
                <Button onClick={() => navigate("/auth")} className="bg-primary hover:bg-primary/90">
                  Üye Ol
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
