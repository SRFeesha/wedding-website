import { useEffect, useState } from "react"
import { useControls, button } from "leva"
import RSVPForm from "./components/RSVPForm"
import SectionDivider from "./components/SectionDivider"
import FaqSection from "./sections/FaqSection"
import GiftsSection from "./sections/GiftsSection"
import HeroSection from "./sections/HeroSection"
import LocationSection from "./sections/LocationSection"
import { content, defaultLocale, locales } from "./content/content"

const STORAGE_KEY = "wedding-locale"

function getInitialLocale() {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved && locales.includes(saved)) return saved
  return defaultLocale
}

export default function App() {
  const [locale, setLocale] = useState(getInitialLocale)
  const copy = content[locale]
  const [previewKey, setPreviewKey] = useState(0)
  const [bodyDelay, setBodyDelay] = useState(1000)

  useControls("RSVP · Success state", {
    bodyDelay: {
      value: 1000,
      min: 0,
      max: 4000,
      step: 50,
      label: "Body fade delay (ms)",
      onChange: (v) => setBodyDelay(v),
    },
    "↺ Replay": button(() => setPreviewKey((k) => k + 1)),
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, locale)
    document.documentElement.lang = locale
  }, [locale])

  return (
    <div className="font-body text-[20px] text-ink sm:text-[21px] lg:text-[22px]">
      <main>
        <HeroSection copy={copy} locale={locale} onChangeLocale={setLocale} />
        <LocationSection copy={copy} />
        <SectionDivider />
        <FaqSection copy={copy} />
        <SectionDivider className="bg-canvas-100" />
        <GiftsSection copy={copy} />
        <RSVPForm copy={copy} bodyDelay={bodyDelay} />

        {/* DEV PREVIEW — success states */}
        {[true, false].map((attending) => (
          <section key={`${attending}-${previewKey}`} className="bg-canvas-50 px-5 py-20 sm:px-8 border-t border-dashed border-ink/20">
            <p className="mb-4 text-center font-sans text-xs uppercase tracking-widest text-ink/30">
              Preview: {attending ? "attending" : "not attending"}
              <button
                onClick={() => setPreviewKey((k) => k + 1)}
                className="ml-3 rounded-md bg-black/8 px-2 py-0.5 text-ink/40 transition hover:bg-black/12 hover:text-ink/60"
              >
                ↺ reset
              </button>
            </p>
            <div className="mx-auto max-w-[600px] text-center py-8">
              <div className="mx-auto mb-6 grid h-40 place-items-center" style={{ isolation: "isolate", transform: "translateZ(0)" }}>
                <video
                  autoPlay
                  muted
                  playsInline
                  loop={attending}
                  className="col-start-1 row-start-1 h-40 w-auto"
                  style={{
                    mixBlendMode: "multiply",
                    pointerEvents: "none",
                    transform: "translateZ(0)",
                    animation: `fadeOut 400ms ease-in ${bodyDelay - 400}ms both`,
                  }}
                >
                  <source
                    src={attending
                      ? "https://media1.giphy.com/media/OfkGZ5H2H3f8Y/giphy.mp4"
                      : "https://media0.giphy.com/media/fAd5mYnTljWXS/giphy.mp4"}
                    type="video/mp4"
                  />
                </video>
                <h2
                  className="col-start-1 row-start-1 font-display text-5xl font-semibold text-ink"
                  style={{ animation: `fadeInUp 560ms ease-out ${bodyDelay}ms both` }}
                >
                  {attending ? copy.rsvp.successAttending : copy.rsvp.successDecline}
                </h2>
              </div>
              <p
                className="mt-4 font-display text-ink/75"
                style={{ animation: `fadeInUp 560ms ease-out ${bodyDelay + 200}ms both` }}
              >
                {attending ? copy.rsvp.successAttendingBody : copy.rsvp.successDeclineBody}
              </p>
            </div>
          </section>
        ))}
        {/* END DEV PREVIEW */}
      </main>
    </div>
  )
}
