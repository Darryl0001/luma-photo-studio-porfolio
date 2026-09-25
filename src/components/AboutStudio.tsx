export default function AboutStudio() {
  return (
    <section
      id="about"
      className="bg-[#F9F8F6] px-5 py-14 text-[#1A1A1A] sm:px-6 sm:py-16 md:px-10 md:py-20"
    >
      <div className="mx-auto max-w-[1500px]">
        {/* Statement */}
        <div className="border-t border-[#1A1A1A]/15 pt-4">
          <div className="grid md:grid-cols-[0.45fr_1.55fr]">
            <div />

            <div className="grid gap-8 md:grid-cols-[1.35fr_0.65fr] md:gap-16">
              <h2
                className="
                  max-w-4xl
                  font-['Space_Grotesk']
                  text-[clamp(2.8rem,10vw,4.5rem)]
                  font-medium
                  leading-[0.88]
                  tracking-[-0.07em]
                  sm:text-[clamp(3.5rem,8vw,5.5rem)]
                  md:text-[clamp(4rem,6vw,6.5rem)]
                "
              >
                We pay attention
                <br />
                to what makes
                <br />
                an image matter.
              </h2>

              <div className="flex max-w-sm flex-col justify-end md:pb-1">
                <p className="text-[15px] leading-7 text-[#1A1A1A]/70 sm:text-base md:text-lg md:leading-8">
                  An independent photography studio in the Philippines,
                  working with people, brands, and stories worth looking
                  closely at.
                </p>
              </div>
            </div>
          </div>
        </div>


        {/* Studio Signature */}
        <div className="mt-8 border-t border-[#1A1A1A]/15 pt-4 sm:mt-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-8">
            <p className="max-w-xl font-['Space_Grotesk'] text-lg font-medium leading-[1.15] tracking-[-0.04em] sm:text-xl md:text-2xl">
              Small team. Direct collaboration.
              <br className="hidden md:block" />
              The work comes first.
            </p>

            <a
              href="#contact"
              className="group inline-flex w-fit items-center gap-3 border-b border-[#1A1A1A] pb-1 text-sm font-medium transition-opacity duration-150 hover:opacity-60"
            >
              Work with us
              <span
                aria-hidden="true"
                className="transition-transform duration-150 group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}