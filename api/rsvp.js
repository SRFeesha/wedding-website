// /api/rsvp.js — Vercel Serverless Function
// Receives RSVP form data and writes one Notion row per guest.
//
// Notion DB columns (exact names matter):
//   Name          → Title
//   Attending     → Select      (Yes / No)
//   Age group     → Select      (adult / kid / baby)
//   Dietary       → Multi-select
//   Dietary Notes → Rich Text   (free-text allergy/intolerance note)
//   Transport     → Select      (bus / car / unsure)
//   Baby seating  → Select      (table / nanny)
//   Message       → Rich Text
//   Comes with    → Rich Text   (primary guest's name — groups a party together)
//   Submitted at  → Date

import { Resend } from "resend";

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL;

export function buildProperties({ name, attending, ageGroup, dietary, dietaryNote, transport, babySeating, message, comesWith }) {
  const props = {
    Name: {
      title: [{ text: { content: name } }],
    },
    Attending: {
      select: { name: attending },
    },
    Dietary: {
      multi_select: dietary ? [{ name: dietary }] : [],
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
  if (transport) {
    props.Transport = { select: { name: transport } };
  }
  if (ageGroup) {
    props["Age group"] = { select: { name: ageGroup } };
  }
  if (babySeating) {
    props["Baby seating"] = { select: { name: babySeating } };
  }

  return props;
}

function buildEmailHtml({ name, attending, dietary, transport, message, guests }) {
  if (attending === "No") {
    return `<p><strong>${name}</strong> will <strong>not be attending</strong>.</p>
${message ? `<p>Message: ${message}</p>` : ""}`;
  }

  const allGuests = [
    `${name} (adult) — ${dietary || "no dietary"}`,
    ...guests
      .filter((g) => g.name)
      .map((g) => {
        const info = g.ageGroup === "baby"
          ? `baby — seating: ${g.babySeating || "not specified"}`
          : g.ageGroup === "kid"
          ? "kid"
          : `adult — ${g.dietary || "no dietary"}`;
        return `${g.name} (${info})`;
      }),
  ];

  return `<p><strong>${name}</strong> is attending with ${allGuests.length} guest(s).</p>
<ul>${allGuests.map((g) => `<li>${g}</li>`).join("")}</ul>
<p>Transport: <strong>${transport || "not specified"}</strong></p>
${message ? `<p>Message: ${message}</p>` : ""}`;
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

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, attending, transport, dietary, dietaryNote, message, guests = [] } = req.body;

  if (!name || !attending) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Primary guest
    await createNotionPage(buildProperties({
      name,
      attending,
      ageGroup: "adult",
      dietary: attending === "Yes" ? dietary : "",
      dietaryNote: attending === "Yes" ? (dietaryNote || "") : "",
      transport: attending === "Yes" ? transport : "",
      message,
      comesWith: attending === "Yes" ? name : "",
    }));

    // Additional guests — inherit transport from primary
    for (const g of guests) {
      if (!g.name) continue;
      await createNotionPage(buildProperties({
        name: g.name,
        attending: "Yes",
        ageGroup: g.ageGroup || "",
        dietary: g.ageGroup === "kid" ? "Kid" : g.ageGroup === "baby" ? "Baby" : (g.dietary || ""),
        dietaryNote: g.ageGroup === "adult" ? (g.dietaryNote || "") : "",
        transport,
        babySeating: g.babySeating || "",
        message: "",
        comesWith: name,
      }));
    }

    await sendNotificationEmail({ name, attending, dietary, transport, message, guests });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Handler error:", err);
    return res.status(500).json({ error: "Internal server error", detail: err.notionError || err.message });
  }
}
