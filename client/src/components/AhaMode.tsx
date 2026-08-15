/** Observatory Console style: the Aha sequence reduces the experiment to a visible causal comparison. */

import { CheckCircle2, Radio, Waves, X } from "lucide-react";
import type { DopplerResult, ExperimentConfig } from "@/physics/doppler";
import { Button } from "@/components/ui/button";

type AhaModeProps = { config: ExperimentConfig; result: DopplerResult; onClose: () => void };

export function AhaMode({ config, result, onClose }: AhaModeProps) {
  return <section className="aha-mode" aria-live="polite">
    <div className="aha-header"><div><span className="eyebrow">Guided observation</span><h2>The source keeps its beat.</h2></div><Button variant="ghost" className="close-aha" onClick={onClose}><X size={16} /> Exit</Button></div>
    <div className="aha-steps">
      <div><span className="step-number">01</span><Radio size={20} /><h3>Emit</h3><p>The source produces <b>{config.sourceFrequency} wavefronts/sec</b> whether it moves or not.</p></div>
      <div><span className="step-number">02</span><Waves size={20} /><h3>Travel</h3><p>Motion changes front spacing and the observer’s path through those fronts.</p></div>
      <div><span className="step-number">03</span><CheckCircle2 size={20} /><h3>Encounter</h3><p>The moving detector now meets <b>{result.observedFrequency.toFixed(1)} fronts/sec</b>.</p></div>
    </div>
    <div className="aha-conclusion"><span>Key inference</span><p><b>The source did not change its frequency.</b> Relative motion changed how often the observer encountered the wavefronts.</p></div>
  </section>;
}
