// /api/rsvp.js — Vercel Serverless Function
// Receives RSVP form data and writes one Notion row per guest.
//
// Notion DB columns (exact names matter):
//   Name          → Title
//   Attending     → Select      (Yes / No)
//   Age group     → Select      (adult / kid / baby)
//   Dietary       → Multi-select
//   Dietary Notes → Rich Text   (free-text allergy/intolerance note)
//   Baby seating  → Select      (table / nanny)
//   Message       → Rich Text
//   Comes with    → Rich Text   (primary guest's name — groups a party together)
//   Submitted at  → Date

import { Resend } from "resend";

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL;

// ── Validation constants ──────────────────────────────────────────────────────

const MAX_NAME       = 200;
const MAX_NOTE       = 1000;
const MAX_MESSAGE    = 2000;
const MAX_GUESTS     = 15;

const VALID_ATTENDING    = new Set(["Yes", "No"]);
const VALID_AGE_GROUP    = new Set(["adult", "kid", "baby", ""]);
const VALID_BABY_SEATING = new Set(["table", "nanny", ""]);

// Coerce to string, trim, and cap length. Returns "" for non-string values.
function str(val, max) {
  if (typeof val !== "string") return "";
  return val.trim().slice(0, max);
}

// Escape HTML special chars before inserting user content into email HTML.
function htmlEscape(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ── Notion ────────────────────────────────────────────────────────────────────

export function buildProperties({ name, attending, ageGroup, dietary, dietaryNote, babySeating, message, comesWith }) {
  const props = {
    Name: {
      title: [{ text: { content: name } }],
    },
    Attending: {
      select: { name: attending },
    },
    Dietary: {
      // Notion rejects multi_select option names containing commas — strip as a safety net.
      multi_select: dietary ? [{ name: dietary.replace(/,/g, "") }] : [],
    },
    "Dietary Notes": {
      rich_text: dietaryNote ? [{ text: { content: dietaryNote } }] : [],
    },
    Message: {
      rich_text: [{ text: { content: message || "" } }],
    },
    "Comes with": {
      rich_text: [{ text: { content: comesWith || "" } }],
    },
    "Submitted at": {
      date: { start: new Date().toISOString() },
    },
  };

  // Omit when empty — Notion rejects select: null on page creation
  if (ageGroup) {
    props["Age group"] = { select: { name: ageGroup } };
  }
  if (babySeating) {
    props["Baby seating"] = { select: { name: babySeating } };
  }

  return props;
}

async function createNotionPage(properties) {
  const response = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${NOTION_TOKEN}`,
      "Content-Type": "application/json",
      "Notion-Version": "2022-06-28",
    },
    body: JSON.stringify({
      parent: { database_id: NOTION_DATABASE_ID },
      properties,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    console.error("Notion API error:", JSON.stringify(error));
    throw Object.assign(new Error("Failed to write to Notion"), { notionError: error });
  }
}

// ── Email ─────────────────────────────────────────────────────────────────────

function buildEmailHtml({ name, attending, dietary, message, guests }) {
  const n = htmlEscape(name);
  const d = htmlEscape(dietary || "no dietary");
  const m = message ? `<p>Message: ${htmlEscape(message)}</p>` : "";

  if (attending === "No") {
    return `<p><strong>${n}</strong> will <strong>not be attending</strong>.</p>${m}`;
  }

  const allGuests = [
    `${n} (adult) — ${d}`,
    ...guests
      .filter((g) => g.name)
      .map((g) => {
        const gn = htmlEscape(g.name);
        const info = g.ageGroup === "baby"
          ? `baby — seating: ${htmlEscape(g.babySeating || "not specified")}`
          : g.ageGroup === "kid"
          ? "kid"
          : `adult — ${htmlEscape(g.dietary || "no dietary")}`;
        return `${gn} (${info})`;
      }),
  ];

  return `<p><strong>${n}</strong> is attending with ${allGuests.length} guest(s).</p>
<ul>${allGuests.map((g) => `<li>${g}</li>`).join("")}</ul>
${m}`;
}

async function sendNotificationEmail({ name, attending, dietary, transport, message, guests }) {
  if (!RESEND_API_KEY || !NOTIFICATION_EMAIL) return;
  const resend = new Resend(RESEND_API_KEY);
  try {
    await resend.emails.send({
      from: "RSVP <onboarding@resend.dev>",
      to: NOTIFICATION_EMAIL,
      subject: `RSVP: ${name} — ${attending === "Yes" ? "attending" : "not attending"}`,
      html: buildEmailHtml({ name, attending, dietary, transport, message, guests }),
    });
  } catch (err) {
    console.error("Resend error:", err);
  }
}

// ── Handler ───────────────────────────────────────────────────────────────────

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = req.body;
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return res.status(400).json({ error: "Invalid request body" });
  }

  // Coerce and cap all scalar inputs
  const name        = str(body.name, MAX_NAME);
  const attending   = str(body.attending, 3);
  const transport   = str(body.transport, 10);
  const dietary     = str(body.dietary, MAX_NAME);
  const dietaryNote = str(body.dietaryNote, MAX_NOTE);
  const message     = str(body.message, MAX_MESSAGE);

  // Required field checks
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }
  if (!VALID_ATTENDING.has(attending)) {
    return res.status(400).json({ error: "Invalid attending value" });
  }
  if (!VALID_TRANSPORT.has(transport)) {
    return res.status(400).json({ error: "Invalid transport value" });
  }

  // Guests array
  if (!Array.isArray(body.guests)) {
    return res.status(400).json({ error: "Invalid guests" });
  }
  if (body.guests.length > MAX_GUESTS) {
    return res.status(400).json({ error: "Too many guests" });
  }

  const guests = body.guests
    .map((g) => {
      if (!g || typeof g !== "object" || Array.isArray(g)) return null;
      const ageGroup    = str(g.ageGroup, 10);
      const babySeating = str(g.babySeating, 10);
      if (!VALID_AGE_GROUP.has(ageGroup))    return null;
      if (!VALID_BABY_SEATING.has(babySeating)) return null;
      return {
        name:        str(g.name, MAX_NAME),
        ageGroup,
        dietary:     str(g.dietary, MAX_NAME),
        dietaryNote: str(g.dietaryNote, MAX_NOTE),
        babySeating,
      };
    })
    .filter(Boolean);

  try {
    // Primary guest
    await createNotionPage(buildProperties({
      name,
      attending,
      ageGroup: "adult",
      dietary:     attending === "Yes" ? dietary     : "",
      dietaryNote: attending === "Yes" ? dietaryNote : "",
      transport:   attending === "Yes" ? transport   : "",
      message,
      comesWith: attending === "Yes" ? name : "",
    }));

    // Additional guests — inherit transport from primary
    for (const g of guests) {
      if (!g.name) continue;
      await createNotionPage(buildProperties({
        name:        g.name,
        attending:   "Yes",
        ageGroup:    g.ageGroup || "",
        dietary:     g.ageGroup === "kid" ? "Kid" : g.ageGroup === "baby" ? "Baby" : (g.dietary || ""),
        dietaryNote: g.ageGroup === "adult" ? (g.dietaryNote || "") : "",
        transport,
        babySeating: g.babySeating || "",
        message:     "",
        comesWith:   name,
      }));
    }

    await sendNotificationEmail({ name, attending, dietary, transport, message, guests });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Handler error:", err);
    // Don't leak internal error details to clients
    return res.status(500).json({ error: "Internal server error" });
  }
}
