import type { Question } from "../data/onchainSurvivalQuestions";
import { BadgePreviewCard, IQWikiLinkCard, LockedFeatureCard } from "./UI";

export function resultTier(score: number) {
  if (score <= 2) return { title: "Exit Liquidity", copy: "You did not survive the group chat alpha." };
  if (score <= 5) return { title: "Airdrop Tourist", copy: "You know the words, but the wallet drainer still has a chance." };
  if (score <= 8) return { title: "DeFi Survivor", copy: "You probably revoked at least one approval in your life." };
  return { title: "Terminally Onchain", copy: "You read contract permissions and still somehow ape." };
}

export function ResultTierCard({ score, xp }: { score: number; xp: number }) {
  const tier = resultTier(score);
  return <section className="card overflow-hidden p-6 text-center shadow-glow sm:p-8"><div className="mx-auto grid size-20 place-items-center rounded-3xl bg-gradient-to-br from-iq to-base text-3xl font-black text-ink">{score}/10</div><p className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-iq">Result tier</p><h1 className="mt-2 text-4xl font-black tracking-tight">{tier.title}</h1><p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/55">{tier.copy}</p><div className="mt-6 flex justify-center gap-3"><span className="chip text-lime">✦ {xp} XP</span><span className="chip">{score * 10}% survival</span></div></section>;
}

export function ResultScreen({ score, xp, mistakes, onReview, onAgain }: { score: number; xp: number; mistakes: number; onReview: () => void; onAgain: () => void }) {
  return <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-14"><ResultTierCard score={score} xp={xp} /><div className="mt-4 grid gap-3 sm:grid-cols-2"><button className="btn-primary" onClick={onReview} disabled={!mistakes}>{mistakes ? `Review ${mistakes} mistake${mistakes > 1 ? "s" : ""}` : "Flawless run"}</button><button className="btn-secondary" onClick={onAgain}>Practice again</button></div><div className="mt-4"><IQWikiLinkCard label="Keep training on IQ.wiki" /></div><section className="mt-10 grid gap-4 sm:grid-cols-2"><BadgePreviewCard /><div className="grid gap-3"><LockedFeatureCard title="Claim Base badge" text="Coming soon after wallet and badge contract integration." /><LockedFeatureCard title="Unlock Pro Mode with IQ" text="Future access check for wallets holding 1,000+ IQ." /></div></section></main>;
}

export function MistakeReview({ questions, answers, onBack, onAgain }: { questions: Question[]; answers: Record<string, string>; onBack: () => void; onAgain: () => void }) {
  const mistakes = questions.filter(q => answers[q.id] !== q.correctAnswerId);
  return <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-14"><p className="text-xs font-black uppercase tracking-[0.2em] text-iq">Mistake review</p><h1 className="mt-2 text-3xl font-black">Patch the weak spots.</h1><p className="mt-2 text-sm text-white/50">{mistakes.length} scenario{mistakes.length !== 1 ? "s" : ""} to revisit.</p><div className="mt-7 space-y-4">{mistakes.map(q => <section key={q.id} className="card p-5"><span className="chip">{q.difficulty}</span><h2 className="mt-4 text-lg font-black">{q.title}</h2><p className="mt-2 text-sm leading-6 text-white/55">{q.explanation}</p><p className="mt-4 text-xs font-bold text-lime">Best move: {q.answers.find(a => a.id === q.correctAnswerId)?.text}</p></section>)}</div><div className="mt-6 grid gap-3 sm:grid-cols-2"><button className="btn-primary" onClick={onAgain}>Practice again</button><button className="btn-secondary" onClick={onBack}>Back to results</button></div></main>;
}
