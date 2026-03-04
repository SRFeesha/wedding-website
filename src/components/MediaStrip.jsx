export default function MediaStrip({ copy }) {
  return (
    <section className="rounded-[2rem] border border-[#dcc8ab] bg-white/95 p-7 shadow-card sm:p-10">
      <h2 className="font-display text-4xl text-ink sm:text-5xl">{copy.title}</h2>
      <p className="mt-2 max-w-3xl text-[18px] text-ink/85 sm:text-[19px]">{copy.subtitle}</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {copy.websiteImages.map((image, index) => (
          <article
            key={image.url}
            className={`overflow-hidden rounded-3xl border border-canvas-100 bg-gradient-to-b from-canvas-50 to-[#f4e8da] ${
              index % 2 === 1 ? "sm:translate-y-8" : ""
            }`}
          >
            <img src={image.url} alt={image.alt} loading="lazy" className="h-64 w-full object-cover sm:h-72" />
            <div className="space-y-2 p-5">
              <p className="text-[17px] font-semibold text-ink">{image.credit}</p>
              <a
                href={image.source}
                target="_blank"
                rel="noreferrer"
                className="inline-flex text-[16px] font-semibold text-amber-500 underline-offset-4 hover:underline"
              >
                {copy.linkLabel}
              </a>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-14 grid gap-6">
        {copy.instagramEmbeds.map((item) => (
          <article key={item.permalink} className="rounded-3xl border border-canvas-100 bg-canvas-50 p-4 sm:p-6">
            <p className="mb-4 text-[17px] font-semibold text-ink">{item.captionShort}</p>
            <iframe
              src={`${item.permalink}embed/captioned`}
              title={`Instagram ${item.credit}`}
              className="h-[560px] w-full rounded-2xl border border-canvas-100 bg-white"
              loading="lazy"
            />
            <p className="mt-3 text-[16px] text-ink/80">
              Fonte: {item.credit}{" "}
              <a
                href={item.permalink}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-amber-500 underline-offset-4 hover:underline"
              >
                Instagram
              </a>
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
