import type { ReactNode } from "react";
import type { MockBaseAccount } from "../lib/mockBaseAccount";
import type { ModalContent } from "../types";

export function BaseAppShell({ account, onAccount, children, modal, onCloseModal }: { account: MockBaseAccount | null; onAccount: () => void; children: ReactNode; modal: ModalContent | null; onCloseModal: () => void }) {
  return <div className="app-backdrop">
    <div className="phone-shell">
      <header className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-white/10 bg-ink/90 px-4 py-3 backdrop-blur-xl">
        <button className="min-w-0 text-left" onClick={onAccount}><small className="block text-[9px] font-black uppercase tracking-wider text-base">Base App · Mini app simulator</small><span className="flex items-center gap-2"><strong className="truncate text-sm">IQ Dojo</strong><span className="rounded-full bg-base/15 px-2 py-0.5 text-[9px] font-black text-base">Base</span></span><small className="block truncate text-[10px] text-white/35">{account ? `${account.address} · ${account.iqBalance.toLocaleString()} IQ` : "Wallet not connected"}</small></button>
        <button onClick={onAccount} className={`chip ${account ? "text-lime" : "text-base"}`}>{account ? "● Connected" : "Connect Base"}</button>
      </header>
      <div className="min-h-[calc(100vh-57px)]">{children}</div>
      {modal && <div className="absolute inset-0 z-50 flex items-end bg-black/70 p-3 backdrop-blur-sm" onClick={onCloseModal}><section className="w-full rounded-[28px] border border-white/15 bg-panel p-5 shadow-2xl" onClick={event => event.stopPropagation()}><div className="mb-4 flex items-start justify-between gap-4"><div><p className="text-[10px] font-black uppercase tracking-[0.22em] text-iq">Simulator explainer</p><h2 className="mt-2 text-xl font-black">{modal.title}</h2></div><button className="grid size-8 shrink-0 place-items-center rounded-full bg-white/10 text-white/60" onClick={onCloseModal}>×</button></div><p className="text-sm leading-6 text-white/60">{modal.body}</p>{modal.bullets && <ul className="mt-4 space-y-2">{modal.bullets.map(item => <li key={item} className="rounded-xl bg-white/5 px-3 py-2 text-xs text-white/65">{item}</li>)}</ul>}{modal.href && <a className="btn-secondary mt-5 block text-center" href={modal.href} rel="noreferrer" target="_blank">{modal.ctaLabel ?? "Open link"}</a>}<button className="btn-primary mt-3" onClick={onCloseModal}>Got it</button></section></div>}
    </div>
  </div>;
}
