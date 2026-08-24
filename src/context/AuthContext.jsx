import { createContext, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  createJWT,
  getStoredToken,
  removeToken,
  saveToken,
  verifyAndDecodeJWT,
} from "../lib/jwt";

export const AuthContext = createContext(null);

const DEFAULT_DEMO_USER = {
  uid: "usr_shreya_dev",
  id: "usr_shreya_dev",
  email: "shreya.sundli@prepai.dev",
  displayName: "Shreya Sundli",
  roleLevel: "Frontend Developer",
  gems: 250,
  level: 2,
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const storedToken = getStoredToken();
      if (storedToken) {
        const decoded = verifyAndDecodeJWT(storedToken);
        if (decoded) return decoded;
      }
    } catch (e) {
      console.error("Auth init error:", e);
    }
    return null;
  });

  const [loading, setLoading] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [pendingRole, setPendingRole] = useState(null);

  // Sign in by creating a signed JWT token
  const signInWithJWT = async (email, displayName = "", roleLevel = "Frontend Developer") => {
    setLoading(true);
    try {
      if (!email || !email.includes("@")) {
        throw new Error("Please enter a valid email address.");
      }

      const name = displayName.trim() || email.split("@")[0];
      const uid = `usr_${email.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase()}`;

      // Check if user already had previous gems/level stored
      const prevData = localStorage.getItem(`prepAI_user_${uid}`);
      let gems = 150;
      let level = 1;

      if (prevData) {
        try {
          const parsed = JSON.parse(prevData);
          gems = parsed.gems || gems;
          level = parsed.level || level;
        } catch {
          // ignore
        }
      }

      const userData = {
        uid,
        id: uid,
        email: email.trim().toLowerCase(),
        displayName: name,
        roleLevel: pendingRole || roleLevel,
        gems,
        level,
      };

      const token = createJWT(userData);
      saveToken(token);
      localStorage.setItem(`prepAI_user_${uid}`, JSON.stringify(userData));

      const authenticatedUser = { ...userData, token };
      setUser(authenticatedUser);
      setIsAuthModalOpen(false);

      toast.success(`Welcome to PrepAI, ${name}!`);
      return { user: authenticatedUser, targetRole: pendingRole || roleLevel };
    } catch (err) {
      toast.error(err.message || "Failed to generate JWT session.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Sign in with quick demo credentials (Shreya Sundli)
  const signInDemo = async () => {
    return signInWithJWT(
      DEFAULT_DEMO_USER.email,
      DEFAULT_DEMO_USER.displayName,
      pendingRole || DEFAULT_DEMO_USER.roleLevel,
    );
  };

  // Trigger modal with optional target role
  const openAuthModal = (targetRole = null) => {
    if (targetRole) {
      setPendingRole(targetRole);
    }
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setPendingRole(null);
    setIsAuthModalOpen(false);
  };

  const signOut = async () => {
    removeToken();
    setUser(null);
    setPendingRole(null);
    toast.success("Signed out successfully");
  };

  // Reward XP and gems
  const addXP = (points) => {
    if (!user) return;
    const newGems = (user.gems || 0) + points;
    const newLevel = Math.floor(newGems / 200) + 1;

    const updatedUser = {
      ...user,
      gems: newGems,
      level: newLevel,
    };

    const token = createJWT(updatedUser);
    saveToken(token);
    localStorage.setItem(`prepAI_user_${user.uid}`, JSON.stringify(updatedUser));
    setUser({ ...updatedUser, token });
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      signIn: openAuthModal,
      openAuthModal,
      closeAuthModal,
      signInWithJWT,
      signInDemo,
      signOut,
      addXP,
      isAuthModalOpen,
      pendingRole,
      authMode: "JWT",
    }),
    [isAuthModalOpen, loading, pendingRole, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
