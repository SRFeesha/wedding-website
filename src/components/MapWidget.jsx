const MAP_URL = "https://www.google.com/maps?q=Tenuta+Savoca+Piazza+Armerina&output=embed";
const EXTERNAL_MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=Tenuta+Savoca+Piazza+Armerina";

export default function MapWidget({ copy }) {
  return (
    <section className="rounded-[2rem] bg-white p-7 shadow-card sm:p-10">
      <h2 className="font-display text-4xl text-ink sm:text-5xl">{copy.title}</h2>
      <p className="mt-2 text-[18px] text-ink/85 sm:text-[19px]">{copy.subtitle}</p>
      <div className="mt-6 overflow-hidden rounded-3xl border border-canvas-100">
        <iframe
          title="Tenuta Savoca map"
          src={MAP_URL}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-72 w-full sm:h-80"
        />
      </div>
      <a
        href={EXTERNAL_MAP_URL}
        target="_blank"
        rel="noreferrer"
        className="mt-5 inline-flex rounded-full bg-crimson-600 px-5 py-2 text-[16px] font-semibold text-canvas-50 transition hover:bg-crimson-700"
      >
        {copy.openExternal}
      </a>
    </section>
  );
}
