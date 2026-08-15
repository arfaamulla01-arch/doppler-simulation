/** Observatory Console style: a focused experimental workspace supports discovery over passive reading. */

import { useMemo, useState } from "react";
import "@/styles/observatory-refine.css";
import { ArrowDown, AudioLines, BookOpenCheck, ChevronRight, Gauge, MoveHorizontal, Waves } from "lucide-react";
import { AhaMode } from "@/components/AhaMode";
import { Controls } from "@/components/Controls";
import { EquationPanel } from "@/components/EquationPanel";
import { FrequencyMeter } from "@/components/FrequencyMeter";
import { MisconceptionCheck } from "@/components/MisconceptionCheck";
import { PRESETS, Presets, type Preset } from "@/components/Presets";
import { Simulation } from "@/components/Simulation";
import { calculateDoppler, DEFAULT_CONFIG, type ExperimentConfig } from "@/physics/doppler";

export default function Home() {
  const [config, setConfig] = useState<ExperimentConfig>(DEFAULT_CONFIG);
  const [running, setRunning] = useState(true);
  const [ahaActive, setAhaActive] = useState(false);
  const [activePreset, setActivePreset] = useState("both");
  const [presetNote, setPresetNote] = useState(PRESETS[4].note);
  const [answer, setAnswer] = useState<"yes" | "no" | null>(null);
  const result = useMemo(() => calculateDoppler(config), [config]);

  const updateConfig = (patch: Partial<ExperimentConfig>) => { setConfig((current) => ({ ...current, ...patch })); setActivePreset(""); };
  const applyPreset = (preset: Preset) => { setConfig((current) => ({ ...current, ...preset.config })); setActivePreset(preset.id); setPresetNote(preset.note); setRunning(true); setAnswer(null); };
  const reset = () => { setConfig(DEFAULT_CONFIG); setActivePreset("both"); setPresetNote(PRESETS[4].note); setAhaActive(false); setRunning(true); setAnswer(null); };
  const enterAha = () => { setAhaActive((active) => !active); setRunning(true); };

  return <div className="site-shell">
    <header className="site-header"><a className="brand" href="#top" aria-label="Doppler Lab home"><img src="/manus-storage/doppler-logo_b9c8a669.png" alt="" /><span>Doppler<span>Lab</span></span></a><div className="header-context"><span>Class 11–12 Physics</span><i /><span>Interactive acoustic experiment</span></div><a className="header-link" href="#concept">Concept note <ChevronRight size={15} /></a></header>
    <main id="top">
      <section className="hero"><div className="hero-copy"><span className="status-badge"><i /> Live simulation</span><h1>Frequency is not changing<br /><em>at the source.</em></h1><p>Make motion visible. Tune the source and observer, then trace how the same emitted wavefronts reach a moving detector at a different rate.</p><button className="primary-cta" onClick={() => { setAhaActive(true); setRunning(true); document.getElementById("experiment")?.scrollIntoView({ behavior: "smooth", block: "start" }); }}>Show me why the frequency changes <ArrowDown size={17} /></button></div><div className="hero-instrument" aria-hidden="true"><div className="hero-instrument-label">Acoustic field / preview</div><div className="hero-trace"><span className="hero-source-token" /><span className="hero-wavefronts"><i /><i /><i /><i /><i /></span><span className="hero-detector-token" /></div><div className="hero-instrument-data"><span>source beat<b>500 Hz</b></span><span>detector rate<b>{result.observedFrequency.toFixed(1)} Hz</b></span></div></div><div className="hero-brief"><span className="eyebrow">Central question</span><p>When pitch changes, what actually changed: the source’s beat, or the observer’s encounter rate?</p><div><AudioLines size={18} /><span>Explore it as an experiment, not a rule to memorize.</span></div></div></section>
      <section id="experiment" className="experiment-section"><div className="experiment-intro"><span className="eyebrow">The laboratory</span><h2>Move the variables.<br />Watch every representation agree.</h2><p>Every adjustment updates the animated field, detector rate, and equation in the same instant.</p></div><div className="experiment-grid"><Controls config={config} onChange={updateConfig} onReset={reset} /><div className="stage-column"><Simulation config={config} running={running} ahaActive={ahaActive} onToggleRunning={() => setRunning((value) => !value)} onAhaToggle={enterAha} />{ahaActive && <AhaMode config={config} result={result} onClose={() => setAhaActive(false)} />}</div><div className="data-column"><EquationPanel config={config} result={result} /><FrequencyMeter config={config} result={result} /></div></div></section>
      <section className="notice-strip"><span>What should I notice?</span><p>{presetNote}</p><button onClick={() => setAhaActive(true)}>Guide me through it <ChevronRight size={15} /></button></section>
      <Presets activeId={activePreset} onSelect={applyPreset} />
      <section id="concept" className="concept-section"><div className="concept-title"><span className="eyebrow">A compact model</span><h2>One source. Different encounters.</h2></div><div className="concept-cards"><article><div className="concept-icon"><Waves size={20} /></div><h3>1. The source emits</h3><p>A 500 Hz source makes 500 wavefronts each second. Motion does not change that internal beat.</p></article><article><div className="concept-icon"><MoveHorizontal size={20} /></div><h3>2. Motion reshapes access</h3><p>A moving source changes spacing ahead of it. A moving observer meets each spacing along a changing path.</p></article><article><div className="concept-icon"><Gauge size={20} /></div><h3>3. The detector counts</h3><p>Observed frequency is the rate at which this particular observer encounters the already-emitted fronts.</p></article></div></section>
      <MisconceptionCheck answer={answer} onAnswer={setAnswer} />
      <section className="method-note"><BookOpenCheck size={19} /><p><b>Equation convention:</b> source begins left and observer begins right; positive velocity means rightward. For the wave travelling right, <i>f′ = f(c − v<sub>o</sub>)/(c − v<sub>s</sub>)</i>.</p></section>
    </main>
    <footer><span>© Doppler Lab — built to make the invisible encounter visible.</span><span>SI units throughout</span></footer>
  </div>;
}
