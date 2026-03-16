import { useInView } from "../hooks/useInView"

const ease = "cubic-bezier(0.25, 1, 0.5, 1)"

export default function LocationSection({ copy }) {
  const photo = { url: "/tenuta-savoca-v2.png", alt: "Tenuta Savoca" }
  const [ref, inView] = useInView()

  return (
    <section
      id="location"
      className="relative z-10 -mt-8 bg-canvas-50"
    >
      <div className="relative h-[90vh] w-full">

        {/* Photo layer — radial-gradient mask creates the arch fade:
            ellipse centered at top-center, transparent in the dome, fades to black below.
            This hides the photo near the top-center (arch dips down) and reveals it at the edges first. */}
        <div
          className="absolute inset-0 [mask-image:radial-gradient(ellipse_150%_280px_at_50%_0%,transparent_50%,black_80%)] [-webkit-mask-image:radial-gradient(ellipse_150%_280px_at_50%_0%,transparent_50%,black_80%)]"
          style={{
            backgroundImage: `url('${photo.url}')`,
            backgroundSize: "cover",
            backgroundPosition: "top center",
            backgroundRepeat: "no-repeat",
          }}
          role="img"
          aria-label={photo.alt}
        />

        {/* Bottom-pool radial gradient for text legibility — larger on mobile */}
        <div
          className="absolute inset-0 pointer-events-none sm:hidden"
          style={{
            background:
              "radial-gradient(60% 70% at 50% 96.17%, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 100%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none hidden sm:block"
          style={{
            background:
              "radial-gradient(27.15% 47.92% at 50% 96.17%, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 100%)",
          }}
        />

        {/* Bottom fade — above radial so canvas-50 wins at the edge */}
        <div
          className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
          style={{
            background: "linear-gradient(to top, #E6D3B8 0%, transparent 100%)",
          }}
        />

        {/* Text overlay — bottom-centered */}
        <div
          ref={ref}
          className="absolute inset-x-0 bottom-0 flex flex-col items-center pb-16 text-center sm:pb-20"
          style={inView ? { animation: `fadeInUp 560ms ${ease} both` } : { opacity: 0 }}
        >
          <p
            className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-canvas-50/80"
            style={{ textShadow: "0px 2px 8px rgba(0,0,0,0.25)" }}
          >
            Location
          </p>
          <h2
            className="font-display mt-1.5 text-5xl text-canvas-50 sm:text-6xl [text-wrap:balance]"
            style={{ textShadow: "0px 2px 8px rgba(0,0,0,0.25)" }}
          >
            Tenuta Savoca
          </h2>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
            <span
              className="font-body text-2xl text-canvas-50/90"
              style={{ textShadow: "0px 2px 8px rgba(0,0,0,0.25)" }}
            >
              Piazza Armerina
            </span>
            <span
              className="font-body text-2xl text-canvas-50/60"
              aria-hidden="true"
              style={{ textShadow: "0px 2px 8px rgba(0,0,0,0.25)" }}
            >
              ·
            </span>
            <a
              href={copy.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-2xl text-canvas-50/90 underline underline-offset-4 transition hover:text-canvas-50"
              style={{ textShadow: "0px 2px 8px rgba(0,0,0,0.25)" }}
            >
              Google maps
              <span className="sr-only">(opens in new tab)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
