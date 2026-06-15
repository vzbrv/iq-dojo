import type { Question } from "../data/onchainSurvivalQuestions";
import { track } from "../lib/analytics";

export function ProgressBar({ current, total }: { current: number; total: number }) {
  return <div className="h-2.5 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-iq to-base transition-all duration-500" style={{ width: `${(current / total) * 100}%` }} /></div>;
}

export function XPDisplay({ xp }: { xp: number }) {
  return <span className="chip text-lime"><span>✦</span>{xp} XP</span>;
}

export function StreakDisplay({ streak }: { streak: number }) {
  return <span className="chip text-orange-300"><span>▲</span>{streak} streak</span>;
}

export function AnswerOption({ text, label, state = "idle", onClick, disabled }: { text: string; label: string; state?: "idle" | "correct" | "wrong" | "muted"; onClick?: () => void; disabled?: boolean }) {
  const styles = { idle: "border-white/10 hover:border-iq/60 hover:bg-iq/10", correct: "border-lime/70 bg-lime/10 text-lime", wrong: "border-red-400/70 bg-red-400/10 text-red-200", muted: "border-white/5 opacity-45" };
  return <button className={`flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition ${styles[state]}`} onClick={onClick} disabled={disabled}>
    <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-white/10 text-xs font-black">{label}</span>
    <span className="text-sm font-semibold leading-6">{text}</span>
  </button>;
}

export function QuestionCard({ question, selectedId, answered, onAnswer }: { question: Question; selectedId: string | null; answered: boolean; onAnswer: (id: string) => void }) {
  return <section className="card p-5 sm:p-7">
    <div className="mb-5 flex items-center justify-between gap-3"><span className="chip">{question.difficulty}</span><span className="text-xs font-bold text-white/40">+{question.xpReward} XP</span></div>
    <h2 className="text-2xl font-black tracking-tight sm:text-3xl">{question.title}</h2>
    <p className="mt-3 text-sm leading-6 text-white/65 sm:text-base">{question.scenario}</p>
    <div className="mt-6 space-y-3">{question.answers.map((answer, index) => {
      let state: "idle" | "correct" | "wrong" | "muted" = "idle";
      if (answered) state = answer.id === question.correctAnswerId ? "correct" : answer.id === selectedId ? "wrong" : "muted";
      return <AnswerOption key={answer.id} text={answer.text} label={String.fromCharCode(65 + index)} state={state} disabled={answered} onClick={() => onAnswer(answer.id)} />;
    })}</div>
  </section>;
}

export function FeedbackCard({ correct, explanation, onContinue, final }: { correct: boolean; explanation: string; onContinue: () => void; final: boolean }) {
  return <section className={`rounded-3xl border p-5 ${correct ? "border-lime/30 bg-lime/10" : "border-red-400/30 bg-red-400/10"}`}>
    <p className={`font-black ${correct ? "text-lime" : "text-red-200"}`}>{correct ? "Correct. You may survive another epoch." : "Not quite. This is how you become someone else’s yield."}</p>
    <p className="mt-2 text-sm leading-6 text-white/65">{explanation}</p>
    <button className="btn-primary mt-5" onClick={onContinue}>{final ? "See results" : "Next scenario"}</button>
  </section>;
}

export function IQWikiLinkCard({ url = "https://iq.wiki/", label = "Open IQ.wiki" }: { url?: string; label?: string }) {
  return <a href={url} target="_blank" rel="noreferrer" onClick={() => track("iq_wiki_link_clicked", { url })} className="card flex items-center justify-between gap-3 p-4 transition hover:border-iq/40 hover:bg-white/5"><span><strong className="block text-sm">Deepen the lore</strong><span className="text-xs text-white/45">{label}</span></span><span className="text-iq">↗</span></a>;
}

export function LockedFeatureCard({ title, text }: { title: string; text: string }) {
  return <button onClick={() => track("iq_unlock_clicked", { feature: title })} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left transition hover:border-iq/30">
    <span className="text-xs font-black uppercase tracking-wider text-iq">Locked · coming next</span><strong className="mt-2 block">{title}</strong><span className="mt-1 block text-xs leading-5 text-white/45">{text}</span>
  </button>;
}

export function BadgePreviewCard() {
  return <button onClick={() => track("badge_preview_clicked")} className="card relative w-full overflow-hidden p-6 text-left transition hover:border-base/50">
    <div className="absolute -right-12 -top-12 size-40 rounded-full bg-base/20 blur-3xl" /><span className="chip">Base badge · locked</span>
    <div className="mt-6 grid size-24 place-items-center rounded-3xl border border-base/50 bg-gradient-to-br from-base/40 to-iq/20 text-center shadow-lg shadow-base/10"><span className="text-4xl font-black">IQ</span></div>
    <h3 className="mt-5 text-xl font-black">IQ Dojo: Onchain Survival</h3><p className="mt-2 text-sm text-white/50">Proof that your wallet might make it.</p>
  </button>;
}
