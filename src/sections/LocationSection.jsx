import { MapPinIcon, ArrowSquareOutIcon } from "@phosphor-icons/react"
import { useInView } from "../hooks/useInView"

const ease = "cubic-bezier(0.25, 1, 0.5, 1)"

export default function LocationSection({ copy }) {
  const photo = { url: "/tenuta-savoca.webp", alt: "Tenuta Savoca" }
  const [ref, inView] = useInView()

  return (
    <section
      id="location"
      className="relative z-10 -mt-8 rounded-t-[2.5rem] bg-canvas-50 px-5 py-16 sm:px-10 sm:py-24"
    >
      <div
        ref={ref}
        className="mx-auto flex max-w-4xl flex-col items-center gap-8 sm:flex-row sm:items-stretch sm:gap-12"
        style={inView ? { animation: `fadeInUp 560ms ${ease} both` } : { opacity: 0 }}
      >
        {/* Photo */}
        <div className="w-full flex-shrink-0 overflow-hidden rounded-2xl sm:w-[44%]">
          <img
            src={photo.url}
            alt="Tenuta Savoca"
            className="h-64 w-full object-cover transition-transform duration-500 ease-spring hover:scale-[1.03] sm:h-full"
          />
        </div>

        {/* Text */}
        <div className="flex flex-col justify-center">
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/45">
            Location
          </p>
          <h2 className="font-display mt-2 text-4xl text-ink sm:text-5xl">
            Tenuta Savoca
          </h2>

          {/* Location line with Maps chip */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="font-body text-lg text-ink/70">
              Vicino a Piazza Armerina
            </span>
            <a
              href={copy.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-full border border-ink/15 bg-white/70 px-2.5 py-1 text-xs font-sans font-medium text-ink/60 transition hover:border-ink/25 hover:text-ink/80"
            >
              <MapPinIcon size={12} weight="bold" aria-hidden="true" />
              Maps
              <span className="sr-only">(opens in new tab)</span>
              <ArrowSquareOutIcon size={11} weight="bold" aria-hidden="true" />
            </a>
          </div>

          <p className="font-body mt-4 text-lg leading-relaxed text-ink/70">
            {copy.locationDescription}
          </p>
        </div>
      </div>
    </section>
  )
}
