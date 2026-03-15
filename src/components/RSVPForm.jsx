import { useState, useRef } from "react";
import {
  WarningCircleIcon, CircleNotchIcon, CaretDownIcon,
  BusIcon, CarIcon, QuestionIcon,
  BabyIcon, ConfettiIcon, UserIcon,
  ForkKnifeIcon, HeartIcon,
  LeafIcon, CheeseIcon, GrainsSlashIcon,
} from "@phosphor-icons/react";

const labelClass =
  "block font-ibm text-base font-semibold uppercase tracking-tight text-ink/70 px-1.5 pb-1";

function inputClass(hasError) {
  if (hasError)
    return "w-full rounded-2xl bg-white px-4 py-3 font-ibm text-[18px] text-ink outline outline-2 outline-error focus:outline-error transition";
  return "w-full rounded-2xl bg-white px-4 py-3 font-ibm text-[18px] text-ink outline outline-2 outline-black/20 focus:outline-ink/40 transition";
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
const AGE_ICONS       = { baby: BabyIcon, kid: ConfettiIcon, adult: UserIcon };
const BABY_SEATING_ICONS = { table: ForkKnifeIcon, nanny: HeartIcon };

const SUBMIT_SHADOW =
  "0px 2px 4px 0px rgba(0,0,0,0.30), inset 0px 8px 8px 0px rgba(255,255,255,0.05)";

const bodyDelay = 2000;

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
  const addGuest = () => {
    const id = ++guestIdRef.current;
    setForm((p) => ({
      ...p,
      guests: [...p.guests, { id, name: "", ageGroup: null, dietary: t.dietaryOptions[0], dietaryNote: "", babySeating: null }],
    }));
  };

  const removeGuest = (i) =>
    setForm((p) => ({ ...p, guests: p.guests.filter((_, idx) => idx !== i) }));

  const updateGuest = (i, field, value) =>
    setForm((p) => ({
      ...p,
      guests: p.guests.map((g, idx) => (idx === i ? { ...g, [field]: value } : g)),
    }));

  const handleSubmit = async () => {
    const newErrors = {};
    if (!form.name) newErrors.name = t.validationName;
    if (form.attending === null) newErrors.attending = t.validationAttendance;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
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

  return (
    <section id="rsvp" className="bg-canvas-50 px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="text-center">
          <h2 className="font-display text-5xl font-semibold text-ink">{t.title}</h2>
          <p className="mt-3 font-display text-xl italic text-ink/75">{t.deadline}</p>
        </div>

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
            <div
              role="group"
              aria-labelledby="attendance-label"
              aria-describedby={errors.attending ? "rsvp-attending-error" : undefined}
              className={`flex rounded-2xl p-1.5 backdrop-blur-sm outline outline-offset-[-1px] transition ${
                errors.attending
                  ? "bg-error/8 outline-error"
                  : "bg-white/90 outline-black/20"
              }`}
            >
              {[
                { value: true, label: t.attendanceYes },
                { value: false, label: t.attendanceNo },
              ].map((opt, i) => {
                const active = form.attending === opt.value;
                return (
                  <div key={i} className="flex flex-1 items-stretch">
                    {i > 0 && form.attending === null && (
                      <div className="w-px self-stretch bg-black/20" />
                    )}
                    <button
                      className={`flex-1 rounded-xl px-3.5 py-1.5 font-ibm text-base font-medium leading-6 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson-600 ${
                        active
                          ? "bg-crimson-600 text-white outline outline-1 outline-offset-[-1px] outline-black/25"
                          : "text-ink"
                      }`}
                      style={
                        active
                          ? { boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.30), inset 0px 4px 4px 0px rgba(255,255,255,0.05)" }
                          : undefined
                      }
                      aria-pressed={active}
                      onClick={() => handleChange("attending", opt.value)}
                    >
                      {opt.label}
                    </button>
                  </div>
                );
              })}
            </div>
            <FieldError id="rsvp-attending-error" msg={errors.attending} />
          </div>

          {/* Transport (conditional) */}
          {form.attending === true && (
            <div style={{ animation: "fadeInUp 380ms cubic-bezier(0.25, 1, 0.5, 1) both" }}>
              <label id="transport-label" className={labelClass}>{t.transportLabel}</label>
              <div role="group" aria-labelledby="transport-label" className="space-y-2.5">
                {t.transportOptions.map((opt) => {
                  const active = form.transport === opt.value;
                  const Icon = TRANSPORT_ICONS[opt.value];
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      aria-pressed={active}
                      onClick={() => handleChange("transport", opt.value)}
                      className={`w-full rounded-2xl px-5 py-3.5 text-left outline outline-2 outline-offset-[-2px] transition ${
                        active
                          ? "bg-crimson-600 text-white outline-black/25"
                          : "bg-white text-ink outline-black/20 hover:outline-ink/40"
                      }`}
                      style={active ? { boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.25), inset 0px 4px 4px 0px rgba(255,255,255,0.05)" } : undefined}
                    >
                      <div className="flex items-center gap-3">
                        {Icon && <Icon size={20} weight={active ? "fill" : "bold"} aria-hidden="true" className="shrink-0" />}
                        <div>
                          <span className="block font-ibm text-base font-semibold leading-snug">{opt.label}</span>
                          <span className={`block font-ibm text-sm ${active ? "text-white/70" : "text-ink/50"}`}>{opt.sublabel}</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Dietary (conditional) */}
          {form.attending === true && (
            <div style={{ animation: "fadeInUp 380ms cubic-bezier(0.25, 1, 0.5, 1) 60ms both" }}>
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
              {form.dietary === t.dietaryOtherValue && (
                <div className="pl-4 pt-3 pb-1">
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
              )}
            </div>
          )}

          {/* Additional guests */}
          {form.attending === true && (
            <div style={{ animation: "fadeInUp 380ms cubic-bezier(0.25, 1, 0.5, 1) 120ms both" }} className="space-y-8">
              {form.guests.map((guest, i) => (
                <div key={guest.id} className="space-y-5 rounded-2xl bg-white p-5 outline outline-2 outline-offset-[-2px] outline-black/20" style={{ animation: "fadeInUp 350ms cubic-bezier(0.25, 1, 0.5, 1) both" }}>
                  <div className="flex items-center justify-between">
                    <span id={`guest-heading-${i}`} className={labelClass}>{t.ageGroupLabel} — {guest.name || `#${i + 2}`}</span>
                    <button
                      type="button"
                      aria-label={`${t.removeGuestLabel} ${guest.name || `#${i + 2}`}`}
                      onClick={() => removeGuest(i)}
                      className="font-ibm text-sm font-medium text-ink/50 rounded-lg border border-transparent px-3 py-1 transition hover:border-ink/20 hover:bg-ink/5 hover:text-ink/80"
                    >
                      {t.removeGuestLabel}
                    </button>
                  </div>

                  <input
                    id={`guest-name-${i}`}
                    aria-label={t.namePlaceholder}
                    className={inputClass(false)}
                    placeholder={t.namePlaceholder}
                    value={guest.name}
                    onChange={(e) => updateGuest(i, "name", e.target.value)}
                  />

                  <div
                    role="group"
                    aria-labelledby={`guest-age-label-${i}`}
                  >
                    <span id={`guest-age-label-${i}`} className={labelClass}>{t.ageGroupLabel}</span>
                    <div className="mt-1 space-y-2.5">
                      {t.ageGroupOptions.map((opt) => {
                        const active = guest.ageGroup === opt.value;
                        const Icon = AGE_ICONS[opt.value];
                        return (
                          <div key={opt.value}>
                            <button
                              type="button"
                              aria-pressed={active}
                              onClick={() => updateGuest(i, "ageGroup", opt.value)}
                              className={`w-full rounded-2xl px-5 py-3.5 text-left outline outline-2 outline-offset-[-2px] transition ${
                                active
                                  ? "bg-crimson-600 text-white outline-black/25"
                                  : "bg-white text-ink outline-black/20 hover:outline-ink/40"
                              }`}
                              style={active ? { boxShadow: "0px 1px 2px rgba(0,0,0,0.25), inset 0px 4px 4px rgba(255,255,255,0.05)" } : undefined}
                            >
                              <div className="flex items-center gap-3">
                                {Icon && <Icon size={20} weight={active ? "fill" : "bold"} aria-hidden="true" className="shrink-0" />}
                                <div>
                                  <span className="block font-ibm text-base font-semibold leading-snug">{opt.label}</span>
                                  <span className={`block font-ibm text-sm ${active ? "text-white/70" : "text-ink/50"}`}>{opt.sublabel}</span>
                                </div>
                              </div>
                            </button>

                            {opt.value === "baby" && active && (
                              <div className="pl-4 pt-3 pb-1" role="group" aria-labelledby={`guest-babyseating-label-${i}`}>
                                <span id={`guest-babyseating-label-${i}`} className={labelClass}>{t.babySeatingLabel}</span>
                                <div className="mt-1 space-y-2.5">
                                  {t.babySeatingOptions.map((bOpt) => {
                                    const bActive = guest.babySeating === bOpt.value;
                                    const BIcon = BABY_SEATING_ICONS[bOpt.value];
                                    return (
                                      <button
                                        key={bOpt.value}
                                        type="button"
                                        aria-pressed={bActive}
                                        onClick={() => updateGuest(i, "babySeating", bOpt.value)}
                                        className={`w-full rounded-2xl px-5 py-3.5 text-left outline outline-2 outline-offset-[-2px] transition ${
                                          bActive
                                            ? "bg-crimson-600 text-white outline-black/25"
                                            : "bg-white text-ink outline-black/20 hover:outline-ink/40"
                                        }`}
                                        style={bActive ? { boxShadow: "0px 1px 2px rgba(0,0,0,0.25), inset 0px 4px 4px rgba(255,255,255,0.05)" } : undefined}
                                      >
                                        <div className="flex items-center gap-3">
                                          {BIcon && <BIcon size={20} weight={bActive ? "fill" : "bold"} aria-hidden="true" className="shrink-0" />}
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
                            )}

                            {opt.value === "adult" && active && (
                              <div className="pl-4 pt-3 pb-1">
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
                                {guest.dietary === t.dietaryOtherValue && (
                                  <div className="pl-4 pt-3 pb-1">
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
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addGuest}
                className="w-full rounded-2xl border-2 border-dashed border-black/20 bg-white/90 py-3.5 font-ibm text-base font-medium text-ink/70 transition hover:border-ink/40 hover:text-ink/90"
              >
                {t.addGuestLabel}
              </button>
            </div>
          )}

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
              className="w-full rounded-2xl bg-crimson-600 px-7 py-3 font-sans text-2xl font-medium text-white outline outline-2 outline-offset-[-2px] outline-black/25 transition hover:bg-crimson-700 disabled:cursor-not-allowed flex items-center justify-center"
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
