import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTranslation } from "react-i18next";

const Cookies = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/20">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {t('cookies.title')}
            </h1>
            <p className="text-muted-foreground text-lg">
              {t('cookies.lastUpdate')}
            </p>
          </div>

          <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-border/50 shadow-lg space-y-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-foreground/90 leading-relaxed mb-8">
                {t('cookies.intro')}
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">
                  {t('cookies.section1Title')}
                </h2>
                <p className="text-foreground/80 leading-relaxed mb-3">
                  {t('cookies.section1Point1')}
                </p>
                <p className="text-foreground/80 leading-relaxed">
                  {t('cookies.section1Point2')}
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">
                  {t('cookies.section2Title')}
                </h2>
                <p className="text-foreground/80 leading-relaxed mb-4">
                  {t('cookies.section2Intro')}
                </p>
                <div className="space-y-4">
                  <div className="bg-secondary/20 rounded-lg p-4">
                    <h3 className="font-semibold text-foreground mb-2">{t('cookies.section2Type1Title')}</h3>
                    <p className="text-foreground/80 text-sm">{t('cookies.section2Type1Desc')}</p>
                  </div>
                  <div className="bg-secondary/20 rounded-lg p-4">
                    <h3 className="font-semibold text-foreground mb-2">{t('cookies.section2Type2Title')}</h3>
                    <p className="text-foreground/80 text-sm">{t('cookies.section2Type2Desc')}</p>
                  </div>
                  <div className="bg-secondary/20 rounded-lg p-4">
                    <h3 className="font-semibold text-foreground mb-2">{t('cookies.section2Type3Title')}</h3>
                    <p className="text-foreground/80 text-sm">{t('cookies.section2Type3Desc')}</p>
                  </div>
                  <div className="bg-secondary/20 rounded-lg p-4">
                    <h3 className="font-semibold text-foreground mb-2">{t('cookies.section2Type4Title')}</h3>
                    <p className="text-foreground/80 text-sm">{t('cookies.section2Type4Desc')}</p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">
                  {t('cookies.section3Title')}
                </h2>
                <ul className="list-disc list-inside space-y-2 text-foreground/80">
                  <li>{t('cookies.section3Point1')}</li>
                  <li>{t('cookies.section3Point2')}</li>
                  <li>{t('cookies.section3Point3')}</li>
                  <li>{t('cookies.section3Point4')}</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">
                  {t('cookies.section4Title')}
                </h2>
                <p className="text-foreground/80 leading-relaxed mb-4">
                  {t('cookies.section4Point1')}
                </p>
                <p className="text-foreground/80 leading-relaxed mb-4">
                  {t('cookies.section4Point2')}
                </p>
                <div className="bg-secondary/30 rounded-lg p-6 space-y-3">
                  <p className="text-foreground/90 font-medium">{t('cookies.section4BrowserTitle')}</p>
                  <ul className="list-disc list-inside space-y-2 text-foreground/80 text-sm">
                    <li>{t('cookies.section4Chrome')}</li>
                    <li>{t('cookies.section4Safari')}</li>
                    <li>{t('cookies.section4Firefox')}</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">
                  {t('cookies.section5Title')}
                </h2>
                <p className="text-foreground/80 leading-relaxed">
                  {t('cookies.section5Content')}
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">
                  {t('cookies.section6Title')}
                </h2>
                <p className="text-foreground/80 leading-relaxed">
                  {t('cookies.section6Content')}
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">
                  {t('cookies.section7Title')}
                </h2>
                <div className="bg-secondary/30 rounded-lg p-6 space-y-2">
                  <p className="text-foreground/90">
                    {t('cookies.section7Intro')}
                  </p>
                  <p className="text-foreground/90">
                    📩 {t('cookies.email')}
                  </p>
                  <p className="text-foreground/90">
                    📍 {t('cookies.address')}
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

export default Cookies;
