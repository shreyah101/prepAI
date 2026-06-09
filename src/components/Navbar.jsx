import { BrainCircuit, LogOut, Menu, UserCircle2 } from "lucide-react";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Navbar() {
  const { user, signOut, signIn } = useAuth();
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
      <header className="sticky top-0 z-30 border-b border-[var(--border-subtle)] bg-[rgba(11,12,16,0.8)] backdrop-blur-md" style={{ height: 64 }}>
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[rgba(168,85,247,0.1)] border border-[var(--neon-purple-dim)] text-[var(--neon-purple)] shadow-[0_0_15px_var(--neon-purple-dim)]">
              <BrainCircuit className="h-5 w-5" />
            </span>
            <span className="hero-title text-[18px] text-white">
              PREP AI<span className="text-[var(--neon-purple)]">. EXE</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {user ? (
              <>
                <NavItem to="/interview">PLAY</NavItem>
                <NavItem to="/history">QUEST LOG</NavItem>
                <NavItem to="/results">LEADERBOARD</NavItem>
              </>
            ) : null}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            {user ? (
              <>
                <div className="hud-pill hud-pill-pink text-white shadow-[0_0_10px_var(--neon-pink-dim)]">
                  <span className="text-[var(--neon-pink)]">💎</span>
                  <span className="font-bold">{gems}</span>
                </div>
                <div className="hud-pill hud-pill-purple min-w-[170px] justify-between gap-3 text-white shadow-[0_0_10px_var(--neon-purple-dim)]">
                  <span className="pixel-heading text-[11px] text-[var(--neon-purple)]">LVL {level}</span>
                  <div className="min-w-[90px] flex-1">
                    <div className="progress-track h-[10px]">
                      <div className="progress-fill" style={{ width: `${progress}%` }} />
                    </div>
                  </div>
                  <span className="pixel-heading text-[11px]">{progress}%</span>
                </div>
                <div className="flex items-center gap-2">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName} className="h-10 w-10 rounded-[10px] border border-[var(--border-subtle)] object-cover" />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-muted)]">
                      <UserCircle2 className="h-5 w-5" />
                    </div>
                  )}
                  <button type="button" onClick={handleSignOut} className="btn-ghost px-3 py-2 text-[12px] uppercase text-[var(--neon-pink)] hover:bg-[rgba(244,63,94,0.1)] hover:border-[var(--neon-pink-dim)]">
                    <LogOut className="h-4 w-4 mb-0.5" />
                    LOG OUT
                  </button>
                </div>
              </>
            ) : (
              <button type="button" onClick={signIn} className="btn-primary text-[12px] px-6">
                ▶ ENTER GAME
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 md:hidden">
            {user ? <div className="hud-pill hud-pill-pink px-3 py-2 text-[12px] text-white"><span className="text-[var(--neon-pink)]">💎</span> {gems}</div> : null}
            {user?.photoURL ? (
              <img src={user.photoURL} alt={user.displayName} className="h-10 w-10 rounded-[10px] border border-[var(--border-subtle)] object-cover" />
            ) : user ? (
               <div className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-muted)]">
                <UserCircle2 className="h-5 w-5" />
              </div>
            ) : null}
            <button type="button" className="btn-ghost px-3 py-2 border-transparent" onClick={() => setMenuOpen((value) => !value)}>
              <Menu className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>

        {menuOpen ? (
          <div className="border-t border-[var(--border-subtle)] bg-[var(--bg-deep)] px-4 py-4 md:hidden">
            <div className="flex flex-col gap-3 pixel-heading text-[12px] text-white">
              {user ? (
                <>
                  <Link to="/interview" onClick={() => setMenuOpen(false)} className="hover:text-[var(--neon-cyan)]">▶ PLAY</Link>
                  <Link to="/history" onClick={() => setMenuOpen(false)} className="hover:text-[var(--neon-cyan)]">📜 QUEST LOG</Link>
                  <Link to="/results" onClick={() => setMenuOpen(false)} className="hover:text-[var(--neon-cyan)]">🏆 LEADERBOARD</Link>
                  <button type="button" className="text-left hover:text-[var(--neon-pink)]" onClick={handleSignOut}>🚪 EXIT GAME</button>
                </>
              ) : (
                <button type="button" onClick={signIn} className="text-left hover:text-[var(--neon-purple)]">▶ ENTER GAME</button>
              )}
            </div>
          </div>
        ) : null}
      </header>

      <nav className="mobile-tabbar md:hidden">
        <MobileTab to="/interview" emoji="▶" label="PLAY" />
        <MobileTab to="/history" emoji="📜" label="QUESTS" />
        <MobileTab to="/results" emoji="🏆" label="RANKS" />
        <MobileTab to="/" emoji="👤" label="PROFILE" />
      </nav>
    </>
  );
}

function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `pixel-heading text-[12px] px-4 py-2 rounded-[8px] border transition-all ${isActive ? "bg-[rgba(6,182,212,0.1)] text-[var(--neon-cyan)] border-[var(--neon-cyan-dim)] shadow-[0_0_10px_var(--neon-cyan-dim)]" : "border-transparent text-[var(--text-muted)] hover:border-[var(--border-subtle)] hover:bg-[var(--bg-surface)] hover:text-white"}`
      }
    >
      {children}
    </NavLink>
  );
}

function MobileTab({ to, emoji, label }) {
  return (
    <NavLink to={to} className={({ isActive }) => `mobile-tabbar-link ${isActive ? "active" : ""}`}>
      <span className="text-[16px] mb-1">{emoji}</span>
      <span>{label}</span>
    </NavLink>
  );
}

export default Navbar;

