import { useState } from "react";
import { parseSets, parseRest } from "../lib/utils";
import SetRow from "./SetRow";

export default function ExerciseLogger({ exercise, index, dayColor, lastExerciseData, suggestion, onSetComplete }) {
  const parsed = parseSets(exercise.sets);
  const [completedSets, setCompletedSets] = useState([]);
  const allDone = completedSets.length >= parsed.sets;

  const getDefaultWeight = (setIdx) => {
    if (suggestion && setIdx === 0) return suggestion.weight;
    if (lastExerciseData?.sets?.[setIdx]) return lastExerciseData.sets[setIdx].weight;
    if (lastExerciseData?.sets?.[0]) return lastExerciseData.sets[0].weight;
    return 0;
  };

  const getDefaultReps = (setIdx) => {
    if (lastExerciseData?.sets?.[setIdx]) return lastExerciseData.sets[setIdx].reps;
    return parsed.repsMin;
  };

  const handleSetComplete = (setIdx, data) => {
    const newSets = [...completedSets, { ...data, setIdx }];
    setCompletedSets(newSets);
    const restSeconds = parseRest(exercise.rest);
    onSetComplete(exercise.name, setIdx, data, restSeconds, newSets);
  };

  return (
    <div style={{
      background: "#14141a",
      borderRadius: 12,
      border: allDone ? `1px solid ${dayColor}40` : "1px solid #27272a",
      marginBottom: 8,
      overflow: "hidden",
      transition: "border 0.3s",
    }}>
      {/* Header */}
      <div style={{
        padding: "10px 12px 6px",
        display: "flex",
        alignItems: "flex-start",
        gap: 8,
      }}>
        <div style={{
          minWidth: 24,
          height: 24,
          borderRadius: 7,
          background: allDone ? dayColor : "#27272a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 11,
          fontWeight: 700,
          color: allDone ? "#fff" : "#71717a",
          transition: "all 0.3s",
        }}>
          {allDone ? "✓" : index + 1}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#fafafa" }}>
            {exercise.name}
          </div>
          <div style={{ fontSize: 10, color: "#52525b", marginTop: 1 }}>
            {exercise.sets} · repos {exercise.rest}
            {exercise.priority === "compound" && " · COMPOSÉ"}
          </div>
        </div>
        <div style={{
          fontSize: 10,
          fontWeight: 600,
          color: allDone ? dayColor : "#3f3f46",
          padding: "3px 6px",
          background: allDone ? dayColor + "15" : "transparent",
          borderRadius: 4,
        }}>
          {completedSets.length}/{parsed.sets}
        </div>
      </div>

      {/* Suggestion badge */}
      {suggestion && (
        <div style={{
          margin: "0 12px 4px",
          padding: "4px 8px",
          borderRadius: 6,
          fontSize: 10,
          fontWeight: 600,
          background: suggestion.isDeload ? "#dc262615" : suggestion.isPR ? "#22c55e15" : "#27272a",
          color: suggestion.isDeload ? "#dc2626" : suggestion.isPR ? "#22c55e" : "#71717a",
          border: `1px solid ${suggestion.isDeload ? "#dc262630" : suggestion.isPR ? "#22c55e30" : "#3f3f46"}`,
        }}>
          {suggestion.isPR ? "↑ " : suggestion.isDeload ? "↓ " : ""}{suggestion.reason}
        </div>
      )}

      {/* Set rows */}
      <div style={{ padding: "2px 12px 10px" }}>
        {Array.from({ length: parsed.sets }, (_, i) => (
          <SetRow
            key={i}
            index={i}
            defaultWeight={getDefaultWeight(i)}
            defaultReps={getDefaultReps(i)}
            completed={completedSets.some(s => s.setIdx === i)}
            onComplete={(data) => handleSetComplete(i, data)}
            dayColor={dayColor}
          />
        ))}
      </div>
    </div>
  );
}
