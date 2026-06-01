import "@testing-library/jest-dom";

// Prevent any real network calls during tests — Notion is never touched
global.fetch = vi.fn();

// jsdom doesn't implement window.scrollTo — framer-motion's animation frame loop calls it
// internally, which causes unhandled errors that make vitest exit with code 1 on CI
window.scrollTo = vi.fn();

// jsdom has no layout engine, so IntersectionObserver doesn't exist — framer-motion's
// whileInView feature calls new IntersectionObserver() on mount
global.IntersectionObserver = class {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};

afterEach(() => {
  vi.clearAllMocks();
});
