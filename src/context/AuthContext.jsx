import {
  getRedirectResult,
  onAuthStateChanged,
  signInWithPopup,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { createContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { auth, firebaseEnabled, provider } from "../lib/firebase";

export const AuthContext = createContext(null);

const DEMO_STORAGE_KEY = "prepAI_demo_user";

function buildDemoUser() {
  return {
    uid: "demo-user",
    displayName: "Demo Candidate",
    email: "demo@prepai.local",
    photoURL: "",
    isDemo: true,
  };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    if (!firebaseEnabled || !auth) {
      const savedDemo = localStorage.getItem(DEMO_STORAGE_KEY);
      if (savedDemo) {
        setUser(JSON.parse(savedDemo));
      }
      setLoading(false);
      return undefined;
    }

    // Process redirect result if returning from Google sign-in
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          toast.success("Successfully signed in!");
        }
      })
      .catch((error) => {
        console.error("Redirect auth error:", error);
        setAuthError(error.message);
        toast.error("Sign-in failed. Please try again.");
      });

    const unsubscribe = onAuthStateChanged(
      auth,
      (nextUser) => {
        setUser(nextUser);
        setLoading(false);
      },
      (error) => {
        console.error("Auth state error:", error);
        setAuthError(error.message);
        setLoading(false);
      },
    );

    return unsubscribe;
  }, []);

  const signIn = async () => {
    setAuthError("");

    if (!firebaseEnabled || !auth || !provider) {
      const demoUser = buildDemoUser();
      localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(demoUser));
      setUser(demoUser);
      toast.success("Signed in with demo mode");
      return demoUser;
    }

    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Sign in error:", error);
      const message = error.message || "Unable to sign in right now.";
      setAuthError(message);
      toast.error("Sign-in failed");
      throw error;
    }
  };

  const signOut = async () => {
    if (!firebaseEnabled || !auth) {
      localStorage.removeItem(DEMO_STORAGE_KEY);
      setUser(null);
      return;
    }

    await firebaseSignOut(auth);
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      authError,
      signIn,
      signOut,
      firebaseEnabled,
    }),
    [authError, loading, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
