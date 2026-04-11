import { useState, useCallback } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ParallaxBreak from "@/components/ParallaxBreak";
import CapabilitiesGrid from "@/components/CapabilitiesGrid";
import ImageReveal from "@/components/ImageReveal";
import ProcessTimeline from "@/components/ProcessTimeline";
import FoundersNote from "@/components/FoundersNote";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

import workspaceImage from "@/assets/showcase-workspace.jpg";

const Index = () => {
  const [loading, setLoading] = useState(true);

  const handleLoadingComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <div className="bg-white text-slate-900">
      {loading && <LoadingScreen onComplete={handleLoadingComplete} />}
      <SmoothScroll>
        <Navbar />
        <HeroSection />
        <ParallaxBreak />
        <CapabilitiesGrid />
        
        {/* Workspace/Setup Reveal Image Section - Image Number 2 Style */}
        <section className="bg-white py-16 sm:py-24 flex justify-center w-full px-4 sm:px-8 max-w-screen-2xl mx-auto">
          <ImageReveal
            src={workspaceImage}
            alt="Workspace Ultra-wide Monitor Setup"
            className="w-full aspect-video md:aspect-[21/9] lg:aspect-[2.4/1] shadow-[0_34px_90px_-30px_rgba(2,6,23,0.28)]"
          />
        </section>

        <ProcessTimeline />
        <FoundersNote />
        <CTASection />
        <Footer />
      </SmoothScroll>
    </div>
  );
};

export default Index;
