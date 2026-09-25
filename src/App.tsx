import Hero from "./components/Hero";
import SelectedWork from "./components/SelectedWork";
import WhatWePhotograph from "./components/WhatWePhotograph";
import AboutStudio from "./components/AboutStudio";
import FeaturedProject from "./components/FeaturedProject";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <main className="bg-[#F9F8F6] text-[#1A1A1A]">
      <Hero />
      <SelectedWork />
      <WhatWePhotograph />
      <AboutStudio />
      <FeaturedProject />
      <Contact />
      <Footer />
    </main>
  );
}