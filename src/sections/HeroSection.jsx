import { ArrowDownIcon } from "@phosphor-icons/react"
import LanguageToggle from "../components/LanguageToggle"
import AddToCalendar from "../components/AddToCalendar"

const ease = "cubic-bezier(0.25, 1, 0.5, 1)"

const CTA_SHADOW =
  "0px -1px 0px 1px rgba(0,0,0,0.01) inset, 0px 0px 0px 1px rgba(100,32,8,0.9) inset, 0px 0.5px 0px 1.5px rgba(255,255,255,0.22) inset, 0px 2px 6px 0px rgba(0,0,0,0.2)"

const CTA_GRADIENT =
  "linear-gradient(180deg, rgba(0,0,0,0) 63.53%, rgba(255,255,255,0.12))"

const RSVP_SCROLL_OFFSET = 120

function scrollToRSVP() {
  const el = document.getElementById("rsvp")
  if (!el) return
  const targetTop = el.getBoundingClientRect().top + window.scrollY + RSVP_SCROLL_OFFSET
  window.scrollTo({ top: targetTop, behavior: "smooth" })
}

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

        <button
          type="button"
          onClick={scrollToRSVP}
          style={{
            animation: `fadeInUp 560ms ${ease} 400ms both`,
            boxShadow: CTA_SHADOW,
            backgroundImage: CTA_GRADIENT,
          }}
          className="group mt-3 inline-flex items-center gap-2 rounded-full bg-sienna-600/95 px-6 py-3 font-sans text-lg font-medium text-white transition duration-200 ease-spring hover:bg-sienna-600 active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500"
        >
          {copy.heroConfirmCta}
          <ArrowDownIcon
            size={18}
            weight="bold"
            aria-hidden="true"
            className="transition-transform duration-200 ease-spring group-hover:translate-y-0.5"
          />
        </button>

        <div className="mt-4" style={{ animation: `fadeInUp 560ms ${ease} 500ms both` }}>
          <LanguageToggle locale={locale} onChange={onChangeLocale} />
        </div>
      </div>
    </section>
  )
}
