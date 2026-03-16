import LanguageToggle from "../components/LanguageToggle"

const ease = "cubic-bezier(0.25, 1, 0.5, 1)"

export default function HeroSection({ copy, locale, onChangeLocale }) {
  return (
    <section
      id="hero"
      className="flex flex-col items-center bg-canvas-50 py-24 sm:py-32"
      aria-label="Hero"
    >
      <div className="flex flex-col items-center gap-5 px-5 text-center sm:px-10">
        <p
          className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-crimson-700/60"
          style={{ animation: `fadeInUp 560ms ${ease} 40ms both` }}
        >
          {copy.heroEyebrow}
        </p>
        <h1
          className="relative inline-flex w-72 items-start justify-center gap-6 sm:w-96 sm:gap-8"
          style={{ animation: `fadeInUp 560ms ${ease} 200ms both` }}
        >
          <span className="sr-only">Sara &amp; Ben</span>
          <span
            aria-hidden="true"
            className="flex-1 text-right font-dm text-5xl font-normal leading-none text-ink sm:text-6xl"
          >
            Sara
          </span>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-[55%] top-0 -translate-x-1/2 -rotate-[6deg] font-script text-8xl font-normal leading-none text-ink/30 sm:text-9xl"
          >
            &amp;
          </span>
          <span
            aria-hidden="true"
            className="flex-1 font-dm text-5xl font-normal leading-none text-ink sm:text-6xl"
          >
            Ben
          </span>
        </h1>

        <p
          className="font-condensed text-base font-medium text-ink/60 sm:text-lg"
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
