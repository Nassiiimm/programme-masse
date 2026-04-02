import { parseSets } from "./utils";

// Determine progression type from day + exercise
function getProgressionType(dayId, exercisePriority) {
  // Upper body (dayId 1, 3) = linear, Lower body (dayId 2, 4) = double
  // Exception: isolation is always small increments
  if (exercisePriority === "isolation" || exercisePriority === "posture" || exercisePriority === "core") {
    return "isolation";
  }
  return (dayId === 1 || dayId === 3) ? "linear" : "double";
}

// Suggest next weight based on last session performance
// Returns { weight, reason, isDeload, isPR }
export function suggestNextWeight(exercise, dayId, lastSets, secondLastSets) {
  if (!lastSets || lastSets.length === 0) return null;

  const parsed = parseSets(exercise.sets);
  const type = getProgressionType(dayId, exercise.priority);
  const lastWeight = lastSets[0]?.weight || 0;
  const allHitMaxReps = lastSets.every(s => s.reps >= parsed.repsMax);
  const allHitMinReps = lastSets.every(s => s.reps >= parsed.repsMin);

  // Deload check: failed min reps 2 sessions in a row
  if (secondLastSets && secondLastSets.length > 0) {
    const prevFailed = secondLastSets.some(s => s.reps < parsed.repsMin);
    const currFailed = lastSets.some(s => s.reps < parsed.repsMin);
    if (prevFailed && currFailed) {
      return {
        weight: Math.round(lastWeight * 0.6 * 2) / 2, // -40%, round to 0.5
        reason: "Deload : 2 séances en échec",
        isDeload: true,
        isPR: false,
      };
    }
  }

  if (type === "linear") {
    if (allHitMinReps) {
      return {
        weight: lastWeight + 2.5,
        reason: "+2.5 kg (progression linéaire)",
        isDeload: false,
        isPR: true,
      };
    }
    return {
      weight: lastWeight,
      reason: "Même poids — atteins tes reps",
      isDeload: false,
      isPR: false,
    };
  }

  if (type === "double") {
    if (allHitMaxReps) {
      return {
        weight: lastWeight + 5,
        reason: `+5 kg → redescends à ${parsed.repsMin} reps`,
        isDeload: false,
        isPR: true,
      };
    }
    if (allHitMinReps) {
      return {
        weight: lastWeight,
        reason: "Même poids — monte les reps",
        isDeload: false,
        isPR: false,
      };
    }
    return {
      weight: lastWeight,
      reason: "Même poids — atteins tes reps min",
      isDeload: false,
      isPR: false,
    };
  }

  // Isolation
  if (allHitMaxReps) {
    return {
      weight: lastWeight + 1,
      reason: "+1 kg (isolation)",
      isDeload: false,
      isPR: true,
    };
  }
  return {
    weight: lastWeight,
    reason: "Même poids",
    isDeload: false,
    isPR: false,
  };
}
