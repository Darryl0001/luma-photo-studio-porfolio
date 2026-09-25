import { ArrowUpRight } from "lucide-react";

const storyImages = [
  {
    src: "https://images.pexels.com/photos/1710909/pexels-photo-1710909.jpeg",
    alt: "Fashion editorial portrait",
  },
  {
    src: "https://images.pexels.com/photos/4094486/pexels-photo-4094486.jpeg",
    alt: "Editorial fashion detail",
  },
  {
    src: "https://images.pexels.com/photos/8194643/pexels-photo-8194643.jpeg",
    alt: "Portrait photography",
  },
  {
    src: "https://images.pexels.com/photos/6048961/pexels-photo-6048961.jpeg",
    alt: "Fashion editorial",
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
  className = "",
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <img
      src={getPexelsUrl(src, 1200, 80)}
      srcSet={`
        ${getPexelsUrl(src, 480, 75)} 480w,
        ${getPexelsUrl(src, 800, 78)} 800w,
        ${getPexelsUrl(src, 1200, 80)} 1200w,
        ${getPexelsUrl(src, 1600, 82)} 1600w
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

export default function FeaturedProject() {
  return (
    <section
      id="featured"
      className="overflow-hidden bg-[#1A1A1A] px-5 py-14 text-[#F9F8F6] sm:px-6 sm:py-16 md:px-10 md:py-20"
    >
      <div className="mx-auto max-w-[1500px]">
        {/* Project intro */}
        <div className="border-t border-[#F9F8F6]/20 pt-4">
          <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between md:gap-10">
            <h2 className="max-w-4xl font-['Space_Grotesk'] text-[clamp(2.9rem,10vw,4.5rem)] font-medium leading-[0.87] tracking-[-0.075em] sm:text-[clamp(3.5rem,8vw,5.75rem)] md:text-[clamp(4rem,6.5vw,7rem)]">
              In the quiet
              <br />
              between things.
            </h2>

            <p className="max-w-sm text-[15px] leading-7 text-[#F9F8F6]/60 sm:text-base md:pb-1 md:leading-6">
              A portrait series around the slower moments — before the camera is
              noticed, after the conversation, and in between.
            </p>
          </div>
        </div>

        {/* Main photograph */}
        <div className="mt-8 sm:mt-10 md:mt-10">
          <div className="aspect-[16/8] overflow-hidden bg-[#262626]">
            <OptimizedImage
              src={storyImages[0].src}
              alt={storyImages[0].alt}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 93vw"
              priority
              className="h-full w-full object-cover grayscale-[8%] transition-transform duration-300 ease-out hover:scale-[1.015]"
            />
          </div>
        </div>

        {/* Supporting images */}
        <div className="mt-4 grid gap-4 sm:mt-5 sm:gap-5 md:grid-cols-3">
          {storyImages.slice(1).map((image) => (
            <div
              key={image.src}
              className="aspect-[4/5] overflow-hidden bg-[#262626]"
            >
              <OptimizedImage
                src={image.src}
                alt={image.alt}
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 30vw"
                className="h-full w-full object-cover transition-transform duration-300 ease-out hover:scale-[1.015]"
              />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 flex flex-col gap-6 border-t border-[#F9F8F6]/20 pt-4 sm:mt-10 md:flex-row md:items-center md:justify-between">
          <p className="font-['Space_Grotesk'] text-lg font-medium leading-tight tracking-[-0.04em] sm:text-xl md:text-2xl">
            Have a story in mind?
          </p>

          <a
            href="#contact"
            className="group inline-flex min-h-11 w-fit items-center gap-3 border-b border-[#F9F8F6] pb-1 text-sm font-medium transition-opacity duration-150 hover:opacity-60 active:scale-[0.98]"
          >
            Start a project
            <ArrowUpRight
              size={16}
              strokeWidth={1.5}
              className="transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </div>
      </div>
    </section>
  );
}