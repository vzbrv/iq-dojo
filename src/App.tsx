import { useEffect, useState } from "react";
import { StartScreen } from "./components/StartScreen";
import { MistakeReview, ResultScreen } from "./components/ResultScreen";
import { FeedbackCard, ProgressBar, QuestionCard, StreakDisplay, XPDisplay } from "./components/UI";
import { onchainSurvivalQuestions } from "./data/onchainSurvivalQuestions";
import { track } from "./lib/analytics";

type Screen = "start" | "quiz" | "result" | "review";

export default function App() {
  const [screen, setScreen] = useState<Screen>("start");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const question = onchainSurvivalQuestions[index];
  const score = onchainSurvivalQuestions.filter(q => answers[q.id] === q.correctAnswerId).length;
  const correct = selected === question?.correctAnswerId;

  useEffect(() => { track("app_open"); }, []);

  function start() {
    setIndex(0); setAnswers({}); setSelected(null); setXp(0); setStreak(0); setScreen("quiz"); track("challenge_start");
  }

  function answer(id: string) {
    if (selected) return;
    const isCorrect = id === question.correctAnswerId;
    setSelected(id); setAnswers(prev => ({ ...prev, [question.id]: id }));
    if (isCorrect) { setXp(prev => prev + question.xpReward); setStreak(prev => prev + 1); } else setStreak(0);
    track("question_answered", { questionId: question.id, correct: isCorrect }); track("answer_feedback_viewed", { questionId: question.id });
  }

  function next() {
    if (index === onchainSurvivalQuestions.length - 1) { setScreen("result"); track("challenge_completed", { score: score + (correct ? 0 : 0), xp }); track("result_viewed"); return; }
    setIndex(prev => prev + 1); setSelected(null);
  }

  if (screen === "start") return <StartScreen onStart={start} />;
  if (screen === "result") return <ResultScreen score={score} xp={xp} mistakes={10 - score} onReview={() => { setScreen("review"); track("mistake_review_opened"); }} onAgain={() => { track("play_again_clicked"); start(); }} />;
  if (screen === "review") return <MistakeReview questions={onchainSurvivalQuestions} answers={answers} onBack={() => setScreen("result")} onAgain={() => { track("play_again_clicked"); start(); }} />;

  return <main className="mx-auto min-h-screen max-w-3xl px-4 py-5 sm:px-6 sm:py-10">
    <header className="mb-6"><div className="mb-4 flex items-center justify-between gap-3"><button onClick={() => setScreen("start")} className="text-sm font-black">IQ Dojo</button><div className="flex gap-2"><StreakDisplay streak={streak} /><XPDisplay xp={xp} /></div></div><div className="flex items-center gap-3"><span className="text-xs font-black text-white/40">{index + 1}/10</span><div className="flex-1"><ProgressBar current={index + (selected ? 1 : 0)} total={10} /></div></div></header>
    <QuestionCard question={question} selectedId={selected} answered={Boolean(selected)} onAnswer={answer} />
    {selected && <div className="mt-4"><FeedbackCard correct={correct} explanation={question.explanation} onContinue={next} final={index === 9} /></div>}
  </main>;
}
