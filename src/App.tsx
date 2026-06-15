import { useEffect, useState } from "react";
import { BaseAppShell } from "./components/BaseAppShell";
import { MistakeReview, ResultScreen } from "./components/ResultScreen";
import { StartScreen } from "./components/StartScreen";
import { FeedbackCard, ProgressBar, QuestionCard, StreakDisplay, XPDisplay } from "./components/UI";
import { onchainSurvivalQuestions, type Question } from "./data/onchainSurvivalQuestions";
import { track } from "./lib/analytics";
import { connectMockBaseAccount, type MockBaseAccount } from "./lib/mockBaseAccount";
import { checkIQHolderStatus } from "./lib/iqUnlocks";
import type { AttributionStatus, BadgeStatus, ModalContent, Screen } from "./types";

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export default function App() {
  const [screen, setScreen] = useState<Screen>("start");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [account, setAccount] = useState<MockBaseAccount | null>(null);
  const [verified, setVerified] = useState(false);
  const [badgeStatus, setBadgeStatus] = useState<BadgeStatus>("idle");
  const [attribution, setAttribution] = useState<AttributionStatus>("ready");
  const [modal, setModal] = useState<ModalContent | null>(null);
  const question = onchainSurvivalQuestions[index];
  const score = onchainSurvivalQuestions.filter(q => answers[q.id] === q.correctAnswerId).length;
  const mistakes = onchainSurvivalQuestions.filter(q => answers[q.id] !== q.correctAnswerId);

  useEffect(() => { track("app_open"); }, []);

  function start() { setIndex(0); setAnswers({}); setSelected(null); setXp(0); setStreak(0); setScreen("quiz"); track("challenge_start"); }
  async function connect(showModal = true) { const next = await connectMockBaseAccount(); setAccount(next); const holder = await checkIQHolderStatus(next.address); setVerified(holder); track("mock_wallet_connected"); track("iq_holder_check_simulated", { balance: next.iqBalance }); if (holder) track("pro_mode_unlocked"); if (showModal) setModal({ title: "Base Account connected", body: "This connection is local React state. A production version would use Base Account after app registration and deployment.", bullets: ["Network: Base", "Address: 0xIQ...Dojo", "Simulated balance: 2,500 IQ", "No real wallet opened"] }); return next; }
  function reset() { setAccount(null); setVerified(false); setBadgeStatus("idle"); setAttribution("ready"); }
  function holderInfo() { if (!account) { void connect(); return; } setModal({ title: "Pro Mode unlocked", body: "The simulator checked the local 2,500 IQ balance against the 1,000 IQ threshold.", bullets: ["IQ Holder Verified", "Harder lessons unlocked", "Advanced review and badge variants previewed"] }); }
  function featureInfo(title: string) { setModal({ title: verified ? `${title} unlocked` : `${title} locked`, body: verified ? "This feature is unlocked by the simulated IQ holder check. Production would read the holder balance onchain." : "Connect the simulated Base Account and pass the 1,000 IQ holder check to unlock this preview." }); }
  async function claimBadge() { if (badgeStatus === "claimed") { badgeInfo(); return; } if (!account) { await connect(false); setModal({ title: "Base Account connected", body: screen === "result" ? "The simulated account is ready. Tap claim again to run the visible transaction flow." : "The simulated account is ready. Complete today’s lesson to activate the badge claim flow.", bullets: ["Address: 0xIQ...Dojo", "Network: Base", "Balance: 2,500 IQ"] }); return; } if (screen !== "result") { setModal({ title: "Complete today’s lesson first", body: "The claim flow becomes active after the Onchain Survival result. No dead transaction button here." }); return; } track("badge_claim_started"); setBadgeStatus("preparing"); await wait(550); setBadgeStatus("attributing"); setAttribution("simulating"); await wait(650); setBadgeStatus("minting"); await wait(700); setBadgeStatus("claimed"); setAttribution("attributed"); track("badge_claim_completed"); badgeInfo(true); }
  function badgeInfo(claimed = badgeStatus === "claimed") { setModal({ title: claimed ? "Badge claim simulated" : "Builder Code attribution", body: claimed ? "The local flow completed a simulated badge claim and attributed transaction. This is not a native Base App badge and no transaction was sent." : "Builder Code would attribute eligible transactions to IQ Dojo in Base.dev analytics. This prototype only previews that flow.", bullets: ["IQ Dojo: Onchain Survival", "Network: Base", "Builder Code: iqdojo_demo", claimed ? "Status: Simulated claim complete" : "Status: Ready for attribution"] }); track("builder_code_preview_clicked"); }
  function openWiki(q?: Question) { track("iq_wiki_link_clicked", { questionId: q?.id }); setModal({ title: q ? `IQ.wiki deep dive: ${q.title}` : "Continue on IQ.wiki", body: "This prototype uses IQ.wiki as the knowledge layer. Topic-specific wiki destinations can replace this explainer as editorial paths are finalized.", bullets: ["Explain the risk", "Practice the scenario", "Deepen knowledge on IQ.wiki"], ctaLabel: "Open IQ.wiki", href: q?.iqWikiLinks[0]?.url ?? "https://iq.wiki/" }); }
  function genericModal(title: string, kind: "lesson" | "sponsor" | "pitch") { track(kind === "sponsor" ? "sponsored_path_clicked" : kind === "pitch" ? "pitch_mode_opened" : "lesson_locked_clicked", { title }); setModal({ title: kind === "lesson" ? "Lesson locked in simulator" : kind === "sponsor" ? "Sponsored protocol path" : title, body: kind === "lesson" ? `${title} previews a future lesson path. It is intentionally locked, not broken.` : kind === "sponsor" ? `${title} shows how a protocol can sponsor useful, scenario-based education without turning the product into an ad.` : `${title} demonstrates the product, IQ knowledge, Base distribution, and sponsor business loop.`, bullets: kind === "sponsor" ? ["Branded learning path", "Useful risk education", "Measurable completion and attribution"] : undefined }); }
  function answer(id: string) { if (selected) return; const correct = id === question.correctAnswerId; setSelected(id); setAnswers(prev => ({ ...prev, [question.id]: id })); if (correct) { setXp(prev => prev + question.xpReward); setStreak(prev => prev + 1); } else setStreak(0); track("question_answered", { questionId: question.id, correct }); track("answer_feedback_viewed"); }
  function next() { if (index === 9) { setScreen("result"); track("challenge_completed", { score, xp }); track("result_viewed"); } else { setIndex(prev => prev + 1); setSelected(null); } }

  let content;
  if (screen === "start") content = <StartScreen onStart={start} connected={Boolean(account)} verified={verified} badgeStatus={badgeStatus} attribution={attribution} onConnect={() => void connect()} onReset={reset} onCheck={holderInfo} onFeature={featureInfo} onClaim={() => void claimBadge()} onAttribution={badgeInfo} onLockedLesson={title => genericModal(title, "lesson")} onPitch={title => genericModal(title, "pitch")} />;
  else if (screen === "result") content = <ResultScreen score={score} xp={xp} mistakes={mistakes} connected={Boolean(account)} verified={verified} badgeStatus={badgeStatus} attribution={attribution} onReview={() => { setScreen("review"); track("mistake_review_opened"); }} onAgain={() => { track("play_again_clicked"); start(); }} onCheck={holderInfo} onFeature={featureInfo} onClaim={() => void claimBadge()} onAttribution={badgeInfo} onWiki={openWiki} onSponsored={title => genericModal(title, "sponsor")} onPitch={title => genericModal(title, "pitch")} />;
  else if (screen === "review") content = <MistakeReview questions={onchainSurvivalQuestions} answers={answers} onBack={() => setScreen("result")} onAgain={() => { track("play_again_clicked"); start(); }} onWiki={openWiki} />;
  else content = <main className="px-3 pb-8 pt-4"><div className="mb-4 flex items-center gap-2"><button className="text-xs font-bold text-white/45" onClick={() => setScreen("start")}>Exit</button><div className="flex-1"><ProgressBar current={index + (selected ? 1 : 0)} total={10} /></div><StreakDisplay streak={streak} /><XPDisplay xp={xp} /></div><section className="section-card"><QuestionCard question={question} selectedId={selected} onAnswer={answer} />{selected && <FeedbackCard correct={selected === question.correctAnswerId} explanation={question.explanation} final={index === 9} onContinue={next} onWiki={() => openWiki(question)} />}</section></main>;
  return <BaseAppShell account={account} onAccount={() => account ? setModal({ title: "Base Account connected", body: "The simulator is connected locally.", bullets: ["0xIQ...Dojo", "Base", "2,500 IQ", "IQ Holder Verified"] }) : void connect()} modal={modal} onCloseModal={() => setModal(null)}>{content}</BaseAppShell>;
}
