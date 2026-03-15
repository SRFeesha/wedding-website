// /api/rsvp.js — Vercel Serverless Function
// Receives RSVP form data and writes one Notion row per guest.
//
// Notion DB columns (exact names matter):
//   Name          → Title
//   Attending     → Select      (Yes / No)
//   Age group     → Select      (adult / kid / baby)
//   Dietary       → Multi-select
//   Transport     → Select      (bus / car / unsure)
//   Baby seating  → Select      (table / nanny)
//   Message       → Rich Text
//   Comes with    → Rich Text   (primary guest's name — groups a party together)
//   Submitted at  → Date

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

export function buildProperties({ name, attending, ageGroup, dietary, transport, babySeating, message, comesWith }) {
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

  const { name, attending, transport, dietary, message, guests = [] } = req.body;

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
        transport,
        babySeating: g.babySeating || "",
        message: "",
        comesWith: name,
      }));
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Handler error:", err);
    return res.status(500).json({ error: "Internal server error", detail: err.notionError || err.message });
  }
}
