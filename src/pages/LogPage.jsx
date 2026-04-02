import { useState, useEffect, useCallback } from "react";
import { PROGRAM_DATA } from "../data/program";
import { getTodayDayId, today, parseSets } from "../lib/utils";
import { getLastWorkoutForDay, saveWorkoutLog } from "../lib/db";
import { suggestNextWeight } from "../lib/progression";
import ExerciseLogger from "../components/ExerciseLogger";

export default function LogPage({ onTimerStart }) {
  const todayDayId = getTodayDayId();
  const [activeDayId, setActiveDayId] = useState(todayDayId || 1);
  const [lastSession, setLastSession] = useState(null);
  const [secondLastSession, setSecondLastSession] = useState(null);
  const [sessionData, setSessionData] = useState({});
  const [startedAt, setStartedAt] = useState(null);

  const currentDay = PROGRAM_DATA.days.find(d => d.id === activeDayId);

  // Load last session for this day
  useEffect(() => {
    (async () => {
      const last = await getLastWorkoutForDay(activeDayId);
      setLastSession(last);
      // For deload detection, we'd need second-to-last — simplified for now
      setSecondLastSession(null);
    })();
  }, [activeDayId]);

  const getLastExerciseData = (exerciseName) => {
    if (!lastSession) return null;
    return lastSession.exercises?.find(e => e.name === exerciseName) || null;
  };

  const getSuggestion = (exercise) => {
    const lastEx = getLastExerciseData(exercise.name);
    if (!lastEx) return null;
    return suggestNextWeight(exercise, activeDayId, lastEx.sets, null);
  };

  const handleSetComplete = useCallback((exerciseName, setIdx, data, restSeconds, allSets) => {
    if (!startedAt) setStartedAt(new Date().toISOString());

    setSessionData(prev => ({
      ...prev,
      [exerciseName]: allSets,
    }));

    // Start rest timer
    if (onTimerStart) onTimerStart(restSeconds);

    // Auto-save to IndexedDB
    const dateStr = today();
    const exercises = currentDay.exercises.map(ex => ({
      name: ex.name,
      sets: sessionData[ex.name] || (ex.name === exerciseName ? allSets : []),
    }));

    saveWorkoutLog(dateStr, {
      dayId: activeDayId,
      dayTitle: currentDay.title,
      startedAt: startedAt || new Date().toISOString(),
      completedAt: new Date().toISOString(),
      exercises,
    });
  }, [sessionData, activeDayId, currentDay, startedAt, onTimerStart]);

  const totalSetsCompleted = Object.values(sessionData).reduce((sum, sets) => sum + sets.length, 0);
  const totalSetsTarget = currentDay.exercises.reduce((sum, ex) => sum + parseSets(ex.sets).sets, 0);

  return (
    <div style={{ paddingBottom: 80 }}>
      {/* Day selector */}
      <div style={{
        display: "flex",
        gap: 6,
        padding: "16px 20px 0",
        overflowX: "auto",
      }}>
        {PROGRAM_DATA.days.map(day => (
          <button
            key={day.id}
            onClick={() => { setActiveDayId(day.id); setSessionData({}); setStartedAt(null); }}
            style={{
              flex: "1 1 0",
              minWidth: 0,
              padding: "10px 4px 8px",
              borderRadius: 10,
              border: activeDayId === day.id ? `1.5px solid ${day.color}` : "1.5px solid #27272a",
              background: activeDayId === day.id ? `${day.color}11` : "#18181b",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            <div style={{
              fontSize: 8,
              fontWeight: 700,
              letterSpacing: 1,
              color: activeDayId === day.id ? day.color : "#52525b",
              textTransform: "uppercase",
            }}>
              {day.day}
            </div>
            <div style={{
              fontSize: 11,
              fontWeight: 700,
              marginTop: 1,
              color: activeDayId === day.id ? "#fafafa" : "#71717a",
            }}>
              {day.title}
            </div>
          </button>
        ))}
      </div>

      {/* Session header */}
      <div style={{
        margin: "12px 20px 0",
        padding: "10px 14px",
        background: `linear-gradient(135deg, ${currentDay.color}15, ${currentDay.color}08)`,
        borderRadius: 10,
        border: `1px solid ${currentDay.color}25`,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#fafafa" }}>
            {currentDay.title}
            <span style={{ color: currentDay.color, fontWeight: 500, fontSize: 12, marginLeft: 6 }}>
              {currentDay.subtitle}
            </span>
          </div>
          {todayDayId === activeDayId && (
            <div style={{ fontSize: 10, color: "#22c55e", fontWeight: 600, marginTop: 2 }}>
              Séance du jour
            </div>
          )}
        </div>
        <div style={{
          fontSize: 13,
          fontWeight: 700,
          color: totalSetsCompleted === totalSetsTarget ? "#22c55e" : currentDay.color,
        }}>
          {totalSetsCompleted}/{totalSetsTarget}
        </div>
      </div>

      {/* Exercise loggers */}
      <div style={{ padding: "8px 20px" }}>
        {currentDay.exercises.map((ex, i) => (
          <ExerciseLogger
            key={`${activeDayId}-${ex.name}`}
            exercise={ex}
            index={i}
            dayColor={currentDay.color}
            lastExerciseData={getLastExerciseData(ex.name)}
            suggestion={getSuggestion(ex)}
            onSetComplete={handleSetComplete}
          />
        ))}
      </div>

      {/* Session complete banner */}
      {totalSetsCompleted === totalSetsTarget && totalSetsTarget > 0 && (
        <div style={{
          margin: "8px 20px",
          padding: "14px",
          background: "#22c55e15",
          border: "1px solid #22c55e30",
          borderRadius: 12,
          textAlign: "center",
        }}>
          <div style={{ fontSize: 18, marginBottom: 4 }}>💪</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#22c55e" }}>Séance terminée</div>
          <div style={{ fontSize: 11, color: "#71717a", marginTop: 2 }}>
            Données sauvegardées automatiquement
          </div>
        </div>
      )}
    </div>
  );
}
