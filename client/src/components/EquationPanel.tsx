/** Observatory Console style: equations visibly connect observed values to the physical setup. */

import { Calculator, Info } from "lucide-react";
import type { DopplerResult, ExperimentConfig } from "@/physics/doppler";
import { relationLabel } from "@/physics/doppler";

type EquationPanelProps = { config: ExperimentConfig; result: DopplerResult };

const number = (value: number, digits = 1) => value.toFixed(digits).replace(".0", "");
const term = (value: number) => value < 0 ? `(${number(value)})` : number(value);

export function EquationPanel({ config, result }: EquationPanelProps) {
  const differenceVerb = result.difference > 0.05 ? "more" : result.difference < -0.05 ? "fewer" : "the same number of";
  return <section className="equation-panel instrument-card">
    <div className="panel-heading"><div className="heading-icon"><Calculator size={16} /></div><div><span className="eyebrow">Live model</span><h2>Observed frequency</h2></div></div>
    <div className="math-variables">
      <span className="source-term"><i>f</i><b>{config.sourceFrequency}</b><small>Hz emitted</small></span>
      <span className="source-term"><i>v<sub>s</sub></i><b>{config.sourceVelocity}</b><small>m/s source</small></span>
      <span className="observer-term"><i>v<sub>o</sub></i><b>{config.observerVelocity}</b><small>m/s observer</small></span>
      <span className="medium-term"><i>c</i><b>{config.soundSpeed}</b><small>m/s sound</small></span>
    </div>
    <div className="equation-box" aria-label="Doppler equation calculation">
      <span className="formula-label">For waves travelling right</span>
      <div className="formula">f′ = f × <span className="fraction"><b>c − <span className="term-observer">v<sub>o</sub></span></b><b>c − <span className="term-source">v<sub>s</sub></span></b></span></div>
      <div className="substitution">= <span className="term-source">{config.sourceFrequency}</span> × <span className="fraction compact"><b>{config.soundSpeed} − <span className="term-observer">{term(config.observerVelocity)}</span></b><b>{config.soundSpeed} − <span className="term-source">{term(config.sourceVelocity)}</span></b></span></div>
      <div className="final-frequency"><span>f′</span><strong>{number(result.observedFrequency)} <small>Hz</small></strong><em>{relationLabel(result)}</em></div>
    </div>
    <p className="calculation-note"><Info size={14} /> The detector meets <b>{differenceVerb}</b> wavefronts each second. The source still emits at {config.sourceFrequency} Hz.</p>
  </section>;
}
