export default function BusNotice({ title, body }) {
  return (
    <aside className="rounded-3xl border border-crimson-600/30 bg-gradient-to-br from-canvas-100 to-white p-5">
      <h3 className="font-display text-3xl text-ink">{title}</h3>
      <p className="mt-2 text-[18px] text-ink/90 sm:text-[19px]">{body}</p>
    </aside>
  );
}
