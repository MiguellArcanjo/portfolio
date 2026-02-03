import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Certificates from "@/components/Certificates";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden w-full">
      <Header />
      <Hero />
      <About />
      <Skills featuredOnly />
      <Projects />
      <Experience />
      <Certificates />
      <Contact />
      <Footer />
    </main>
  );
}
