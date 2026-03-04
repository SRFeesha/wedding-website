const sliders = [
  { key: "openToRevealMs", label: "Open -> website delay", min: 120, max: 2200, step: 20, unit: "ms" },
  { key: "overlayFadeMs", label: "Overlay fade", min: 80, max: 1400, step: 20, unit: "ms" },
  { key: "envelopeMoveMs", label: "Envelope move", min: 120, max: 1800, step: 20, unit: "ms" },
  { key: "flapMs", label: "Flap open", min: 120, max: 1800, step: 20, unit: "ms" },
  { key: "previewMs", label: "Letter preview", min: 120, max: 1800, step: 20, unit: "ms" },
  { key: "siteRevealMs", label: "Website reveal", min: 120, max: 1800, step: 20, unit: "ms" },
  { key: "openingScale", label: "Opening scale", min: 1, max: 1.2, step: 0.01, unit: "x" },
  { key: "openingOpacity", label: "Opening opacity", min: 0.3, max: 1, step: 0.01, unit: "" },
  { key: "easeX1", label: "Ease x1", min: 0, max: 1, step: 0.01, unit: "" },
  { key: "easeY1", label: "Ease y1", min: -0.4, max: 1.4, step: 0.01, unit: "" },
  { key: "easeX2", label: "Ease x2", min: 0, max: 1, step: 0.01, unit: "" },
  { key: "easeY2", label: "Ease y2", min: -0.4, max: 1.4, step: 0.01, unit: "" },
];

function displayValue(value, unit) {
  if (typeof value !== "number") return value;
  const rounded = Number.isInteger(value) ? value.toString() : value.toFixed(2);
  return unit ? `${rounded}${unit}` : rounded;
}

export default function TransitionTuner({ tuning, onChange, onResetEnvelope }) {
  const easingText = `cubic-bezier(${tuning.easeX1}, ${tuning.easeY1}, ${tuning.easeX2}, ${tuning.easeY2})`;

  return (
    <aside className="fixed bottom-3 right-3 z-[80] w-[min(94vw,360px)] rounded-2xl border border-[#dcc7a9] bg-canvas-50/95 p-3 shadow-[0_10px_28px_rgba(58,34,25,0.18)] backdrop-blur">
      <details open>
        <summary className="cursor-pointer select-none font-semibold text-ink">Transition Tuner</summary>
        <div className="mt-3 max-h-[56vh] space-y-2 overflow-y-auto pr-1">
          {sliders.map((slider) => (
            <label key={slider.key} className="block">
              <div className="mb-1 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.08em] text-ink/70">
                <span>{slider.label}</span>
                <span>{displayValue(tuning[slider.key], slider.unit)}</span>
              </div>
              <input
                type="range"
                min={slider.min}
                max={slider.max}
                step={slider.step}
                value={tuning[slider.key]}
                onChange={(event) => onChange(slider.key, Number(event.target.value))}
                className="w-full accent-crimson-700"
              />
            </label>
          ))}
        </div>

        <p className="mt-3 rounded-lg bg-white/65 px-2 py-1 text-[11px] text-ink/80">{easingText}</p>

        <button
          type="button"
          onClick={onResetEnvelope}
          className="mt-3 inline-flex rounded-full border border-crimson-700/35 bg-white px-4 py-2 text-sm font-semibold text-crimson-700 transition hover:bg-canvas-100"
        >
          Reset envelope
        </button>
      </details>
    </aside>
  );
}
