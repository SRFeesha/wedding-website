import { test, expect } from "@playwright/test"

// Mock /api/rsvp so no data ever reaches Notion
async function mockRsvpApi(page) {
  await page.route("**/api/rsvp", (route) => {
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true }),
    })
  })
}

test.beforeEach(async ({ page }) => {
  await mockRsvpApi(page)
  await page.goto("/#rsvp")
})

// ─── Journey 1: attending with two extra guests ──────────────────────────────

test("attending — fills full form with two extra guests and submits", async ({
  page,
}) => {
  // Fill primary name
  await page.getByLabel("Full name").fill("Beniamino")

  // Select attending
  await page.getByRole("button", { name: "I'll be there" }).click()

  // Choose transport
  await page.getByRole("button", { name: /By bus/ }).click()

  // Change dietary
  await page.getByLabel("Dietary preferences").selectOption("Gluten-free")

  // Add first guest: Clara, kid
  await page.getByRole("button", { name: "+ Add another person" }).click()
  await page.getByPlaceholder("Full name").first().fill("Clara")
  await page
    .getByRole("button", { name: /Kid 🎉/ })
    .first()
    .click()

  // Add second guest: Marco, adult, vegan
  await page.getByRole("button", { name: "+ Add another person" }).click()
  await page.getByPlaceholder("Full name").nth(1).fill("Marco")
  await page
    .getByRole("button", { name: /Adult 🥂/ })
    .last()
    .click()
  await page.getByLabel("Dietary preferences").last().selectOption("Vegan")

  // Capture the API payload before submitting
  const [request] = await Promise.all([
    page.waitForRequest("**/api/rsvp"),
    page.getByRole("button", { name: "Send" }).click(),
  ])

  const payload = request.postDataJSON()
  expect(payload.name).toBe("Beniamino")
  expect(payload.attending).toBe("Yes")
  expect(payload.transport).toBe("bus")
  expect(payload.dietary).toBe("Gluten-free")
  expect(payload.guests).toHaveLength(2)
  expect(payload.guests.find((g) => g.name === "Clara").ageGroup).toBe("kid")
  expect(payload.guests.find((g) => g.name === "Marco").ageGroup).toBe("adult")
  expect(payload.guests.find((g) => g.name === "Marco").dietary).toBe("Vegan")

  // Success screen appears
  await expect(
    page.getByText("We can't wait to see you in Sicily!"),
  ).toBeVisible()
})

// ─── Journey 2: declining ────────────────────────────────────────────────────

test("declining — no conditional fields shown, correct payload, decline screen", async ({
  page,
}) => {
  await page.getByLabel("Full name").fill("Giovanna")
  await page.getByRole("button", { name: "Can't make it" }).click()

  // Conditional fields must not be visible
  await expect(
    page.getByText("How are you planning to get to the wedding location?"),
  ).not.toBeVisible()
  await expect(page.getByText("+ Add another person")).not.toBeVisible()

  const [request] = await Promise.all([
    page.waitForRequest("**/api/rsvp"),
    page.getByRole("button", { name: "Send" }).click(),
  ])

  const payload = request.postDataJSON()
  expect(payload.attending).toBe("No")
  expect(payload.guests).toHaveLength(0)

  await expect(page.getByText("We'll miss you ❤️")).toBeVisible()
})

// ─── Journey 3: validation ───────────────────────────────────────────────────

test("validation — blocks empty submission and shows errors", async ({
  page,
}) => {
  await page.getByRole("button", { name: "Send" }).click()

  await expect(page.getByText("Please enter your name.")).toBeVisible()
  await expect(
    page.getByText("Please let us know if you'll be joining us."),
  ).toBeVisible()

  // Errors clear as the user corrects them
  await page.getByLabel("Full name").fill("Test")
  await expect(page.getByText("Please enter your name.")).not.toBeVisible()
})
