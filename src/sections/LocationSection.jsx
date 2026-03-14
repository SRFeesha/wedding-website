export default function LocationSection({ copy }) {
  const photo = { url: "/tenuta-savoca.webp", alt: "Tenuta Savoca" }

  return (
    <section
      id="location"
      className="relative z-10 -mt-8 rounded-t-[2.5rem] bg-canvas-50 px-5 py-16 sm:px-10 sm:py-24"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 sm:flex-row sm:items-stretch sm:gap-12">
        {/* Photo */}
        <div className="w-full flex-shrink-0 sm:w-[44%]">
          <img
            src={photo.url}
            alt="Tenuta Savoca"
            className="h-64 w-full rounded-2xl object-cover sm:h-full"
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
              {/* Map pin */}
              <svg width="11" height="14" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.5 0C2.462 0 0 2.462 0 5.5c0 3.85 5.5 8.5 5.5 8.5S11 9.35 11 5.5C11 2.462 8.538 0 5.5 0zm0 7.5a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" fill="currentColor"/>
              </svg>
              Maps
              {/* External link */}
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 1h3v3M9 1 4.5 5.5M4 2H1.5A.5.5 0 0 0 1 2.5v6a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 .5-.5V6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
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
