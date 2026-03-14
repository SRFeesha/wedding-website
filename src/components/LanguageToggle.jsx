const ACTIVE_SHADOW =
  "0px 1px 2px 0px rgba(0,0,0,0.30), inset 0px 4px 4px 0px rgba(255,255,255,0.05)"

export default function LanguageToggle({ locale, onChange }) {
  return (
    <div
      className="inline-flex h-12 items-center gap-0 rounded-full p-1.5 outline outline-1 outline-offset-[-1px] outline-black/20 backdrop-blur-sm bg-canvas-50/60"
      role="group"
      aria-label="Language selector"
    >
      {[
        { id: "it", label: "Italiano" },
        { id: "en", label: "English" },
      ].map((item) => {
        const active = item.id === locale
        return (
          <button
            key={item.id}
            type="button"
            className={`rounded-full px-3.5 py-1.5 font-sans text-base font-medium leading-6 transition outline-none ${
              active
                ? "bg-crimson-600 text-white outline outline-1 outline-offset-[-1px] outline-black/25"
                : "text-ink"
            }`}
            style={active ? { boxShadow: ACTIVE_SHADOW } : undefined}
            aria-pressed={active}
            onClick={() => onChange(item.id)}
          >
            {item.label}
          </button>
        )
      })}
    </div>
  )
}
