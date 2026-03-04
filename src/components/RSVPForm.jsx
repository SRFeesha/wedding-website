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

export default function RSVPForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    attending: null,
    dietary: "",
    arrival: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const DEADLINE = "June 1, 2026";

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!form.firstName || !form.lastName) {
      setErrorMsg("Please enter your full name.");
      return;
    }
    if (form.attending === null) {
      setErrorMsg("Please let us know if you'll be attending.");
      return;
    }
    setErrorMsg("");
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
      <div className="min-h-screen flex items-center justify-center bg-stone-50 px-4">
        <div className="text-center max-w-md">
          <div className="text-5xl mb-6">🌿</div>
          <h2
            className="text-3xl mb-3 text-stone-700"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, letterSpacing: "0.05em" }}
          >
            {form.attending ? "We can't wait to celebrate with you." : "We'll miss you."}
          </h2>
          <p className="text-stone-500 text-sm tracking-wide">
            {form.attending
              ? "Your RSVP has been received. More details to follow."
              : "Thank you for letting us know. We'll be thinking of you."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@300;400&display=swap');

        .rsvp-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid #d6d3d1;
          padding: 8px 0;
          font-family: 'Jost', sans-serif;
          font-size: 0.9rem;
          font-weight: 300;
          color: #44403c;
          outline: none;
          transition: border-color 0.2s;
        }
        .rsvp-input:focus {
          border-bottom-color: #a8a29e;
        }
        .rsvp-input::placeholder {
          color: #c4bfba;
        }
        .rsvp-select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23a8a29e' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 4px center;
          padding-right: 24px;
          cursor: pointer;
        }
        .attend-btn {
          flex: 1;
          padding: 12px;
          border: 1px solid #d6d3d1;
          background: transparent;
          font-family: 'Jost', sans-serif;
          font-size: 0.8rem;
          font-weight: 300;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #78716c;
          cursor: pointer;
          transition: all 0.2s;
        }
        .attend-btn:hover {
          border-color: #a8a29e;
          color: #44403c;
        }
        .attend-btn.selected-yes {
          background: #44403c;
          border-color: #44403c;
          color: #fafaf9;
        }
        .attend-btn.selected-no {
          background: #d6d3d1;
          border-color: #d6d3d1;
          color: #44403c;
        }
        .submit-btn {
          width: 100%;
          padding: 14px;
          background: #44403c;
          color: #fafaf9;
          border: none;
          font-family: 'Jost', sans-serif;
          font-size: 0.8rem;
          font-weight: 300;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.2s;
        }
        .submit-btn:hover {
          background: #292524;
        }
        .submit-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .ornament {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #d6d3d1;
          font-size: 0.7rem;
          letter-spacing: 0.2em;
        }
        .ornament::before,
        .ornament::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #e7e5e4;
        }
      `}</style>

      <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-lg">

          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-xs tracking-widest text-stone-400 uppercase mb-4" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
              You're invited
            </p>
            <h1
              className="text-5xl text-stone-700 mb-2"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, letterSpacing: "0.03em" }}
            >
              RSVP
            </h1>
            <p
              className="text-xl text-stone-400 italic mb-6"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
            >
              September 2026 · Sicily
            </p>
            <div className="ornament" style={{ fontFamily: "'Jost', sans-serif" }}>
              Please respond by {DEADLINE}
            </div>
          </div>

          {/* Form */}
          <div className="space-y-8">

            {/* Name */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-xs tracking-widest text-stone-400 uppercase mb-2" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
                  First Name
                </label>
                <input
                  className="rsvp-input"
                  placeholder="Maria"
                  value={form.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs tracking-widest text-stone-400 uppercase mb-2" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
                  Last Name
                </label>
                <input
                  className="rsvp-input"
                  placeholder="Rossi"
                  value={form.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                />
              </div>
            </div>

            {/* Attendance */}
            <div>
              <label className="block text-xs tracking-widest text-stone-400 uppercase mb-3" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
                Will you be joining us?
              </label>
              <div className="flex gap-3">
                <button
                  className={`attend-btn ${form.attending === true ? "selected-yes" : ""}`}
                  onClick={() => handleChange("attending", true)}
                >
                  Joyfully accepts
                </button>
                <button
                  className={`attend-btn ${form.attending === false ? "selected-no" : ""}`}
                  onClick={() => handleChange("attending", false)}
                >
                  Regretfully declines
                </button>
              </div>
            </div>

            {/* Conditional fields — only if attending */}
            {form.attending === true && (
              <>
                {/* Dietary */}
                <div>
                  <label className="block text-xs tracking-widest text-stone-400 uppercase mb-2" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
                    Dietary Preferences
                  </label>
                  <select
                    className="rsvp-input rsvp-select"
                    value={form.dietary}
                    onChange={(e) => handleChange("dietary", e.target.value)}
                  >
                    <option value="" disabled>Select an option</option>
                    {DIETARY_OPTIONS.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </div>

                {/* Arrival */}
                <div>
                  <label className="block text-xs tracking-widest text-stone-400 uppercase mb-2" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
                    Planned Arrival
                  </label>
                  <select
                    className="rsvp-input rsvp-select"
                    value={form.arrival}
                    onChange={(e) => handleChange("arrival", e.target.value)}
                  >
                    <option value="" disabled>Select an option</option>
                    {ARRIVAL_OPTIONS.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </div>
              </>
            )}

            {/* Message */}
            <div>
              <label className="block text-xs tracking-widest text-stone-400 uppercase mb-2" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
                A note for the couple <span className="normal-case">(optional)</span>
              </label>
              <textarea
                className="rsvp-input"
                placeholder="Share a wish, a memory, or anything you'd like us to know…"
                rows={3}
                value={form.message}
                onChange={(e) => handleChange("message", e.target.value)}
                style={{ resize: "none", lineHeight: "1.7" }}
              />
            </div>

            {/* Error */}
            {errorMsg && (
              <p className="text-xs text-red-400 tracking-wide" style={{ fontFamily: "'Jost', sans-serif" }}>
                {errorMsg}
              </p>
            )}

            {/* Submit */}
            <button
              className="submit-btn"
              onClick={handleSubmit}
              disabled={status === "loading"}
            >
              {status === "loading" ? "Sending…" : "Send RSVP"}
            </button>

            {status === "error" && (
              <p className="text-xs text-center text-red-400 tracking-wide" style={{ fontFamily: "'Jost', sans-serif" }}>
                Something went wrong. Please try again or contact us directly.
              </p>
            )}

          </div>
        </div>
      </div>
    </>
  );
}
