import { AlertCircle, ArrowRight, RotateCcw, Zap } from "lucide-react";
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

  const [config, setConfig] = useState(() => {
    if (location.state?.preselectRole) {
      return { ...initialConfig, role: location.state.preselectRole };
    }
    const draft = getActiveInterview();
    if (draft && !location.state?.reset) {
      return draft.config;
    }
    return initialConfig;
  });

  const [stage, setStage] = useState(() => {
    if (location.state?.reset || location.state?.preselectRole) {
      return "setup";
    }
    const draft = getActiveInterview();
    return draft ? draft.stage : "setup";
  });

  const [questions, setQuestions] = useState(() => {
    if (location.state?.reset || location.state?.preselectRole) {
      return [];
    }
    const draft = getActiveInterview();
    return draft ? draft.questions : [];
  });

  const [currentIndex, setCurrentIndex] = useState(() => {
    if (location.state?.reset || location.state?.preselectRole) {
      return 0;
    }
    const draft = getActiveInterview();
    return draft ? draft.currentIndex : 0;
  });

  const [answer, setAnswer] = useState(() => {
    if (location.state?.reset || location.state?.preselectRole) {
      return "";
    }
    const draft = getActiveInterview();
    return draft ? draft.answer : "";
  });

  const [feedback, setFeedback] = useState(() => {
    if (location.state?.reset || location.state?.preselectRole) {
      return null;
    }
    const draft = getActiveInterview();
    return draft ? draft.feedback : null;
  });

  const [responses, setResponses] = useState(() => {
    if (location.state?.reset || location.state?.preselectRole) {
      return [];
    }
    const draft = getActiveInterview();
    return draft ? draft.responses : [];
  });

  const [retrying, setRetrying] = useState(false);
  const [remainingTime, setRemainingTime] = useState(QUESTION_SECONDS);

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
      toast.error(err.message || "Unable to generate interview questions.");
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
      toast.error(err.message || "Unable to score your answer.");
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
      strengths: "You decided to skip this round.",
      improvements: "Try structuring an initial framework even if you don't know the full answer.",
      model_answer:
        "A strong answer would define key terms, outline system components, discuss trade-offs, and mention real-world constraints.",
      tip: "When stuck, state assumptions clearly and explain how you would troubleshoot.",
    };

    setFeedback(skippedFeedback);
    if (!answer.trim()) {
      setAnswer("Skipped round");
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
    try {
      return await request();
    } catch (err) {
      console.warn("First AI request attempt failed, retrying once...", err);
      setRetrying(true);
      try {
        return await request();
      } finally {
        setRetrying(false);
      }
    }
  }

  if (stage === "setup") {
    return (
      <div className="space-y-8 pb-16">
        {/* Dark Masthead Bar */}
        <section className="border-b-[2.5px] border-black bg-[#111111] px-4 py-8 md:py-10 text-white">
          <div className="mx-auto max-w-7xl space-y-2">
            <div className="flex items-center gap-2">
              <span className="border-2 border-black bg-neo-yellow px-2.5 py-0.5 font-mono text-xs font-black uppercase text-black">
                SETUP ARENA
              </span>
              <span className="font-mono text-xs font-bold text-neutral-400">
                PRACTICE SIMULATOR
              </span>
            </div>
            <h1 className="font-black italic uppercase tracking-tight text-3xl sm:text-4xl text-white">
              COMMAND <span className="text-neo-yellow">CENTER</span>
            </h1>
            <p className="font-mono text-xs text-neutral-300">
              CONFIGURE YOUR INTERVIEW RUN & GENERATE REAL-TIME AI QUESTIONS.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 sm:px-6">
          <RoleSelector
            config={config}
            onChange={handleConfigChange}
            onStart={handleStart}
            loading={loading}
          />
          {error && (
            <div className="neo-card mt-6 flex items-start gap-3 border-red-500 bg-red-50 p-4 font-mono text-xs text-red-900">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-red-600" />
              <span>{error}</span>
            </div>
          )}
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-16">
      {/* Dark Masthead Bar */}
      <section className="border-b-[2.5px] border-black bg-[#111111] px-4 py-6 text-white">
        <div className="mx-auto max-w-5xl flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="border-2 border-black bg-neo-yellow px-2.5 py-0.5 font-mono text-xs font-black uppercase text-black">
                ARENA IN PROGRESS
              </span>
              <span className="font-mono text-xs text-neutral-400">
                AI MOCK SIMULATION
              </span>
            </div>
            <h1 className="font-black uppercase text-2xl text-white">
              {config.role}
            </h1>
          </div>

          <button
            type="button"
            onClick={restart}
            className="btn-neo btn-neo-ghost text-white border-white hover:bg-neutral-800 text-xs"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>EXIT / SWITCH ROLE</span>
          </button>
        </div>
      </section>

      <section className="mx-auto max-w-5xl space-y-6 px-4 sm:px-6">
        {/* Progress Strip */}
        <ProgressBar
          current={currentIndex + 1}
          total={questions.length}
          countdown={{ remaining: remainingTime, total: QUESTION_SECONDS }}
          role={config.role}
          interviewType={config.interviewType}
        />

        {/* Question Card */}
        <QuestionCard question={currentQuestion} index={currentIndex} />

        {/* Answer Input */}
        <AnswerInput
          value={answer}
          onChange={setAnswer}
          onSubmit={handleSubmit}
          onSkip={handleSkip}
          disabled={loading}
        />

        {/* Loading status */}
        {loading && (
          <LoadingDots
            label={retrying ? "Re-parsing AI response..." : "Evaluating answer on Groq LLaMA 3.3..."}
          />
        )}

        {/* Feedback Card */}
        {feedback && <FeedbackCard feedback={feedback} />}

        {/* Next / Battle Report actions */}
        {feedback && (
          <div className="neo-card p-4 bg-white flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={restart}
              className="btn-neo btn-neo-ghost text-xs"
            >
              <RotateCcw className="h-4 w-4" />
              <span>RESTART RUN</span>
            </button>

            <button
              type="button"
              onClick={goToNext}
              className="btn-neo btn-neo-yellow text-xs font-black"
            >
              <span>
                {currentIndex === questions.length - 1
                  ? "🏆 PROCEED TO BATTLE REPORT"
                  : "NEXT ROUND →"}
              </span>
              <ArrowRight className="h-4 w-4 stroke-[3]" />
            </button>
          </div>
        )}

        {error && !loading && (
          <div className="neo-card border-red-500 bg-red-50 p-4 font-mono text-xs text-red-900">
            {error}
          </div>
        )}
      </section>
    </div>
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
