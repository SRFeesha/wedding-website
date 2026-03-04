// /api/rsvp.js — Vercel Serverless Function
// Receives RSVP form data and writes a new row to your Notion database.
//
// SETUP:
// 1. Create a Notion integration at https://www.notion.so/my-integrations
//    and copy the "Internal Integration Token"
// 2. Create a Notion database with these properties:
//    - Name          → Title
//    - Attending     → Select   (options: "Yes", "No")
//    - Dietary       → Rich Text
//    - Arrival       → Rich Text
//    - Message       → Rich Text
//    - Submitted At  → Date
// 3. Share the database with your integration (open DB → ··· → Connections)
// 4. Copy the database ID from the URL:
//    https://notion.so/<workspace>/<DATABASE_ID>?v=...
// 5. Add these to your Vercel environment variables:
//    NOTION_TOKEN=secret_...
//    NOTION_DATABASE_ID=...

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, attending, dietary, arrival, message } = req.body;

  if (!name || !attending) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const response = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${NOTION_TOKEN}`,
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28",
      },
      body: JSON.stringify({
        parent: { database_id: NOTION_DATABASE_ID },
        properties: {
          // Title property — must match your DB column name exactly
          Name: {
            title: [{ text: { content: name } }],
          },
          Attending: {
            select: { name: attending }, // "Yes" or "No"
          },
          Dietary: {
            rich_text: [{ text: { content: dietary || "" } }],
          },
          Arrival: {
            rich_text: [{ text: { content: arrival || "" } }],
          },
          Message: {
            rich_text: [{ text: { content: message || "" } }],
          },
          "Submitted At": {
            date: { start: new Date().toISOString() },
          },
        },
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Notion API error:", error);
      return res.status(500).json({ error: "Failed to write to Notion" });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Handler error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
