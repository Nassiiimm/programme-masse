import { formatTimer } from "../lib/utils";

export default function RestTimer({ seconds, isRunning, onStop }) {
  if (!isRunning && seconds === 0) return null;

  return (
    <div style={{
      position: "fixed",
      bottom: 70,
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 99,
      background: seconds <= 5 ? "#dc2626" : "#18181b",
      border: `1px solid ${seconds <= 5 ? "#ef4444" : "#27272a"}`,
      borderRadius: 50,
      padding: "8px 20px",
      display: "flex",
      alignItems: "center",
      gap: 12,
      boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
      transition: "background 0.3s",
    }}>
      <span style={{ fontSize: 11, color: "#71717a", fontWeight: 600 }}>REPOS</span>
      <span style={{
        fontSize: 22,
        fontWeight: 700,
        color: "#fafafa",
        fontVariantNumeric: "tabular-nums",
        minWidth: 50,
        textAlign: "center",
      }}>
        {formatTimer(seconds)}
      </span>
      <button
        onClick={onStop}
        style={{
          background: "#27272a",
          border: "none",
          borderRadius: "50%",
          width: 28,
          height: 28,
          color: "#fafafa",
          fontSize: 14,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        ✕
      </button>
    </div>
  );
}
