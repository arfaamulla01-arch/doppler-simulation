# Doppler Lab — Moving Observers

## Project overview

Doppler Lab is a single-page interactive micro-simulation for Class 11–12 Physics. It visualizes a sound source, a moving observer, and expanding circular wavefronts while synchronizing the scene with a live Doppler calculation, detector-rate comparison, guided discovery mode, and conceptual check.

## Pedagogical choice

The simulation targets the misconception: **“The source changes its frequency when it moves.”** The source’s emission rate remains visibly fixed in the canvas and control panel. Motion instead changes wavefront spacing and/or how frequently the observer crosses the already-emitted fronts. The detector meter and equation make that difference measurable.

## Key features

- Responsive animated Canvas acoustic chamber with play/pause and reset controls.
- Live source frequency, source velocity, observer velocity, and sound-speed controls.
- Dynamically substituted equation and observed-frequency calculation.
- Five scenario presets, Aha mode, detector pulse comparison, and immediate misconception feedback.

## Physics

The view places the source left of the observer; positive velocity is rightward. For a right-travelling sound wave in a stationary medium:

`f′ = f(c − vₒ) / (c − vₛ)`

Here `f` is emitted frequency, `c` the sound speed, `vₒ` observer velocity, and `vₛ` source velocity. The interface limits source speed below the minimum allowed sound speed, keeping the denominator positive.

## AI workflow & disclosure

AI coding tools were used to assist implementation. This project does not claim unverified AI mistakes. Fill this truthful reflection only if applicable:

> AI initially generated ________. I identified the issue by ________. I corrected it by ________.

## Running locally

```bash
npm install
npm run dev
```

## Deployment

The project is a static Vite app. Build with `npm run build`, then deploy the output to Vercel, Netlify, or GitHub Pages following the host’s Vite deployment instructions.

