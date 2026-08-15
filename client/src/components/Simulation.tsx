/** Observatory Console style: the canvas is a quiet, measured acoustic chamber. */

import { Pause, Play, Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";
import type { ExperimentConfig } from "@/physics/doppler";
import { Button } from "@/components/ui/button";

type SimulationProps = {
  config: ExperimentConfig;
  running: boolean;
  ahaActive: boolean;
  onToggleRunning: () => void;
  onAhaToggle: () => void;
};

type Wave = { x: number; y: number; age: number; hue: number };

export function Simulation({ config, running, ahaActive, onToggleRunning, onAhaToggle }: SimulationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const configRef = useRef(config);
  const runningRef = useRef(running);
  const ahaRef = useRef(ahaActive);

  useEffect(() => {
    configRef.current = config;
  }, [config]);

  useEffect(() => {
    runningRef.current = running;
  }, [running]);

  useEffect(() => {
    ahaRef.current = ahaActive;
  }, [ahaActive]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let raf = 0;
    let lastFrame = performance.now();
    let elapsed = 0;
    let emissionClock = 0.42;
    let pulse = 0;
    const waves: Wave[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * ratio));
      canvas.height = Math.max(1, Math.floor(rect.height * ratio));
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    const drawArrow = (ctx: CanvasRenderingContext2D, x: number, y: number, direction: number, color: string) => {
      const size = 8;
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(x - direction * 17, y);
      ctx.lineTo(x + direction * 17, y);
      ctx.moveTo(x + direction * 17, y);
      ctx.lineTo(x + direction * (17 - size), y - size * 0.58);
      ctx.moveTo(x + direction * 17, y);
      ctx.lineTo(x + direction * (17 - size), y + size * 0.58);
      ctx.stroke();
    };

    const render = (now: number) => {
      const dt = Math.min((now - lastFrame) / 1000, 0.05);
      lastFrame = now;
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const active = runningRef.current;
      const activeConfig = configRef.current;
      const aha = ahaRef.current;

      if (active) elapsed += dt;
      const motionTime = elapsed % 3.6;
      const screenSoundSpeed = 152 * (activeConfig.soundSpeed / 343);
      const sourceMotion = screenSoundSpeed * (activeConfig.sourceVelocity / activeConfig.soundSpeed);
      const observerMotion = screenSoundSpeed * (activeConfig.observerVelocity / activeConfig.soundSpeed);
      const baselineY = height * 0.54;
      const sourceX = width * 0.22 + sourceMotion * motionTime;
      const observerX = width * 0.77 + observerMotion * motionTime;
      const emissionPeriod = Math.max(0.2, Math.min(1.05, 260 / activeConfig.sourceFrequency));

      if (active) {
        emissionClock += dt;
        while (emissionClock >= emissionPeriod) {
          emissionClock -= emissionPeriod;
          waves.push({ x: sourceX, y: baselineY, age: 0, hue: aha ? 165 : 172 });
        }
        for (const wave of waves) wave.age += dt;
      }

      const maxAge = Math.max(width, height) * 1.23 / screenSoundSpeed;
      while (waves.length && waves[0].age > maxAge) waves.shift();
      if (aha && waves.length > 7) waves.splice(0, waves.length - 7);

      context.clearRect(0, 0, width, height);
      const backdrop = context.createLinearGradient(0, 0, width, height);
      backdrop.addColorStop(0, "#0b1825");
      backdrop.addColorStop(0.56, "#08121d");
      backdrop.addColorStop(1, "#0a1420");
      context.fillStyle = backdrop;
      context.fillRect(0, 0, width, height);

      context.save();
      context.globalAlpha = 0.22;
      context.strokeStyle = "#496171";
      context.lineWidth = 0.5;
      for (let x = 0; x < width; x += 32) {
        context.beginPath(); context.moveTo(x, 0); context.lineTo(x, height); context.stroke();
      }
      for (let y = 0; y < height; y += 32) {
        context.beginPath(); context.moveTo(0, y); context.lineTo(width, y); context.stroke();
      }
      context.restore();

      const horizon = context.createLinearGradient(0, baselineY - 2, width, baselineY + 2);
      horizon.addColorStop(0, "rgba(120,242,229,.10)");
      horizon.addColorStop(0.45, "rgba(120,242,229,.34)");
      horizon.addColorStop(1, "rgba(120,242,229,.10)");
      context.strokeStyle = horizon;
      context.lineWidth = 1;
      context.setLineDash([3, 7]);
      context.beginPath(); context.moveTo(0, baselineY); context.lineTo(width, baselineY); context.stroke();
      context.setLineDash([]);

      for (const wave of waves) {
        const radius = wave.age * screenSoundSpeed;
        const alpha = Math.max(0, 0.53 * (1 - wave.age / maxAge));
        context.beginPath();
        context.arc(wave.x, wave.y, radius, 0, Math.PI * 2);
        context.strokeStyle = `hsla(${wave.hue}, 78%, 72%, ${alpha})`;
        context.lineWidth = aha ? 1.5 : 1.15;
        context.stroke();
      }

      const sourceToObserver = Math.abs(observerX - sourceX);
      const detectorCrossing = waves.some((wave) => Math.abs(wave.age * screenSoundSpeed - sourceToObserver) < 2.6);
      if (detectorCrossing) pulse = 1;
      pulse = Math.max(0, pulse - dt * 2.5);

      if (sourceX < observerX) {
        context.fillStyle = "rgba(120,242,229,.22)";
        context.fillRect(sourceX, baselineY + 42, observerX - sourceX, 1);
        context.fillStyle = "rgba(178,202,215,.72)";
        context.font = "11px 'Source Sans 3', sans-serif";
        context.textAlign = "center";
        context.fillText("wave travel direction", (sourceX + observerX) / 2, baselineY + 62);
      }

      context.save();
      context.fillStyle = "rgba(255,128,102,.12)";
      context.beginPath(); context.arc(sourceX, baselineY, 29, 0, Math.PI * 2); context.fill();
      context.fillStyle = "#ff8066";
      context.beginPath(); context.arc(sourceX, baselineY, 13, 0, Math.PI * 2); context.fill();
      context.strokeStyle = "#ffe4dc";
      context.lineWidth = 1.3;
      context.beginPath(); context.arc(sourceX, baselineY, 6, 0, Math.PI * 2); context.stroke();
      context.restore();

      context.fillStyle = "#ffe2d8";
      context.font = "600 11px 'Space Grotesk', sans-serif";
      context.textAlign = "center";
      context.fillText("SOURCE", sourceX, baselineY - 42);
      context.fillStyle = "#a9bdc9";
      context.font = "11px 'Source Sans 3', sans-serif";
      context.fillText(`${activeConfig.sourceFrequency} Hz • constant emission`, sourceX, baselineY - 25);
      if (activeConfig.sourceVelocity !== 0) drawArrow(context, sourceX, baselineY + 34, Math.sign(activeConfig.sourceVelocity), "#ff997e");

      const detectorRadius = 20 + pulse * 15;
      context.beginPath(); context.arc(observerX, baselineY, detectorRadius, 0, Math.PI * 2);
      context.fillStyle = `rgba(120,242,229,${0.06 + pulse * 0.18})`; context.fill();
      context.strokeStyle = `rgba(120,242,229,${0.48 + pulse * 0.45})`; context.lineWidth = 1.4; context.stroke();
      context.fillStyle = "#b4fff5";
      context.beginPath(); context.arc(observerX, baselineY, 9, 0, Math.PI * 2); context.fill();
      context.fillStyle = "#0a1720";
      context.beginPath(); context.arc(observerX, baselineY, 3.5, 0, Math.PI * 2); context.fill();
      context.fillStyle = "#d4fff9";
      context.font = "600 11px 'Space Grotesk', sans-serif";
      context.textAlign = "center";
      context.fillText("OBSERVER", observerX, baselineY - 42);
      context.fillStyle = "#a9bdc9";
      context.font = "11px 'Source Sans 3', sans-serif";
      context.fillText(detectorCrossing ? "wavefront detected" : "receiving wavefronts", observerX, baselineY - 25);
      if (activeConfig.observerVelocity !== 0) drawArrow(context, observerX, baselineY + 34, Math.sign(activeConfig.observerVelocity), "#78f2e5");

      context.fillStyle = "rgba(175,200,214,.65)";
      context.font = "10px 'Space Grotesk', sans-serif";
      context.textAlign = "left";
      context.fillText("ACOUSTIC FIELD • VISUAL TIME SCALE", 18, 22);
      context.textAlign = "right";
      context.fillText(`${activeConfig.soundSpeed} m/s medium`, width - 18, 22);

      if (aha) {
        context.fillStyle = "rgba(8,18,29,.58)";
        context.fillRect(0, height - 43, width, 43);
        context.fillStyle = "#d9fff9";
        context.font = "600 12px 'Space Grotesk', sans-serif";
        context.textAlign = "center";
        context.fillText("Watch the same emitted wavefronts reach the moving detector at a new rate.", width / 2, height - 17);
      }

      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);
    return () => { cancelAnimationFrame(raf); observer.disconnect(); };
  }, []);

  return (
    <section className="simulation-panel" aria-label="Animated Doppler effect simulation">
      <div className="simulation-topbar">
        <div><span className="eyebrow">Live acoustic chamber</span><span className="chamber-state"><i /> {running ? "Running" : "Paused"}</span></div>
        <div className="simulation-actions">
          <Button variant="ghost" className="instrument-button" onClick={onToggleRunning} aria-label={running ? "Pause simulation" : "Play simulation"}>
            {running ? <Pause size={15} /> : <Play size={15} />} {running ? "Pause" : "Play"}
          </Button>
          <Button variant="ghost" className={`instrument-button aha-button ${ahaActive ? "active" : ""}`} onClick={onAhaToggle}>
            <Sparkles size={15} /> {ahaActive ? "Exit mode" : "Show me why"}
          </Button>
        </div>
      </div>
      <div className="canvas-wrap"><canvas ref={canvasRef} /></div>
      <div className="simulation-legend">
        <span><b className="legend-dot source-dot" /> Source & motion</span>
        <span><b className="legend-line wave-line" /> Emitted wavefront</span>
        <span><b className="legend-dot observer-dot" /> Wave detector</span>
        <span className="legend-note">The visual window loops to keep the experiment in view.</span>
      </div>
    </section>
  );
}
