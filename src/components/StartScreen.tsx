import { BadgePreviewCard, IQWikiLinkCard, LockedFeatureCard } from "./UI";

export function StartScreen({ onStart }: { onStart: () => void }) {
  return <main className="mx-auto max-w-5xl px-4 pb-16 pt-6 sm:px-6 sm:pt-12">
    <nav className="flex items-center justify-between"><div className="flex items-center gap-2"><span className="grid size-9 place-items-center rounded-xl bg-iq font-black text-ink">IQ</span><strong>IQ Dojo</strong></div><span className="chip">No wallet needed</span></nav>
    <section className="py-14 text-center sm:py-20">
      <div className="mx-auto grid size-20 rotate-3 place-items-center rounded-3xl border border-iq/40 bg-iq/10 text-4xl shadow-glow">⚔</div>
      <p className="mt-8 text-xs font-black uppercase tracking-[0.25em] text-iq">Path 01 · Onchain Survival</p>
      <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-black leading-tight tracking-[-0.04em] sm:text-6xl">Train your onchain instincts.</h1>
      <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-white/55">Don’t get drained, rugged, liquidated, or farmed. Ten scenarios. No seed phrase required.</p>
      <div className="mx-auto mt-8 max-w-sm"><button className="btn-primary" onClick={onStart}>Enter the dojo</button><p className="mt-3 text-xs text-white/35">~4 minutes · 10 questions · up to 1,000 XP</p></div>
    </section>
    <section className="grid gap-4 md:grid-cols-3"><div className="card p-5 md:col-span-2"><p className="text-xs font-black uppercase tracking-wider text-lime">Today’s training</p><h2 className="mt-2 text-2xl font-black">Onchain Survival</h2><p className="mt-2 text-sm text-white/50">Approvals, depegs, liquidation, bridges, admin keys, and the fine art of not clicking the reply guy’s link.</p></div><IQWikiLinkCard /></section>
    <section className="mt-12"><p className="text-xs font-black uppercase tracking-[0.2em] text-white/35">Coming next</p><h2 className="mt-2 text-2xl font-black">IQ Holder Unlocks</h2><div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{[
      ["Pro Mode", "A harder path for wallets with 1,000+ IQ."], ["Harder questions", "More nuance. Fewer obvious exits."], ["Special result titles", "Flex responsibly."], ["Advanced mistake review", "Spot the pattern behind the miss."], ["Badge variants", "Rare proof of survival."], ["Bonus daily challenge", "One sharp scenario every day."],
    ].map(([title, text]) => <LockedFeatureCard key={title} title={title} text={text} />)}</div></section>
    <section className="mt-12 max-w-sm"><BadgePreviewCard /></section>
  </main>;
}
