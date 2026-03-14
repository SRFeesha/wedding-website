import { useState } from "react";

const DIETARY_OPTIONS = [
  "No restrictions",
  "Vegetarian",
  "Vegan",
  "Gluten-free",
  "Halal",
  "Kosher",
  "Other (see note)",
];

const ERROR = "#B5340F";

const labelClass =
  "block font-sans text-base font-semibold uppercase tracking-tight text-ink/70 px-1.5 pb-1";

function inputClass(hasError) {
  if (hasError)
    return "w-full rounded-2xl bg-white px-4 py-3 font-body text-[18px] text-ink outline outline-2 outline-[#B5340F] focus:outline-[#B5340F] transition";
  return "w-full rounded-2xl bg-white px-4 py-3 font-body text-[18px] text-ink outline outline-2 outline-black/20 focus:outline-ink/40 transition";
}

function FieldError({ msg }) {
  if (!msg) return null;
  return (
    <p className="mt-1.5 flex items-center gap-1.5 text-xs" style={{ color: ERROR }}>
      <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}>
        <path d="M8 1a7 7 0 1 1 0 14A7 7 0 0 1 8 1Zm-.75 3.25a.75.75 0 0 1 1.5 0v3.5a.75.75 0 0 1-1.5 0v-3.5ZM8 11a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
      </svg>
      {msg}
    </p>
  );
}

function Chevron() {
  return (
    <svg
      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink/40"
      width="13" height="13" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

const SUBMIT_SHADOW =
  "0px 2px 4px 0px rgba(0,0,0,0.30), inset 0px 8px 8px 0px rgba(255,255,255,0.05)";

export default function RSVPForm() {
  const [form, setForm] = useState({
    name: "",
    attending: null,
    dietary: "",
    message: "",
  });
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async () => {
    const newErrors = {};
    if (!form.name) newErrors.name = "Please enter your name.";
    if (form.attending === null)
      newErrors.attending = "Please let us know if you'll be joining us.";

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
          dietary: form.dietary || "No restrictions",
          message: form.message,
        }),
      });

      if (!res.ok) throw new Error("Submission failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <section className="bg-canvas-50 px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-[600px] text-center py-8">
          <h2 className="font-display text-5xl font-semibold text-ink">
            {form.attending ? "See you in Sicily." : "We'll miss you."}
          </h2>
          <p className="mt-4 text-ink/75">
            {form.attending
              ? "Your RSVP has been received. More details to follow."
              : "Thank you for letting us know. We'll be thinking of you."}
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
          <h2 className="font-display text-5xl font-semibold text-ink">RSVP</h2>
          <p className="mt-3 font-body text-xl text-ink/75">
            Please respond by June 1, 2026.
          </p>
        </div>

        <div className="mx-auto mt-9 max-w-[600px] space-y-8">

          {/* Full name */}
          <div>
            <label className={labelClass}>Nome completo</label>
            <input
              className={inputClass(!!errors.name)}
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
            <FieldError msg={errors.name} />
          </div>

          {/* Attendance — segmented control */}
          <div>
            <label className={labelClass}>Will you be joining us?</label>
            <div
              className={`flex rounded-2xl p-1.5 backdrop-blur-sm outline outline-offset-[-1px] transition ${
                errors.attending
                  ? "bg-[#FDF5F0] outline-[#B5340F]"
                  : "bg-canvas-50/60 outline-black/20"
              }`}
            >
              {[
                { value: true, label: "Joyfully accepts" },
                { value: false, label: "Regretfully declines" },
              ].map((opt, i) => {
                const active = form.attending === opt.value;
                return (
                  <div key={i} className="flex flex-1 items-stretch">
                    {i > 0 && form.attending === null && (
                      <div className="w-px self-stretch bg-black/20" />
                    )}
                    <button
                      className={`flex-1 rounded-full px-3.5 py-1.5 font-sans text-base font-medium leading-6 transition outline-none ${
                        active
                          ? "bg-crimson-600 text-white outline outline-1 outline-offset-[-1px] outline-black/25"
                          : "text-ink"
                      }`}
                      style={
                        active
                          ? { boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.30), inset 0px 4px 4px 0px rgba(255,255,255,0.05)" }
                          : undefined
                      }
                      onClick={() => handleChange("attending", opt.value)}
                    >
                      {opt.label}
                    </button>
                  </div>
                );
              })}
            </div>
            <FieldError msg={errors.attending} />
          </div>

          {/* Dietary (conditional) */}
          {form.attending === true && (
            <div>
              <label className={labelClass}>Dietary Preferences</label>
              <div className="relative">
                <select
                  className={`${inputClass(false)} appearance-none cursor-pointer pr-8`}
                  value={form.dietary}
                  onChange={(e) => handleChange("dietary", e.target.value)}
                >
                  <option value="" disabled>Select an option</option>
                  {DIETARY_OPTIONS.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
                <Chevron />
              </div>
            </div>
          )}

          {/* Message */}
          <div>
            <label className={labelClass}>Vuoi lasciare una nota? :)</label>
            <textarea
              className={inputClass(false)}
              rows={3}
              value={form.message}
              onChange={(e) => handleChange("message", e.target.value)}
              style={{ resize: "none", lineHeight: "1.7" }}
            />
          </div>

          {/* Submit */}
          <div className="py-2">
            <button
              className="w-full rounded-2xl bg-crimson-600 px-7 py-3 font-sans text-2xl font-medium text-white outline outline-2 outline-offset-[-2px] outline-black/25 transition hover:bg-crimson-700 disabled:cursor-not-allowed disabled:opacity-50"
              style={{ boxShadow: SUBMIT_SHADOW }}
              onClick={handleSubmit}
              disabled={status === "loading"}
            >
              {status === "loading" ? "Invio…" : "Invia"}
            </button>
          </div>

          {status === "error" && (
            <FieldError msg="Something went wrong. Please try again or contact us directly." />
          )}

        </div>
      </div>
    </section>
  );
}
