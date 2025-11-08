import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Community from "@/components/Community";
import WhyTakazade from "@/components/WhyTakazade";
import Footer from "@/components/Footer";
const Index = () => {
  return <div className="min-h-screen">
      <Navbar />
      <Hero />
      <HowItWorks />
      
      <WhyTakazade />
      <Footer />
    </div>;
};
export default Index;