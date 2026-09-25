import { ArrowUpRight, ArrowUp } from "lucide-react";

const links = [
  { label: "Instagram", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "Email", href: "mailto:hello@studio.com" },
];

export default function Footer() {
  return (
    <footer
      className="
        bg-[#1A1A1A]
        px-5
        py-7
        text-[#F9F8F6]
        sm:px-6
        sm:py-8
        md:px-10
        md:py-10
      "
    >
      <div className="mx-auto max-w-[1500px]">
        <div className="border-t border-[#F9F8F6]/20 pt-5 sm:pt-6">
          <div
            className="
              flex
              flex-col
              gap-7
              md:flex-row
              md:items-end
              md:justify-between
              md:gap-10
            "
          >
            {/* Identity */}
            <div>
              <p
                className="
                  font-['Space_Grotesk']
                  text-2xl
                  font-medium
                  leading-none
                  tracking-[-0.05em]
                "
              >
                LUMA / PHOTO
              </p>

              <p className="mt-2 text-[11px] text-[#F9F8F6]/40 sm:text-xs">
                Photography studio · Philippines
              </p>
            </div>

            {/* Links */}
            <nav className="flex flex-wrap gap-x-5 gap-y-3 sm:gap-6">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={
                    link.href.startsWith("#") ||
                    link.href.startsWith("mailto:")
                      ? undefined
                      : "_blank"
                  }
                  rel={
                    link.href.startsWith("#") ||
                    link.href.startsWith("mailto:")
                      ? undefined
                      : "noreferrer"
                  }
                  className="
                    group
                    inline-flex
                    min-h-9
                    items-center
                    gap-1.5
                    text-sm
                    text-[#F9F8F6]/65
                    transition-opacity
                    hover:opacity-50
                  "
                >
                  {link.label}

                  <ArrowUpRight
                    size={14}
                    strokeWidth={1.5}
                    className="
                      transition-transform
                      duration-300
                      group-hover:-translate-y-0.5
                      group-hover:translate-x-0.5
                    "
                  />
                </a>
              ))}
            </nav>

            {/* Copyright + top */}
            <div
              className="
                flex
                items-center
                justify-between
                gap-6
                md:justify-end
              "
            >
              <span className="text-[10px] text-[#F9F8F6]/35 sm:text-xs">
                © 2026 LUMA / PHOTO
              </span>

              <a
                href="#"
                aria-label="Back to top"
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  border
                  border-[#F9F8F6]/20
                  transition-colors
                  duration-200
                  hover:border-[#F9F8F6]
                  hover:bg-[#F9F8F6]
                  hover:text-[#1A1A1A]
                  md:h-9
                  md:w-9
                "
              >
                <ArrowUp size={15} strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}