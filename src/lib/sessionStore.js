import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db, firebaseEnabled } from "./firebase";

const STORAGE_KEY = "prepAI_sessions";
const ACTIVE_SESSION_KEY = "prepAI_active_session";
const RESULT_KEY = "prepAI_latest_result";

function readLocalSessions() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}

function writeLocalSessions(sessions) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}

export async function saveSession(session) {
  if (firebaseEnabled && db) {
    await addDoc(collection(db, "sessions"), {
      ...session,
      timestamp: serverTimestamp(),
    });
    return;
  }

  const sessions = readLocalSessions();
  const localSession = {
    ...session,
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
  };

  writeLocalSessions([localSession, ...sessions]);
}

export async function getSessions(uid) {
  if (firebaseEnabled && db && uid !== "demo-user") {
    const q = query(
      collection(db, "sessions"),
      where("uid", "==", uid)
    );
    const snapshot = await getDocs(q);
    const fetched = snapshot.docs.map((item) => ({
      id: item.id,
      ...item.data(),
      timestamp: item.data().timestamp?.toDate?.()?.toISOString?.() || new Date().toISOString(),
    }));
    
    // Sort locally to avoid Firebase index requirement
    return fetched.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  return readLocalSessions().filter((session) => session.uid === uid);
}

export async function deleteSessionById(id) {
  if (firebaseEnabled && db) {
    await deleteDoc(doc(db, "sessions", id));
    return;
  }

  const next = readLocalSessions().filter((session) => session.id !== id);
  writeLocalSessions(next);
}

export function setActiveInterview(payload) {
  sessionStorage.setItem(ACTIVE_SESSION_KEY, JSON.stringify(payload));
}

export function getActiveInterview() {
  return JSON.parse(sessionStorage.getItem(ACTIVE_SESSION_KEY) || "null");
}

export function clearActiveInterview() {
  sessionStorage.removeItem(ACTIVE_SESSION_KEY);
}

export function setLatestResult(payload) {
  sessionStorage.setItem(RESULT_KEY, JSON.stringify(payload));
}

export function getLatestResult() {
  return JSON.parse(sessionStorage.getItem(RESULT_KEY) || "null");
}
