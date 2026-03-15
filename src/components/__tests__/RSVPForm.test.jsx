import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RSVPForm from "../RSVPForm";
import { content } from "../../content/content";

const copy = content.en;

function renderForm() {
  return render(<RSVPForm copy={copy} />);
}

function mockFetchOk() {
  fetch.mockResolvedValueOnce({ ok: true, json: async () => ({ success: true }) });
}

function mockFetchFail() {
  fetch.mockRejectedValueOnce(new Error("Network error"));
}

// ─── Rendering ──────────────────────────────────────────────────────────────

describe("RSVPForm — rendering", () => {
  it("shows the name input", () => {
    renderForm();
    expect(screen.getByLabelText(copy.rsvp.namePlaceholder, { selector: "input" })).toBeInTheDocument();
  });

  it("shows the attendance toggle", () => {
    renderForm();
    expect(screen.getByText(copy.rsvp.attendanceYes)).toBeInTheDocument();
    expect(screen.getByText(copy.rsvp.attendanceNo)).toBeInTheDocument();
  });

  it("does not show transport, dietary, or guest button when attending is not selected", () => {
    renderForm();
    expect(screen.queryByText(copy.rsvp.transportLabel)).not.toBeInTheDocument();
    expect(screen.queryByText(copy.rsvp.dietaryLabel)).not.toBeInTheDocument();
    expect(screen.queryByText(copy.rsvp.addGuestLabel)).not.toBeInTheDocument();
  });

  it("shows transport, dietary and add-guest button after selecting attending", async () => {
    const user = userEvent.setup();
    renderForm();
    await user.click(screen.getByText(copy.rsvp.attendanceYes));
    expect(screen.getByText(copy.rsvp.transportLabel)).toBeInTheDocument();
    expect(screen.getByText(copy.rsvp.dietaryLabel)).toBeInTheDocument();
    expect(screen.getByText(copy.rsvp.addGuestLabel)).toBeInTheDocument();
  });

  it("hides transport, dietary and add-guest button after selecting not attending", async () => {
    const user = userEvent.setup();
    renderForm();
    await user.click(screen.getByText(copy.rsvp.attendanceYes));
    await user.click(screen.getByText(copy.rsvp.attendanceNo));
    await waitFor(() => {
      expect(screen.queryByText(copy.rsvp.transportLabel)).not.toBeInTheDocument();
      expect(screen.queryByText(copy.rsvp.dietaryLabel)).not.toBeInTheDocument();
      expect(screen.queryByText(copy.rsvp.addGuestLabel)).not.toBeInTheDocument();
    });
  });
});

// ─── Validation ─────────────────────────────────────────────────────────────

describe("RSVPForm — validation", () => {
  it("shows name and attendance errors when submitting an empty form", async () => {
    const user = userEvent.setup();
    renderForm();
    await user.click(screen.getByText(copy.rsvp.submitLabel));
    expect(screen.getByText(copy.rsvp.validationName)).toBeInTheDocument();
    expect(screen.getByText(copy.rsvp.validationAttendance)).toBeInTheDocument();
  });

  it("clears the name error when the user starts typing", async () => {
    const user = userEvent.setup();
    renderForm();
    await user.click(screen.getByText(copy.rsvp.submitLabel));
    expect(screen.getByText(copy.rsvp.validationName)).toBeInTheDocument();
    await user.type(screen.getByLabelText(copy.rsvp.namePlaceholder), "Alice");
    expect(screen.queryByText(copy.rsvp.validationName)).not.toBeInTheDocument();
  });

  it("clears the attendance error when user picks an option", async () => {
    const user = userEvent.setup();
    renderForm();
    await user.click(screen.getByText(copy.rsvp.submitLabel));
    expect(screen.getByText(copy.rsvp.validationAttendance)).toBeInTheDocument();
    await user.click(screen.getByText(copy.rsvp.attendanceNo));
    expect(screen.queryByText(copy.rsvp.validationAttendance)).not.toBeInTheDocument();
  });

  it("does not call fetch when validation fails", async () => {
    const user = userEvent.setup();
    renderForm();
    await user.click(screen.getByText(copy.rsvp.submitLabel));
    expect(fetch).not.toHaveBeenCalled();
  });
});

// ─── Guest management ───────────────────────────────────────────────────────

describe("RSVPForm — guest management", () => {
  async function setupAttending() {
    const user = userEvent.setup();
    renderForm();
    await user.click(screen.getByText(copy.rsvp.attendanceYes));
    return user;
  }

  it("shows a guest card after clicking add", async () => {
    const user = await setupAttending();
    await user.click(screen.getByText(copy.rsvp.addGuestLabel));
    // Primary name input + guest name input (both labelled with namePlaceholder)
    expect(screen.getAllByLabelText(copy.rsvp.namePlaceholder)).toHaveLength(2);
  });

  it("shows age group buttons inside the guest card", async () => {
    const user = await setupAttending();
    await user.click(screen.getByText(copy.rsvp.addGuestLabel));
    const babyOpt = copy.rsvp.ageGroupOptions.find((o) => o.value === "baby");
    expect(screen.getByText(babyOpt.label)).toBeInTheDocument();
  });

  it("hides dietary for baby age group", async () => {
    const user = await setupAttending();
    await user.click(screen.getByText(copy.rsvp.addGuestLabel));
    const babyOpt = copy.rsvp.ageGroupOptions.find((o) => o.value === "baby");
    await user.click(screen.getByText(babyOpt.label));
    // dietary label only for the primary guest, not for the baby
    const dietaryLabels = screen.getAllByText(copy.rsvp.dietaryLabel);
    expect(dietaryLabels).toHaveLength(1);
  });

  it("hides dietary for kid age group (kids get a fixed menu)", async () => {
    const user = await setupAttending();
    await user.click(screen.getByText(copy.rsvp.addGuestLabel));
    const kidOpt = copy.rsvp.ageGroupOptions.find((o) => o.value === "kid");
    await user.click(screen.getByText(kidOpt.label));
    // dietary label only for the primary guest, not for the kid
    const dietaryLabels = screen.getAllByText(copy.rsvp.dietaryLabel);
    expect(dietaryLabels).toHaveLength(1);
  });

  it("shows dietary for adult age group", async () => {
    const user = await setupAttending();
    await user.click(screen.getByText(copy.rsvp.addGuestLabel));
    const adultOpt = copy.rsvp.ageGroupOptions.find((o) => o.value === "adult");
    await user.click(screen.getByText(adultOpt.label));
    const dietaryLabels = screen.getAllByText(copy.rsvp.dietaryLabel);
    expect(dietaryLabels).toHaveLength(2); // primary + adult guest
  });

  it("animates the dietary note in and out when the note option changes", async () => {
    const user = await setupAttending();
    await user.selectOptions(screen.getByLabelText(copy.rsvp.dietaryLabel), copy.rsvp.dietaryOtherValue);
    expect(screen.getByLabelText(copy.rsvp.dietaryNoteLabel)).toBeInTheDocument();

    await user.selectOptions(screen.getByLabelText(copy.rsvp.dietaryLabel), copy.rsvp.dietaryOptions[0]);
    await waitFor(() => {
      expect(screen.queryByLabelText(copy.rsvp.dietaryNoteLabel)).not.toBeInTheDocument();
    });
  });

  it("removes the guest card after clicking Remove", async () => {
    const user = await setupAttending();
    await user.click(screen.getByText(copy.rsvp.addGuestLabel));
    expect(screen.getByText(copy.rsvp.removeGuestLabel)).toBeInTheDocument();
    await user.click(screen.getByText(copy.rsvp.removeGuestLabel));
    expect(screen.queryByText(copy.rsvp.removeGuestLabel)).not.toBeInTheDocument();
  });
});

// ─── Submission ─────────────────────────────────────────────────────────────

describe("RSVPForm — submission", () => {
  async function fillAndSubmit(attending = true) {
    const user = userEvent.setup();
    renderForm();
    await user.type(screen.getByLabelText(copy.rsvp.namePlaceholder), "Alice");
    await user.click(screen.getByText(attending ? copy.rsvp.attendanceYes : copy.rsvp.attendanceNo));
    await user.click(screen.getByText(copy.rsvp.submitLabel));
    return user;
  }

  it("calls fetch with the correct endpoint and method", async () => {
    mockFetchOk();
    await fillAndSubmit();
    expect(fetch).toHaveBeenCalledWith("/api/rsvp", expect.objectContaining({ method: "POST" }));
  });

  it("sends the correct name and attending in the payload", async () => {
    mockFetchOk();
    await fillAndSubmit();
    const body = JSON.parse(fetch.mock.calls[0][1].body);
    expect(body.name).toBe("Alice");
    expect(body.attending).toBe("Yes");
  });

  it("sends attending=No when declining", async () => {
    mockFetchOk();
    await fillAndSubmit(false);
    const body = JSON.parse(fetch.mock.calls[0][1].body);
    expect(body.attending).toBe("No");
  });

  it("disables the submit button while loading", async () => {
    fetch.mockReturnValue(new Promise(() => {})); // never resolves
    const user = userEvent.setup();
    renderForm();
    await user.type(screen.getByLabelText(copy.rsvp.namePlaceholder), "Alice");
    await user.click(screen.getByText(copy.rsvp.attendanceYes));
    await user.click(screen.getByText(copy.rsvp.submitLabel));
    expect(screen.getByRole("button", { name: copy.rsvp.submittingLabel })).toBeDisabled();
  });

  it("shows the success screen after a successful submission", async () => {
    mockFetchOk();
    await fillAndSubmit();
    await waitFor(() => {
      expect(screen.getByRole("status")).toBeInTheDocument();
    });
  });

  it("shows the error message after a failed submission", async () => {
    mockFetchFail();
    await fillAndSubmit();
    await waitFor(() => {
      expect(screen.getByText(copy.rsvp.errorMsg)).toBeInTheDocument();
    });
  });
});

// ─── Success screen ─────────────────────────────────────────────────────────

describe("RSVPForm — success screen", () => {
  async function submitAs(attending) {
    mockFetchOk();
    const user = userEvent.setup();
    renderForm();
    await user.type(screen.getByLabelText(copy.rsvp.namePlaceholder), "Alice");
    await user.click(screen.getByText(attending ? copy.rsvp.attendanceYes : copy.rsvp.attendanceNo));
    await user.click(screen.getByText(copy.rsvp.submitLabel));
    await waitFor(() => screen.getByRole("status"));
  }

  it("shows attending success copy when attending", async () => {
    await submitAs(true);
    expect(screen.getByText(copy.rsvp.successAttending)).toBeInTheDocument();
  });

  it("shows decline copy when not attending", async () => {
    await submitAs(false);
    expect(screen.getByText(copy.rsvp.successDecline)).toBeInTheDocument();
  });
});
