export default function SectionBlock({
  id,
  title,
  intro,
  children,
  bullets = [],
  aside = null,
  asideRight = false,
}) {
  return (
    <section id={id} className="scroll-mt-24 border-b border-[#dec8ad] py-10 sm:py-12">
      <div className="grid gap-8 sm:grid-cols-12">
        <div className={`space-y-5 ${aside ? "sm:col-span-7" : "sm:col-span-12"}`}>
          <h2 className="font-display text-4xl text-ink sm:text-5xl">{title}</h2>
          {intro ? <p className="text-[18px] text-ink/90 sm:text-[19px]">{intro}</p> : null}
          {bullets.length > 0 ? (
            <ul className="space-y-3 text-[18px] leading-relaxed text-ink/90 sm:text-[19px]">
              {bullets.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden className="pt-1 text-saffron-600">
                    ●
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : null}
          {children ? <div className="pt-3">{children}</div> : null}
        </div>
        {aside ? (
          <div className={`sm:col-span-5 ${asideRight ? "sm:pt-12" : "sm:-translate-y-4"}`}>{aside}</div>
        ) : null}
      </div>
    </section>
  );
}
