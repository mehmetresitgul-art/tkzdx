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
      className="relative h-10 w-20 rounded-full bg-accent/50 border border-border hover:bg-accent transition-smooth overflow-hidden touch-manipulation group"
      aria-label="Change language"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentLang}
          initial={{ rotateY: 90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          exit={{ rotateY: -90, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center gap-1.5 text-sm font-medium"
        >
          <span className="text-lg group-hover:scale-110 transition-transform">
            {currentLang === 'tr' ? '🇹🇷' : '🇬🇧'}
          </span>
          <span className="text-foreground">
            {currentLang === 'tr' ? 'TR' : 'EN'}
          </span>
        </motion.div>
      </AnimatePresence>
    </button>
  );
};

export default LanguageSwitcher;
