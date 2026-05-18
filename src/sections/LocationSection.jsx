import { useEffect, useRef } from "react"
import { useInView } from "../hooks/useInView"

const ease = "cubic-bezier(0.25, 1, 0.5, 1)"

export default function LocationSection({ copy }) {
  const photo = { url: "/tenuta-savoca-v2.png", alt: "Tenuta Savoca" }
  const [ref, inView] = useInView()
  const sectionRef = useRef(null)
  const imgRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const section = sectionRef.current
    const img = imgRef.current
    if (!section || !img) return

    const onScroll = () => {
      const rect = section.getBoundingClientRect()
      // 0 when section bottom enters viewport, 1 when section top exits viewport top
      const totalTravel = window.innerHeight + rect.height
      const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / totalTravel))
      img.style.transform = `scale(${1 + progress * 0.30})`
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <section
      id="location"
      ref={sectionRef}
      className="relative h-[100vh] -mt-8 bg-linen-50"
    >
      {/* Image — absolute background, scrolls normally with the section */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_150%_400px_at_50%_0%,transparent_35%,black_95%)] [-webkit-mask-image:radial-gradient(ellipse_150%_400px_at_50%_0%,transparent_35%,black_95%)]">
          <div
            ref={imgRef}
            className="absolute inset-0 bg-center bg-no-repeat [background-size:cover]"
            style={{
              backgroundImage: `url('${photo.url}')`,
              transformOrigin: "center center",
              willChange: "transform",
            }}
            role="img"
            aria-label={photo.alt}
          />
        </div>

        <div
          className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
          style={{ background: "linear-gradient(to top, #E8DFD0 0%, transparent 100%)" }}
        />
      </div>

      {/* Text — sticky within this section only. Scrolls normally until it
          would leave the viewport, then pins. Releases when FaqSection begins. */}
      <div
        ref={ref}
        className="relative z-10 sticky top-4 flex flex-col items-center pt-4 text-center sm:top-6 sm:pt-6"
        style={inView ? { animation: `fadeInUp 560ms ${ease} both` } : { opacity: 0 }}
      >
        {/* Two-layer approach: mask only the background, never the text.
            The outer div's padding is the fade zone — the blob dissolves into it. */}
        <div className="relative px-20 py-10">
          {/* Background layer — masked, never clips the text */}
          <div
            className="absolute inset-0"
            style={{
              background: "rgba(232,223,208,0.72)",
              maskImage: "radial-gradient(ellipse 65% 60% at 50% 50%, black 15%, transparent 70%)",
              WebkitMaskImage: "radial-gradient(ellipse 65% 60% at 50% 50%, black 15%, transparent 70%)",
            }}
          />
          {/* Text layer — sits above, multiply blends with image */}
          <div className="relative" style={{ mixBlendMode: "multiply" }}>
            <p className="font-sans text-base font-bold uppercase tracking-widest text-sienna-700/60">
              {copy.locationEyebrow}
            </p>
            <h2 className="font-display mt-1.5 text-4xl text-umber-500 sm:text-5xl [text-wrap:balance]">
              Tenuta Savoca
            </h2>
            <p className="mt-2 font-body text-2xl text-ink/80">
              {copy.locationSubtitle ?? "Piazza Armerina"}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
