import { useState } from "react";

export default function SetRow({ index, defaultWeight, defaultReps, completed, onComplete, dayColor }) {
  const [weight, setWeight] = useState(defaultWeight || 0);
  const [reps, setReps] = useState(defaultReps || 8);
  const [done, setDone] = useState(completed || false);

  const handleComplete = () => {
    if (done) return;
    setDone(true);
    onComplete({ weight: parseFloat(weight) || 0, reps: parseInt(reps) || 0 });
  };

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "6px 0",
      opacity: done ? 0.6 : 1,
      transition: "opacity 0.2s",
    }}>
      {/* Set number */}
      <div style={{
        minWidth: 22,
        height: 22,
        borderRadius: 6,
        background: done ? dayColor + "30" : "#27272a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 10,
        fontWeight: 700,
        color: done ? dayColor : "#52525b",
      }}>
        {index + 1}
      </div>

      {/* Weight input */}
      <div style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        gap: 4,
        background: "#18181b",
        borderRadius: 8,
        padding: "6px 8px",
        border: "1px solid #27272a",
      }}>
        <input
          type="text"
          inputMode="decimal"
          value={weight}
          onChange={e => setWeight(e.target.value)}
          disabled={done}
          style={{
            width: "100%",
            background: "transparent",
            border: "none",
            color: "#fafafa",
            fontSize: 15,
            fontWeight: 700,
            fontFamily: "inherit",
            textAlign: "center",
            outline: "none",
          }}
        />
        <span style={{ fontSize: 10, color: "#52525b", fontWeight: 600 }}>kg</span>
      </div>

      {/* Reps input */}
      <div style={{
        width: 55,
        display: "flex",
        alignItems: "center",
        gap: 4,
        background: "#18181b",
        borderRadius: 8,
        padding: "6px 8px",
        border: "1px solid #27272a",
      }}>
        <input
          type="text"
          inputMode="numeric"
          value={reps}
          onChange={e => setReps(e.target.value)}
          disabled={done}
          style={{
            width: "100%",
            background: "transparent",
            border: "none",
            color: "#fafafa",
            fontSize: 15,
            fontWeight: 700,
            fontFamily: "inherit",
            textAlign: "center",
            outline: "none",
          }}
        />
      </div>

      {/* Check button */}
      <button
        onClick={handleComplete}
        disabled={done}
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          border: done ? "none" : `2px solid ${dayColor}50`,
          background: done ? dayColor : "transparent",
          color: done ? "#fff" : dayColor,
          fontSize: 16,
          fontWeight: 700,
          cursor: done ? "default" : "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.2s",
          flexShrink: 0,
        }}
      >
        {done ? "✓" : "○"}
      </button>
    </div>
  );
}
