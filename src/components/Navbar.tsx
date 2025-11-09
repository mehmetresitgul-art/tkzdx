import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/takazade-logo.png";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
const Navbar = () => {
  const { t } = useTranslation();
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
                {t('nav.home')}
              </Link>
              <Link to="/kesfet" className="text-foreground hover:text-primary transition-smooth">
                {t('nav.discover')}
              </Link>
              <Link to="/profil" className="text-foreground hover:text-primary transition-smooth">
                {t('nav.profile')}
              </Link>
              <Link to="/mesajlar" className="text-foreground hover:text-primary transition-smooth">
                {t('nav.messages')}
              </Link>
              <Link to="/iletisim" className="text-foreground hover:text-primary transition-smooth">
                {t('nav.contact')}
              </Link>
            </div> : <div className="hidden md:flex items-center gap-8">
              
              
              
              
            </div>}

          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="touch-manipulation">
                  <Menu className="h-7 w-7" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[350px]">
                <div className="flex flex-col h-full">
                  <div className="flex-1">
                    <nav className="flex flex-col gap-2 mt-8">
                      {user ? <>
                          <Link 
                            to="/" 
                            className="text-foreground hover:text-primary hover:bg-accent/50 transition-smooth py-3 px-4 text-base rounded-lg active:bg-accent touch-manipulation font-medium" 
                            onClick={() => setIsOpen(false)}
                          >
                            {t('nav.home')}
                          </Link>
                          <Link 
                            to="/kesfet" 
                            className="text-foreground hover:text-primary hover:bg-accent/50 transition-smooth py-3 px-4 text-base rounded-lg active:bg-accent touch-manipulation font-medium" 
                            onClick={() => setIsOpen(false)}
                          >
                            {t('nav.discover')}
                          </Link>
                          <Link 
                            to="/profil" 
                            className="text-foreground hover:text-primary hover:bg-accent/50 transition-smooth py-3 px-4 text-base rounded-lg active:bg-accent touch-manipulation font-medium" 
                            onClick={() => setIsOpen(false)}
                          >
                            {t('nav.profile')}
                          </Link>
                          <Link 
                            to="/mesajlar" 
                            className="text-foreground hover:text-primary hover:bg-accent/50 transition-smooth py-3 px-4 text-base rounded-lg active:bg-accent touch-manipulation font-medium" 
                            onClick={() => setIsOpen(false)}
                          >
                            {t('nav.messages')}
                          </Link>
                          <Link 
                            to="/iletisim" 
                            className="text-foreground hover:text-primary hover:bg-accent/50 transition-smooth py-3 px-4 text-base rounded-lg active:bg-accent touch-manipulation font-medium" 
                            onClick={() => setIsOpen(false)}
                          >
                            {t('nav.contact')}
                          </Link>
                        </> : null}
                    </nav>
                  </div>
                  <div className="border-t border-border pt-4 pb-2">
                    <div className="flex flex-col gap-3">
                      {user ? (
                        <Button 
                          size="lg" 
                          onClick={() => {
                            setIsOpen(false);
                            navigate("/profil");
                          }} 
                          className="bg-primary hover:bg-primary/90 w-full min-h-[48px] touch-manipulation active:scale-95 font-semibold"
                        >
                          {t('nav.myAccount')}
                        </Button>
                      ) : (
                        <>
                          <Button 
                            size="lg" 
                            variant="outline" 
                            onClick={() => {
                              setIsOpen(false);
                              navigate("/auth");
                            }} 
                            className="w-full min-h-[48px] touch-manipulation active:scale-95 font-semibold border-2"
                          >
                            {t('nav.login')}
                          </Button>
                          <Button 
                            size="lg" 
                            onClick={() => {
                              setIsOpen(false);
                              navigate("/auth");
                            }} 
                            className="bg-primary hover:bg-primary/90 w-full min-h-[48px] touch-manipulation active:scale-95 font-semibold"
                          >
                            {t('nav.signup')}
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            
            {user ? <Button onClick={() => navigate("/profil")} className="bg-primary hover:bg-primary/90 hidden md:inline-flex touch-manipulation active:scale-95">
                {t('nav.myAccount')}
              </Button> : <>
                <Button variant="ghost" onClick={() => navigate("/auth")} className="hidden md:inline-flex touch-manipulation active:scale-95">
                  {t('nav.login')}
                </Button>
                <Button onClick={() => navigate("/auth")} className="bg-primary hover:bg-primary/90 hidden md:inline-flex touch-manipulation active:scale-95">
                  {t('nav.signup')}
                </Button>
              </>}
          </div>
        </div>
      </div>
    </nav>;
};
export default Navbar;