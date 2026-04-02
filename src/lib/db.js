import { get, set, keys, del } from "idb-keyval";

const STORES = {
  logs: "wl_",       // workout logs: wl_2026-04-02
  nutrition: "nt_",  // nutrition logs: nt_2026-04-02
  measurements: "ms_", // measurements: ms_2026-04-02
};

// --- Workout Logs ---
export async function saveWorkoutLog(dateStr, log) {
  await set(STORES.logs + dateStr, { ...log, date: dateStr });
}

export async function getWorkoutLog(dateStr) {
  return await get(STORES.logs + dateStr);
}

export async function getLastWorkoutForDay(dayId) {
  const allKeys = await keys();
  const logKeys = allKeys
    .filter(k => typeof k === "string" && k.startsWith(STORES.logs))
    .sort()
    .reverse();
  for (const k of logKeys) {
    const log = await get(k);
    if (log && log.dayId === dayId) return log;
  }
  return null;
}

export async function getAllWorkoutLogs() {
  const allKeys = await keys();
  const logKeys = allKeys.filter(k => typeof k === "string" && k.startsWith(STORES.logs)).sort();
  const logs = [];
  for (const k of logKeys) {
    const log = await get(k);
    if (log) logs.push(log);
  }
  return logs;
}

export async function getExerciseHistory(exerciseName, limit = 90) {
  const logs = await getAllWorkoutLogs();
  const history = [];
  for (const log of logs.slice(-limit)) {
    const ex = log.exercises?.find(e => e.name === exerciseName);
    if (ex) {
      history.push({
        date: log.date,
        sets: ex.sets,
        bestSet: ex.sets.reduce((best, s) => (s.weight > (best?.weight || 0) ? s : best), null),
        totalVolume: ex.sets.reduce((sum, s) => sum + (s.weight || 0) * (s.reps || 0), 0),
      });
    }
  }
  return history;
}

// --- Nutrition Logs ---
export async function saveNutritionLog(dateStr, log) {
  await set(STORES.nutrition + dateStr, { ...log, date: dateStr });
}

export async function getNutritionLog(dateStr) {
  return await get(STORES.nutrition + dateStr);
}

export async function getNutritionLogs(days = 7) {
  const logs = [];
  const d = new Date();
  for (let i = 0; i < days; i++) {
    const dateStr = d.toISOString().split("T")[0];
    const log = await get(STORES.nutrition + dateStr);
    if (log) logs.push(log);
    d.setDate(d.getDate() - 1);
  }
  return logs.reverse();
}

// --- Measurements ---
export async function saveMeasurement(dateStr, data) {
  await set(STORES.measurements + dateStr, { ...data, date: dateStr });
}

export async function getMeasurement(dateStr) {
  return await get(STORES.measurements + dateStr);
}

export async function getAllMeasurements() {
  const allKeys = await keys();
  const mKeys = allKeys.filter(k => typeof k === "string" && k.startsWith(STORES.measurements)).sort();
  const measurements = [];
  for (const k of mKeys) {
    const m = await get(k);
    if (m) measurements.push(m);
  }
  return measurements;
}

// --- Export / Import ---
export async function exportAllData() {
  const allKeys = await keys();
  const data = {};
  for (const k of allKeys) {
    data[k] = await get(k);
  }
  return data;
}

export async function importAllData(data) {
  for (const [k, v] of Object.entries(data)) {
    await set(k, v);
  }
}
