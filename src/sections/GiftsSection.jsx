const IBAN = "IT00 X000 0000 0000 0000 0000 000"

export default function GiftsSection({ copy }) {
  return (
    <section id="gifts" className="bg-canvas-100 px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-center font-display text-4xl text-ink sm:text-5xl">
          {copy.giftsTitle}
        </h2>
        <p className="mt-4 text-center text-ink/85">{copy.giftsBody}</p>
        <div className="mt-6 rounded-3xl border border-[#C4A87A] bg-white/80 px-6 py-4">
          <p className="font-sans text-xs uppercase tracking-widest text-ink/50">IBAN</p>
          <p className="mt-1 font-mono text-base tracking-wider text-ink/90">{IBAN}</p>
        </div>
      </div>
    </section>
  )
}
