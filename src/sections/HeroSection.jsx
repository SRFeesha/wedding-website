import LanguageToggle from "../components/LanguageToggle"
import AddToCalendar from "../components/AddToCalendar"

const ease = "cubic-bezier(0.25, 1, 0.5, 1)"

export default function HeroSection({ copy, locale, onChangeLocale }) {
  return (
    <section
      id="hero"
      className="flex flex-col items-center bg-linen-50 pb-24 pt-[15vh] sm:pb-32"
      aria-label="Hero"
    >
      <div className="flex flex-col items-center gap-5 px-5 text-center sm:px-10">
        <p
          className="font-sans text-base font-bold uppercase tracking-widest text-sienna-700/60"
          style={{ animation: `fadeInUp 560ms ${ease} 80ms both` }}
        >
          {copy.heroEyebrow}
        </p>
        <h1
          className="relative inline-flex w-80 items-start justify-center gap-6 sm:w-[28rem] sm:gap-8"
          style={{ animation: `fadeInUp 560ms ${ease} 200ms both` }}
        >
          <span className="sr-only">Sara &amp; Ben</span>
          <span
            aria-hidden="true"
            className="flex-1 text-right font-dm text-6xl font-normal leading-none text-ink sm:text-7xl"
          >
            Sara
          </span>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-[55%] -top-[6px] -translate-x-1/2 -rotate-[6deg] font-script text-8xl font-normal leading-none text-ink/30 sm:text-9xl"
          >
            &amp;
          </span>
          <span
            aria-hidden="true"
            className="flex-1 font-dm text-6xl font-normal leading-none text-ink sm:text-7xl"
          >
            Ben
          </span>
        </h1>

        <div
          className="flex items-center"
          style={{ animation: `fadeInUp 560ms ${ease} 320ms both` }}
        >
          <p className="font-condensed text-xl font-medium text-ink/80 sm:text-2xl">
            {copy.dateLabel}
          </p>
          <AddToCalendar copy={copy} />
        </div>

        <div className="mt-3" style={{ animation: `fadeInUp 560ms ${ease} 400ms both` }}>
          <LanguageToggle locale={locale} onChange={onChangeLocale} />
        </div>
      </div>
    </section>
  )
}
