const STORAGE_KEY = "prepAI_sessions";
const ACTIVE_SESSION_KEY = "prepAI_active_session";
const RESULT_KEY = "prepAI_latest_result";

function readLocalSessions() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function writeLocalSessions(sessions) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  } catch (err) {
    console.error("Failed to save sessions to localStorage:", err);
  }
}

export async function saveSession(session) {
  const sessions = readLocalSessions();
  const localSession = {
    ...session,
    id: session.id || `sess_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    timestamp: session.timestamp || new Date().toISOString(),
  };

  writeLocalSessions([localSession, ...sessions]);
  return localSession;
}

export async function getSessions(uid) {
  const all = readLocalSessions();
  if (!uid) return all;
  return all.filter((session) => session.uid === uid);
}

export async function deleteSessionById(id) {
  const next = readLocalSessions().filter((session) => session.id !== id);
  writeLocalSessions(next);
}

export function setActiveInterview(payload) {
  try {
    sessionStorage.setItem(ACTIVE_SESSION_KEY, JSON.stringify(payload));
  } catch (err) {
    console.error("Failed to store active interview:", err);
  }
}

export function getActiveInterview() {
  try {
    return JSON.parse(sessionStorage.getItem(ACTIVE_SESSION_KEY) || "null");
  } catch {
    return null;
  }
}

export function clearActiveInterview() {
  try {
    sessionStorage.removeItem(ACTIVE_SESSION_KEY);
  } catch (err) {
    console.error("Failed to clear active interview:", err);
  }
}

export function setLatestResult(payload) {
  try {
    sessionStorage.setItem(RESULT_KEY, JSON.stringify(payload));
  } catch (err) {
    console.error("Failed to store latest result:", err);
  }
}

export function getLatestResult() {
  try {
    return JSON.parse(sessionStorage.getItem(RESULT_KEY) || "null");
  } catch {
    return null;
  }
}
