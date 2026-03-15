import { motion, LayoutGroup } from "framer-motion"

const ACTIVE_SHADOW =
  "0px 1px 2px 0px rgba(0,0,0,0.30), inset 0px 4px 4px 0px rgba(255,255,255,0.05)"

const SPRING = { type: "spring", stiffness: 380, damping: 35 }

const OPTIONS = [
  { id: "it", label: "Italiano" },
  { id: "en", label: "English" },
]

export default function LanguageToggle({ locale, onChange }) {
  return (
    <LayoutGroup>
      <div
        className="inline-flex h-12 items-center rounded-full p-1.5 outline outline-1 outline-offset-[-1px] outline-black/20 backdrop-blur-sm bg-canvas-50/60"
        role="group"
        aria-label="Language selector"
      >
        {OPTIONS.map((item) => {
          const active = item.id === locale
          return (
            <button
              key={item.id}
              type="button"
              className={`relative rounded-full px-3.5 py-1.5 font-sans text-base font-medium leading-6 transition-colors duration-200 ease-spring focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson-600 ${
                active ? "text-white" : "text-ink"
              }`}
              aria-pressed={active}
              onClick={() => onChange(item.id)}
            >
              {active && (
                <motion.span
                  layoutId="lang-pill"
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full bg-crimson-600"
                  style={{ boxShadow: ACTIVE_SHADOW }}
                  transition={SPRING}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </button>
          )
        })}
      </div>
    </LayoutGroup>
  )
}
