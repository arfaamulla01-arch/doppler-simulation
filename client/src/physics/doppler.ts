/** Observatory Console style: physics is isolated from the interface to preserve causal clarity. */

export type ExperimentConfig = {
  sourceFrequency: number;
  sourceVelocity: number;
  observerVelocity: number;
  soundSpeed: number;
};

export type DopplerResult = {
  observedFrequency: number;
  numerator: number;
  denominator: number;
  difference: number;
  percentageDifference: number;
  frontWavelength: number;
  isSafe: boolean;
};

export const DEFAULT_CONFIG: ExperimentConfig = {
  sourceFrequency: 500,
  sourceVelocity: 20,
  observerVelocity: -10,
  soundSpeed: 343,
};

export const LIMITS = {
  sourceFrequency: { min: 100, max: 1000, step: 10 },
  sourceVelocity: { min: -120, max: 120, step: 1 },
  observerVelocity: { min: -120, max: 120, step: 1 },
  soundSpeed: { min: 250, max: 450, step: 1 },
} as const;

/**
 * The laboratory view fixes the source to the left of the observer and uses +x to the right.
 * Therefore a positive source velocity moves toward the observer, while a negative observer
 * velocity moves toward the source. In a medium at rest, the wave ahead of the source has
 * λ = (c − vs) / f and a moving observer encounters those fronts at c − vo.
 */
export function calculateDoppler(config: ExperimentConfig): DopplerResult {
  const numerator = config.soundSpeed - config.observerVelocity;
  const denominator = config.soundSpeed - config.sourceVelocity;
  const isSafe = numerator > 0 && denominator > 0 && Number.isFinite(numerator / denominator);
  const observedFrequency = isSafe
    ? config.sourceFrequency * (numerator / denominator)
    : config.sourceFrequency;
  const difference = observedFrequency - config.sourceFrequency;

  return {
    observedFrequency,
    numerator,
    denominator,
    difference,
    percentageDifference: (difference / config.sourceFrequency) * 100,
    frontWavelength: denominator / config.sourceFrequency,
    isSafe,
  };
}

export function signed(value: number, decimals = 0): string {
  const fixed = Math.abs(value).toFixed(decimals);
  return value > 0 ? `+${fixed}` : value < 0 ? `−${fixed}` : `0${decimals ? `. ${"0".repeat(decimals)}` : ""}`;
}

export function speedDescription(kind: "source" | "observer", velocity: number): string {
  if (velocity === 0) return "stationary";
  if (kind === "source") return velocity > 0 ? "toward observer" : "away from observer";
  return velocity < 0 ? "toward source" : "away from source";
}

export function relationLabel(result: DopplerResult): string {
  if (Math.abs(result.difference) < 0.05) return "same pitch";
  return result.difference > 0 ? "higher pitch" : "lower pitch";
}
