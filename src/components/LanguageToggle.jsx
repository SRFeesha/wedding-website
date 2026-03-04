export default function LanguageToggle({ locale, onChange }) {
  return (
    <div
      className="inline-flex rounded-full border border-canvas-100 bg-white/95 p-1.5 shadow-card"
      role="group"
      aria-label="Language selector"
    >
      {[
        { id: "it", label: "IT" },
        { id: "en", label: "EN" },
      ].map((item) => {
        const active = item.id === locale;
        return (
          <button
            key={item.id}
            type="button"
            className={`rounded-full px-3.5 py-1.5 text-[15px] font-semibold transition ${
              active
                ? "bg-crimson-600 text-canvas-50"
                : "text-ink hover:bg-canvas-100"
            }`}
            aria-pressed={active}
            onClick={() => onChange(item.id)}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
