/** Observatory Console style: control changes should feel immediate, measured, and calm. */

import { RotateCcw, SlidersHorizontal } from "lucide-react";
import type { ExperimentConfig } from "@/physics/doppler";
import { LIMITS, signed, speedDescription } from "@/physics/doppler";
import { Button } from "@/components/ui/button";

type ControlsProps = { config: ExperimentConfig; onChange: (patch: Partial<ExperimentConfig>) => void; onReset: () => void };

type SliderControlProps = {
  label: string; value: number; unit: string; min: number; max: number; step: number;
  description: string; onChange: (value: number) => void;
};

function SliderControl({ label, value, unit, min, max, step, description, onChange }: SliderControlProps) {
  const fill = ((value - min) / (max - min)) * 100;
  return <div className="control-field">
    <div className="control-label-row"><label>{label}</label><output>{value > 0 && min < 0 ? signed(value) : value} <small>{unit}</small></output></div>
    <input aria-label={label} type="range" min={min} max={max} step={step} value={value} style={{ "--fill": `${fill}%` } as React.CSSProperties} onChange={(event) => onChange(Number(event.target.value))} />
    <p>{description}</p>
  </div>;
}

export function Controls({ config, onChange, onReset }: ControlsProps) {
  return <aside className="controls-panel instrument-card">
    <div className="panel-heading"><div className="heading-icon"><SlidersHorizontal size={16} /></div><div><span className="eyebrow">Experiment inputs</span><h2>Set the motion</h2></div></div>
    <SliderControl label="Source frequency" value={config.sourceFrequency} unit="Hz" {...LIMITS.sourceFrequency} description="The emitter keeps this frequency fixed." onChange={(sourceFrequency) => onChange({ sourceFrequency })} />
    <SliderControl label="Source velocity" value={config.sourceVelocity} unit="m/s" {...LIMITS.sourceVelocity} description={`+x is right: ${speedDescription("source", config.sourceVelocity)}.`} onChange={(sourceVelocity) => onChange({ sourceVelocity })} />
    <SliderControl label="Observer velocity" value={config.observerVelocity} unit="m/s" {...LIMITS.observerVelocity} description={`+x is right: ${speedDescription("observer", config.observerVelocity)}.`} onChange={(observerVelocity) => onChange({ observerVelocity })} />
    <SliderControl label="Speed of sound" value={config.soundSpeed} unit="m/s" {...LIMITS.soundSpeed} description="The sound medium remains at rest." onChange={(soundSpeed) => onChange({ soundSpeed })} />
    <div className="sign-convention"><b>Sign convention</b><p>Source starts left; observer starts right. Positive is rightward. So source + moves closer, while observer − moves closer.</p></div>
    <Button variant="ghost" className="reset-button" onClick={onReset}><RotateCcw size={15} /> Reset laboratory</Button>
  </aside>;
}
