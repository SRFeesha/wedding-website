import { useInView } from "../hooks/useInView"

const ease = "cubic-bezier(0.25, 1, 0.5, 1)"

export default function LocationSection({ copy }) {
  const photo = { url: "/tenuta-savoca-v2.png", alt: "Tenuta Savoca" }
  const [ref, inView] = useInView()

  return (
    <section
      id="location"
      className="relative z-10 -mt-8 bg-linen-50"
    >
      <div className="relative h-[100vh] w-full">

        {/* Photo layer — radial-gradient mask creates the arch fade:
            ellipse centered at top-center, transparent in the dome, fades to black below.
            This hides the photo near the top-center (arch dips down) and reveals it at the edges first. */}
        <div
          className="absolute inset-0 bg-center bg-no-repeat [background-size:cover] [mask-image:radial-gradient(ellipse_150%_400px_at_50%_0%,transparent_35%,black_95%)] [-webkit-mask-image:radial-gradient(ellipse_150%_400px_at_50%_0%,transparent_35%,black_95%)]"
          style={{
            backgroundImage: `url('${photo.url}')`,
          }}
          role="img"
          aria-label={photo.alt}
        />

        {/* Bottom fade — linen-50 wins at the edge */}
        <div
          className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
          style={{
            background: "linear-gradient(to top, #E8DFD0 0%, transparent 100%)",
          }}
        />

        {/* Text overlay — sits right at the mask fade boundary */}
        <div
          ref={ref}
          className="absolute inset-x-0 top-0 flex flex-col items-center pt-4 text-center sm:pt-6"
          style={inView ? { animation: `fadeInUp 560ms ${ease} both` } : { opacity: 0 }}
        >
          <p
            className="font-sans text-base font-bold uppercase tracking-widest text-sienna-700/60"
          >
            {copy.locationEyebrow}
          </p>
          <h2
            className="font-display mt-1.5 text-4xl text-umber-500 sm:text-5xl [text-wrap:balance]"
          >
            Tenuta Savoca
          </h2>
          <p
            className="mt-2 font-body text-2xl text-ink/80"
          >
            {copy.locationSubtitle ?? "Piazza Armerina"}
          </p>
        </div>
      </div>
    </section>
  )
}
