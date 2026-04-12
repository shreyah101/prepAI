import { AlertCircle, RotateCcw } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import AnswerInput from "../components/AnswerInput";
import FeedbackCard from "../components/FeedbackCard";
import LoadingDots from "../components/LoadingDots";
import ProgressBar from "../components/ProgressBar";
import QuestionCard from "../components/QuestionCard";
import RoleSelector from "../components/RoleSelector";
import { useAuth } from "../hooks/useAuth";
import { useGroq } from "../hooks/useGroq";
import {
  buildQuestionPrompt,
  buildScoringPrompt,
  parseQuestions,
  parseScoring,
  verdictFromScore,
} from "../lib/prompts";
import {
  clearActiveInterview,
  getActiveInterview,
  setActiveInterview,
  setLatestResult,
} from "../lib/sessionStore";

const initialConfig = {
  role: "",
  interviewType: "Mixed",
  difficulty: "Medium",
  count: 5,
};

const QUESTION_SECONDS = 180;

function InterviewPage() {
  const { user } = useAuth();
  const { fetchFromGroq, loading, error } = useGroq();
  const navigate = useNavigate();
  const location = useLocation();

  const [config, setConfig] = useState(initialConfig);
  const [stage, setStage] = useState("setup");
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [responses, setResponses] = useState([]);
  const [retrying, setRetrying] = useState(false);
  const [remainingTime, setRemainingTime] = useState(QUESTION_SECONDS);

  useEffect(() => {
    if (location.state?.reset) {
      clearActiveInterview();
    }

    const draft = getActiveInterview();
    if (draft && !location.state?.reset) {
      setConfig(draft.config);
      setQuestions(draft.questions);
      setCurrentIndex(draft.currentIndex);
      setResponses(draft.responses);
      setStage(draft.stage);
      setFeedback(draft.feedback);
      setAnswer(draft.answer);
      return;
    }

    setConfig(initialConfig);
    setStage("setup");
    setQuestions([]);
    setResponses([]);
    setCurrentIndex(0);
    setFeedback(null);
    setAnswer("");
  }, [location.state]);

  useEffect(() => {
    if (stage !== "interview") return undefined;

    const timer = window.setInterval(() => {
      setRemainingTime((time) => (time > 0 ? time - 1 : 0));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [stage, currentIndex]);

  useEffect(() => {
    if (stage === "interview") {
      setActiveInterview({
        config,
        questions,
        currentIndex,
        responses,
        feedback,
        answer,
        stage,
      });
    }
  }, [answer, config, currentIndex, feedback, questions, responses, stage]);

  const currentQuestion = questions[currentIndex];

  const resultDraft = useMemo(() => {
    const answeredQuestions = responses.length ? responses : [];
    const totalScore = answeredQuestions.length
      ? Math.round(
          (answeredQuestions.reduce((sum, item) => sum + (item.score || 0), 0) /
            (answeredQuestions.length * 10)) *
            100,
        )
      : 0;

    return {
      uid: user?.uid,
      role: config.role,
      interviewType: config.interviewType,
      difficulty: config.difficulty,
      totalScore,
      maxScore: 100,
      questions: answeredQuestions,
    };
  }, [config.difficulty, config.interviewType, config.role, responses, user?.uid]);

  const handleConfigChange = (field, value) => {
    setConfig((previous) => ({ ...previous, [field]: value }));
  };

  const handleStart = async () => {
    try {
      const raw = await fetchWithRetry(() =>
        fetchFromGroq(
          buildQuestionPrompt(config.role, config.interviewType, config.difficulty, config.count),
          0.7,
        ),
      );

      if (!raw) return;

      const generatedQuestions = parseQuestions(raw);
      setQuestions(generatedQuestions);
      setResponses([]);
      setCurrentIndex(0);
      setAnswer("");
      setFeedback(null);
      setRemainingTime(QUESTION_SECONDS);
      setStage("interview");
    } catch (err) {
      toast.error(err.message || "Unable to generate quest rounds.");
    }
  };

  const handleSubmit = async () => {
    try {
      const raw = await fetchWithRetry(() =>
        fetchFromGroq(buildScoringPrompt(config.role, currentQuestion.question, answer), 0.4),
      );

      if (!raw) return;

      const parsed = parseScoring(raw);
      setFeedback(parsed);
    } catch (err) {
      toast.error(err.message || "Unable to score your round.");
    }
  };

  const goToNext = () => {
    const responseRecord = buildResponseRecord(currentQuestion, answer, feedback);
    const nextResponses = [...responses, responseRecord];
    setResponses(nextResponses);
    setAnswer("");
    setFeedback(null);
    setRemainingTime(QUESTION_SECONDS);

    if (currentIndex === questions.length - 1) {
      const finalResult = {
        ...resultDraft,
        questions: nextResponses,
        totalScore: Math.round(
          (nextResponses.reduce((sum, item) => sum + (item.score || 0), 0) / (nextResponses.length * 10)) *
            100,
        ),
      };

      clearActiveInterview();
      setLatestResult(finalResult);
      navigate("/results", { state: { result: finalResult } });
      return;
    }

    setCurrentIndex((index) => index + 1);
  };

  const handleSkip = () => {
    const skippedFeedback = {
      score: 0,
      verdict: verdictFromScore(0),
      strengths: "You moved on instead of forcing a weak answer.",
      improvements: "Try drafting a quick framework even if you do not know the full solution.",
      model_answer:
        "A strong answer would define the core idea, walk through a small example, and mention trade-offs or results.",
      tip: "When you feel stuck, state assumptions and explain how you would approach the problem.",
    };

    setFeedback(skippedFeedback);
    if (!answer.trim()) {
      setAnswer("Skipped");
    }
  };

  const restart = () => {
    clearActiveInterview();
    setStage("setup");
    setQuestions([]);
    setResponses([]);
    setCurrentIndex(0);
    setAnswer("");
    setFeedback(null);
    setRemainingTime(QUESTION_SECONDS);
  };

  async function fetchWithRetry(request) {
    let raw = await request();
    if (raw) return raw;

    setRetrying(true);
    raw = await request();
    setRetrying(false);

    if (!raw) {
      throw new Error("The AI returned an invalid response twice. Please try again.");
    }

    return raw;
  }

  if (stage === "setup") {
    return (
      <section className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10">
        <RoleSelector config={config} onChange={handleConfigChange} onStart={handleStart} loading={loading} />
        {error ? (
          <div className="game-card mx-auto mt-6 flex max-w-2xl items-start gap-3 px-4 py-3 text-sm" style={{ borderColor: "var(--danger)", color: "var(--danger)" }}>
            <AlertCircle className="mt-0.5 h-4 w-4" />
            <span>{error}</span>
          </div>
        ) : null}
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-5xl space-y-6 px-4 py-8 md:px-6 md:py-10">
      <div className="space-y-2">
        <div className="eyebrow">?? QUEST IN PROGRESS ??</div>
        <h1 className="pixel-heading text-[16px] leading-8 text-white md:text-[20px]">{config.role}</h1>
      </div>

      <ProgressBar
        current={currentIndex + 1}
        total={questions.length}
        countdown={{ remaining: remainingTime, total: QUESTION_SECONDS }}
        role={config.role}
        interviewType={config.interviewType}
      />

      <QuestionCard question={currentQuestion} index={currentIndex} />
      <AnswerInput value={answer} onChange={setAnswer} onSubmit={handleSubmit} onSkip={handleSkip} disabled={loading} />

      {loading ? <LoadingDots label={retrying ? "Retrying the quest parser..." : "Analyzing your answer..."} /> : null}
      {feedback ? <FeedbackCard feedback={feedback} /> : null}

      {feedback ? (
        <div className="flex flex-wrap justify-between gap-3">
          <button type="button" onClick={restart} className="btn-ghost">
            <RotateCcw className="h-4 w-4" />
            Reset Quest
          </button>
          <button type="button" onClick={goToNext} className="btn-secondary">
            {currentIndex === questions.length - 1 ? "?? View Battle Report" : "Next Round ?"}
          </button>
        </div>
      ) : null}

      {error && !loading ? (
        <div className="game-card px-4 py-3 text-sm" style={{ borderColor: "var(--danger)", color: "var(--danger)" }}>
          {error}
        </div>
      ) : null}
    </section>
  );
}

function buildResponseRecord(question, answer, feedback) {
  return {
    ...question,
    answer,
    score: feedback.score,
    verdict: feedback.verdict,
    strengths: feedback.strengths,
    improvements: feedback.improvements,
    model_answer: feedback.model_answer,
    tip: feedback.tip,
  };
}

export default InterviewPage;

