import CaseStudies from "@/components/CaseStudies";
import Comparison from "@/components/Comparison";
import DecisionCoach from "@/components/DecisionCoach";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ModelsLibrary from "@/components/ModelsLibrary";
import MyLibrary from "@/components/MyLibrary";
import Newsletter from "@/components/Newsletter";
import Resources from "@/components/Resources";
import StepGuides from "@/components/StepGuides";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0f1828] font-sans antialiased">
      <Header />
      <main>
        <Hero />
        <DecisionCoach />
        <ModelsLibrary />
        <StepGuides />
        <CaseStudies />
        <Comparison />
        <Resources />
        <Newsletter />
      </main>
      <Footer />
      <MyLibrary />
    </div>
  );
}
