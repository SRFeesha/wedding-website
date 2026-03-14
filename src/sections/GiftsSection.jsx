import { useState } from "react"
import { Copy, CircleCheck } from "lucide-react"

const IBAN = "DE71 1001 0178 1814 7799 50"


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
            aria-label={copied ? copy.copiedIban : copy.copyIban}
            className="inline-flex items-center gap-1 rounded-xl bg-black/10 px-3.5 py-1.5 font-ibm text-base font-medium text-ink/90 transition hover:bg-black/15"
          >
            <span aria-live="polite" aria-atomic="true">
              {copied ? copy.copiedIban : copy.copyIban}
            </span>
            {copied ? (
              <CircleCheck size={16} strokeWidth={2.5} color="#3A6647" aria-hidden="true" />
            ) : (
              <Copy size={16} strokeWidth={2.5} style={{ opacity: 0.5 }} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </section>
  )
}
