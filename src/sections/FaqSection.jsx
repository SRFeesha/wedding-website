import { useState } from "react"
import { CaretDownIcon } from "@phosphor-icons/react"
import { useInView } from "../hooks/useInView"

const ease = "cubic-bezier(0.25, 1, 0.5, 1)"

export default function FaqSection({ copy }) {
  const [openItems, setOpenItems] = useState(() => new Set())
  const [ref, inView] = useInView()

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
                      {item.items && (
                        <div className="space-y-2">
                          {item.items.map((line) => (
                            <p key={line} className="font-body text-[24px] leading-[1.25] text-ink/85">
                              {line}
                            </p>
                          ))}
                        </div>
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
