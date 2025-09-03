import { GoogleGeminiEffectDemo } from "@/components/ui/google-gemini-effect-demo";
import { HeroParallaxDemo } from "@/components/ui/hero-parallax-demo";
import { ServicesSection } from "@/components/ui/services-section";

export default function Page() {
  return (
    <div className="relative">
      {/* Google Gemini Effect */}
      <GoogleGeminiEffectDemo />
      
      {/* Hero Parallax with Services */}
      <HeroParallaxDemo />
    </div>
  );
}
