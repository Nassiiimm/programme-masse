// Parse "4 × 8-10" → { sets: 4, repsMin: 8, repsMax: 10 }
// Parse "3 × 10/côté" → { sets: 3, repsMin: 10, repsMax: 10, perSide: true }
// Parse "2 × 45-60s" → { sets: 2, repsMin: 45, repsMax: 60, timed: true }
export function parseSets(setsStr) {
  const clean = setsStr.replace(/×/g, "x").replace(/\s+/g, " ").trim();
  const [setsP, repsP] = clean.split("x").map(s => s.trim());
  const sets = parseInt(setsP, 10) || 3;
  const perSide = /côté|jambe|side/i.test(repsP);
  const timed = /s$/i.test(repsP.replace(/côté|jambe|side/gi, "").trim());

  const nums = repsP.replace(/[^\d-]/g, " ").trim();
  const parts = nums.split("-").map(n => parseInt(n, 10)).filter(Boolean);
  const repsMin = parts[0] || 8;
  const repsMax = parts[1] || parts[0] || 8;

  return { sets, repsMin, repsMax, perSide, timed };
}

// Parse "2-3 min" → 150 (use high value), "90s" → 90, "60 sec" → 60
export function parseRest(restStr) {
  if (!restStr) return 90;
  const clean = restStr.toLowerCase().replace(/\s+/g, " ").trim();
  if (clean.includes("min")) {
    const nums = clean.replace(/[^\d.-]/g, " ").trim().split(/[\s-]+/).map(Number).filter(Boolean);
    return Math.round((nums[nums.length - 1] || 2) * 60);
  }
  const secs = parseInt(clean.replace(/[^\d]/g, ""), 10);
  return secs || 90;
}

// Format date to French short: "Lun 2 avr."
export function formatDateShort(date) {
  const d = new Date(date);
  const days = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
  const months = ["jan.", "fév.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."];
  return `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]}`;
}

// ISO date string "2026-04-02"
export function toISODate(date) {
  const d = new Date(date);
  return d.toISOString().split("T")[0];
}

// Today's ISO date
export function today() {
  return toISODate(new Date());
}

// Which day of the program is today? Returns dayId (1-4) or null if rest day
export function getTodayDayId() {
  const dow = new Date().getDay(); // 0=Sun
  const map = { 1: 1, 2: 2, 4: 3, 5: 4 }; // Mon=Upper A, Tue=Lower A, Thu=Upper B, Fri=Lower B
  return map[dow] || null;
}

// Format seconds to "2:30"
export function formatTimer(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}
