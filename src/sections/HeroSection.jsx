import LanguageToggle from "../components/LanguageToggle"

const ease = "cubic-bezier(0.25, 1, 0.5, 1)"

export default function HeroSection({ copy, locale, onChangeLocale }) {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col items-center justify-center"
      aria-label="Hero"
    >
      <img
        src="/tenuta-savoca.webp"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/30 to-ink/65" />

      <div className="relative flex flex-col items-center gap-5 px-5 text-center sm:px-10">
        <h1
          className="relative inline-flex w-72 items-start justify-center gap-6 sm:w-96 sm:gap-8"
          style={{ animation: `fadeInUp 560ms ${ease} 200ms both` }}
        >
          <span className="sr-only">Sara &amp; Ben</span>
          <span
            aria-hidden="true"
            className="flex-1 text-right font-dm text-5xl font-normal leading-none text-white sm:text-6xl"
          >
            Sara
          </span>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-[55%] top-0 -translate-x-1/2 -rotate-[6deg] font-script text-8xl font-normal leading-none text-white/60 sm:text-9xl"
          >
            &amp;
          </span>
          <span
            aria-hidden="true"
            className="flex-1 font-dm text-5xl font-normal leading-none text-white sm:text-6xl"
          >
            Ben
          </span>
        </h1>

        <p
          className="font-condensed text-base font-medium text-white sm:text-lg"
          style={{ animation: `fadeInUp 560ms ${ease} 360ms both` }}
        >
          {copy.dateLabel}
        </p>

        <div style={{ animation: `fadeInUp 560ms ${ease} 520ms both` }}>
          <LanguageToggle locale={locale} onChange={onChangeLocale} />
        </div>
      </div>
    </section>
  )
}
