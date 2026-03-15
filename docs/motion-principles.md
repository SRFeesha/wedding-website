# Motion Principles

This note is for agents working on UI motion in this project.

## Context

This is a wedding website. Motion should feel warm, polished, and calm. It should help the interface feel intentional without turning the RSVP flow into a demo reel.

Use this weighting when making motion decisions:

- Primary: Jakub-style production polish
- Secondary: selective Jhey-style delight for celebratory or editorial moments
- Selective: Emil-style restraint for repeated interactions, fast toggles, and utility controls

## Core rules

1. Motion must have a job.
Use motion for continuity, disclosure, feedback, and orientation. If removing it does not hurt comprehension, keep it minimal.

2. Fix motion gaps before adding flair.
When content appears because of a state change, do not let it snap in or disappear abruptly. Check conditional renders, ternary swaps, loading states, and expanded sections first.

3. Enter and exit both matter.
If something can appear, it should usually also leave gracefully. Exit motion should be quieter than enter motion.

4. Keep the scale of movement small.
Prefer soft fades with slight vertical movement or controlled expansion. Avoid dramatic bounces, spins, or large zoom effects in forms and core flows.

5. Interruptibility matters.
If a control can be toggled quickly, prefer state-driven transitions over long keyframe sequences. The UI should be able to reverse direction cleanly.

6. High-frequency interactions should stay restrained.
The more often a user triggers something, the less animation it should have. Repeated controls should feel responsive first.

7. Reduced motion is mandatory.
Every meaningful animation must remain usable with `prefers-reduced-motion: reduce`.

## Recommended approach for progressive disclosure

Use this for RSVP-style conditional controls such as dietary note fields, baby seating options, or optional notes.

- Keep the container mounted long enough to animate the exit.
- Animate opacity with a small translate or collapse/expand treatment.
- Use subtle easing and short durations.
- Do not rely on animation alone to communicate meaning; labels and layout still need to make sense instantly.
- Disable pointer interaction while a hidden panel is exiting.

Good default shape for this project:

- Opacity: `0 -> 1`
- Translate Y: about `-6px -> 0` or `8px -> 0`
- Duration: about `180ms` to `320ms` depending on prominence
- Easing: custom smooth curve, not plain `ease`

## What to avoid

- No abrupt mount/unmount for visible UI changes
- No `scale(0)` entrances
- No large parallax or full-screen movement
- No long ornamental animations inside forms
- No default easing everywhere
- No layout-breaking motion that depends on exact timing
- No forgetting reduced-motion behavior

## Code review checklist

- Does this motion explain a state change?
- Is there a motion gap here?
- Is the exit subtler than the enter?
- Would this still feel good on the 10th interaction?
- Is the animation interruptible?
- Does it respect `prefers-reduced-motion`?
- Does it match the rest of the site?

## Existing pattern in this repo

The RSVP form uses a disclosure pattern for conditional sections in [RSVPForm.jsx](/Users/beniaminomarini/Documents/git/wedding/src/components/RSVPForm.jsx). Reuse that style for similar form disclosures unless there is a clear reason to introduce a different pattern.
