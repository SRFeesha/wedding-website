import LanguageToggle from "./LanguageToggle";

export default function OpeningEnvelope({ phase, onOpen, locale, onChangeLocale, previewTitle, motion }) {
  const opening = phase === "opening";
  const hidden = phase === "revealed";
  const easing = `cubic-bezier(${motion.easeX1}, ${motion.easeY1}, ${motion.easeX2}, ${motion.easeY2})`;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#eee5d7] px-3 transition-opacity duration-300 ${
        hidden ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      style={{
        transitionDuration: `${motion.overlayFadeMs}ms`,
        transitionTimingFunction: easing,
      }}
    >
      <div className="w-full">
        <div className="relative mx-auto h-[74vh] w-[168vw] max-w-none overflow-hidden sm:h-[82vh] sm:w-[150vw] lg:h-[88vh] lg:w-[128vw]">
          <div className="absolute inset-0 bg-[#e7ddcf]" />

          <div
            className={`absolute inset-x-[16%] top-[16%] rounded-[1.6rem] border border-[#dfd3c4] bg-[#f5ece0] shadow-[0_26px_70px_rgba(58,34,25,0.12)] transition-all duration-[620ms] ${
              opening ? "bottom-[48%] opacity-100" : "bottom-[12%] opacity-95"
            }`}
            style={{
              transitionDuration: `${motion.envelopeMoveMs}ms`,
              transitionTimingFunction: easing,
            }}
          >
            <div
              className={`absolute inset-x-0 top-0 h-[58%] origin-top border-b border-[#e4d8c8] bg-[#fbf5ec] [clip-path:polygon(0_0,100%_0,50%_100%)] transition-transform duration-[540ms] ${
                opening ? "open-flap" : ""
              }`}
              style={{
                transitionDuration: `${motion.flapMs}ms`,
                transitionTimingFunction: easing,
              }}
            />

            <div
              className={`absolute inset-x-[8%] bottom-[8%] top-[24%] rounded-[1.3rem] border border-[#eadfce] bg-[#fffdfa] transition-all duration-[620ms] ${
                opening ? "translate-y-10 opacity-0" : "translate-y-0 opacity-100"
              }`}
              style={{
                transitionDuration: `${motion.previewMs}ms`,
                transitionTimingFunction: easing,
              }}
            />

            <button
              type="button"
              disabled={opening || hidden}
              onClick={onOpen}
              className="absolute left-1/2 top-[49%] z-20 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center transition duration-200 motion-safe:hover:scale-[1.03] motion-safe:active:scale-[0.98] disabled:cursor-default sm:h-28 sm:w-28"
              aria-label="Open invitation seal"
            >
              <span className="wax-seal-ring">
                <span className="wax-seal-rim" />
                <span className="wax-seal-inner">
                  <svg viewBox="0 0 80 80" className="wax-seal-emblem wax-seal-emblem-shadow" aria-hidden="true">
                    <path
                      d="M19 57c5-12 10-22 17-29 6-7 13-12 25-16M36 59c-2-10-1-18 3-26 5-9 12-15 23-19"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      fill="none"
                      strokeLinecap="round"
                    />
                    <path d="M23 46c5 0 8-2 11-7-6 1-9 2-11 7Z" fill="currentColor" />
                    <path d="M34 38c5 0 8-2 11-7-6 1-9 2-11 7Z" fill="currentColor" />
                    <path d="M45 30c5 0 8-2 11-7-6 1-9 2-11 7Z" fill="currentColor" />
                    <path d="M31 55c5 0 8-2 11-7-6 1-9 2-11 7Z" fill="currentColor" />
                    <path d="M44 46c5 0 8-2 11-7-6 1-9 2-11 7Z" fill="currentColor" />
                  </svg>
                  <svg viewBox="0 0 80 80" className="wax-seal-emblem wax-seal-emblem-main" aria-hidden="true">
                    <path
                      d="M19 57c5-12 10-22 17-29 6-7 13-12 25-16M36 59c-2-10-1-18 3-26 5-9 12-15 23-19"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      fill="none"
                      strokeLinecap="round"
                    />
                    <path d="M23 46c5 0 8-2 11-7-6 1-9 2-11 7Z" fill="currentColor" />
                    <path d="M34 38c5 0 8-2 11-7-6 1-9 2-11 7Z" fill="currentColor" />
                    <path d="M45 30c5 0 8-2 11-7-6 1-9 2-11 7Z" fill="currentColor" />
                    <path d="M31 55c5 0 8-2 11-7-6 1-9 2-11 7Z" fill="currentColor" />
                    <path d="M44 46c5 0 8-2 11-7-6 1-9 2-11 7Z" fill="currentColor" />
                  </svg>
                </span>
                <span className="wax-seal-gloss" />
              </span>
            </button>
          </div>

          <div
            className={`pointer-events-none absolute inset-x-[15%] top-[18%] overflow-hidden rounded-[1.5rem] border border-[#dfd3c4] bg-[#efe3d2] transition-all duration-[620ms] ${
              opening ? "bottom-[10%] opacity-100" : "bottom-[44%] opacity-0"
            }`}
            style={{
              transitionDuration: `${motion.previewMs}ms`,
              transitionTimingFunction: easing,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/35 to-transparent" />
            <div className="relative p-6 sm:p-9">
              <div className="flex justify-end">
                <LanguageToggle locale={locale} onChange={onChangeLocale} />
              </div>
              <h2 className="mt-8 max-w-xl font-display text-5xl leading-[0.95] text-ink sm:text-6xl">
                {previewTitle}
              </h2>
            </div>
          </div>
        </div>

        <p className="mt-4 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/45 sm:text-xs">
          Click to break the seal
        </p>
        <div className="mt-2 flex justify-center">
          <LanguageToggle locale={locale} onChange={onChangeLocale} />
        </div>
      </div>
    </div>
  );
}
