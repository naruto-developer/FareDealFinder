export type CookieChoice = "accepted" | "rejected";
export type ConsentSnapshot = CookieChoice | "unknown" | "pending";
export const CONSENT_COOKIE = "faredealfinder_cookie_consent";
const CONSENT_EVENT = "faredealfinder:cookie-consent";
let sessionChoice: CookieChoice | null = null;

export function getConsent(): ConsentSnapshot {
  let cookies = "";
  try { cookies = document.cookie; } catch { /* Use the in-memory choice when storage is blocked. */ }
  const value = cookies.split("; ").find((cookie) => cookie.startsWith(`${CONSENT_COOKIE}=`))?.split("=")[1];
  if (value === "v1.accepted") return "accepted";
  if (value === "v1.rejected") return "rejected";
  return sessionChoice ?? "unknown";
}

export function saveConsent(choice: CookieChoice) {
  sessionChoice = choice;
  try {
  document.cookie = `${CONSENT_COOKIE}=v1.${choice}; Path=/; Max-Age=31536000; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
  } catch { /* The choice remains available for this page session. */ }
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

export function subscribeConsent(onChange: () => void) {
  window.addEventListener(CONSENT_EVENT, onChange);
  window.addEventListener("focus", onChange);
  return () => {
    window.removeEventListener(CONSENT_EVENT, onChange);
    window.removeEventListener("focus", onChange);
  };
}

export function getServerConsent(): ConsentSnapshot {
  return "pending";
}

export function clearAnalyticsCookies() {
  let cookies = "";
  try { cookies = document.cookie; } catch { return; }
  const names = cookies.split(";").map((cookie) => cookie.trim().split("=")[0]).filter((name) => /^(_ga(?:_|$)|_gid$|_gat(?:_|$))/.test(name));
  const parts = location.hostname.split(".");
  const domains = parts.map((_, index) => parts.slice(index).join("."));
  for (const name of names) {
    document.cookie = `${name}=; Max-Age=0; Path=/`;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; Path=/; Domain=${domain}`;
      document.cookie = `${name}=; Max-Age=0; Path=/; Domain=.${domain}`;
    }
  }
}
