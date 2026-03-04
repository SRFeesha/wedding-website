export default function MoodboardBand({ images }) {
  const [main, sideA, sideB] = images;

  return (
    <section className="my-8 grid gap-4 sm:my-10 sm:grid-cols-12">
      <figure className="sm:col-span-7">
        <img
          src={main.url}
          alt={main.alt}
          loading="lazy"
          className="mask-fade-bottom h-64 w-full rounded-[1.8rem] object-cover sm:h-80"
        />
      </figure>
      <div className="grid gap-4 sm:col-span-5 sm:pt-10">
        <figure>
          <img
            src={sideA.url}
            alt={sideA.alt}
            loading="lazy"
            className="mask-fade-soft h-36 w-full rounded-[1.4rem] object-cover sm:h-40"
          />
        </figure>
        <figure>
          <img
            src={sideB.url}
            alt={sideB.alt}
            loading="lazy"
            className="mask-fade-soft h-36 w-full rounded-[1.4rem] object-cover sm:h-40"
          />
        </figure>
      </div>
    </section>
  );
}
