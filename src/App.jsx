import { useEffect, useMemo, useRef, useState } from "react";
import LanguageToggle from "./components/LanguageToggle";
import OpeningEnvelope from "./components/OpeningEnvelope";
import TransitionTuner from "./components/TransitionTuner";
import { content, defaultLocale, locales } from "./content/content";

const STORAGE_KEY = "wedding-locale";

function getInitialLocale() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved && locales.includes(saved)) return saved;
  return defaultLocale;
}

function splitTimelineLine(line) {
  const match = line.match(/^(\d{1,2}:\d{2})\s+(.*)$/);
  if (!match) return { time: null, label: line };
  return { time: match[1], label: match[2] };
}

const DEFAULT_INTRO_TUNING = {
  openToRevealMs: 780,
  overlayFadeMs: 300,
  envelopeMoveMs: 620,
  flapMs: 540,
  previewMs: 620,
  siteRevealMs: 700,
  openingScale: 1.05,
  openingOpacity: 0.7,
  easeX1: 0.25,
  easeY1: 0.1,
  easeX2: 0.25,
  easeY2: 1,
};

export default function App() {
  const [locale, setLocale] = useState(getInitialLocale);
  const [introPhase, setIntroPhase] = useState("locked");
  const [introTuning, setIntroTuning] = useState(DEFAULT_INTRO_TUNING);
  const revealTimerRef = useRef(null);
  const copy = content[locale];
  const [imgA, , imgC, imgD] = copy.moodImages;
  const introEasing = useMemo(
    () => `cubic-bezier(${introTuning.easeX1}, ${introTuning.easeY1}, ${introTuning.easeX2}, ${introTuning.easeY2})`,
    [introTuning.easeX1, introTuning.easeY1, introTuning.easeX2, introTuning.easeY2],
  );

  useEffect(() => {
    // Ensure users always start from the top when entering from the opening screen.
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    if (introPhase === "revealed") {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [introPhase]);

  useEffect(
    () => () => {
      if (revealTimerRef.current) {
        window.clearTimeout(revealTimerRef.current);
      }
    },
    [],
  );

  function clearRevealTimer() {
    if (!revealTimerRef.current) return;
    window.clearTimeout(revealTimerRef.current);
    revealTimerRef.current = null;
  }

  function handleOpenInvitation() {
    if (introPhase !== "locked") return;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    clearRevealTimer();
    setIntroPhase("opening");
    revealTimerRef.current = window.setTimeout(() => {
      setIntroPhase("revealed");
      revealTimerRef.current = null;
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }, introTuning.openToRevealMs);
  }

  function handleResetEnvelope() {
    clearRevealTimer();
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    setIntroPhase("locked");
  }

  function handleTuningChange(key, value) {
    setIntroTuning((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  let siteStateStyle = { transform: "scale(1)", opacity: 1, filter: "blur(0)" };
  if (introPhase === "locked") {
    siteStateStyle = { transform: "scale(1.18)", opacity: 0, filter: "blur(4px)" };
  } else if (introPhase === "opening") {
    siteStateStyle = {
      transform: `scale(${introTuning.openingScale})`,
      opacity: introTuning.openingOpacity,
      filter: "blur(0.5px)",
    };
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-canvas-100 via-canvas-50 to-canvas-100 font-body text-[18px] text-ink sm:text-[19px] lg:text-[20px]">
      <OpeningEnvelope
        phase={introPhase}
        onOpen={handleOpenInvitation}
        locale={locale}
        onChangeLocale={setLocale}
        previewTitle={copy.siteTitle}
        motion={introTuning}
      />

      <TransitionTuner tuning={introTuning} onChange={handleTuningChange} onResetEnvelope={handleResetEnvelope} />

      <div
        className="transition-all"
        style={{
          transitionDuration: `${introTuning.siteRevealMs}ms`,
          transitionTimingFunction: introEasing,
          ...siteStateStyle,
        }}
      >
        <main className="mx-auto max-w-5xl px-4 pb-28 pt-10 sm:px-8 sm:pt-12">
          <header className="relative min-h-[62vh] py-14 sm:min-h-[70vh] sm:py-20">
            <div className="pointer-events-none absolute inset-x-0 top-16 mx-auto hidden h-[68%] max-w-4xl overflow-hidden rounded-[2rem] sm:block">
              <img src={imgD.url} alt="" className="hero-photo-fade h-full w-full object-cover opacity-22" />
              <div className="absolute inset-0 bg-gradient-to-b from-canvas-50/95 via-canvas-50/75 to-canvas-50/95" />
            </div>

            <div className="relative flex justify-end">
              <LanguageToggle locale={locale} onChange={setLocale} />
            </div>

            <div className="relative mt-16 sm:mt-24">
              <h1 className="max-w-3xl font-display text-6xl leading-[0.94] text-ink sm:text-7xl md:text-8xl">
                {copy.siteTitle}
              </h1>

              <div className="mt-12 flex flex-wrap gap-3">
                <span className="rounded-full border border-saffron-500/30 bg-saffron-500/10 px-4 py-2 font-semibold">
                  {copy.dateLabel}
                </span>
                <span className="rounded-full border border-dusty-500/35 bg-dusty-500/10 px-4 py-2 font-semibold">
                  {copy.locationLabel}
                </span>
                <a
                  href={copy.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-crimson-600/35 bg-white px-4 py-2 font-semibold text-crimson-700 transition hover:bg-canvas-50"
                >
                  {copy.mapsLabel}
                </a>
              </div>
            </div>
          </header>

          <section className="grid auto-rows-[minmax(120px,auto)] grid-cols-2 gap-5 sm:gap-6 lg:grid-cols-12">
            <article className="col-span-2 rounded-[1.6rem] border border-[#dbc7ab] bg-white/90 p-6 sm:p-7 lg:col-span-7 lg:row-span-2">
              <h2 className="font-display text-4xl text-ink sm:text-5xl">{copy.bento.programTitle}</h2>
              <p className="mt-2 text-ink/85">{copy.bento.programIntro}</p>
              <ol className="mt-5 divide-y divide-[#e3d3bc] border-y border-[#e3d3bc]">
                {copy.bento.schedule.map((item) => {
                  const parts = splitTimelineLine(item);
                  return (
                    <li key={item} className="grid gap-1 py-2.5 sm:grid-cols-[92px_1fr] sm:items-baseline">
                      <span className="font-semibold text-crimson-700">{parts.time ?? "•"}</span>
                      <span className="text-ink/90">{parts.label}</span>
                    </li>
                  );
                })}
              </ol>
            </article>

            <article className="col-span-1 overflow-hidden rounded-[1.4rem] border border-[#dbc7ab] bg-white/80 lg:col-span-3">
              <img src={imgA.url} alt={imgA.alt} loading="lazy" className="mask-fade-soft h-full w-full object-cover" />
            </article>

            <article className="col-span-1 overflow-hidden rounded-[1.4rem] border border-[#dbc7ab] bg-white/80 lg:col-span-2">
              <img src={imgD.url} alt={imgD.alt} loading="lazy" className="mask-fade-soft h-full w-full object-cover" />
            </article>

            <article className="col-span-2 rounded-[1.6rem] border border-[#dbc7ab] bg-white/90 p-6 sm:p-7 lg:col-span-5">
              <h3 className="font-display text-3xl text-ink sm:text-4xl">{copy.bento.locationTitle}</h3>
              <ul className="mt-4 space-y-2.5 text-ink/90">
                {copy.bento.locationLines.map((line) => (
                  <li key={line} className="flex gap-3">
                    <span className="pt-1 text-saffron-600">●</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <a
                href={copy.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex rounded-full border border-crimson-600/35 bg-white px-4 py-2 font-semibold text-crimson-700 transition hover:bg-canvas-50"
              >
                {copy.mapsLabel}
              </a>
            </article>

            <article className="col-span-1 overflow-hidden rounded-[1.4rem] border border-[#dbc7ab] bg-white/80 lg:col-span-3">
              <img src={imgC.url} alt={imgC.alt} loading="lazy" className="mask-fade-soft h-full w-full object-cover" />
            </article>

            <article className="col-span-1 overflow-hidden rounded-[1.4rem] border border-[#dbc7ab] bg-white/80 lg:col-span-4">
              <img src={imgD.url} alt={imgD.alt} loading="lazy" className="mask-fade-bottom h-full w-full object-cover" />
            </article>
          </section>

          <section className="mx-auto mt-20 max-w-3xl">
            <h2 className="text-center font-display text-5xl text-ink">{copy.faqTitle}</h2>
            <ul className="mt-8 divide-y divide-[#dec8ad] border-y border-[#dec8ad]">
              {copy.faqList.map((item) => (
                <li key={item.q} className="py-5">
                  <h3 className="font-display text-3xl text-ink">{item.q}</h3>
                  <p className="mt-1 text-ink/85">{item.a}</p>
                </li>
              ))}
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
}
