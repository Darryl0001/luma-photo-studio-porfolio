import { useState } from "react";
import { ArrowDownRight } from "lucide-react";

const services = [
  {
    title: "Portraits",
    description:
      "Personal portraits, professional headshots, creative portraits, and individual sessions.",
    image:
      "https://images.pexels.com/photos/5271469/pexels-photo-5271469.jpeg",
  },
  {
    title: "Editorial",
    description:
      "Concept-driven photography for magazines, publications, stories, and creative projects.",
    image:
      "https://images.pexels.com/photos/36475218/pexels-photo-36475218.jpeg",
  },
  {
    title: "Commercial",
    description:
      "Photography for brands, products, campaigns, businesses, and creative direction.",
    image:
      "https://images.pexels.com/photos/15897778/pexels-photo-15897778.jpeg",
  },
  {
    title: "Events",
    description:
      "Photo coverage for launches, celebrations, gatherings, and events worth documenting.",
    image:
      "https://images.pexels.com/photos/37706367/pexels-photo-37706367.jpeg",
  },
];

function getPexelsUrl(src: string, width: number, quality = 80) {
  return `${src}?auto=compress&cs=tinysrgb&w=${width}&q=${quality}`;
}

function OptimizedImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <img
      src={getPexelsUrl(src, 1000, 80)}
      srcSet={`
        ${getPexelsUrl(src, 480, 75)} 480w,
        ${getPexelsUrl(src, 700, 78)} 700w,
        ${getPexelsUrl(src, 1000, 80)} 1000w,
        ${getPexelsUrl(src, 1400, 80)} 1400w
      `}
      sizes="(max-width: 767px) 100vw, 55vw"
      alt={alt}
      loading="lazy"
      decoding="async"
      className={className}
    />
  );
}

export default function WhatWePhotograph() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleService = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section
      id="services"
      className="bg-[#F9F8F6] px-5 py-14 text-[#1A1A1A] sm:px-6 sm:py-16 md:px-10 md:py-20"
    >
      <div className="mx-auto max-w-[1500px]">
        {/* Heading */}
        <div className="border-t border-[#1A1A1A]/15 pt-4">
          <div className="grid gap-6 md:grid-cols-[0.65fr_1fr]">
            <div />
            <div>
              <p className="mb-4 font-['Space_Grotesk'] text-lg font-medium tracking-[-0.04em] sm:text-xl md:mb-5 md:text-2xl">
                Services
              </p>

              <h2 className="max-w-5xl font-['Space_Grotesk'] text-[clamp(2.55rem,9vw,6rem)] font-medium leading-[0.88] tracking-[-0.075em] sm:text-[clamp(3.2rem,7vw,6rem)]">
                Photography for people,
                <br />
                brands, and moments
                <br />
                that matter.
              </h2>
            </div>
          </div>
        </div>

        {/* Services Accordion */}
        <div className="mt-10 border-t border-[#1A1A1A]/15 sm:mt-12 md:mt-16">
          {services.map((service, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={service.title} className="border-b border-[#1A1A1A]/15">
                {/* Service trigger */}
                <button
                  type="button"
                  onClick={() => toggleService(index)}
                  aria-expanded={isOpen}
                  aria-controls={`service-${index}`}
                  className="group flex min-h-[76px] w-full items-center justify-between gap-4 py-4 text-left sm:min-h-[86px] sm:py-5 md:min-h-0 md:gap-6 md:py-6"
                >
                  <div className="flex min-w-0 items-baseline gap-3 sm:gap-5 md:gap-8">
                    <span className="shrink-0 font-mono text-[10px] text-[#1A1A1A]/35 sm:text-xs">
                      0{index + 1}
                    </span>

                    <h3 className="min-w-0 font-['Space_Grotesk'] text-[clamp(2.15rem,10vw,5.2rem)] font-medium leading-[0.9] tracking-[-0.07em] transition-opacity duration-150 group-hover:opacity-70 sm:text-[clamp(2.7rem,7vw,5.2rem)]">
                      {service.title}
                    </h3>
                  </div>

                  <span className="flex h-10 w-10 shrink-0 items-center justify-center sm:h-11 sm:w-11">
                    <ArrowDownRight
                      size={22}
                      strokeWidth={1.4}
                      className={`transition-transform duration-200 cubic-bezier(0.25,1,0.5,1) ${
                        isOpen ? "rotate-90" : "rotate-0 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                      }`}
                    />
                  </span>
                </button>

                {/* Expanded service layout with height & opacity motion */}
                <div
                  id={`service-${index}`}
                  className={`grid overflow-hidden transition-[grid-template-rows] duration-200 cubic-bezier(0.25,1,0.5,1) ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="min-h-0">
                    <div
                      className={`grid gap-5 pb-6 transition-all duration-200 cubic-bezier(0.25,1,0.5,1) md:grid-cols-[80px_0.8fr_1.2fr] md:gap-8 md:pb-8 ${
                        isOpen
                          ? "translate-y-0 opacity-100"
                          : "-translate-y-2 opacity-0"
                      }`}
                    >
                      {/* Desktop alignment column */}
                      <div className="hidden md:block" />

                      {/* Image container */}
                      <div className="order-1 aspect-[16/10] overflow-hidden bg-[#E8E5DE] md:order-2 md:aspect-auto">
                        <OptimizedImage
                          src={service.image}
                          alt={service.title}
                          className="h-full w-full object-cover transition-transform duration-300 ease-out hover:scale-[1.015]"
                        />
                      </div>

                      {/* Description */}
                      <div className="order-2 md:order-1">
                        <p className="max-w-sm text-[15px] leading-6 text-[#1A1A1A]/60 sm:text-base sm:leading-7 md:text-lg md:leading-8">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reduced motion safety */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          * {
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
            animation-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}