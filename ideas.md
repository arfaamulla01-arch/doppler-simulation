# Doppler Effect Simulator — Design Directions

## Three possible approaches

| Theme Name | Very Brief Intro | Probability |
| --- | --- | --- |
| Observatory Console | A dark, calm scientific instrument designed around measured signals and legible physical relationships. It feels like a precise laboratory tool rather than a lesson page. | 0.07 |
| Kinetic Paper Lab | A bright editorial visual language using annotated diagrams, ink lines, and laboratory-note texture. It would make the concept feel tactile and hand-discovered. | 0.04 |
| Sonic Field Atlas | An immersive field-map metaphor in which wavefronts behave like contours moving through a navigable acoustic landscape. It would privilege spatial intuition and wonder. | 0.09 |

## Chosen direction — Observatory Console

### Design Movement

**Scientific instrument UX** influenced by contemporary observatory control rooms, optical measurement equipment, and restrained Swiss information design.

### Core Principles

1. **Evidence before decoration:** each visual element represents either a physical object, a measurement, or a causal relation.
2. **One connected experiment:** the canvas is the primary scene, with controls and calculations arranged as operational instruments around it.
3. **Quiet precision:** dark, low-reflection surfaces give numerical values and moving cyan wavefronts prominence without gaming-style effects.
4. **Causal legibility:** source motion, wave geometry, detection rate, and equation terms share color and directional language.

### Color Philosophy

The background is blue-black like a low-light laboratory, making the acoustic field feel spatial and reducing visual noise. A **signal cyan** marks propagating waves and measured observer data; coral identifies the source and its motion; warm ivory is reserved for primary text and the final numerical answer. These colors are semantic rather than decorative, making cause and effect traceable at a glance.

### Layout Paradigm

An **instrument bench** composition rather than a conventional stacked card grid. The wide animated acoustic chamber forms the central work surface. A narrow left rail holds the experiment controls; an adjacent right rail shows the computed model and detector. Supporting pedagogy sits below as concise panels aligned to the canvas edges, preserving a focused working environment.

### Signature Elements

1. A fine calibration grid with restrained coordinate ticks inside the acoustic chamber.
2. A segmented signal trace that runs between source, observer, and calculation panel.
3. Small uppercase instrument labels paired with precise numeric readouts and unit chips.

### Interaction Philosophy

Interactions behave like adjusting a real laboratory instrument: sliders update continuously, preset changes are immediate, and the scene reflects motion in real time. Hover and focus states clarify controllability but never obscure the physical display.

### Animation

Wavefronts expand continuously at a low visual intensity; detection pulses use a short, physical-looking outward flash. Panel and state transitions use 180–240 ms high-confidence easing. Reduced-motion users receive a static but fully informative view. Nothing loops merely for decoration.

### Typography System

**Space Grotesk** provides a technical, modern display voice for headlines and measurements. **Source Sans 3** supports explanatory text and controls with high readability. Labels use compact uppercase tracking; formulae use a serif-like mathematical fallback stack for visual distinction.

### Brand Essence

**A live acoustic lab for secondary-school students to see the Doppler effect as a changing encounter rate, not a changing source.**

Personality: **precise, illuminating, composed.**

### Brand Voice

Clear, observant, and invitational. Headlines state what to look for; CTAs invite a test rather than promising generic progress.

Examples:

> Tune the motion. Watch the encounter rate change.

> The source keeps its beat. The observer meets the waves differently.

### Wordmark & Logo

**Wavelength / Doppler Lab** uses a compact wordmark paired with a circular symbol: a coral source dot nested within three cropped cyan wave arcs, with one arc shifted to imply motion. The mark works as a favicon and a control-panel seal without relying on generated typography.

### Signature Brand Color

**Signal Cyan — `#78F2E5`**: an unmistakable measurement color used for wavefronts, live detector pulses, and observed frequency.

## Style Decisions

- The first viewport functions as an active laboratory entry point: acoustic-field geometry and an emission-to-detector trace are visible beside the proposition, before the main canvas begins.
- Coral is strictly semantic: it identifies the source, source velocity, source emission, and source-side equation terms. Cyan identifies travelling fronts, the observer, detection, and observed frequency.
- All content below the acoustic chamber inherits the observatory bench language through segmented traces, compact instrument labels, calibration-line alignment, and a lab-worksheet treatment for the concept check.
