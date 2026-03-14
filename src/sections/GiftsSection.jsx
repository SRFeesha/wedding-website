import { useState } from "react"

const IBAN = "DE71 1001 0178 1814 7799 50"

const COPY_SHADOW =
  "0px 1px 2px 0px rgba(0,0,0,0.30), inset 0px 4px 4px 0px rgba(255,255,255,0.05)"

export default function GiftsSection({ copy }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(IBAN.replace(/\s/g, ""))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="gifts" className="bg-canvas-100 px-5 py-20 sm:px-8">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 text-center">
        <h2 className="font-display text-5xl font-semibold text-ink">
          {copy.giftsTitle}
        </h2>

        <p className="font-body text-xl leading-8 text-ink/85">
          {copy.giftsBody}
        </p>

        <div className="flex flex-col items-center gap-3">
          <p className="font-mono text-xl font-medium tracking-wide text-ink/90">
            {IBAN}
          </p>

          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1 rounded-xl bg-black/10 px-3.5 py-1.5 font-sans text-base font-medium text-ink/90 outline outline-1 outline-offset-[-1px] outline-black/15 transition hover:bg-black/15"
            style={{ boxShadow: COPY_SHADOW }}
          >
            {copied ? "Copied!" : "Copy IBAN"}
            {/* Copy icon — two overlapping squares */}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <rect x="5.33" y="5.33" width="8" height="8" rx="1" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.33"/>
              <rect x="2" y="2" width="8" height="8" rx="1" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.33"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
