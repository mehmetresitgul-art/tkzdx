import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTranslation } from "react-i18next";

const Privacy = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/20">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {t('privacy.title')}
            </h1>
            <p className="text-muted-foreground text-lg">
              {t('privacy.lastUpdate')}
            </p>
          </div>

          <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-border/50 shadow-lg space-y-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-foreground/90 leading-relaxed mb-8">
                {t('privacy.intro')}
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">
                  {t('privacy.section1Title')}
                </h2>
                <p className="text-foreground/80 leading-relaxed mb-3">
                  {t('privacy.section1Intro')}
                </p>
                <ul className="list-disc list-inside space-y-2 text-foreground/80">
                  <li>{t('privacy.section1Point1')}</li>
                  <li>{t('privacy.section1Point2')}</li>
                  <li>{t('privacy.section1Point3')}</li>
                  <li>{t('privacy.section1Point4')}</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">
                  {t('privacy.section2Title')}
                </h2>
                <p className="text-foreground/80 leading-relaxed mb-3">
                  {t('privacy.section2Intro')}
                </p>
                <ul className="list-disc list-inside space-y-2 text-foreground/80">
                  <li>{t('privacy.section2Point1')}</li>
                  <li>{t('privacy.section2Point2')}</li>
                  <li>{t('privacy.section2Point3')}</li>
                  <li>{t('privacy.section2Point4')}</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">
                  {t('privacy.section3Title')}
                </h2>
                <ul className="list-disc list-inside space-y-2 text-foreground/80">
                  <li>{t('privacy.section3Point1')}</li>
                  <li>{t('privacy.section3Point2')}</li>
                  <li>{t('privacy.section3Point3')}</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">
                  {t('privacy.section4Title')}
                </h2>
                <p className="text-foreground/80 leading-relaxed mb-3">
                  {t('privacy.section4Content')}
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">
                  {t('privacy.section5Title')}
                </h2>
                <p className="text-foreground/80 leading-relaxed">
                  {t('privacy.section5Content')}
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">
                  {t('privacy.section6Title')}
                </h2>
                <p className="text-foreground/80 leading-relaxed mb-3">
                  {t('privacy.section6Intro')}
                </p>
                <ul className="list-disc list-inside space-y-2 text-foreground/80 mb-3">
                  <li>{t('privacy.section6Point1')}</li>
                  <li>{t('privacy.section6Point2')}</li>
                  <li>{t('privacy.section6Point3')}</li>
                </ul>
                <div className="bg-secondary/30 rounded-lg p-6">
                  <p className="text-foreground/90">
                    {t('privacy.section6Contact')}
                  </p>
                  <p className="text-foreground/90 mt-2">
                    📩 {t('privacy.email')}
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">
                  {t('privacy.section7Title')}
                </h2>
                <p className="text-foreground/80 leading-relaxed mb-2">
                  {t('privacy.section7Point1')}
                </p>
                <p className="text-foreground/80 leading-relaxed">
                  {t('privacy.section7Point2')}
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">
                  {t('privacy.section8Title')}
                </h2>
                <div className="bg-secondary/30 rounded-lg p-6 space-y-2">
                  <p className="text-foreground/90">
                    {t('privacy.section8Intro')}
                  </p>
                  <p className="text-foreground/90">
                    📩 {t('privacy.email')}
                  </p>
                  <p className="text-foreground/90">
                    📍 {t('privacy.address')}
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;
