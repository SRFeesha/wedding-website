import { useEffect, useState } from "react"
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
        <RSVPForm copy={copy} />
      </main>
    </div>
  )
}
