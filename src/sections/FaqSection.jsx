export default function FaqSection({ copy }) {
  return (
    <section id="faq" className="bg-canvas-100 px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-center font-display text-4xl text-ink sm:text-5xl">
          {copy.faqTitle}
        </h2>
        <ul className="mt-8">
          {copy.faqList.map((item) => (
            <li key={item.q} className="py-5">
              <h3 className="font-display text-[24px] font-semibold leading-[1.25] text-ink">
                {item.q}
              </h3>
              {item.a && (
                <p className="mt-2 font-body text-[24px] leading-[1.25] text-ink/85">
                  {item.a}
                </p>
              )}
              {item.items && (
                <div className="mt-2 space-y-2">
                  {item.items.map((line) => (
                    <p key={line} className="font-body text-[24px] leading-[1.25] text-ink/85">
                      {line}
                    </p>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
