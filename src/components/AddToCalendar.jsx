import { CalendarPlusIcon } from "@phosphor-icons/react"

// Sept 27 2026 — ceremony at 15:30, festivities until ~02:00
// Europe/Rome is CEST (UTC+2) in September
const DT_START = "20260927T133000Z" // 15:30 CEST → 13:30 UTC
const DT_END = "20260928T000000Z"   // 02:00 CEST → 00:00 UTC

function buildICS({ title, location, description }) {
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Sara & Ben Wedding//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `DTSTART:${DT_START}`,
    `DTEND:${DT_END}`,
    `SUMMARY:${title}`,
    `LOCATION:${location}`,
    `DESCRIPTION:${description}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n")
}

function downloadICS(event) {
  const blob = new Blob([buildICS(event)], { type: "text/calendar;charset=utf-8" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = "sara-ben-wedding.ics"
  a.click()
  URL.revokeObjectURL(url)
}

export default function AddToCalendar({ copy }) {
  const event = {
    title: copy.calEventTitle,
    location: copy.calEventLocation,
    description: copy.calEventDescription,
  }

  return (
    <div className="group relative inline-flex">
      <button
        type="button"
        onClick={() => downloadICS(event)}
        aria-label={copy.addToCalendarLabel}
        className="inline-flex items-center justify-center rounded-xl border border-ink/20 p-2 text-ink/90 transition duration-200 ease-spring hover:bg-black/10 active:scale-[0.94] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson-600"
      >
        <CalendarPlusIcon size={20} />
      </button>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-lg bg-ink px-2.5 py-1 font-sans text-xs font-medium text-canvas-50 opacity-0 transition-all duration-150 ease-out group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:transition-none"
      >
        {copy.addToCalendarLabel}
      </span>
    </div>
  )
}
