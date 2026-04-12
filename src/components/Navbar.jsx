import { BrainCircuit, LogOut, Menu, UserCircle2 } from "lucide-react";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Navbar() {
  const { user, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const gems = user?.gems ?? 0;
  const level = user ? 1 : 1;
  const progress = user ? 0 : 0;

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <>
      <header className="sticky top-0 z-30 border-b-2" style={{ background: "var(--bg-card)", borderColor: "var(--purple-main)", height: 56 }}>
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-[10px] border-2" style={{ borderColor: "var(--purple-bright)", background: "var(--bg-surface)", color: "var(--pink-bright)" }}>
              <BrainCircuit className="h-4 w-4" />
            </span>
            <span className="pixel-heading text-[14px] text-white">
              Prep<span style={{ color: "var(--pink-bright)" }}>AI</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {user ? (
              <>
                <NavItem to="/interview">Play</NavItem>
                <NavItem to="/history">Quest Log</NavItem>
                <NavItem to="/results">Leaderboard</NavItem>
              </>
            ) : null}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            {user ? (
              <>
                <div className="hud-pill hud-pill-pink">
                  <span>??</span>
                  <span>{gems}</span>
                </div>
                <div className="hud-pill hud-pill-purple min-w-[170px] justify-between gap-3">
                  <span className="bubble-heading text-[12px] text-white">LVL {level}</span>
                  <div className="min-w-[90px] flex-1">
                    <div className="progress-track h-[6px]">
                      <div className="progress-fill" style={{ width: `${progress}%` }} />
                    </div>
                  </div>
                  <span className="bubble-heading text-[12px]">{progress}%</span>
                </div>
                <div className="flex items-center gap-2">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName} className="h-8 w-8 rounded-[8px] border-2 object-cover" style={{ borderColor: "var(--purple-bright)" }} />
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-[8px] border-2" style={{ borderColor: "var(--purple-bright)", background: "var(--bg-surface)" }}>
                      <UserCircle2 className="h-4 w-4" />
                    </div>
                  )}
                  <button type="button" onClick={handleSignOut} className="btn-ghost px-3 py-2 text-[12px]">
                    <LogOut className="h-4 w-4" />
                    Exit Game
                  </button>
                </div>
              </>
            ) : (
              <Link to="/" className="btn-primary text-[11px]">
                ?? Enter Game
              </Link>
            )}
          </div>

          <div className="flex items-center gap-2 md:hidden">
            {user ? <div className="hud-pill hud-pill-pink px-3 py-2 text-[12px]">?? {gems}</div> : null}
            {user?.photoURL ? (
              <img src={user.photoURL} alt={user.displayName} className="h-8 w-8 rounded-[8px] border-2 object-cover" style={{ borderColor: "var(--purple-bright)" }} />
            ) : user ? (
              <div className="flex h-8 w-8 items-center justify-center rounded-[8px] border-2" style={{ borderColor: "var(--purple-bright)", background: "var(--bg-surface)" }}>
                <UserCircle2 className="h-4 w-4" />
              </div>
            ) : null}
            <button type="button" className="btn-ghost px-3 py-2" onClick={() => setMenuOpen((value) => !value)}>
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>

        {menuOpen ? (
          <div className="border-t-2 px-4 py-4 md:hidden" style={{ borderColor: "var(--purple-muted)", background: "var(--bg-card)" }}>
            <div className="flex flex-col gap-3 bubble-heading text-[14px]">
              {user ? (
                <>
                  <Link to="/interview" onClick={() => setMenuOpen(false)}>Play</Link>
                  <Link to="/history" onClick={() => setMenuOpen(false)}>Quest Log</Link>
                  <Link to="/results" onClick={() => setMenuOpen(false)}>Leaderboard</Link>
                  <button type="button" className="text-left" onClick={handleSignOut}>Exit Game</button>
                </>
              ) : (
                <Link to="/">Enter Game</Link>
              )}
            </div>
          </div>
        ) : null}
      </header>

      <nav className="mobile-tabbar md:hidden">
        <MobileTab to="/interview" emoji="??" label="Play" />
        <MobileTab to="/history" emoji="??" label="Quests" />
        <MobileTab to="/results" emoji="??" label="Ranks" />
        <MobileTab to="/" emoji="??" label="Profile" />
      </nav>
    </>
  );
}

function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `bubble-heading text-[15px] ${isActive ? "text-[var(--pink-pale)] underline decoration-[var(--pink-main)] underline-offset-8" : "text-[var(--text-muted)]"}`
      }
    >
      {children}
    </NavLink>
  );
}

function MobileTab({ to, emoji, label }) {
  return (
    <NavLink to={to} className={({ isActive }) => `mobile-tabbar-link ${isActive ? "active" : ""}`}>
      <span>{emoji}</span>
      <span>{label}</span>
    </NavLink>
  );
}

export default Navbar;

