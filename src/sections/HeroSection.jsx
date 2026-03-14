import LanguageToggle from "../components/LanguageToggle"

export default function HeroSection({ copy, locale, onChangeLocale }) {
  const heroImage = copy.moodImages[3]

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col"
      aria-label="Hero"
    >
      <img
        src={heroImage.url}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/35 to-ink/70" />

      <div className="relative mt-auto px-5 pb-16 text-center sm:px-10 sm:pb-20">
        <div className="flex justify-center mb-6">
          <span className="font-sans rounded-full border border-white/30 bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
            {copy.dateLabel}
          </span>
        </div>
        <h1 className="font-display text-5xl font-bold leading-[0.94] text-white sm:text-7xl md:text-8xl">
          {/* Ampersand rendered in font-script (Alex Brush).
              Swap the <span> for an SVG when the final glyph is decided. */}
          {copy.siteTitle.split(" & ").map((part, i, arr) => (
            <span key={i}>
              {part}
              {i < arr.length - 1 && (
                <span className="font-script mx-1">&amp;</span>
              )}
            </span>
          ))}
        </h1>
        <div className="flex justify-center mt-6">
          <LanguageToggle locale={locale} onChange={onChangeLocale} />
        </div>
      </div>
    </section>
  )
}
