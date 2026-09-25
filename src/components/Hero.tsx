import { useState, useEffect } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Story", href: "#featured" },
  { label: "Contact", href: "#contact" },
];

const photos = [
  {
    src: "https://images.pexels.com/photos/6445627/pexels-photo-6445627.jpeg",
    alt: "Portrait photography",
    className:
      "left-[1%] top-[20%] h-[105px] w-[80px] rotate-[-5deg] sm:left-[3%] sm:top-[18%] sm:h-[140px] sm:w-[106px] md:left-[7%] md:top-[19%] md:h-[250px] md:w-[190px]",
    sizes: "(max-width: 639px) 80px, (max-width: 767px) 106px, 190px",
    speed: -40, // Parallax intensity
  },
  {
    src: "https://images.pexels.com/photos/2297361/pexels-photo-2297361.jpeg",
    alt: "Editorial portrait",
    className:
      "right-[1%] top-[15%] h-[95px] w-[72px] rotate-[4deg] sm:right-[4%] sm:top-[11%] sm:h-[120px] sm:w-[92px] md:right-[8%] md:top-[13%] md:h-[225px] md:w-[172px]",
    sizes: "(max-width: 639px) 72px, (max-width: 767px) 92px, 172px",
    speed: -60,
  },
  {
    src: "https://images.pexels.com/photos/5672821/pexels-photo-5672821.jpeg",
    alt: "Fashion portrait",
    className:
      "left-[8%] bottom-[15%] h-[95px] w-[72px] rotate-[3deg] sm:left-[17%] sm:bottom-[12%] sm:h-[115px] sm:w-[88px] md:left-[20%] md:bottom-[10%] md:h-[215px] md:w-[163px]",
    sizes: "(max-width: 639px) 72px, (max-width: 767px) 88px, 163px",
    speed: 30,
  },
  {
    src: "https://images.pexels.com/photos/6775368/pexels-photo-6775368.jpeg",
    alt: "Portrait in natural light",
    className:
      "right-[8%] bottom-[15%] h-[110px] w-[83px] rotate-[-4deg] sm:right-[17%] sm:bottom-[13%] sm:h-[135px] sm:w-[102px] md:right-[20%] md:bottom-[10%] md:h-[240px] md:w-[182px]",
    sizes: "(max-width: 639px) 83px, (max-width: 767px) 102px, 182px",
    speed: 50,
  },
  {
    src: "https://images.pexels.com/photos/4614170/pexels-photo-4614170.jpeg",
    alt: "Fashion editorial",
    className:
      "left-[1%] bottom-[5%] h-[72px] w-[55px] rotate-[7deg] sm:left-[2%] sm:bottom-[4%] sm:h-[85px] sm:w-[65px] md:left-[6%] md:bottom-[4%] md:h-[150px] md:w-[115px]",
    sizes: "(max-width: 639px) 55px, (max-width: 767px) 65px, 115px",
    speed: 20,
  },
  {
    src: "https://images.pexels.com/photos/3019112/pexels-photo-3019112.jpeg",
    alt: "Editorial fashion",
    className:
      "right-[1%] bottom-[5%] h-[76px] w-[58px] rotate-[-6deg] sm:right-[2%] sm:bottom-[4%] sm:h-[90px] sm:w-[69px] md:right-[6%] md:bottom-[4%] md:h-[155px] md:w-[120px]",
    sizes: "(max-width: 639px) 58px, (max-width: 767px) 69px, 120px",
    speed: 40,
  },
];

function getPexelsUrl(src: string, width: number, quality = 80) {
  return `${src}?auto=compress&cs=tinysrgb&w=${width}&q=${quality}`;
}

function OptimizedImage({
  src,
  alt,
  sizes,
  priority = false,
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <img
      src={getPexelsUrl(src, 800)}
      srcSet={`
        ${getPexelsUrl(src, 320, 75)} 320w,
        ${getPexelsUrl(src, 480, 78)} 480w,
        ${getPexelsUrl(src, 800, 80)} 800w
      `}
      sizes={sizes}
      alt={alt}
      className="h-full w-full object-cover grayscale-[10%]"
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
    />
  );
}

// Custom Easing Curves
const customEase = [0.16, 1, 0.3, 1] as const;

// Animation Variants
const photoContainerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const photoItemVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 20,
  },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: customEase,
    },
  },
};

const mobileMenuVariants: Variants = {
  hidden: {
    opacity: 0,
    y: "-100%",
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: customEase,
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: "-100%",
    transition: {
      duration: 0.3,
      ease: [0.7, 0, 0.84, 0],
    },
  },
};

const mobileNavItemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: customEase } },
};

export default function Hero() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#F9F8F6] text-[#1A1A1A]">
      {/* Photography Background Layer with Stagger Entrance */}
      <motion.div
        variants={photoContainerVariants}
        initial="hidden"
        animate="show"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
      >
        {photos.map((photo, index) => {
          // Individual parallax layer displacement
          const yTransform = useTransform(scrollY, [0, 1000], [0, photo.speed]);

          return (
            <motion.div
              key={photo.src}
              variants={photoItemVariants}
              style={{ y: yTransform }}
              whileHover={{
                scale: 1.06,
                rotate: 0,
                zIndex: 20,
                transition: { type: "spring", stiffness: 300, damping: 20 },
              }}
              className={`pointer-events-auto absolute overflow-hidden shadow-sm transition-shadow hover:shadow-xl ${photo.className}`}
            >
              <OptimizedImage
                src={photo.src}
                alt={photo.alt}
                sizes={photo.sizes}
                priority={index < 2}
              />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Readability Overlay Layer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[#F9F8F6]/[0.12]"
      />

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: customEase, delay: 0.1 }}
        className="relative z-30 px-5 py-5 sm:px-6 sm:py-6 md:px-10 md:py-8"
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            className="shrink-0 font-['Space_Grotesk'] text-[16px] font-medium tracking-[-0.05em] sm:text-lg"
          >
            LUMA / PHOTO
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-[13px] font-medium text-[#1A1A1A]/60 transition-colors duration-200 hover:text-[#1A1A1A]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <motion.a
            whileHover={{ x: 2, y: -2 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            href="#contact"
            className="group hidden shrink-0 items-center gap-2 text-sm font-medium lg:inline-flex"
          >
            <span className="border-b border-[#1A1A1A] pb-1">
              Work with us
            </span>
            <ArrowUpRight
              size={16}
              strokeWidth={1.5}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </motion.a>

          {/* Mobile Menu Trigger Button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="flex items-center gap-2 text-[12px] font-medium uppercase tracking-wider text-[#1A1A1A] md:hidden"
          >
            <span>{isMenuOpen ? "Close" : "Menu"}</span>
            {isMenuOpen ? (
              <X size={16} strokeWidth={1.5} />
            ) : (
              <Menu size={16} strokeWidth={1.5} />
            )}
          </button>
        </div>

        {/* Mobile Navigation Panel */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="
                fixed
                inset-0
                z-50
                flex
                flex-col
                bg-[#F9F8F6]
                px-5
                pb-6
                pt-5
                sm:px-6
                sm:pt-6
                md:hidden
              "
            >
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between">
                <a
                  href="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="
                    font-['Space_Grotesk']
                    text-[16px]
                    font-medium
                    tracking-[-0.05em]
                  "
                >
                  LUMA / PHOTO
                </a>

                <button
                  type="button"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Close menu"
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    border
                    border-[#1A1A1A]/15
                    transition-colors
                    hover:bg-[#1A1A1A]
                    hover:text-[#F9F8F6]
                  "
                >
                  <X size={18} strokeWidth={1.5} />
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex flex-col pt-10">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.href}
                    variants={mobileNavItemVariants}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="
                      flex
                      min-h-16
                      items-center
                      justify-between
                      border-b
                      border-[#1A1A1A]/10
                      py-4
                      font-['Space_Grotesk']
                      text-2xl
                      font-medium
                      tracking-[-0.04em]
                      text-[#1A1A1A]
                    "
                  >
                    <span>{link.label}</span>

             
                  </motion.a>
                ))}
              </nav>

              {/* Bottom CTA */}
              <motion.div
                variants={mobileNavItemVariants}
                className="mt-auto pt-8"
              >
                <a
                  href="#contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="
                    group
                    flex
                    min-h-11
                    w-full
                    items-center
                    justify-between
                    border-b
                    border-[#1A1A1A]
                    pb-2
                    text-base
                    font-medium
                  "
                >
                  <span>Work with us</span>

                  <ArrowUpRight
                    size={18}
                    strokeWidth={1.5}
                    className="
                      transition-transform
                      duration-300
                      group-hover:-translate-y-1
                      group-hover:translate-x-1
                    "
                  />
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Hero Content */}
      <div className="relative z-10 flex min-h-[calc(100svh-72px)] items-center justify-center px-5 pb-20 pt-4 sm:min-h-[calc(100svh-88px)] sm:px-6 md:min-h-[calc(100vh-88px)] md:px-10">
        <div className="w-full max-w-[1100px] text-center">
          {/* Main Title Reveal */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, ease: customEase, delay: 0.15 }}
              className="
                mx-auto
                max-w-[350px]
                font-['Space_Grotesk']
                text-[clamp(3.35rem,15vw,5.25rem)]
                font-medium
                leading-[0.84]
                tracking-[-0.08em]
                sm:max-w-[520px]
                sm:text-[clamp(4.2rem,12vw,7rem)]
                md:max-w-[1100px]
                md:text-[clamp(5.5rem,10.5vw,9.5rem)]
              "
            >
              Photographs
              <br />
              with a point
              <br />
              of view.
            </motion.h1>
          </div>

          {/* Subtitle & CTA Stagger Reveal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: customEase, delay: 0.45 }}
            className="mt-7 flex flex-col items-center sm:mt-8 md:mt-10"
          >
            <p className="text-[13px] tracking-[-0.01em] text-[#1A1A1A]/65 sm:text-sm md:text-base">
              Editorial · Commercial · Portraits
            </p>

            <motion.a
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              href="#contact"
              className="group mt-5 inline-flex min-h-10 items-center gap-3 border-b border-[#1A1A1A] pb-2 text-sm font-medium sm:mt-6"
            >
              <span>Work with us</span>
              <ArrowUpRight
                size={17}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Footer Cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="absolute bottom-5 left-5 right-5 z-20 flex justify-end text-[10px] text-[#1A1A1A]/50 sm:bottom-6 sm:left-6 sm:right-6 sm:text-[11px] md:bottom-8 md:left-10 md:right-10"
      >
        <span>Scroll ↓</span>
      </motion.div>
    </section>
  );
}