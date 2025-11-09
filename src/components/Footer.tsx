import logo from "@/assets/takazade-logo.png";
import { Twitter, Instagram, Linkedin } from "lucide-react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  
  return <footer className="bg-card border-t border-border py-12 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <img src={logo} alt="Takazade" className="h-8 mb-4" />
            <p className="text-muted-foreground text-sm">{t('footer.tagline')}</p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-foreground">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/hakkimizda" className="text-muted-foreground hover:text-primary transition-smooth">{t('footer.about')}</a></li>
              <li><a href="/#nasil-calisir" className="text-muted-foreground hover:text-primary transition-smooth">{t('footer.howItWorks')}</a></li>
              
              <li><a href="/iletisim" className="text-muted-foreground hover:text-primary transition-smooth">{t('footer.contact')}</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-foreground">{t('footer.corporate')}</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-smooth">{t('footer.terms')}</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-smooth">{t('footer.privacy')}</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-smooth">{t('footer.cookies')}</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-foreground">{t('footer.socialMedia')}</h4>
            <div className="flex gap-4">
              <a href="https://x.com/takazade" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-smooth">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/takazadecom" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-smooth">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/company/takazade" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-smooth">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>;
};
export default Footer;