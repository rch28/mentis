import Header from "@/components/Header";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0f1828] font-sans antialiased">
      <Header />
      <main>
        <Hero />
      </main>
    </div>
  );
}
