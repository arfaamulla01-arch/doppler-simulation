# Doppler Lab — Moving Observers

**Interactive Doppler Effect simulation for Class 11–12 Physics**

## Project Overview

Doppler Lab is an interactive micro-simulation that visualizes the Doppler Effect through a moving sound source, moving observer, expanding wavefronts, and real-time mathematical calculations. The simulation connects physical motion directly to wavefront spacing, detector encounter rate, and observed frequency.

## Pedagogical Choice

The simulation targets the misconception:

> **"The source changes its frequency when it moves."**

The key idea is that the source's emission frequency remains constant. Relative motion changes the spacing of wavefronts and/or how frequently the observer encounters those already-emitted wavefronts.

Doppler Lab makes this distinction visual rather than relying only on the formula. Students can change source velocity, observer velocity, frequency, and sound speed while simultaneously seeing the physical simulation, detector response, and calculated observed frequency change. The guided **Aha Mode** reinforces the difference between emission rate and encounter rate.

## Key Features

* Animated Canvas simulation with moving source, observer, and wavefronts
* Live controls for source frequency, source velocity, observer velocity, and sound speed
* Real-time Doppler equation and numerical calculation
* Detector-rate visualization comparing emitted and observed frequency
* Five interactive scenario presets
* Guided Aha Mode targeting the core misconception
* Concept-check interaction with immediate feedback
* Responsive interface with play, pause, and reset controls

## Physics

The simulation uses the convention that the source begins to the left of the observer and positive velocity is rightward.

For a right-travelling sound wave in a stationary medium:

`f′ = f(c − vₒ) / (c − vₛ)`

where `f` is the emitted frequency, `c` is the speed of sound, `vₒ` is observer velocity, and `vₛ` is source velocity.

The simulation constrains source velocity to keep the calculation physically valid.

## AI Workflow & Disclosure

AI coding tools were used during implementation for code generation, component structure, animation logic, and UI development. The generated implementation was reviewed against the Doppler equation, sign convention, expected behavior of the presets, and the intended pedagogical explanation. Physics logic and interactive behavior were manually checked rather than being accepted without verification.

## Running Locally

```bash
npm install
npm run dev
```

## Deployment

The project is a static Vite application and can be deployed using Vercel, Netlify, or GitHub Pages.

**Live Demo:** https://dopplersim-wmjhykxz.manus.space
