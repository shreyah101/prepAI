// Lightweight JWT token generator and decoder for client-side authentication

const JWT_STORAGE_KEY = "prepAI_jwt_token";
const SECRET_KEY = "prepai-neo-secret-key-2026";

function base64UrlEncode(str) {
  return btoa(unescape(encodeURIComponent(str)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function base64UrlDecode(str) {
  let output = str.replace(/-/g, "+").replace(/_/g, "/");
  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += "==";
      break;
    case 3:
      output += "=";
      break;
    default:
      throw new Error("Illegal base64url string!");
  }
  return decodeURIComponent(escape(atob(output)));
}

// Simple deterministic signature for demonstration
function generateSignature(headerB64, payloadB64, secret) {
  let hash = 0;
  const data = `${headerB64}.${payloadB64}.${secret}`;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return base64UrlEncode(Math.abs(hash).toString(16).padStart(8, "0"));
}

/**
 * Creates a signed JWT token for a user
 */
export function createJWT(userData) {
  const header = {
    alg: "HS256",
    typ: "JWT",
  };

  const now = Math.floor(Date.now() / 1000);
  const payload = {
    sub: userData.id || userData.uid || `usr_${Date.now()}`,
    email: userData.email,
    displayName: userData.displayName || userData.name || userData.email.split("@")[0],
    roleLevel: userData.roleLevel || "Candidate",
    gems: userData.gems ?? 150,
    level: userData.level ?? 1,
    iat: now,
    exp: now + 60 * 60 * 24 * 30, // 30 days expiry
  };

  const headerB64 = base64UrlEncode(JSON.stringify(header));
  const payloadB64 = base64UrlEncode(JSON.stringify(payload));
  const signature = generateSignature(headerB64, payloadB64, SECRET_KEY);

  return `${headerB64}.${payloadB64}.${signature}`;
}

/**
 * Decodes and verifies a JWT token
 */
export function verifyAndDecodeJWT(token) {
  if (!token || typeof token !== "string") return null;

  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const [headerB64, payloadB64, signature] = parts;
    const expectedSig = generateSignature(headerB64, payloadB64, SECRET_KEY);

    if (signature !== expectedSig) {
      console.warn("JWT signature mismatch");
      return null;
    }

    const payload = JSON.parse(base64UrlDecode(payloadB64));
    const now = Math.floor(Date.now() / 1000);

    // Check expiry
    if (payload.exp && payload.exp < now) {
      console.warn("JWT token has expired");
      return null;
    }

    return {
      uid: payload.sub,
      id: payload.sub,
      email: payload.email,
      displayName: payload.displayName,
      roleLevel: payload.roleLevel,
      gems: payload.gems,
      level: payload.level,
      token,
    };
  } catch (err) {
    console.error("Failed to parse JWT:", err);
    return null;
  }
}

export function saveToken(token) {
  localStorage.setItem(JWT_STORAGE_KEY, token);
}

export function getStoredToken() {
  return localStorage.getItem(JWT_STORAGE_KEY);
}

export function removeToken() {
  localStorage.removeItem(JWT_STORAGE_KEY);
}
