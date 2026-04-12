import { BrainCircuit, History, LogOut, Menu, UserCircle2 } from "lucide-react";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Navbar() {
  const { user, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3 text-white">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-400/15 text-indigo-100">
            <BrainCircuit className="h-5 w-5" />
          </span>
          <span className="text-lg font-semibold tracking-wide">PrepAI</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {user ? (
            <>
              <NavItem to="/interview">Practice</NavItem>
              <NavItem to="/history">History</NavItem>
            </>
          ) : null}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-2">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName} className="h-8 w-8 rounded-full object-cover" />
                ) : (
                  <UserCircle2 className="h-8 w-8 text-slate-300" />
                )}
                <span className="text-sm text-slate-200">{user.displayName || "Candidate"}</span>
              </div>
              <button type="button" onClick={handleSignOut} className="ghost-button">
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </>
          ) : null}
        </div>

        <button type="button" className="ghost-button md:hidden" onClick={() => setMenuOpen((value) => !value)}>
          <Menu className="h-4 w-4" />
        </button>
      </div>

      {menuOpen ? (
        <div className="border-t border-white/10 px-6 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {user ? (
              <>
                <Link className="text-slate-200" to="/interview" onClick={() => setMenuOpen(false)}>
                  Practice
                </Link>
                <Link className="flex items-center gap-2 text-slate-200" to="/history" onClick={() => setMenuOpen(false)}>
                  <History className="h-4 w-4" />
                  History
                </Link>
                <button type="button" className="text-left text-slate-200" onClick={handleSignOut}>
                  Sign Out
                </button>
              </>
            ) : (
              <Link className="text-slate-200" to="/">
                Home
              </Link>
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
}

function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `text-sm font-medium transition ${isActive ? "text-white" : "text-slate-400 hover:text-slate-100"}`
      }
    >
      {children}
    </NavLink>
  );
}

export default Navbar;
