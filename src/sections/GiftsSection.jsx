import { useState } from "react"
import { CopyIcon, CheckCircleIcon } from "@phosphor-icons/react"
import { useInView } from "../hooks/useInView"

const ease = "cubic-bezier(0.25, 1, 0.5, 1)"

export default function GiftsSection({ copy }) {
  const [copied, setCopied] = useState(false)
  const [ref, inView] = useInView()

  const handleCopy = () => {
    navigator.clipboard.writeText(copy.ibanNumber.replace(/\s/g, ""))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="gifts" className="bg-canvas-100 px-5 py-20 sm:px-8">
      <div
        ref={ref}
        className="mx-auto flex max-w-2xl flex-col items-center gap-5 text-center"
        style={inView ? { animation: `fadeInUp 560ms ${ease} both` } : { opacity: 0 }}
      >
        <h2 className="font-display text-5xl font-semibold text-ink">
          {copy.giftsTitle}
        </h2>

        <p className="font-body text-xl leading-8 text-ink/85">
          {copy.giftsBody}
        </p>

        <div className="flex flex-col items-center gap-3">
          <p className="font-mono text-xl font-medium tracking-wide text-ink/90">
            {copy.ibanNumber}
          </p>

          <button
            onClick={handleCopy}
            aria-label={copied ? copy.copiedIban : copy.copyIban}
            className="inline-flex items-center gap-1 rounded-xl bg-black/10 px-3.5 py-2.5 font-ibm text-base font-medium text-ink/90 transition duration-200 ease-spring hover:bg-black/15 active:scale-[0.94]"
          >
            <span aria-live="polite" aria-atomic="true">
              {copied ? copy.copiedIban : copy.copyIban}
            </span>
            {copied ? (
              <CheckCircleIcon
                size={16}
                weight="bold"
                className="text-forest-700"
                aria-hidden="true"
                style={{ animation: "scaleIn 200ms cubic-bezier(0.34, 1.56, 0.64, 1) both" }}
              />
            ) : (
              <CopyIcon size={16} weight="bold" style={{ opacity: 0.5 }} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </section>
  )
}
