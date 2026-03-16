import { useState } from "react"
import { CaretDownIcon, CopyIcon, CheckCircleIcon } from "@phosphor-icons/react"
import { useInView } from "../hooks/useInView"

const IBAN = "DE71 1001 0178 1814 7799 50"
const ease = "cubic-bezier(0.25, 1, 0.5, 1)"

export default function FaqSection({ copy }) {
  const [openItems, setOpenItems] = useState(() => new Set())
  const [copied, setCopied] = useState(false)
  const [ref, inView] = useInView()

  const handleCopy = () => {
    navigator.clipboard.writeText(IBAN.replace(/\s/g, ""))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const toggle = (index) => {
    setOpenItems((prev) => {
      const next = new Set(prev)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }

  return (
    <section id="faq" className="bg-canvas-100 px-5 py-16 sm:px-8 sm:py-20">
      <div
        ref={ref}
        className="mx-auto max-w-2xl"
        style={inView ? { animation: `fadeInUp 560ms ${ease} both` } : { opacity: 0 }}
      >
        <h2 className="text-center font-display text-5xl font-semibold text-ink [text-wrap:balance]">
          {copy.faqTitle}
        </h2>
        <ul className="mt-8">
          {copy.faqList.map((item, index) => {
            const isOpen = openItems.has(index)
            const isLast = index === copy.faqList.length - 1
            return (
              <li
                key={item.q}
                className={`border-t border-[#C9A87A]/35 ${isLast ? "border-b" : ""}`}
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  aria-expanded={isOpen}
                  onClick={() => toggle(index)}
                >
                  <h3 className="font-display text-[24px] font-semibold leading-[1.25] text-ink">
                    {item.q}
                  </h3>
                  <CaretDownIcon
                    size={20}
                    weight="bold"
                    aria-hidden="true"
                    className="shrink-0 text-saffron-600"
                    style={{
                      transform: isOpen ? "rotate(-180deg)" : "rotate(0deg)",
                      transition: "transform 320ms cubic-bezier(0.34, 1.56, 0.64, 1)",
                    }}
                  />
                </button>

                {/* Smooth height via CSS grid-template-rows trick */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    transition: "grid-template-rows 280ms cubic-bezier(0.25, 1, 0.5, 1)",
                  }}
                >
                  <div style={{ overflow: "hidden" }}>
                    <div
                      className="pb-5"
                      style={{
                        opacity: isOpen ? 1 : 0,
                        transform: isOpen ? "translateY(0px)" : "translateY(-4px)",
                        transition: isOpen
                          ? "opacity 280ms cubic-bezier(0.25, 1, 0.5, 1), transform 280ms cubic-bezier(0.25, 1, 0.5, 1)"
                          : "opacity 200ms cubic-bezier(0.5, 0, 0.75, 0), transform 200ms cubic-bezier(0.5, 0, 0.75, 0)",
                      }}
                    >
                      {item.a && (
                        <p className="font-body text-[24px] leading-[1.25] text-ink/85 [text-wrap:pretty]">
                          {item.a}
                        </p>
                      )}
                      {item.iban && (
                        <div className="mt-4 flex flex-col items-start gap-3">
                          <p className="font-mono text-xl font-medium tracking-wide text-ink/90">
                            {IBAN}
                          </p>
                          <button
                            onClick={handleCopy}
                            aria-label={copied ? copy.copiedIban : copy.copyIban}
                            className="inline-flex items-center gap-1 rounded-xl bg-black/10 px-3.5 py-1.5 font-ibm text-base font-medium text-ink/90 transition duration-200 ease-spring hover:bg-black/15 active:scale-[0.94]"
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
                      )}
                      {item.items && (
                        <ul className="space-y-3">
                          {item.items.map((line) => (
                            <li key={line} className="flex items-start gap-3">
                              <span className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full bg-saffron-600" aria-hidden="true" />
                              <p className="font-body text-[24px] leading-[1.25] text-ink/85 [text-wrap:pretty]">{line}</p>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
