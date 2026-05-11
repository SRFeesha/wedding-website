export default function LocationSection() {
  const photo = { url: "/tenuta-savoca-v2.png", alt: "Tenuta Savoca" }

  return (
    <section
      id="location"
      className="bg-linen-50"
    >
      <div className="relative h-[80vh] w-full">

        <div
          className="absolute inset-0 bg-center bg-no-repeat [background-size:cover]"
          style={{
            backgroundImage: `url('${photo.url}')`,
          }}
          role="img"
          aria-label={photo.alt}
        />

        {/* Bottom fade — linen-50 wins at the edge */}
        <div
          className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
          style={{
            background: "linear-gradient(to top, #E8DFD0 0%, transparent 100%)",
          }}
        />

      </div>
    </section>
  )
}
