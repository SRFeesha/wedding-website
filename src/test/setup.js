import "@testing-library/jest-dom";

// Prevent any real network calls during tests — Notion is never touched
global.fetch = vi.fn();

afterEach(() => {
  vi.clearAllMocks();
});
