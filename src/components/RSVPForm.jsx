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

const ARRIVAL_OPTIONS = [
  "Friday afternoon (before dinner)",
  "Friday evening",
  "Saturday morning",
  "Saturday afternoon",
  "Day of only (Saturday)",
];

const labelClass = "block text-xs font-semibold uppercase tracking-widest text-ink/50 mb-2";

function inputClass(hasError) {
  return `w-full bg-transparent border-b pb-2 font-body text-[18px] text-ink placeholder:text-ink/30 outline-none transition-colors ${
    hasError
      ? "border-amber-500 focus:border-amber-500"
      : "border-[#C4A87A] focus:border-ink/50"
  }`;
}

function FieldError({ msg }) {
  if (!msg) return null;
  return <p className="mt-1.5 text-xs text-amber-500">{msg}</p>;
}

function Chevron() {
  return (
    <svg
      className="pointer-events-none absolute right-0 bottom-3 text-ink/40"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export default function RSVPForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    attending: null,
    dietary: "",
    arrival: "",
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
    if (!form.firstName) newErrors.firstName = "Please enter your first name.";
    if (!form.lastName) newErrors.lastName = "Please enter your last name.";
    if (form.attending === null) newErrors.attending = "Please let us know if you'll be joining us.";

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
          name: `${form.firstName} ${form.lastName}`,
          attending: form.attending ? "Yes" : "No",
          dietary: form.dietary || "No restrictions",
          arrival: form.attending ? form.arrival : "",
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
      <section className="bg-canvas-100 px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-2xl py-8">
          <h2 className="font-display text-4xl text-ink sm:text-5xl">
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
    <section id="rsvp" className="bg-canvas-100 px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-2xl">
        <h2 className="font-display text-4xl text-ink sm:text-5xl">RSVP</h2>
        <p className="mt-3 text-ink/75">Please respond by June 1, 2026.</p>

        <div className="mt-10 space-y-8">

          {/* Name */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>First Name</label>
              <input
                className={inputClass(!!errors.firstName)}
                placeholder="Maria"
                value={form.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
              />
              <FieldError msg={errors.firstName} />
            </div>
            <div>
              <label className={labelClass}>Last Name</label>
              <input
                className={inputClass(!!errors.lastName)}
                placeholder="Rossi"
                value={form.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
              />
              <FieldError msg={errors.lastName} />
            </div>
          </div>

          {/* Attendance */}
          <div>
            <label className={labelClass}>Will you be joining us?</label>
            <div className={`flex gap-3 rounded-full ${errors.attending ? "outline outline-1 outline-amber-500/60 outline-offset-4" : ""}`}>
              <button
                className={`flex-1 rounded-full border py-3 font-body text-[17px] transition ${
                  form.attending === true
                    ? "border-crimson-600 bg-crimson-600 text-canvas-50"
                    : "border-[#C4A87A] bg-white/60 text-ink/50 hover:border-ink/30 hover:text-ink/70"
                }`}
                onClick={() => handleChange("attending", true)}
              >
                Joyfully accepts
              </button>
              <button
                className={`flex-1 rounded-full border py-3 font-body text-[17px] transition ${
                  form.attending === false
                    ? "border-ink/40 bg-ink/10 text-ink"
                    : "border-[#C4A87A] bg-white/60 text-ink/50 hover:border-ink/30 hover:text-ink/70"
                }`}
                onClick={() => handleChange("attending", false)}
              >
                Regretfully declines
              </button>
            </div>
            <FieldError msg={errors.attending} />
          </div>

          {/* Conditional fields */}
          {form.attending === true && (
            <>
              <div>
                <label className={labelClass}>Dietary Preferences</label>
                <div className="relative">
                  <select
                    className={`${inputClass(false)} appearance-none pr-6 cursor-pointer`}
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

              <div>
                <label className={labelClass}>Planned Arrival</label>
                <div className="relative">
                  <select
                    className={`${inputClass(false)} appearance-none pr-6 cursor-pointer`}
                    value={form.arrival}
                    onChange={(e) => handleChange("arrival", e.target.value)}
                  >
                    <option value="" disabled>Select an option</option>
                    {ARRIVAL_OPTIONS.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                  <Chevron />
                </div>
              </div>
            </>
          )}

          {/* Message */}
          <div>
            <label className={labelClass}>
              A note for the couple <span className="normal-case font-normal">(optional)</span>
            </label>
            <textarea
              className={inputClass(false)}
              placeholder="Share a wish, a memory, or anything you'd like us to know…"
              rows={3}
              value={form.message}
              onChange={(e) => handleChange("message", e.target.value)}
              style={{ resize: "none", lineHeight: "1.7" }}
            />
          </div>

          {/* Submit */}
          <div>
            <button
              className="inline-flex rounded-full border border-crimson-600/35 bg-white px-6 py-2.5 font-semibold text-crimson-700 transition hover:bg-canvas-50 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleSubmit}
              disabled={status === "loading"}
            >
              {status === "loading" ? "Sending…" : "Send RSVP"}
            </button>
          </div>

          {/* Submit error */}
          {status === "error" && (
            <p className="text-sm text-amber-500">
              Something went wrong. Please try again or contact us directly.
            </p>
          )}

        </div>
      </div>
    </section>
  );
}
