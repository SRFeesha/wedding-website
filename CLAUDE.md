# Wedding project — Claude instructions

## Commit workflow

- **Commit after each completed feature**, but do NOT push unless the user explicitly asks (e.g. "push it", "push to GitHub", "deploy").
- Read satisfaction signals to judge when a feature is done: phrases like "okay that's great", "this works", "perfect", "looks good" indicate a natural commit point.
- If unsure whether something warrants a commit, ask.
- Never push to `origin/main` (which triggers a Vercel deploy) without an explicit instruction to do so.

## Motion design guidance for agents

- This project is a wedding site, not a productivity app. Favor polished, romantic, low-friction motion over ultra-snappy utilitarian motion.
- Primary motion lens: Jakub-style production polish. Secondary lens: light Jhey-style delight for special moments. Use Emil-style restraint for repeated or high-frequency interactions.
- Motion must explain state changes: orientation, continuity, reveal, feedback. If it is only decorative, keep it rare and easy to remove.
- Look for motion gaps first. Any conditional UI such as RSVP progressive disclosure, note fields, guest options, accordions, or loading/success swaps should not snap in or out.
- Prefer enter and exit transitions for conditionally rendered content. Exits should usually be subtler than enters.
- Prefer opacity plus small translate and collapse/expand treatments. Avoid large zooms, spins, or anything that feels theatrical in form flows.
- Keep interactive motion interruptible. Prefer state-driven CSS transitions for disclosure patterns instead of one-shot keyframes when the UI can toggle quickly.
- Respect `prefers-reduced-motion` every time. Motion should degrade to near-instant state changes without breaking layout or comprehension.
- For this codebase, match existing timing/easing before inventing new ones. Reuse the established soft reveal curve and keep related transitions consistent.
- If adding a new motion pattern, document the intent and where it should or should not be reused in `docs/motion-principles.md`.
