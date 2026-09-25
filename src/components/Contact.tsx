import { ArrowUpRight } from "lucide-react";

const contactLinks = [
  {
    label: "Email",
    value: "hello@studio.com",
    href: "mailto:hello@studio.com",
  },
  {
    label: "Instagram",
    value: "@studio",
    href: "#",
  },
  {
    label: "Facebook",
    value: "Studio Photography",
    href: "#",
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="bg-[#F9F8F6] px-5 py-14 text-[#1A1A1A] sm:px-6 sm:py-16 md:px-10 md:py-20"
    >
      <div className="mx-auto max-w-[1500px]">
        {/* Heading */}
        <div className="border-t border-[#1A1A1A]/15 pt-4 sm:pt-5">
          <h2 className="max-w-6xl font-['Space_Grotesk'] text-[clamp(2.9rem,10vw,4.8rem)] font-medium leading-[0.86] tracking-[-0.08em] sm:text-[clamp(3.5rem,8vw,6.5rem)] md:text-[clamp(4.5rem,8vw,8.5rem)]">
            Let’s make
            <br />
            something worth
            <br />
            remembering.
          </h2>
        </div>

        {/* Contact links */}
        <div className="mt-10 border-t border-[#1A1A1A]/15 sm:mt-12 md:mt-14">
          {contactLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("#") ? undefined : "_blank"}
              rel={link.href.startsWith("#") ? undefined : "noreferrer"}
              className="group flex min-h-14 items-center justify-between gap-4 border-b border-[#1A1A1A]/15 px-1 py-4 transition-colors duration-150 hover:bg-[#1A1A1A]/[0.02] active:scale-[0.995] sm:min-h-16 sm:gap-6 sm:py-5 md:py-6"
            >
              <div className="flex min-w-0 flex-1 items-baseline gap-4 sm:gap-8 md:gap-12">
                <span className="w-24 shrink-0 font-mono text-[9px] uppercase tracking-[0.16em] text-[#1A1A1A]/40 sm:w-32 sm:text-[10px]">
                  {link.label}
                </span>

                <span className="min-w-0 font-['Space_Grotesk'] text-base font-medium leading-tight tracking-[-0.03em] transition-opacity duration-150 group-hover:opacity-60 sm:text-lg md:text-2xl">
                  {link.value}
                </span>
              </div>

              <ArrowUpRight
                size={19}
                strokeWidth={1.4}
                className="shrink-0 transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-wider text-[#1A1A1A]/40 sm:text-xs">
          <span>LUMA / PHOTO</span>
          <span>Philippines · 2026</span>
        </div>
      </div>
    </section>
  );
}