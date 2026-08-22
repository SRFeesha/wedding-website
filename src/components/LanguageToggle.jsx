import { useState } from "react"
import { motion, LayoutGroup } from "framer-motion"

const ACTIVE_SHADOW =
  "0px 1px 2px 0px rgba(0,0,0,0.12), inset 0px 1px 1px 0px rgba(255,255,255,0.6), inset 0px 0px 0px 1px rgba(0,0,0,0.1)"

const SPRING = { type: "spring", stiffness: 380, damping: 35 }

const OPTIONS = [
  { id: "it", label: "Italiano" },
  { id: "en", label: "English" },
]

export default function LanguageToggle({ locale, onChange }) {
  const [engagedId, setEngagedId] = useState(null)

  const engage = (id) => () => setEngagedId(id)
  const disengage = (id) => () => setEngagedId((prev) => (prev === id ? null : prev))

  return (
    <LayoutGroup>
      <div
        className="inline-flex h-12 items-center rounded-full p-1.5 outline outline-1 outline-offset-[-1px] outline-black/20 backdrop-blur-sm bg-linen-50/60"
        role="group"
        aria-label="Language selector"
      >
        {OPTIONS.map((item) => {
          const active = item.id === locale
          const selfEngaged = engagedId === item.id
          const activeEngaged = engagedId === locale

          let textClass = "text-ink/70"
          if (active) {
            textClass = "text-ink"
          } else if (activeEngaged) {
            textClass = "text-ink/40"
          } else if (selfEngaged) {
            textClass = "text-ink"
          }

          return (
            <button
              key={item.id}
              type="button"
              className={`relative rounded-full px-3.5 py-1.5 font-sans text-base font-medium leading-6 transition-colors duration-200 ease-spring focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sienna-600 ${textClass}`}
              aria-pressed={active}
              onClick={() => onChange(item.id)}
              onMouseEnter={engage(item.id)}
              onMouseLeave={disengage(item.id)}
              onFocus={engage(item.id)}
              onBlur={disengage(item.id)}
            >
              {active && (
                <motion.span
                  layoutId="lang-pill"
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full bg-black/10"
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
