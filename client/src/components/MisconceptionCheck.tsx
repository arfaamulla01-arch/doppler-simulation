/** Observatory Console style: formative feedback is brief, direct, and linked to the observed evidence. */

import { Check, Lightbulb } from "lucide-react";

type MisconceptionCheckProps = { answer: "yes" | "no" | null; onAnswer: (answer: "yes" | "no") => void };

export function MisconceptionCheck({ answer, onAnswer }: MisconceptionCheckProps) {
  return <section className="misconception-check"><div className="check-copy"><span className="eyebrow"><Lightbulb size={13} /> Concept check</span><h2>Did the source change the frequency it emitted?</h2><p>Answer from what the source label and the detector meter showed.</p></div><div className="check-action"><div className="answer-buttons"><button onClick={() => onAnswer("yes")} className={answer === "yes" ? "wrong" : ""}>A. Yes</button><button onClick={() => onAnswer("no")} className={answer === "no" ? "correct" : ""}>B. No</button></div>{answer && <div className={`answer-feedback ${answer === "no" ? "feedback-correct" : "feedback-wrong"}`}>{answer === "no" ? <><Check size={16} /> Correct. The emission stayed fixed; the encounter rate changed.</> : <>Look again: the source display stays fixed even as wavefront spacing changes.</>}</div>}</div></section>;
}
