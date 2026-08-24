import { KeyRound, X, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const all8Roles = [
  "Frontend Developer",
  "Backend Developer",
  "Full-Stack Developer",
  "Machine Learning Engineer",
  "DevOps Engineer",
  "Data Analyst",
  "UI/UX Designer",
  "Product Manager",
];

function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, signInWithJWT, signInDemo, pendingRole, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [roleFocus, setRoleFocus] = useState("Frontend Developer");
  const navigate = useNavigate();

  useEffect(() => {
    if (pendingRole) {
      setRoleFocus(pendingRole);
    }
  }, [pendingRole]);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    const res = await signInWithJWT(email, name, roleFocus);
    if (res?.targetRole) {
      navigate("/interview", { state: { preselectRole: res.targetRole } });
    }
  };

  const handleDemoLogin = async () => {
    const res = await signInDemo();
    if (res?.targetRole) {
      navigate("/interview", { state: { preselectRole: res.targetRole } });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-lg border-[3px] border-black bg-neo-bg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Masthead Header */}
        <div className="flex items-center justify-between border-b-[2.5px] border-black bg-[#111111] px-6 py-4 text-white">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center border border-neo-yellow bg-neo-yellow text-black font-black text-xs">
              ⚡
            </span>
            <h2 className="font-black uppercase tracking-tight text-base sm:text-lg text-white">
              CANDIDATE SIGN IN — ACCESS ARENA
            </h2>
          </div>

          <button
            type="button"
            onClick={closeAuthModal}
            className="flex h-7 w-7 items-center justify-center border-2 border-white bg-black text-white hover:bg-neo-yellow hover:text-black hover:border-black transition font-bold"
          >
            <X className="h-4 w-4 stroke-[3]" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 bg-neo-bg">
          {/* Info Banner */}
          <div className="neo-banner-step">
            <span>
              i {pendingRole ? `Target Role Selected: ${pendingRole}. Sign in to enter arena.` : "Enter your candidate details to issue a secure JWT session token."}
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Candidate Name Input */}
            <div className="space-y-1.5">
              <label htmlFor="auth-name" className="font-mono text-xs font-black uppercase text-black block">
                CANDIDATE FULL NAME *
              </label>
              <input
                id="auth-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Shreya Sundli"
                className="neo-input font-mono text-sm"
              />
            </div>

            {/* Email Address Input */}
            <div className="space-y-1.5">
              <label htmlFor="auth-email" className="font-mono text-xs font-black uppercase text-black block">
                EMAIL ADDRESS *
              </label>
              <input
                id="auth-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. shreya.sundli@prepai.dev"
                className="neo-input font-mono text-sm"
              />
            </div>

            {/* All 8 Roles Dropdown */}
            <div className="space-y-1.5">
              <label htmlFor="auth-role" className="font-mono text-xs font-black uppercase text-black block">
                TARGET INTERVIEW ROLE
              </label>
              <select
                id="auth-role"
                value={roleFocus}
                onChange={(e) => setRoleFocus(e.target.value)}
                className="neo-input font-mono text-sm uppercase font-bold"
              >
                {all8Roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>

            {/* Main Submit Button */}
            <div className="pt-2 space-y-3">
              <button
                type="submit"
                disabled={loading || !email}
                className="btn-neo btn-neo-yellow w-full text-xs font-black py-3 flex items-center justify-center gap-2"
              >
                <KeyRound className="h-4 w-4 stroke-[2.5]" />
                <span>{loading ? "GENERATING JWT TOKEN..." : "SIGN IN & ENTER ARENA"}</span>
              </button>

              {/* Quick Demo Fill Button */}
              <button
                type="button"
                onClick={handleDemoLogin}
                disabled={loading}
                className="btn-neo btn-neo-white w-full text-xs font-bold py-2.5 flex items-center justify-center gap-2 hover:bg-neo-cyan"
              >
                <Zap className="h-3.5 w-3.5 fill-black" />
                <span>OR QUICK SIGN IN AS SHREYA SUNDLI (DEMO)</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AuthModal;
