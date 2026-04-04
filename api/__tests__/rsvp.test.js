import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// Shared spy — must use vi.hoisted so it exists when the vi.mock factory runs
// (vi.mock calls are hoisted above variable declarations by vitest's transformer)
const mockEmailSend = vi.hoisted(() =>
  vi.fn().mockResolvedValue({ id: "test-email-id" })
);

// Prevent Resend from making real network calls during tests
vi.mock("resend", () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: { send: mockEmailSend },
  })),
}));

import { buildProperties, buildEmailHtml } from "../rsvp.js";
import handler from "../rsvp.js";

// ─── helpers ────────────────────────────────────────────────────────────────

function makeReq(body, method = "POST") {
  return { method, body };
}

function makeRes() {
  const res = { statusCode: null, body: null };
  res.status = (code) => { res.statusCode = code; return res; };
  res.json   = (data)  => { res.body = data; return res; };
  return res;
}

function mockNotionOk() {
  fetch.mockResolvedValue({ ok: true, json: async () => ({ id: "page-id" }) });
}

function mockNotionFail(message = "something went wrong") {
  fetch.mockResolvedValue({
    ok: false,
    json: async () => ({ object: "error", status: 400, message }),
  });
}

// ─── buildProperties ────────────────────────────────────────────────────────

describe("buildProperties", () => {
  it("sets Name as title", () => {
    const p = buildProperties({ name: "Alice", attending: "Yes", dietary: "", message: "", comesWith: "" });
    expect(p.Name.title[0].text.content).toBe("Alice");
  });

  it("sets Attending as select", () => {
    const p = buildProperties({ name: "Alice", attending: "Yes", dietary: "", message: "", comesWith: "" });
    expect(p.Attending.select.name).toBe("Yes");
  });

  it("wraps dietary in multi_select", () => {
    const p = buildProperties({ name: "Alice", attending: "Yes", dietary: "Vegan", message: "", comesWith: "" });
    expect(p.Dietary.multi_select).toEqual([{ name: "Vegan" }]);
  });

  it("sets Dietary to empty array when not provided", () => {
    const p = buildProperties({ name: "Alice", attending: "Yes", dietary: "", message: "", comesWith: "" });
    expect(p.Dietary.multi_select).toEqual([]);
  });

  it("includes Age group select when ageGroup is set", () => {
    const p = buildProperties({ name: "Alice", attending: "Yes", dietary: "", message: "", comesWith: "", ageGroup: "kid" });
    expect(p["Age group"].select.name).toBe("kid");
  });

  it("omits Age group when ageGroup is falsy", () => {
    const p = buildProperties({ name: "Alice", attending: "Yes", dietary: "", message: "", comesWith: "", ageGroup: "" });
    expect(p["Age group"]).toBeUndefined();
  });

  it("sets Comes with", () => {
    const p = buildProperties({ name: "Bob", attending: "Yes", dietary: "", message: "", comesWith: "Marco" });
    expect(p["Comes with"].rich_text[0].text.content).toBe("Marco");
  });

  it("includes Submitted at date", () => {
    const p = buildProperties({ name: "Alice", attending: "Yes", dietary: "", message: "", comesWith: "" });
    expect(p["Submitted at"].date.start).toBeTruthy();
  });
});

// ─── buildEmailHtml ──────────────────────────────────────────────────────────

describe("buildEmailHtml", () => {
  it("states the guest will not be attending when attending is No", () => {
    const html = buildEmailHtml({ name: "Alice", attending: "No", dietary: "", message: "", guests: [] });
    expect(html).toContain("<strong>Alice</strong>");
    expect(html).toContain("not be attending");
  });

  it("appends message paragraph for a not-attending guest", () => {
    const html = buildEmailHtml({ name: "Alice", attending: "No", dietary: "", message: "See you next time!", guests: [] });
    expect(html).toContain("See you next time!");
  });

  it("omits message block when message is empty", () => {
    const html = buildEmailHtml({ name: "Alice", attending: "No", dietary: "", message: "", guests: [] });
    expect(html).not.toContain("<p>Message:");
  });

  it("lists the primary guest with their dietary preference", () => {
    const html = buildEmailHtml({ name: "Alice", attending: "Yes", dietary: "Vegan", message: "", guests: [] });
    expect(html).toContain("Alice (adult)");
    expect(html).toContain("Vegan");
  });

  it("lists additional adult guests with their dietary preference", () => {
    const html = buildEmailHtml({
      name: "Alice", attending: "Yes", dietary: "", message: "",
      guests: [{ name: "Bob", ageGroup: "adult", dietary: "Pescatarian", babySeating: "" }],
    });
    expect(html).toContain("Bob (adult");
    expect(html).toContain("Pescatarian");
  });

  it("shows baby seating info for baby guests", () => {
    const html = buildEmailHtml({
      name: "Alice", attending: "Yes", dietary: "", message: "",
      guests: [{ name: "Lily", ageGroup: "baby", dietary: "", babySeating: "nanny" }],
    });
    expect(html).toContain("baby — seating: nanny");
  });

  it("shows 'kid' label for kid guests", () => {
    const html = buildEmailHtml({
      name: "Alice", attending: "Yes", dietary: "", message: "",
      guests: [{ name: "Timmy", ageGroup: "kid", dietary: "", babySeating: "" }],
    });
    expect(html).toContain("Timmy (kid)");
  });

  it("HTML-escapes dangerous characters in guest names", () => {
    const html = buildEmailHtml({ name: "<script>alert(1)</script>", attending: "No", dietary: "", message: "", guests: [] });
    expect(html).not.toContain("<script>");
    expect(html).toContain("&lt;script&gt;");
  });
});

// ─── handler ────────────────────────────────────────────────────────────────

describe("handler", () => {
  beforeEach(() => {
    process.env.NOTION_TOKEN = "test-token";
    process.env.NOTION_DATABASE_ID = "test-db-id";
  });

  it("returns 405 for non-POST requests", async () => {
    const res = makeRes();
    await handler(makeReq({}, "GET"), res);
    expect(res.statusCode).toBe(405);
  });

  it("returns 400 when name is missing", async () => {
    const res = makeRes();
    await handler(makeReq({ attending: "Yes" }), res);
    expect(res.statusCode).toBe(400);
  });

  it("returns 400 when attending is missing", async () => {
    const res = makeRes();
    await handler(makeReq({ name: "Alice" }), res);
    expect(res.statusCode).toBe(400);
  });

  it("creates exactly 1 Notion page when there are no additional guests", async () => {
    mockNotionOk();
    const res = makeRes();
    await handler(makeReq({ name: "Alice", attending: "Yes", dietary: "Vegan", message: "", guests: [] }), res);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ success: true });
  });

  it("creates N+1 Notion pages for N additional guests", async () => {
    mockNotionOk();
    const res = makeRes();
    await handler(makeReq({
      name: "Alice", attending: "Yes", dietary: "Vegan", message: "",
      guests: [
        { name: "Bob",   ageGroup: "adult", dietary: "I eat everything" },
        { name: "Clara", ageGroup: "kid",   dietary: "I eat everything" },
      ],
    }), res);
    expect(fetch).toHaveBeenCalledTimes(3);
  });

  it("skips additional guests with an empty name", async () => {
    mockNotionOk();
    const res = makeRes();
    await handler(makeReq({
      name: "Alice", attending: "Yes", dietary: "", message: "",
      guests: [{ name: "", ageGroup: "adult", dietary: "" }],
    }), res);
    expect(fetch).toHaveBeenCalledTimes(1); // only primary
  });

  it("sets dietary to 'Kid' for kid guests regardless of form value", async () => {
    mockNotionOk();
    const res = makeRes();
    await handler(makeReq({
      name: "Alice", attending: "Yes", dietary: "", message: "",
      guests: [{ name: "Timmy", ageGroup: "kid", dietary: "Vegan" }],
    }), res);
    const guestCallBody = JSON.parse(fetch.mock.calls[1][1].body);
    expect(guestCallBody.properties.Dietary.multi_select).toEqual([{ name: "Kid" }]);
  });

  it("sets dietary to 'Baby' for baby guests", async () => {
    mockNotionOk();
    const res = makeRes();
    await handler(makeReq({
      name: "Alice", attending: "Yes", dietary: "", message: "",
      guests: [{ name: "Sofia", ageGroup: "baby", dietary: "" }],
    }), res);
    const guestCallBody = JSON.parse(fetch.mock.calls[1][1].body);
    expect(guestCallBody.properties.Dietary.multi_select).toEqual([{ name: "Baby" }]);
  });

  it("sets ageGroup to 'adult' for the primary guest", async () => {
    mockNotionOk();
    const res = makeRes();
    await handler(makeReq({ name: "Alice", attending: "Yes", dietary: "", message: "", guests: [] }), res);
    const primaryCallBody = JSON.parse(fetch.mock.calls[0][1].body);
    expect(primaryCallBody.properties["Age group"].select.name).toBe("adult");
  });

  it("sets attending to Yes for additional guests regardless of primary", async () => {
    mockNotionOk();
    const res = makeRes();
    await handler(makeReq({
      name: "Alice", attending: "No", dietary: "", message: "",
      guests: [{ name: "Bob", ageGroup: "adult", dietary: "" }],
    }), res);
    const guestCallBody = JSON.parse(fetch.mock.calls[1][1].body);
    expect(guestCallBody.properties.Attending.select.name).toBe("Yes");
  });

  it("returns 500 when Notion API fails", async () => {
    mockNotionFail("validation_error");
    const res = makeRes();
    await handler(makeReq({ name: "Alice", attending: "Yes", guests: [] }), res);
    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBeTruthy();
  });

  // ─── email notification ──────────────────────────────────────────────────

  describe("email notification", () => {
    beforeEach(() => {
      process.env.RESEND_API_KEY = "test-resend-key";
      process.env.NOTIFICATION_EMAIL = "notify@example.com";
    });

    afterEach(() => {
      delete process.env.RESEND_API_KEY;
      delete process.env.NOTIFICATION_EMAIL;
    });

    it("sends an email after a successful RSVP submission", async () => {
      mockNotionOk();
      const res = makeRes();
      await handler(makeReq({ name: "Alice", attending: "Yes", dietary: "Vegan", message: "", guests: [] }), res);
      expect(mockEmailSend).toHaveBeenCalledOnce();
    });

    it("sends an email when the guest is not attending", async () => {
      mockNotionOk();
      const res = makeRes();
      await handler(makeReq({ name: "Alice", attending: "No", dietary: "", message: "", guests: [] }), res);
      expect(mockEmailSend).toHaveBeenCalledOnce();
    });

    it("email subject includes guest name and attending status", async () => {
      mockNotionOk();
      const res = makeRes();
      await handler(makeReq({ name: "Alice", attending: "Yes", dietary: "", message: "", guests: [] }), res);
      const { subject } = mockEmailSend.mock.calls[0][0];
      expect(subject).toContain("Alice");
      expect(subject).toContain("attending");
    });

    it("does not send email when Notion API fails", async () => {
      mockNotionFail();
      const res = makeRes();
      await handler(makeReq({ name: "Alice", attending: "Yes", dietary: "", message: "", guests: [] }), res);
      expect(mockEmailSend).not.toHaveBeenCalled();
    });

    it("does not send email when RESEND_API_KEY is not set", async () => {
      delete process.env.RESEND_API_KEY;
      mockNotionOk();
      const res = makeRes();
      await handler(makeReq({ name: "Alice", attending: "Yes", dietary: "", message: "", guests: [] }), res);
      expect(mockEmailSend).not.toHaveBeenCalled();
    });

    it("does not send email when NOTIFICATION_EMAIL is not set", async () => {
      delete process.env.NOTIFICATION_EMAIL;
      mockNotionOk();
      const res = makeRes();
      await handler(makeReq({ name: "Alice", attending: "Yes", dietary: "", message: "", guests: [] }), res);
      expect(mockEmailSend).not.toHaveBeenCalled();
    });

    it("still returns 200 when email sending throws", async () => {
      mockNotionOk();
      mockEmailSend.mockRejectedValueOnce(new Error("Resend down"));
      const res = makeRes();
      await handler(makeReq({ name: "Alice", attending: "Yes", dietary: "", message: "", guests: [] }), res);
      expect(res.statusCode).toBe(200);
    });
  });
});
