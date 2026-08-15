import { describe, expect, it } from "vitest";
import { calculateDoppler, DEFAULT_CONFIG } from "./doppler";

describe("calculateDoppler", () => {
  it("preserves frequency without relative motion", () => {
    expect(calculateDoppler({ ...DEFAULT_CONFIG, sourceVelocity: 0, observerVelocity: 0 }).observedFrequency).toBe(500);
  });

  it("increases observed frequency when the source approaches", () => {
    expect(calculateDoppler({ ...DEFAULT_CONFIG, sourceVelocity: 40, observerVelocity: 0 }).observedFrequency).toBeGreaterThan(500);
  });

  it("decreases observed frequency when the source recedes", () => {
    expect(calculateDoppler({ ...DEFAULT_CONFIG, sourceVelocity: -40, observerVelocity: 0 }).observedFrequency).toBeLessThan(500);
  });

  it("increases observed frequency when the observer approaches", () => {
    expect(calculateDoppler({ ...DEFAULT_CONFIG, sourceVelocity: 0, observerVelocity: -30 }).observedFrequency).toBeGreaterThan(500);
  });

  it("decreases observed frequency when the observer recedes", () => {
    expect(calculateDoppler({ ...DEFAULT_CONFIG, sourceVelocity: 0, observerVelocity: 30 }).observedFrequency).toBeLessThan(500);
  });

  it("reverses the effect when velocity direction reverses", () => {
    const toward = calculateDoppler({ ...DEFAULT_CONFIG, sourceVelocity: 25, observerVelocity: 0 }).observedFrequency;
    const away = calculateDoppler({ ...DEFAULT_CONFIG, sourceVelocity: -25, observerVelocity: 0 }).observedFrequency;
    expect(toward).toBeGreaterThan(500);
    expect(away).toBeLessThan(500);
  });

  it("keeps its outputs finite at allowed velocity bounds", () => {
    const result = calculateDoppler({ ...DEFAULT_CONFIG, sourceVelocity: 120, observerVelocity: -120 });
    expect(result.isSafe).toBe(true);
    expect(Number.isFinite(result.observedFrequency)).toBe(true);
  });
});
