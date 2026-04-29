import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ModelsLibrary from "@/components/ModelsLibrary";
import StepGuides from "@/components/StepGuides";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0f1828] font-sans antialiased">
      <Header />
      <main>
        <Hero />
        <ModelsLibrary />
        <StepGuides />
      </main>
    </div>
  );
}
