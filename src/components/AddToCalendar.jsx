import { useState, useRef, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"

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

function googleCalendarUrl({ title, location, description }) {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${DT_START}/${DT_END}`,
    details: description,
    location,
  })
  return `https://www.google.com/calendar/render?${params}`
}

const EASE = [0.25, 1, 0.5, 1]

export default function AddToCalendar({ copy }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const event = {
    title: copy.calEventTitle,
    location: copy.calEventLocation,
    description: copy.calEventDescription,
  }

  useEffect(() => {
    if (!open) return
    function onPointerDown(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener("pointerdown", onPointerDown)
    return () => document.removeEventListener("pointerdown", onPointerDown)
  }, [open])

  return (
    <div ref={ref} className="relative inline-flex flex-col items-center">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="true"
        className="inline-flex items-center gap-1.5 rounded-full border border-ink/20 px-3.5 py-1.5 font-sans text-sm font-medium text-ink/55 transition-colors duration-200 hover:border-crimson-600/40 hover:text-crimson-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson-600"
      >
        <CalendarIcon />
        {copy.addToCalendarLabel}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="cal-dropdown"
            role="menu"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.18, ease: EASE }}
            className="absolute top-full z-10 mt-2 min-w-[11.5rem] overflow-hidden rounded-2xl border border-ink/10 bg-canvas-50 shadow-card"
          >
            <button
              type="button"
              role="menuitem"
              onClick={() => { downloadICS(event); setOpen(false) }}
              className="flex w-full items-center gap-2.5 px-4 py-3 font-sans text-sm font-medium text-ink/70 transition-colors duration-150 hover:bg-canvas-100 hover:text-ink"
            >
              <DownloadIcon />
              {copy.icsLabel}
            </button>
            <div className="mx-3 h-px bg-ink/8" />
            <a
              href={googleCalendarUrl(event)}
              target="_blank"
              rel="noopener noreferrer"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex w-full items-center gap-2.5 px-4 py-3 font-sans text-sm font-medium text-ink/70 transition-colors duration-150 hover:bg-canvas-100 hover:text-ink"
            >
              <ExternalIcon />
              {copy.googleCalendarLabel}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function CalendarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="1" y="2.5" width="12" height="10.5" rx="1.5" />
      <path d="M1 6.5h12" />
      <path d="M4.5 1v3M9.5 1v3" />
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 1.5v7M4.5 6.5 7 9l2.5-2.5" />
      <path d="M2 11.5h10" />
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5.5 2.5H2.5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-3" />
      <path d="M8.5 2.5H11.5v3M11.5 2.5 6 8" />
    </svg>
  )
}
