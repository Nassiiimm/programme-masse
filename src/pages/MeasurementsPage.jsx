import { useState, useEffect } from "react";
import { today } from "../lib/utils";
import { saveMeasurement, getAllMeasurements } from "../lib/db";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine } from "recharts";

const GOALS = {
  weight: 74.5,
  arms: 37,
  chest: 99.5,
  waist: 79.5,
  thighs: 59,
};

const FIELDS = [
  { key: "weight", label: "Poids", unit: "kg", step: 0.1 },
  { key: "arms", label: "Bras (contracté)", unit: "cm", step: 0.5 },
  { key: "chest", label: "Poitrine", unit: "cm", step: 0.5 },
  { key: "waist", label: "Taille (nombril)", unit: "cm", step: 0.5 },
  { key: "thighs", label: "Cuisses", unit: "cm", step: 0.5 },
];

export default function MeasurementsPage() {
  const [measurements, setMeasurements] = useState([]);
  const [form, setForm] = useState({});
  const [saved, setSaved] = useState(false);
  const [chartField, setChartField] = useState("weight");

  useEffect(() => {
    getAllMeasurements().then(m => setMeasurements(m));
  }, []);

  const handleSave = async () => {
    const dateStr = today();
    await saveMeasurement(dateStr, form);
    const updated = await getAllMeasurements();
    setMeasurements(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const chartData = measurements.map(m => ({
    date: m.date?.slice(5) || "",
    value: m[chartField] || null,
  })).filter(d => d.value !== null);

  const latest = measurements[measurements.length - 1];

  return (
    <div style={{ padding: "16px 20px", paddingBottom: 80 }}>
      <h2 style={{
        fontFamily: "'Instrument Serif', Georgia, serif",
        fontSize: 24, fontWeight: 400, marginBottom: 4, color: "#fafafa",
      }}>
        Mensurations
      </h2>
      <p style={{ fontSize: 12, color: "#71717a", marginBottom: 16 }}>
        {measurements.length} relevé{measurements.length !== 1 ? "s" : ""} enregistré{measurements.length !== 1 ? "s" : ""}
      </p>

      {/* Current vs Goals */}
      {latest && (
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 6,
          marginBottom: 16,
        }}>
          {FIELDS.map(f => {
            const current = latest[f.key];
            const goal = GOALS[f.key];
            const diff = current && goal ? current - goal : null;
            return (
              <div key={f.key} style={{
                flex: "1 1 calc(33% - 4px)",
                minWidth: 90,
                background: "#18181b",
                borderRadius: 10,
                padding: "8px 10px",
                border: "1px solid #27272a",
                textAlign: "center",
              }}>
                <div style={{ fontSize: 9, color: "#52525b", fontWeight: 600, letterSpacing: 0.3 }}>{f.label}</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#fafafa", marginTop: 2 }}>
                  {current || "—"}<span style={{ fontSize: 9, color: "#52525b" }}>{f.unit}</span>
                </div>
                {diff !== null && (
                  <div style={{
                    fontSize: 9,
                    fontWeight: 600,
                    color: f.key === "waist" ? (diff <= 0 ? "#22c55e" : "#e2725b") : (diff >= 0 ? "#22c55e" : "#71717a"),
                    marginTop: 2,
                  }}>
                    {diff > 0 ? "+" : ""}{diff.toFixed(1)} vs objectif
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Chart */}
      {chartData.length > 1 && (
        <div style={{
          background: "#18181b",
          borderRadius: 12,
          border: "1px solid #27272a",
          padding: "12px 8px 8px",
          marginBottom: 16,
        }}>
          <div style={{ display: "flex", gap: 4, marginBottom: 8, paddingLeft: 8 }}>
            {FIELDS.map(f => (
              <button
                key={f.key}
                onClick={() => setChartField(f.key)}
                style={{
                  padding: "4px 8px",
                  borderRadius: 6,
                  border: chartField === f.key ? "1px solid #e2725b" : "1px solid #27272a",
                  background: chartField === f.key ? "#e2725b15" : "transparent",
                  color: chartField === f.key ? "#e2725b" : "#52525b",
                  fontSize: 9,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
              <XAxis dataKey="date" tick={{ fontSize: 9, fill: "#52525b" }} />
              <YAxis tick={{ fontSize: 9, fill: "#52525b" }} domain={["auto", "auto"]} />
              <Tooltip
                contentStyle={{ background: "#18181b", border: "1px solid #27272a", borderRadius: 8, fontSize: 11 }}
              />
              {GOALS[chartField] && (
                <ReferenceLine y={GOALS[chartField]} stroke="#22c55e40" strokeDasharray="5 5" />
              )}
              <Line type="monotone" dataKey="value" stroke="#e2725b" strokeWidth={2} dot={{ fill: "#e2725b", r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Input form */}
      <div style={{
        background: "#18181b",
        borderRadius: 12,
        border: "1px solid #27272a",
        padding: "14px",
      }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#fafafa", marginBottom: 10 }}>
          Nouveau relevé
        </div>
        {FIELDS.map(f => (
          <div key={f.key} style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 8,
          }}>
            <span style={{ flex: 1, fontSize: 12, color: "#71717a" }}>{f.label}</span>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              background: "#27272a",
              borderRadius: 8,
              padding: "6px 10px",
            }}>
              <input
                type="text"
                inputMode="decimal"
                placeholder={latest?.[f.key]?.toString() || "—"}
                value={form[f.key] || ""}
                onChange={e => setForm(prev => ({ ...prev, [f.key]: parseFloat(e.target.value) || undefined }))}
                style={{
                  width: 60,
                  background: "transparent",
                  border: "none",
                  color: "#fafafa",
                  fontSize: 14,
                  fontWeight: 700,
                  fontFamily: "inherit",
                  textAlign: "center",
                  outline: "none",
                }}
              />
              <span style={{ fontSize: 10, color: "#52525b" }}>{f.unit}</span>
            </div>
          </div>
        ))}
        <button
          onClick={handleSave}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: 8,
            borderRadius: 10,
            border: "none",
            background: saved ? "#22c55e" : "#e2725b",
            color: "#fff",
            fontSize: 13,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "inherit",
            transition: "background 0.2s",
          }}
        >
          {saved ? "✓ Sauvegardé" : "Enregistrer"}
        </button>
      </div>
    </div>
  );
}
