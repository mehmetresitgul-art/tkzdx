import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const changeLanguage = () => {
    const newLang = currentLang === 'tr' ? 'en' : 'tr';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  return (
    <button
      onClick={changeLanguage}
      className="relative h-9 w-16 rounded-full bg-background/40 backdrop-blur-sm border border-border/50 hover:border-primary/30 hover:bg-background/60 transition-all duration-300 overflow-hidden touch-manipulation group shadow-sm hover:shadow-md"
      aria-label="Change language"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentLang}
          initial={{ rotateY: 90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          exit={{ rotateY: -90, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center gap-1 text-xs font-light"
        >
          <span className="text-base opacity-80 group-hover:opacity-100 transition-all">
            {currentLang === 'tr' ? '🇹🇷' : '🇬🇧'}
          </span>
          <span className="text-foreground/80 group-hover:text-foreground tracking-wide">
            {currentLang === 'tr' ? 'TR' : 'EN'}
          </span>
        </motion.div>
      </AnimatePresence>
    </button>
  );
};

export default LanguageSwitcher;
