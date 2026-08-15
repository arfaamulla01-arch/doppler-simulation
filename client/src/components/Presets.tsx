/** Observatory Console style: presets offer distinct experimental conditions, not generic shortcuts. */

import { ArrowDownRight, ArrowUpRight, CircleDot, MoveRight, Orbit } from "lucide-react";
import type { ExperimentConfig } from "@/physics/doppler";

export type Preset = { id: string; label: string; caption: string; note: string; icon: typeof CircleDot; config: Partial<ExperimentConfig> };

export const PRESETS: Preset[] = [
  { id: "still", label: "No relative motion", caption: "same rate in, same rate out", note: "Both stay still, so each emitted wavefront reaches the detector at the source rate.", icon: CircleDot, config: { sourceVelocity: 0, observerVelocity: 0 } },
  { id: "source-approach", label: "Source approaches", caption: "front wavefronts compress", note: "The moving source launches each new front closer to the observer than the previous one.", icon: ArrowUpRight, config: { sourceVelocity: 50, observerVelocity: 0 } },
  { id: "source-recede", label: "Source recedes", caption: "front wavefronts spread", note: "The moving source launches each successive front further back from the observer.", icon: ArrowDownRight, config: { sourceVelocity: -50, observerVelocity: 0 } },
  { id: "observer-approach", label: "Observer approaches", caption: "detector meets fronts faster", note: "The source keeps its beat; the observer moves into wavefronts more often.", icon: MoveRight, config: { sourceVelocity: 0, observerVelocity: -35 } },
  { id: "both", label: "Both move", caption: "two motion effects combine", note: "Compression by source motion and an approaching detector both increase the encounter rate.", icon: Orbit, config: { sourceVelocity: 32, observerVelocity: -20 } },
];

type PresetsProps = { activeId: string; onSelect: (preset: Preset) => void };

export function Presets({ activeId, onSelect }: PresetsProps) {
  return <section className="presets-section"><div className="section-heading"><span className="eyebrow">Run a scenario</span><h2>Change one idea at a time</h2><p>Each setting updates the scene, detection meter, and equation together.</p></div><div className="preset-list">{PRESETS.map((preset) => { const Icon = preset.icon; return <button key={preset.id} onClick={() => onSelect(preset)} className={`preset-button ${activeId === preset.id ? "selected" : ""}`}><span className="preset-icon"><Icon size={17} /></span><span><b>{preset.label}</b><small>{preset.caption}</small></span></button>; })}</div></section>;
}
