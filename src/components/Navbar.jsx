import {
  BrainCircuit,
  Compass,
  History,
  LogOut,
  Menu,
  Sparkles,
  Trophy,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Navbar() {
  const { user, signOut, signIn, loading } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const gems = user?.gems ?? 150;
  const level = user?.level ?? 1;

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b-[2.5px] border-black bg-[#111111] text-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        {/* Left: Structured Brand Mark & Role Count Tag */}
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center border-2 border-black bg-neo-yellow shadow-neo-sm transition group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-hover:shadow-neo">
              <BrainCircuit className="h-5 w-5 stroke-[2.5] text-black" />
            </div>
            <div className="flex items-baseline font-black tracking-tight text-xl text-white">
              <span>PREP</span>
              <span className="text-neo-yellow ml-0.5">AI</span>
              <span className="ml-2 border border-neo-yellow bg-black px-1.5 py-0.2 font-mono text-[9px] font-bold text-neo-yellow">
                PRO
              </span>
            </div>
          </Link>

          <div className="hidden sm:flex items-center gap-1.5 border-2 border-black bg-neo-yellow px-2.5 py-1 text-xs font-mono font-black uppercase text-black shadow-neo-sm">
            <Compass className="h-3.5 w-3.5" />
            <span>8 ROLES</span>
          </div>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden items-center gap-8 md:flex">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `text-xs font-extrabold uppercase tracking-wider transition ${
                isActive
                  ? "text-neo-yellow underline decoration-neo-yellow decoration-2 underline-offset-8"
                  : "text-neutral-300 hover:text-white"
              }`
            }
          >
            ROLES
          </NavLink>
          <NavLink
            to="/interview"
            className={({ isActive }) =>
              `text-xs font-extrabold uppercase tracking-wider transition ${
                isActive
                  ? "text-neo-yellow underline decoration-neo-yellow decoration-2 underline-offset-8"
                  : "text-neutral-300 hover:text-white"
              }`
            }
          >
            PRACTICE ARENA
          </NavLink>
          <NavLink
            to="/history"
            className={({ isActive }) =>
              `text-xs font-extrabold uppercase tracking-wider transition ${
                isActive
                  ? "text-neo-yellow underline decoration-neo-yellow decoration-2 underline-offset-8"
                  : "text-neutral-300 hover:text-white"
              }`
            }
          >
            QUEST LOG
          </NavLink>
          <NavLink
            to="/results"
            className={({ isActive }) =>
              `text-xs font-extrabold uppercase tracking-wider transition ${
                isActive
                  ? "text-neo-yellow underline decoration-neo-yellow decoration-2 underline-offset-8"
                  : "text-neutral-300 hover:text-white"
              }`
            }
          >
            BATTLE REPORT
          </NavLink>
        </nav>

        {/* Right: Auth & User Pill */}
        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              {/* XP Badge */}
              <div className="flex items-center gap-1 border-2 border-black bg-neo-cyan px-2.5 py-1 text-xs font-mono font-bold uppercase text-black shadow-neo-sm">
                <Zap className="h-3.5 w-3.5 fill-black" />
                <span>{gems} XP</span>
              </div>

              {/* User Pill */}
              <div className="flex items-center gap-2 border-2 border-black bg-white px-3 py-1 text-black shadow-neo-sm">
                <div className="flex h-6 w-6 items-center justify-center border border-black bg-neo-yellow font-bold text-xs">
                  {user.displayName ? user.displayName.charAt(0).toUpperCase() : "S"}
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-mono text-[11px] font-bold leading-none max-w-[130px] truncate">
                    {user.displayName || user.email}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-500">
                    CANDIDATE • LVL {level}
                  </span>
                </div>
              </div>

              {/* Logout Button */}
              <button
                type="button"
                onClick={handleSignOut}
                className="flex items-center gap-1.5 border-2 border-black bg-neo-yellow px-3 py-1.5 text-xs font-extrabold uppercase tracking-wider text-black shadow-neo-sm transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-neo active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
              >
                <LogOut className="h-3.5 w-3.5 stroke-[2.5]" />
                LOGOUT
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => signIn()}
              disabled={loading}
              className="flex items-center gap-1.5 border-2 border-black bg-neo-yellow px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-black shadow-neo-sm transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-neo active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
            >
              <Zap className="h-4 w-4 fill-black" />
              {loading ? "CONNECTING..." : "SIGN IN"}
            </button>
          )}
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 md:hidden">
          {user ? (
            <div className="flex items-center gap-1 border-2 border-black bg-neo-cyan px-2 py-1 text-xs font-mono font-bold text-black">
              <Zap className="h-3 w-3 fill-black" />
              <span>{gems}</span>
            </div>
          ) : null}
          <button
            type="button"
            onClick={() => setMenuOpen((val) => !val)}
            className="flex items-center justify-center border-2 border-black bg-neo-yellow p-1.5 text-black shadow-neo-sm"
          >
            <Menu className="h-5 w-5 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="border-t-2 border-black bg-[#18181b] px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3 font-mono text-xs font-bold uppercase">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="border-2 border-black bg-white p-2.5 text-black shadow-neo-sm flex items-center gap-2"
            >
              <Compass className="h-4 w-4" /> ROLES DIRECTORY
            </Link>
            <Link
              to="/interview"
              onClick={() => setMenuOpen(false)}
              className="border-2 border-black bg-neo-yellow p-2.5 text-black shadow-neo-sm flex items-center gap-2"
            >
              <BrainCircuit className="h-4 w-4" /> PRACTICE ARENA
            </Link>
            <Link
              to="/history"
              onClick={() => setMenuOpen(false)}
              className="border-2 border-black bg-neo-cyan p-2.5 text-black shadow-neo-sm flex items-center gap-2"
            >
              <History className="h-4 w-4" /> QUEST LOG
            </Link>
            <Link
              to="/results"
              onClick={() => setMenuOpen(false)}
              className="border-2 border-black bg-neo-pink p-2.5 text-black shadow-neo-sm flex items-center gap-2"
            >
              <Trophy className="h-4 w-4" /> BATTLE REPORT
            </Link>

            {user ? (
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  handleSignOut();
                }}
                className="mt-2 border-2 border-black bg-red-400 p-2.5 text-black shadow-neo-sm flex items-center justify-center gap-2"
              >
                <LogOut className="h-4 w-4" /> LOGOUT
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  signIn();
                }}
                className="mt-2 border-2 border-black bg-neo-yellow p-2.5 text-black shadow-neo-sm flex items-center justify-center gap-2"
              >
                <Zap className="h-4 w-4 fill-black" /> SIGN IN
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
