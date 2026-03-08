import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { button, useControls } from "leva";
import LanguageToggle from "./components/LanguageToggle";
import OpeningEnvelope from "./components/OpeningEnvelope";
import RSVPForm from "./components/RSVPForm";
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
  // React state drives all animation values — leva pushes into it via onChange
  const [introTuning, setIntroTuning] = useState(DEFAULT_INTRO_TUNING);
  const revealTimerRef = useRef(null);
  const copy = content[locale];
  const heroImage = copy.moodImages[3];

  // stable refs so leva button closures always call the latest handlers
  const resetEnvelopeRef = useRef(null);
  const playAnimationRef = useRef(null);
  // always-current copy of introTuning for callbacks that need it without a render cycle
  const introTuningRef = useRef(introTuning);
  introTuningRef.current = introTuning;

  function set(key) {
    return (value) => setIntroTuning((prev) => ({ ...prev, [key]: value }));
  }

  useControls("Transition Tuner", () => ({
    openToRevealMs: { value: DEFAULT_INTRO_TUNING.openToRevealMs, min: 120, max: 6000, step: 20, label: "Open → website delay", onChange: set("openToRevealMs") },
    overlayFadeMs: { value: DEFAULT_INTRO_TUNING.overlayFadeMs, min: 80, max: 6000, step: 20, label: "Overlay fade", onChange: set("overlayFadeMs") },
    envelopeMoveMs: { value: DEFAULT_INTRO_TUNING.envelopeMoveMs, min: 120, max: 6000, step: 20, label: "Envelope move", onChange: set("envelopeMoveMs") },
    flapMs: { value: DEFAULT_INTRO_TUNING.flapMs, min: 120, max: 6000, step: 20, label: "Flap open", onChange: set("flapMs") },
    previewMs: { value: DEFAULT_INTRO_TUNING.previewMs, min: 120, max: 6000, step: 20, label: "Letter preview", onChange: set("previewMs") },
    siteRevealMs: { value: DEFAULT_INTRO_TUNING.siteRevealMs, min: 120, max: 6000, step: 20, label: "Website reveal", onChange: set("siteRevealMs") },
    openingScale: { value: DEFAULT_INTRO_TUNING.openingScale, min: 1, max: 1.2, step: 0.01, label: "Opening scale", onChange: set("openingScale") },
    openingOpacity: { value: DEFAULT_INTRO_TUNING.openingOpacity, min: 0.3, max: 1, step: 0.01, label: "Opening opacity", onChange: set("openingOpacity") },
    easeX1: { value: DEFAULT_INTRO_TUNING.easeX1, min: 0, max: 1, step: 0.01, label: "Ease x1", onChange: set("easeX1") },
    easeY1: { value: DEFAULT_INTRO_TUNING.easeY1, min: -0.4, max: 1.4, step: 0.01, label: "Ease y1", onChange: set("easeY1") },
    easeX2: { value: DEFAULT_INTRO_TUNING.easeX2, min: 0, max: 1, step: 0.01, label: "Ease x2", onChange: set("easeX2") },
    easeY2: { value: DEFAULT_INTRO_TUNING.easeY2, min: -0.4, max: 1.4, step: 0.01, label: "Ease y2", onChange: set("easeY2") },
    "Play animation": button(() => playAnimationRef.current?.()),
    "Reset envelope": button(() => resetEnvelopeRef.current?.()),
  }), { collapsed: true });

  const introEasing = useMemo(
    () => `cubic-bezier(${introTuning.easeX1}, ${introTuning.easeY1}, ${introTuning.easeX2}, ${introTuning.easeY2})`,
    [introTuning.easeX1, introTuning.easeY1, introTuning.easeX2, introTuning.easeY2],
  );

  useEffect(() => {
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

  const handleResetEnvelope = useCallback(() => {
    clearRevealTimer();
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    setIntroPhase("locked");
  }, []);

  function revealDelay(tuning) {
    // Never cut off animations: wait at least as long as the longest animation
    return Math.max(tuning.openToRevealMs, tuning.envelopeMoveMs, tuning.flapMs, tuning.previewMs);
  }

  const handlePlayAnimation = useCallback(() => {
    clearRevealTimer();
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    setIntroPhase("locked");
    // small delay so the locked state renders before triggering opening
    window.setTimeout(() => {
      setIntroPhase("opening");
      revealTimerRef.current = window.setTimeout(() => {
        setIntroPhase("revealed");
        revealTimerRef.current = null;
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      }, revealDelay(introTuningRef.current));
    }, 50);
  }, []);

  // keep refs in sync so leva buttons always call the latest version
  resetEnvelopeRef.current = handleResetEnvelope;
  playAnimationRef.current = handlePlayAnimation;

  function handleOpenInvitation() {
    if (introPhase !== "locked") return;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    clearRevealTimer();
    setIntroPhase("opening");
    revealTimerRef.current = window.setTimeout(() => {
      setIntroPhase("revealed");
      revealTimerRef.current = null;
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }, revealDelay(introTuning));
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

  const busLine = copy.bento.locationLines.find((l) => /bus/i.test(l));
  const nonBusLines = copy.bento.locationLines.filter((l) => !/bus/i.test(l));

  const accommodationCopy =
    locale === "it"
      ? "Stiamo organizzando una convenzione con un hotel nelle vicinanze con tariffe riservate agli ospiti. Vi aggiorneremo presto."
      : "We're arranging a discounted rate at a nearby hotel for our guests. More details coming soon.";

  const giftsCopy =
    locale === "it"
      ? "Il regalo più grande è la vostra presenza. Se volete contribuire al nostro viaggio di nozze, ecco i nostri riferimenti."
      : "Your presence is the greatest gift. If you'd like to contribute to our honeymoon, here are our details.";

  const rsvpDeadline =
    locale === "it"
      ? "Conferma la tua presenza entro il 30 giugno 2026."
      : "Please confirm your attendance by June 30, 2026.";

  return (
    <div className="font-body text-[18px] text-ink sm:text-[19px] lg:text-[20px]">
      <OpeningEnvelope
        phase={introPhase}
        onOpen={handleOpenInvitation}
        locale={locale}
        onChangeLocale={setLocale}
        previewTitle={copy.siteTitle}
        motion={introTuning}
      />

      <div
        className="transition-all"
        style={{
          transitionDuration: `${introTuning.siteRevealMs}ms`,
          transitionTimingFunction: introEasing,
          ...siteStateStyle,
        }}
      >
        <main>
          {/* ── 1. HERO ── */}
          <section id="hero" className="relative flex min-h-[100svh] flex-col" aria-label="Hero">
            <img src={heroImage.url} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/35 to-ink/70" />

            <div className="relative flex justify-end px-5 pt-6">
              <LanguageToggle locale={locale} onChange={setLocale} />
            </div>

            <div className="relative mt-auto px-5 pb-16 sm:px-10 sm:pb-20">
              <h1 className="max-w-2xl font-display text-5xl leading-[0.94] text-white sm:text-7xl md:text-8xl">
                {copy.siteTitle}
              </h1>
              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-full border border-white/30 bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
                  {copy.dateLabel}
                </span>
                <span className="rounded-full border border-white/30 bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
                  {copy.locationLabel}
                </span>
                <a
                  href={copy.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-saffron-500/60 bg-saffron-500/20 px-4 py-2 text-sm font-semibold text-saffron-500 backdrop-blur-sm transition hover:bg-saffron-500/30"
                >
                  {copy.mapsLabel}
                </a>
              </div>
            </div>
          </section>

          {/* ── 2. LOCATION ── */}
          <section id="location" className="bg-canvas-50 px-5 py-16 sm:px-8 sm:py-20">
            <div className="mx-auto max-w-2xl">
              <h2 className="font-display text-4xl text-ink sm:text-5xl">{copy.bento.locationTitle}</h2>
              <ul className="mt-6 space-y-3">
                {nonBusLines.map((line) => (
                  <li key={line} className="flex gap-3 text-ink/85">
                    <span className="mt-1 select-none text-saffron-600">●</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <a
                href={copy.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex rounded-full border border-crimson-600/35 bg-white px-5 py-2.5 font-semibold text-crimson-700 transition hover:bg-canvas-100"
              >
                {copy.mapsLabel}
              </a>

              {busLine && (
                <div className="mt-8 rounded-2xl border border-saffron-500/30 bg-saffron-500/10 px-5 py-4">
                  <p className="font-semibold text-ink/90">{busLine}</p>
                </div>
              )}

              {/* VENUE PHOTOS — add when available */}
              <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {/* Replace with <img> tags once venue photos are ready */}
              </div>
            </div>
          </section>

          {/* ── 3. TIMETABLE ── */}
          <section id="program" className="bg-canvas-100 px-5 py-16 sm:px-8 sm:py-20">
            <div className="mx-auto max-w-2xl">
              <h2 className="font-display text-4xl text-ink sm:text-5xl">{copy.bento.programTitle}</h2>
              <p className="mt-3 text-ink/75">{copy.bento.programIntro}</p>
              <ol className="mt-8 divide-y divide-[#C9A87A] border-y border-[#C9A87A]">
                {copy.bento.schedule.map((item) => {
                  const parts = splitTimelineLine(item);
                  return (
                    <li key={item} className="grid gap-1 py-3 sm:grid-cols-[80px_1fr] sm:items-baseline">
                      <span className="font-semibold text-crimson-700">{parts.time ?? "•"}</span>
                      <span className="text-ink/90">{parts.label}</span>
                    </li>
                  );
                })}
              </ol>
            </div>
          </section>

          {/* ── 4. ACCOMMODATION ── */}
          <section id="accommodation" className="bg-canvas-50 px-5 py-16 sm:px-8 sm:py-20">
            <div className="mx-auto max-w-2xl">
              <h2 className="font-display text-4xl text-ink sm:text-5xl">
                {locale === "it" ? "Alloggi" : "Accommodation"}
              </h2>
              <div className="mt-6 rounded-2xl border border-[#C4A87A] bg-white/80 px-6 py-6">
                <p className="text-ink/85">{accommodationCopy}</p>
              </div>
            </div>
          </section>

          {/* ── 5. GIFTS ── */}
          <section id="gifts" className="bg-canvas-100 px-5 py-16 sm:px-8 sm:py-20">
            <div className="mx-auto max-w-2xl">
              <h2 className="font-display text-4xl text-ink sm:text-5xl">
                {locale === "it" ? "Regali" : "Gifts"}
              </h2>
              <p className="mt-4 text-ink/85">{giftsCopy}</p>
              <div className="mt-6 rounded-2xl border border-[#C4A87A] bg-white/80 px-6 py-4">
                <p className="text-xs uppercase tracking-widest text-ink/50">IBAN</p>
                <p className="mt-1 font-mono text-base tracking-wider text-ink/90">
                  IT00 X000 0000 0000 0000 0000 000
                </p>
              </div>
            </div>
          </section>

          {/* ── 6. FAQ ── */}
          <section id="faq" className="bg-canvas-50 px-5 py-16 sm:px-8 sm:py-20">
            <div className="mx-auto max-w-2xl">
              <h2 className="font-display text-4xl text-ink sm:text-5xl">{copy.faqTitle}</h2>
              <ul className="mt-8 divide-y divide-[#C9A87A] border-y border-[#C9A87A]">
                {copy.faqList.map((item) => (
                  <li key={item.q} className="py-5">
                    <h3 className="font-display text-2xl text-ink sm:text-3xl">{item.q}</h3>
                    <p className="mt-1 text-ink/85">{item.a}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* ── 7. RSVP ── */}
          <RSVPForm />
        </main>
      </div>
    </div>
  );
}
