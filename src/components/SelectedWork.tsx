import { useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

type Project = {
  number: string;
  category: string;
  title: string;
  location: string;
  description: string;
  main: string;
  secondary: string;
};

const projects: Project[] = [
  {
    number: "01",
    category: "Commercial",
    title: "Form & Function",
    location: "Davao, Philippines",
    description:
      "A visual campaign focused on material, form, and human detail.",
    main: "https://images.pexels.com/photos/672441/pexels-photo-672441.jpeg",
    secondary: "https://images.pexels.com/photos/1003979/pexels-photo-1003979.jpeg",
  },
  {
    number: "02",
    category: "Portraits",
    title: "Sunday People",
    location: "Manila, Philippines",
    description:
      "Natural portraits made around the everyday rhythms of the city.",
    main: "https://images.pexels.com/photos/6144883/pexels-photo-6144883.jpeg",
    secondary: "https://images.pexels.com/photos/12978310/pexels-photo-12978310.jpeg",
  },
  {
    number: "03",
    category: "Editorial",
    title: "Between Light",
    location: "Cebu, Philippines",
    description:
      "A quiet portrait series exploring movement, light, and the spaces between.",
    main: "https://images.pexels.com/photos/7675837/pexels-photo-7675837.jpeg",
    secondary: "https://images.pexels.com/photos/38337518/pexels-photo-38337518.jpeg",
  },
  {
    number: "04",
    category: "Campaign",
    title: "After Hours",
    location: "Manila, Philippines",
    description:
      "A series built around atmosphere, character, and the energy of the city after dark.",
    main: "https://images.pexels.com/photos/31718005/pexels-photo-31718005.jpeg",
    secondary: "https://images.pexels.com/photos/37720918/pexels-photo-37720918.jpeg",
  },
];

// Snappy cubic-bezier for high-responsiveness
const fastEase = [0.25, 1, 0.5, 1] as const;

const slideVariants: Variants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 8 : -8,
  }),
  center: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.22,
      ease: fastEase,
    },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction < 0 ? 8 : -8,
    transition: {
      duration: 0.15,
      ease: fastEase,
    },
  }),
};

function getPexelsUrl(src: string, width: number, quality = 80) {
  return `${src}?auto=compress&cs=tinysrgb&w=${width}&q=${quality}`;
}

type OptimizedImageProps = {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  quality?: number;
};

function OptimizedImage({
  src,
  alt,
  sizes,
  priority = false,
  className = "",
  quality = 80,
}: OptimizedImageProps) {
  return (
    <img
      src={getPexelsUrl(src, 1200, quality)}
      srcSet={`
        ${getPexelsUrl(src, 480, 75)} 480w,
        ${getPexelsUrl(src, 800, 78)} 800w,
        ${getPexelsUrl(src, 1200, quality)} 1200w,
        ${getPexelsUrl(src, 1600, quality)} 1600w
      `}
      sizes={sizes}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      className={className}
    />
  );
}

export default function SelectedWork() {
  const [[current, direction], setPage] = useState<[number, number]>([0, 0]);

  const project = projects[current];

  const paginate = (newDirection: number) => {
    setPage(([prevPage]) => {
      const nextPage = (prevPage + newDirection + projects.length) % projects.length;
      return [nextPage, newDirection];
    });
  };

  return (
    <section
      id="work"
      className="bg-[#F9F8F6] px-5 py-14 text-[#1A1A1A] sm:py-16 md:px-10 md:py-24"
    >
      <div className="mx-auto max-w-[1500px]">
        {/* Section heading */}
        <div className="mb-7 flex items-end justify-between sm:mb-8 md:mb-10">
          <h2 className="max-w-[900px] font-['Space_Grotesk'] text-[clamp(2.6rem,10vw,6.5rem)] font-medium leading-[0.88] tracking-[-0.075em] sm:text-[clamp(3.2rem,7vw,6.5rem)]">
            Work worth
            <br />
            <span className="font-serif font-normal italic">remembering.</span>
          </h2>

          <span className="hidden font-mono text-[10px] tracking-[0.15em] text-[#1A1A1A]/45 md:block">
            {project.number} / {String(projects.length).padStart(2, "0")}
          </span>
        </div>

        {/* Project display - popLayout allows instant switching on rapid button taps */}
        <div className="relative overflow-hidden">
          <AnimatePresence mode="popLayout" custom={direction} initial={false}>
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="grid gap-4 md:grid-cols-[minmax(0,1.75fr)_minmax(260px,0.65fr)] md:gap-7"
            >
              {/* Main image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#E8E5DE] sm:aspect-[1.45/1] md:aspect-[1.5/1]">
                <OptimizedImage
                  src={project.main}
                  alt={project.title}
                  priority
                  sizes="(max-width: 767px) 100vw, 65vw"
                  quality={82}
                  className="h-full w-full object-cover transition-transform duration-300 ease-out hover:scale-[1.015]"
                />
              </div>

              {/* Secondary image + project info */}
              <div className="flex flex-col">
                <div className="aspect-[4/5] overflow-hidden bg-[#E8E5DE] sm:aspect-[5/6] md:aspect-[4/5]">
                  <OptimizedImage
                    src={project.secondary}
                    alt=""
                    sizes="(max-width: 767px) 100vw, 30vw"
                    quality={78}
                    className="h-full w-full object-cover transition-transform duration-300 ease-out hover:scale-[1.015]"
                  />
                </div>

                <div className="mt-4 border-t border-[#1A1A1A]/15 pt-4 sm:mt-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="font-['Space_Grotesk'] text-[clamp(1.65rem,7vw,2.4rem)] font-medium leading-[0.95] tracking-[-0.06em]">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-[11px] text-[#1A1A1A]/50 sm:text-xs">
                        {project.location}
                      </p>
                    </div>

                    <button
                      type="button"
                      aria-label={`View ${project.title}`}
                      className="group flex h-11 w-11 shrink-0 items-center justify-center border border-[#1A1A1A]/20 transition-colors duration-150 hover:bg-[#1A1A1A] hover:text-[#F9F8F6]"
                    >
                      <ArrowUpRight
                        size={16}
                        strokeWidth={1.5}
                        className="transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </button>
                  </div>

                  <p className="mt-4 hidden max-w-[34rem] text-sm leading-relaxed text-[#1A1A1A]/55 md:block">
                    {project.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="mt-5 flex items-center justify-between border-t border-[#1A1A1A]/15 pt-4 sm:mt-6 md:mt-7">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => paginate(-1)}
              aria-label="Previous project"
              className="flex h-11 w-11 items-center justify-center border border-[#1A1A1A]/20 transition-colors duration-150 hover:bg-[#1A1A1A] hover:text-[#F9F8F6] active:scale-95 md:h-10 md:w-10"
            >
              <ArrowLeft size={15} strokeWidth={1.5} />
            </button>

            <button
              type="button"
              onClick={() => paginate(1)}
              aria-label="Next project"
              className="flex h-11 w-11 items-center justify-center border border-[#1A1A1A]/20 transition-colors duration-150 hover:bg-[#1A1A1A] hover:text-[#F9F8F6] active:scale-95 md:h-10 md:w-10"
            >
              <ArrowRight size={15} strokeWidth={1.5} />
            </button>
          </div>

          <span className="text-[10px] uppercase tracking-[0.12em] text-[#1A1A1A]/40 sm:text-[11px] md:hidden">
            {project.category}
          </span>

          {/* Progress bar */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px]">{project.number}</span>

            <div className="h-px w-12 bg-[#1A1A1A]/15 sm:w-16 md:w-28">
              <motion.div
                className="h-px bg-[#1A1A1A]"
                initial={false}
                animate={{
                  width: `${((current + 1) / projects.length) * 100}%`,
                }}
                transition={{ duration: 0.18, ease: fastEase }}
              />
            </div>

            <span className="font-mono text-[10px] text-[#1A1A1A]/35">
              {String(projects.length).padStart(2, "0")}
            </span>
          </div>

          <span className="hidden text-xs text-[#1A1A1A]/40 md:block">
            {project.category}
          </span>
        </div>
      </div>
    </section>
  );
}