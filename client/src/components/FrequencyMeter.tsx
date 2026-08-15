/** Observatory Console style: rate comparison is presented as a compact detector instrument. */

import { Activity, ArrowDownRight, ArrowUpRight, Equal } from "lucide-react";
import type { DopplerResult, ExperimentConfig } from "@/physics/doppler";

type FrequencyMeterProps = { config: ExperimentConfig; result: DopplerResult };

export function FrequencyMeter({ config, result }: FrequencyMeterProps) {
  const high = result.difference > 0.05;
  const low = result.difference < -0.05;
  const max = Math.max(600, Math.ceil(Math.max(config.sourceFrequency, result.observedFrequency) / 100) * 100);
  const sourcePosition = Math.min(100, (config.sourceFrequency / max) * 100);
  const observedPosition = Math.min(100, (result.observedFrequency / max) * 100);
  const DeltaIcon = high ? ArrowUpRight : low ? ArrowDownRight : Equal;
  return <section className="frequency-panel instrument-card">
    <div className="panel-heading"><div className="heading-icon cyan-icon"><Activity size={16} /></div><div><span className="eyebrow">Detector comparison</span><h2>Encounter rate</h2></div></div>
    <div className="rate-readout source-rate"><span>Source emits</span><strong>{config.sourceFrequency}<small> Hz</small></strong><em>unchanged</em></div>
    <div className="rate-readout observer-rate"><span>Observer receives</span><strong>{result.observedFrequency.toFixed(1)}<small> Hz</small></strong><em>measured</em></div>
      <div className="rate-scale" aria-label={`Frequency rate comparison from 0 to ${max} Hz`}>
        <div className="scale-track" />
        <span className="scale-bound scale-bound-start">0 Hz</span><span className="scale-bound scale-bound-end">{max} Hz</span>
        <div className="scale-mark source-mark" style={{ left: `${sourcePosition}%` }}><i /><span>source</span></div>
      <div className="scale-mark observed-mark" style={{ left: `${observedPosition}%` }}><i /><span>detector</span></div>
    </div>
    <div className={`delta-pill ${high ? "higher" : low ? "lower" : "same"}`}><DeltaIcon size={15} /><b>{high ? "+" : ""}{result.percentageDifference.toFixed(1)}%</b><span>relative to emitted rate</span></div>
    <div className="pulse-strip"><span>incoming fronts</span><div className="pulse-dots" style={{ "--speed": `${Math.max(0.45, Math.min(1.55, 700 / result.observedFrequency))}s` } as React.CSSProperties}>{Array.from({ length: 7 }).map((_, index) => <i key={index} style={{ animationDelay: `${index * 0.12}s` }} />)}</div></div>
  </section>;
}
