import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import RSVPForm from "./components/RSVPForm"
import SectionDivider from "./components/SectionDivider"
import FaqSection from "./sections/FaqSection"
import GiftsSection from "./sections/GiftsSection"
import HeroSection from "./sections/HeroSection"
import LocationSection from "./sections/LocationSection"
import { content } from "./content/content"

const BASE_URL = "https://sara-e-ben-wedding.vercel.app"

const META = {
  it: {
    title: "Sara & Ben — 27 Settembre 2026",
    description:
      "Informazioni pratiche per il matrimonio del 27 settembre 2026 a Tenuta Savoca.",
  },
  en: {
    title: "Sara & Ben — September 27, 2026",
    description:
      "Practical information for Sara & Ben's wedding on September 27, 2026, at Tenuta Savoca, Sicily.",
  },
}

export default function App({ locale }) {
  const navigate = useNavigate()
  const copy = content[locale]

  useEffect(() => {
    const { title, description } = META[locale]
    document.title = title
    document.documentElement.lang = locale
    document.querySelector('meta[name="description"]').setAttribute("content", description)
    document.querySelector('meta[property="og:title"]').setAttribute("content", title)
    document.querySelector('meta[property="og:description"]').setAttribute("content", description)
    document.querySelector('meta[property="og:url"]').setAttribute("content", `${BASE_URL}/${locale}`)
    document.querySelector('link[rel="canonical"]').setAttribute("href", `${BASE_URL}/${locale}`)
  }, [locale])

  return (
    <div className="font-body text-[20px] text-ink sm:text-[21px] lg:text-[22px]">
      <main>
        <HeroSection
          copy={copy}
          locale={locale}
          onChangeLocale={(id) => navigate(`/${id}`)}
        />
        <LocationSection copy={copy} />
        <FaqSection copy={copy} />
        <SectionDivider className="bg-canvas-100" />
        <GiftsSection copy={copy} />
        <RSVPForm copy={copy} />
        <hr className="border-t border-[#C9A87A]/30 bg-canvas-100" />
        <footer className="bg-canvas-100 pb-10 pt-4 text-center">
          <p className="font-sans text-xs font-medium tracking-wide text-ink/35">
            © 2026 Sara &amp; Ben · Tenuta Savoca, Piazza Armerina
          </p>
        </footer>
      </main>
    </div>
  )
}
