import { useState, useEffect } from "react";
import { PROGRAM_DATA } from "../data/program";
import { getExerciseHistory, getAllWorkoutLogs } from "../lib/db";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function StatsPage() {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [history, setHistory] = useState([]);
  const [totalSessions, setTotalSessions] = useState(0);

  const allExercises = PROGRAM_DATA.days.flatMap(d => d.exercises.map(e => e.name));
  const uniqueExercises = [...new Set(allExercises)];

  useEffect(() => {
    getAllWorkoutLogs().then(logs => setTotalSessions(logs.length));
  }, []);

  useEffect(() => {
    if (selectedExercise) {
      getExerciseHistory(selectedExercise).then(h => setHistory(h));
    }
  }, [selectedExercise]);

  const chartData = history.map(h => ({
    date: h.date.slice(5), // "04-02"
    poids: h.bestSet?.weight || 0,
    volume: h.totalVolume,
  }));

  return (
    <div style={{ padding: "16px 20px", paddingBottom: 80 }}>
      <h2 style={{
        fontFamily: "'Instrument Serif', Georgia, serif",
        fontSize: 24, fontWeight: 400, marginBottom: 4, color: "#fafafa",
      }}>
        Progression
      </h2>
      <p style={{ fontSize: 12, color: "#71717a", marginBottom: 16 }}>
        {totalSessions} séance{totalSessions !== 1 ? "s" : ""} enregistrée{totalSessions !== 1 ? "s" : ""}
      </p>

      {/* Exercise selector */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 6,
        marginBottom: 16,
      }}>
        {uniqueExercises.map(name => (
          <button
            key={name}
            onClick={() => setSelectedExercise(name)}
            style={{
              padding: "6px 10px",
              borderRadius: 8,
              border: selectedExercise === name ? "1px solid #e2725b" : "1px solid #27272a",
              background: selectedExercise === name ? "#e2725b15" : "#18181b",
              color: selectedExercise === name ? "#e2725b" : "#71717a",
              fontSize: 10,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            {name}
          </button>
        ))}
      </div>

      {/* Chart */}
      {selectedExercise && history.length > 0 ? (
        <div style={{
          background: "#18181b",
          borderRadius: 12,
          border: "1px solid #27272a",
          padding: "16px 8px 8px",
          marginBottom: 16,
        }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#fafafa", marginBottom: 4, paddingLeft: 8 }}>
            {selectedExercise}
          </div>
          <div style={{ fontSize: 10, color: "#71717a", marginBottom: 12, paddingLeft: 8 }}>
            Meilleur poids par séance
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
              <XAxis dataKey="date" tick={{ fontSize: 9, fill: "#52525b" }} />
              <YAxis tick={{ fontSize: 9, fill: "#52525b" }} domain={["auto", "auto"]} />
              <Tooltip
                contentStyle={{ background: "#18181b", border: "1px solid #27272a", borderRadius: 8, fontSize: 11 }}
                labelStyle={{ color: "#71717a" }}
              />
              <Line type="monotone" dataKey="poids" stroke="#e2725b" strokeWidth={2} dot={{ fill: "#e2725b", r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : selectedExercise ? (
        <div style={{
          padding: 30,
          textAlign: "center",
          color: "#3f3f46",
          fontSize: 12,
          background: "#18181b",
          borderRadius: 12,
          border: "1px solid #27272a",
        }}>
          Aucune donnée pour cet exercice.
          <br />
          Commence par logger une séance.
        </div>
      ) : (
        <div style={{
          padding: 30,
          textAlign: "center",
          color: "#3f3f46",
          fontSize: 12,
          background: "#18181b",
          borderRadius: 12,
          border: "1px solid #27272a",
        }}>
          Sélectionne un exercice pour voir ta progression.
        </div>
      )}
    </div>
  );
}
