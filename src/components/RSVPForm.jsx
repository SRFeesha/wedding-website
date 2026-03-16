import { useRef, useState } from "react";
import { motion, LayoutGroup, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  WarningCircleIcon, CircleNotchIcon, CaretDownIcon,
  CheckCircleIcon, XSquareIcon, PlusIcon,
  BusIcon, CarIcon, QuestionIcon,
  BabyIcon, ConfettiIcon, CheersIcon,
  ForkKnifeIcon, HeartIcon,
  LeafIcon, CheeseIcon, GrainsSlashIcon,
} from "@phosphor-icons/react";

const labelClass =
  "block font-ibm text-base font-semibold text-ink/70 px-1.5 pb-1";

function inputClass(hasError) {
  if (hasError)
    return "w-full rounded-2xl bg-white px-4 py-3 font-ibm text-[18px] text-ink outline outline-2 outline-error focus:outline-error transition";
  return "w-full rounded-2xl bg-white px-4 py-3 font-ibm text-[18px] text-ink outline outline-2 outline-black/20 focus:outline-crimson-600 transition";
}

function FieldError({ id, msg }) {
  if (!msg) return null;
  return (
    <p id={id} className="mt-1.5 flex items-center gap-2 font-sans text-[17px] leading-snug text-error">
      <WarningCircleIcon size={18} weight="fill" aria-hidden="true" style={{ flexShrink: 0 }} />
      {msg}
    </p>
  );
}

function Spinner() {
  return <CircleNotchIcon weight="bold" className="animate-spin h-6 w-6" aria-hidden="true" />;
}

function Chevron() {
  return (
    <CaretDownIcon
      size={16}
      weight="bold"
      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink/40"
      aria-hidden="true"
    />
  );
}

function getDietaryIcon(value) {
  const v = (value || "").toLowerCase();
  if (v.includes("vegan") || v.includes("vegano")) return LeafIcon;
  if (v.includes("vegetar")) return CheeseIcon;
  if (v.includes("gluten") || v.includes("glutine")) return GrainsSlashIcon;
  if (v.includes("altro") || v.includes("other")) return QuestionIcon;
  return ForkKnifeIcon;
}

function DietarySelectIcon({ value }) {
  const Icon = getDietaryIcon(value);
  return (
    <Icon
      size={18}
      weight="bold"
      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-saffron-600"
      aria-hidden="true"
    />
  );
}

const TRANSPORT_ICONS = { bus: BusIcon, car: CarIcon, unsure: QuestionIcon };
const AGE_ICONS       = { baby: BabyIcon, kid: ConfettiIcon, adult: CheersIcon };
const BABY_SEATING_ICONS = { table: ForkKnifeIcon, nanny: HeartIcon };

function CrossfadeIcon({ Icon, active, size = 16 }) {
  return (
    <span className="relative inline-flex" style={{ width: size, height: size }}>
      <motion.span
        className="absolute inset-0 flex items-center justify-center"
        initial={false}
        animate={{ opacity: active ? 0 : 1, scale: active ? 0.25 : 1, filter: active ? "blur(4px)" : "blur(0px)" }}
        transition={{ type: "spring", duration: 0.3, bounce: 0 }}
      >
        <Icon size={size} weight="bold" aria-hidden="true" />
      </motion.span>
      <motion.span
        className="absolute inset-0 flex items-center justify-center"
        initial={false}
        animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.25, filter: active ? "blur(0px)" : "blur(4px)" }}
        transition={{ type: "spring", duration: 0.3, bounce: 0 }}
      >
        <Icon size={size} weight="fill" aria-hidden="true" />
      </motion.span>
    </span>
  );
}

const SUBMIT_SHADOW =
  "0px 2px 4px 0px rgba(0,0,0,0.30), inset 0px 8px 8px 0px rgba(255,255,255,0.05)";

const bodyDelay = 2000;

const OPEN_TRANSITION = { duration: 0.35, ease: [0.25, 1, 0.5, 1] };
const CLOSE_TRANSITION = { duration: 0.26, ease: [0.5, 0, 0.75, 0] };
const SPRING = { type: "spring", stiffness: 460, damping: 32 };

function Disclosure({ show, children, className = "", contentClassName = "", delay = 0 }) {
  const shouldReduce = useReducedMotion();
  const enter = shouldReduce ? { duration: 0 } : { ...OPEN_TRANSITION, delay };
  const exit  = shouldReduce ? { duration: 0 } : CLOSE_TRANSITION;
  return (
    <AnimatePresence initial={false}>
      {show && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0, transition: exit }}
          transition={{ height: enter, opacity: enter }}
          className={`overflow-hidden ${className}`.trim()}
        >
          <div className="px-[2px] py-[2px]">
            <div className={contentClassName}>{children}</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function RSVPForm({ copy }) {
  const t = copy.rsvp;
  const [form, setForm] = useState({
    name: "",
    attending: null,
    transport: null,
    dietary: t.dietaryOptions[0],
    dietaryNote: "",
    message: "",
    guests: [],
  });
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});
  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const guestIdRef = useRef(0);
  const summaryRef = useRef(null);
  const shouldReduce = useReducedMotion();
  const [expandedGuests, setExpandedGuests] = useState(() => new Set());

  const addGuest = () => {
    const id = ++guestIdRef.current;
    setForm((p) => ({
      ...p,
      guests: [...p.guests, { id, name: "", ageGroup: null, dietary: t.dietaryOptions[0], dietaryNote: "", babySeating: null }],
    }));
    setExpandedGuests((prev) => new Set([...prev, id]));
  };

  const removeGuest = (i) => {
    const { id } = form.guests[i];
    setForm((p) => ({ ...p, guests: p.guests.filter((_, idx) => idx !== i) }));
    setExpandedGuests((prev) => { const next = new Set(prev); next.delete(id); return next; });
  };

  const toggleGuestDetails = (id) => {
    setExpandedGuests((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const updateGuest = (i, field, value) =>
    setForm((p) => ({
      ...p,
      guests: p.guests.map((g, idx) => (idx === i ? { ...g, [field]: value } : g)),
    }));

  const handleSubmit = async () => {
    const newErrors = {};
    if (!form.name) newErrors.name = t.validationName;
    if (form.attending === null) newErrors.attending = t.validationAttendance;
    form.guests.forEach((g) => {
      if (!g.name.trim()) newErrors[`guest_name_${g.id}`] = t.validationGuestName;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Expand any guest cards that have errors so the field is visible
      setExpandedGuests((prev) => {
        const next = new Set(prev);
        form.guests.forEach((g) => { if (!g.name.trim()) next.add(g.id); });
        return next;
      });
      setTimeout(() => {
        summaryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        summaryRef.current?.focus({ preventScroll: true });
      }, 30);
      return;
    }

    setErrors({});
    setStatus("loading");

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          attending: form.attending ? "Yes" : "No",
          transport: form.transport ?? "",
          dietary: form.dietary || t.dietaryOptions[0],
          dietaryNote: form.dietary === t.dietaryOtherValue ? form.dietaryNote : "",
          message: form.message,
          guests: form.guests.map((g) => ({
            name: g.name,
            ageGroup: g.ageGroup ?? "",
            dietary: g.ageGroup === "baby" ? "" : (g.dietary || t.dietaryOptions[0]),
            dietaryNote: g.ageGroup === "adult" && g.dietary === t.dietaryOtherValue ? (g.dietaryNote || "") : "",
            babySeating: g.babySeating ?? "",
          })),
        }),
      });

      if (!res.ok) throw new Error("Submission failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    const delay = form.attending ? bodyDelay : 2500;
    return (
      <section role="status" className="bg-canvas-50 px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-[600px] text-center py-8">
          <div className="mx-auto mb-6 grid h-40 place-items-center" style={{ isolation: "isolate", transform: "translateZ(0)" }}>
            <video
              autoPlay
              muted
              playsInline
              loop
              className="col-start-1 row-start-1 h-40 w-auto"
              style={{
                mixBlendMode: "multiply",
                pointerEvents: "none",
                transform: "translateZ(0)",
                animation: `fadeOut 400ms ease-in ${delay - 400}ms both`,
              }}
            >
              <source
                src={form.attending
                  ? "https://media1.giphy.com/media/OfkGZ5H2H3f8Y/giphy.mp4"
                  : "https://media0.giphy.com/media/fAd5mYnTljWXS/giphy.mp4"}
                type="video/mp4"
              />
            </video>
            <h2
              className="col-start-1 row-start-1 font-display text-5xl font-semibold text-ink"
              style={{ animation: `fadeInUp 560ms ease-out ${delay}ms both` }}
            >
              {form.attending ? t.successAttending : t.successDecline}
            </h2>
          </div>
          <p
            className="mt-4 font-display text-ink/75"
            style={{ animation: `fadeInUp 560ms ease-out ${delay + 200}ms both` }}
          >
            {form.attending ? t.successAttendingBody : t.successDeclineBody}
          </p>
        </div>
      </section>
    );
  }

  const errorLabels = [
    ...(errors.name ? [t.namePlaceholder] : []),
    ...(errors.attending ? [t.attendanceLabel] : []),
    ...form.guests
      .map((g, i) => errors[`guest_name_${g.id}`] ? `${t.guestLabel} ${i + 2} — ${t.nameLabel}` : null)
      .filter(Boolean),
  ];

  return (
    <section id="rsvp" className="bg-canvas-50 px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="text-center">
          <h2 className="font-display text-5xl font-semibold text-ink [text-wrap:balance]">{t.title}</h2>
          <p className="mt-3 font-display text-xl italic text-ink/75">{t.deadline}</p>
        </div>

        {/* Error summary */}
        <AnimatePresence>
          {errorLabels.length > 0 && (
            <motion.div
              ref={summaryRef}
              tabIndex={-1}
              role="alert"
              className="mx-auto mt-6 max-w-[600px] scroll-mt-4 rounded-2xl border border-error/25 bg-error/5 px-5 py-4 outline-none"
              initial={{ opacity: 0, y: shouldReduce ? 0 : -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={shouldReduce ? { duration: 0 } : { duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
            >
              <div className="flex items-start gap-3">
                <WarningCircleIcon size={18} weight="fill" className="mt-0.5 shrink-0 text-error" aria-hidden="true" />
                <div>
                  <p className="font-sans text-sm font-semibold text-error">{t.validationSummaryTitle}</p>
                  <ul className="mt-1.5 list-disc list-inside space-y-0.5">
                    {errorLabels.map((label, i) => (
                      <li key={i} className="font-sans text-sm text-error/80">{label}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mx-auto mt-9 max-w-[600px] space-y-8">

          {/* Full name */}
          <div>
            <label htmlFor="rsvp-name" className={labelClass}>{t.namePlaceholder}</label>
            <input
              id="rsvp-name"
              type="text"
              autoComplete="name"
              className={inputClass(!!errors.name)}
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              aria-describedby={errors.name ? "rsvp-name-error" : undefined}
              aria-invalid={!!errors.name}
            />
            <FieldError id="rsvp-name-error" msg={errors.name} />
          </div>

          {/* Attendance — segmented control */}
          <div>
            <label id="attendance-label" className={labelClass}>{t.attendanceLabel}</label>
            <LayoutGroup>
              <div
                role="group"
                aria-labelledby="attendance-label"
                aria-describedby={errors.attending ? "rsvp-attending-error" : undefined}
                className={`flex rounded-2xl bg-white p-[2px] outline outline-2 transition-colors ${
                  errors.attending ? "outline-error" : "outline-black/20"
                }`}
              >
                {[
                  { value: true,  label: t.attendanceYes, Icon: CheckCircleIcon },
                  { value: false, label: t.attendanceNo,  Icon: XSquareIcon },
                ].map((opt, i) => {
                  const active = form.attending === opt.value;
                  return (
                    <div key={i} className="flex flex-1 items-stretch">
                      {i > 0 && form.attending === null && (
                        <div className="w-px self-stretch bg-black/20" />
                      )}
                      <button
                        className={`relative flex flex-1 items-center justify-center gap-2 rounded-xl px-3.5 py-3 font-ibm text-base font-semibold leading-6 transition-colors duration-200 ease-spring focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson-600 ${
                          active ? "text-white" : "text-ink"
                        }`}
                        aria-pressed={active}
                        onClick={() => handleChange("attending", opt.value)}
                      >
                        {active && (
                          <motion.span
                            layoutId="attendance-pill"
                            aria-hidden="true"
                            className="absolute inset-0 rounded-xl bg-crimson-600"
                            style={{ boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.30), inset 0px 4px 4px 0px rgba(255,255,255,0.05)" }}
                            transition={{ type: "spring", stiffness: 380, damping: 35 }}
                          />
                        )}
                        <span className="relative z-10 flex items-center gap-2">
                          <opt.Icon size={16} weight={active ? "fill" : "regular"} aria-hidden="true" />
                          {opt.label}
                        </span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </LayoutGroup>
            <FieldError id="rsvp-attending-error" msg={errors.attending} />
          </div>

          {/* Dietary (conditional) */}
          <Disclosure show={form.attending === true} contentClassName="pb-0.5" delay={0}>
            <div>
              <label htmlFor="rsvp-dietary" className={labelClass}>{t.dietaryLabel}</label>
              <div className="relative">
                <DietarySelectIcon value={form.dietary} />
                <select
                  id="rsvp-dietary"
                  className={`${inputClass(false)} appearance-none cursor-pointer pl-9 pr-9`}
                  value={form.dietary}
                  onChange={(e) => handleChange("dietary", e.target.value)}
                >
                  {t.dietaryOptions.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
                <Chevron />
              </div>
              <Disclosure show={form.dietary === t.dietaryOtherValue} contentClassName="pl-4 pt-3 pb-1">
                <div>
                  <label htmlFor="rsvp-dietary-note" className={labelClass}>{t.dietaryNoteLabel}</label>
                  <textarea
                    id="rsvp-dietary-note"
                    className={inputClass(false)}
                    rows={2}
                    placeholder={t.dietaryNotePlaceholder}
                    value={form.dietaryNote}
                    onChange={(e) => handleChange("dietaryNote", e.target.value)}
                    style={{ resize: "none", lineHeight: "1.7" }}
                  />
                </div>
              </Disclosure>
            </div>
          </Disclosure>

          {/* Additional guests */}
          <Disclosure show={form.attending === true} contentClassName="pb-0.5" delay={0.08}>
            <div>
              {form.guests.length > 0 && (
                <div className="divide-y divide-[#C9A87A]/25 mb-6">
                  <AnimatePresence initial={false}>
                  {form.guests.map((guest, i) => {
                    const isOpen = expandedGuests.has(guest.id);
                    const guestTitle = guest.name || `${t.guestLabel} ${i + 2}`;
                    return (
                      <motion.div
                        key={guest.id}
                        className="py-4 first:pt-0"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4, transition: { duration: 0.2, ease: [0.5, 0, 0.75, 0] } }}
                        transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                      >
                        {/* Header row */}
                        <div className="flex items-center gap-2 border-b border-[#C9A87A]/30 pb-2">
                          <span
                            id={`guest-heading-${i}`}
                            className="font-display text-2xl font-semibold leading-tight text-ink"
                          >
                            {guestTitle}
                          </span>
                          <button
                            type="button"
                            onClick={() => toggleGuestDetails(guest.id)}
                            aria-expanded={isOpen}
                            className="relative shrink-0 rounded-md p-3 text-saffron-600 transition-colors hover:bg-saffron-600/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson-600"
                          >
                            <CaretDownIcon
                              size={16}
                              weight="bold"
                              aria-hidden="true"
                              style={{
                                transform: isOpen ? "rotate(0deg)" : "rotate(-90deg)",
                                transition: "transform 320ms cubic-bezier(0.34, 1.56, 0.64, 1)",
                              }}
                            />
                          </button>
                          <button
                            type="button"
                            aria-label={`${t.removeGuestLabel} ${guestTitle}`}
                            onClick={() => removeGuest(i)}
                            className="ml-auto font-ibm text-sm font-medium text-ink/40 rounded-lg border border-transparent px-2.5 py-1 transition hover:border-ink/20 hover:bg-ink/5 hover:text-ink/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson-600"
                          >
                            {t.removeGuestLabel}
                          </button>
                        </div>

                        {/* Collapsible details */}
                        <Disclosure show={isOpen} contentClassName="pt-4">
                          <div className="space-y-5">
                            <div>
                              <span className={labelClass}>{t.nameLabel}</span>
                              <input
                                id={`guest-name-${i}`}
                                aria-label={t.namePlaceholder}
                                aria-describedby={errors[`guest_name_${guest.id}`] ? `guest-name-error-${i}` : undefined}
                                className={`${inputClass(!!errors[`guest_name_${guest.id}`])} mt-1`}
                                value={guest.name}
                                onChange={(e) => {
                                  updateGuest(i, "name", e.target.value);
                                  setErrors((prev) => ({ ...prev, [`guest_name_${guest.id}`]: "" }));
                                }}
                              />
                              <FieldError id={`guest-name-error-${i}`} msg={errors[`guest_name_${guest.id}`]} />
                            </div>

                            <div role="group" aria-labelledby={`guest-age-label-${i}`}>
                              <span id={`guest-age-label-${i}`} className={labelClass}>{t.ageGroupLabel}</span>
                              <div className="mt-1 rounded-[18px] bg-white/40 p-1.5" style={{ boxShadow: "0 1px 3px rgba(44,22,16,0.06), 0 0 0 1px rgba(196,168,122,0.20)" }}>
                                {t.ageGroupOptions.map((opt) => {
                                  const active = guest.ageGroup === opt.value;
                                  const Icon = AGE_ICONS[opt.value];
                                  return (
                                    <div key={opt.value}>
                                      <button
                                        type="button"
                                        aria-pressed={active}
                                        onClick={() => updateGuest(i, "ageGroup", opt.value)}
                                        className={`w-full rounded-xl px-5 py-3 text-left transition-colors duration-200 ease-spring focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson-600 ${
                                          active ? "bg-crimson-600 text-white" : "text-ink"
                                        }`}
                                        style={active ? { boxShadow: "0px 1px 2px rgba(0,0,0,0.25), inset 0px 4px 4px rgba(255,255,255,0.05)" } : undefined}
                                      >
                                        <div className="flex items-center gap-3">
                                          {Icon && <CrossfadeIcon Icon={Icon} active={active} size={20} />}
                                          <div>
                                            <span className="block font-ibm text-base font-semibold leading-snug">{opt.label}</span>
                                            <span className={`block font-ibm text-sm ${active ? "text-white/70" : "text-ink/50"}`}>{opt.sublabel}</span>
                                          </div>
                                        </div>
                                      </button>

                                      <Disclosure show={opt.value === "baby" && active} contentClassName="pl-4 pt-3 pb-1">
                                        <div role="group" aria-labelledby={`guest-babyseating-label-${i}`}>
                                          <span id={`guest-babyseating-label-${i}`} className={labelClass}>{t.babySeatingLabel}</span>
                                          <div className="mt-1 rounded-[18px] bg-white/40 p-1.5" style={{ boxShadow: "0 1px 3px rgba(44,22,16,0.06), 0 0 0 1px rgba(196,168,122,0.20)" }}>
                                            {t.babySeatingOptions.map((bOpt) => {
                                              const bActive = guest.babySeating === bOpt.value;
                                              const BIcon = BABY_SEATING_ICONS[bOpt.value];
                                              return (
                                                <button
                                                  key={bOpt.value}
                                                  type="button"
                                                  aria-pressed={bActive}
                                                  onClick={() => updateGuest(i, "babySeating", bOpt.value)}
                                                  className={`w-full rounded-xl px-5 py-3 text-left transition-colors duration-200 ease-spring focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson-600 ${
                                                    bActive ? "bg-crimson-600 text-white" : "text-ink"
                                                  }`}
                                                  style={bActive ? { boxShadow: "0px 1px 2px rgba(0,0,0,0.25), inset 0px 4px 4px rgba(255,255,255,0.05)" } : undefined}
                                                >
                                                  <div className="flex items-center gap-3">
                                                    {BIcon && <CrossfadeIcon Icon={BIcon} active={bActive} size={20} />}
                                                    <div>
                                                      <span className="block font-ibm text-base font-semibold leading-snug">{bOpt.label}</span>
                                                      <span className={`block font-ibm text-sm ${bActive ? "text-white/70" : "text-ink/50"}`}>{bOpt.sublabel}</span>
                                                    </div>
                                                  </div>
                                                </button>
                                              );
                                            })}
                                          </div>
                                        </div>
                                      </Disclosure>

                                      <Disclosure show={opt.value === "adult" && active} contentClassName="pl-4 pt-3 pb-1">
                                        <div>
                                          <label htmlFor={`guest-dietary-${i}`} className={labelClass}>{t.dietaryLabel}</label>
                                          <div className="relative">
                                            <DietarySelectIcon value={guest.dietary} />
                                            <select
                                              id={`guest-dietary-${i}`}
                                              className={`${inputClass(false)} appearance-none cursor-pointer pl-9 pr-9`}
                                              value={guest.dietary}
                                              onChange={(e) => updateGuest(i, "dietary", e.target.value)}
                                            >
                                              {t.dietaryOptions.map((o) => (
                                                <option key={o} value={o}>{o}</option>
                                              ))}
                                            </select>
                                            <Chevron />
                                          </div>
                                          <Disclosure show={guest.dietary === t.dietaryOtherValue} contentClassName="pl-4 pt-3 pb-1">
                                            <div>
                                              <label htmlFor={`guest-dietary-note-${i}`} className={labelClass}>{t.dietaryNoteLabel}</label>
                                              <textarea
                                                id={`guest-dietary-note-${i}`}
                                                className={inputClass(false)}
                                                rows={2}
                                                placeholder={t.dietaryNotePlaceholder}
                                                value={guest.dietaryNote || ""}
                                                onChange={(e) => updateGuest(i, "dietaryNote", e.target.value)}
                                                style={{ resize: "none", lineHeight: "1.7" }}
                                              />
                                            </div>
                                          </Disclosure>
                                        </div>
                                      </Disclosure>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </Disclosure>
                      </motion.div>
                    );
                  })}
                  </AnimatePresence>
                </div>
              )}

              <button
                type="button"
                onClick={addGuest}
                className="inline-flex items-center gap-1.5 rounded-xl bg-black/10 px-3.5 py-1.5 font-ibm text-base font-medium text-ink/90 transition duration-200 ease-spring hover:bg-black/15 active:scale-[0.94] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson-600"
              >
                <PlusIcon size={16} weight="bold" aria-hidden="true" />
                {t.addGuestLabel}
              </button>
            </div>
          </Disclosure>

          {/* Transport (conditional) */}
          <Disclosure show={form.attending === true} contentClassName="pb-0.5" delay={0}>
            <div>
              <label id="transport-label" className={labelClass}>{t.transportLabel}</label>
              <LayoutGroup>
                <div role="group" aria-labelledby="transport-label" className="rounded-[18px] bg-white/40 p-1.5" style={{ boxShadow: "0 1px 3px rgba(44,22,16,0.06), 0 0 0 1px rgba(196,168,122,0.20)" }}>
                  {t.transportOptions.map((opt) => {
                    const active = form.transport === opt.value;
                    const Icon = TRANSPORT_ICONS[opt.value];
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        aria-pressed={active}
                        onClick={() => handleChange("transport", opt.value)}
                        className={`relative w-full rounded-xl px-5 py-3 text-left transition-colors duration-200 ease-spring focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson-600 ${
                          active ? "text-white" : "text-ink"
                        }`}
                      >
                        {active && (
                          <motion.span
                            layoutId="transport-pill"
                            aria-hidden="true"
                            className="absolute inset-0 rounded-xl bg-crimson-600"
                            style={{ boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.25), inset 0px 4px 4px 0px rgba(255,255,255,0.05)" }}
                            transition={SPRING}
                          />
                        )}
                        <div className="relative z-10 flex items-center gap-3">
                          {Icon && <CrossfadeIcon Icon={Icon} active={active} size={20} />}
                          <div>
                            <span className="block font-ibm text-base font-semibold leading-snug">{opt.label}</span>
                            <span className={`block font-ibm text-sm ${active ? "text-white/70" : "text-ink/50"}`}>{opt.sublabel}</span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </LayoutGroup>
            </div>
          </Disclosure>

          {/* Message */}
          <div>
            <label htmlFor="rsvp-message" className={labelClass}>{t.messageLabel}</label>
            <textarea
              id="rsvp-message"
              className={inputClass(false)}
              rows={3}
              placeholder={t.messagePlaceholder}
              value={form.message}
              onChange={(e) => handleChange("message", e.target.value)}
              style={{ resize: "none", lineHeight: "1.7" }}
            />
          </div>

          {/* Submit */}
          <div className="py-2">
            <button
              className="w-full rounded-2xl bg-crimson-600 px-7 py-3 font-sans text-2xl font-medium text-white outline outline-2 outline-offset-[-2px] outline-black/25 transition hover:bg-crimson-700 active:scale-[0.97] disabled:active:scale-100 disabled:cursor-not-allowed flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-saffron-500"
              style={{ boxShadow: SUBMIT_SHADOW }}
              onClick={handleSubmit}
              disabled={status === "loading"}
              aria-label={status === "loading" ? t.submittingLabel : undefined}
            >
              {status === "loading" ? <Spinner /> : t.submitLabel}
            </button>
          </div>

          <div aria-live="polite" aria-atomic="true">
            {status === "error" && <FieldError msg={t.errorMsg} />}
          </div>

        </div>
      </div>
    </section>
  );
}
