import { useState, useEffect } from "react";
import { today } from "../lib/utils";
import { getNutritionLog, saveNutritionLog } from "../lib/db";

const DEFAULT_MEALS = [
  { name: "Petit-déj", checked: false, calories: 755, protein: 27 },
  { name: "Déjeuner", checked: false, calories: 865, protein: 51 },
  { name: "Collation", checked: false, calories: 570, protein: 34 },
  { name: "Dîner", checked: false, calories: 760, protein: 35 },
];

const TARGETS = { calories: 2850, protein: 155 };

export default function NutritionPage() {
  const [dateStr] = useState(today());
  const [meals, setMeals] = useState(DEFAULT_MEALS);
  const [extraProtein, setExtraProtein] = useState(0);

  useEffect(() => {
    getNutritionLog(dateStr).then(log => {
      if (log?.meals) setMeals(log.meals);
      if (log?.extraProtein) setExtraProtein(log.extraProtein);
    });
  }, [dateStr]);

  const toggleMeal = (idx) => {
    const updated = meals.map((m, i) => i === idx ? { ...m, checked: !m.checked } : m);
    setMeals(updated);
    save(updated, extraProtein);
  };

  const save = (m, ep) => {
    const totalCal = m.filter(x => x.checked).reduce((s, x) => s + x.calories, 0);
    const totalProt = m.filter(x => x.checked).reduce((s, x) => s + x.protein, 0) + (ep || 0);
    saveNutritionLog(dateStr, {
      meals: m,
      extraProtein: ep,
      calories: totalCal,
      protein: totalProt,
    });
  };

  const totalCal = meals.filter(m => m.checked).reduce((s, m) => s + m.calories, 0);
  const totalProt = meals.filter(m => m.checked).reduce((s, m) => s + m.protein, 0) + extraProtein;
  const calPct = Math.min(100, Math.round((totalCal / TARGETS.calories) * 100));
  const protPct = Math.min(100, Math.round((totalProt / TARGETS.protein) * 100));

  return (
    <div style={{ padding: "16px 20px", paddingBottom: 80 }}>
      <h2 style={{
        fontFamily: "'Instrument Serif', Georgia, serif",
        fontSize: 24, fontWeight: 400, marginBottom: 4, color: "#fafafa",
      }}>
        Nutrition
      </h2>
      <p style={{ fontSize: 12, color: "#71717a", marginBottom: 16 }}>Aujourd'hui — coche les repas pris</p>

      {/* Progress bars */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        {[
          { label: "Calories", value: totalCal, target: TARGETS.calories, pct: calPct, color: "#e2725b", unit: "kcal" },
          { label: "Protéines", value: totalProt, target: TARGETS.protein, pct: protPct, color: "#4a90d9", unit: "g" },
        ].map((bar, i) => (
          <div key={i} style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 10, fontWeight: 600, color: "#71717a" }}>{bar.label}</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: bar.color }}>
                {bar.value}/{bar.target}{bar.unit}
              </span>
            </div>
            <div style={{
              height: 6,
              background: "#27272a",
              borderRadius: 3,
              overflow: "hidden",
            }}>
              <div style={{
                height: "100%",
                width: `${bar.pct}%`,
                background: bar.color,
                borderRadius: 3,
                transition: "width 0.3s",
              }} />
            </div>
          </div>
        ))}
      </div>

      {/* Meal checkboxes */}
      {meals.map((meal, i) => (
        <button
          key={i}
          onClick={() => toggleMeal(i)}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "14px 14px",
            background: meal.checked ? "#22c55e08" : "#18181b",
            border: meal.checked ? "1px solid #22c55e30" : "1px solid #27272a",
            borderRadius: 12,
            marginBottom: 8,
            cursor: "pointer",
            fontFamily: "inherit",
            transition: "all 0.2s",
          }}
        >
          {/* Checkbox */}
          <div style={{
            width: 24,
            height: 24,
            borderRadius: 7,
            border: meal.checked ? "none" : "2px solid #3f3f46",
            background: meal.checked ? "#22c55e" : "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
            color: "#fff",
            fontWeight: 700,
            transition: "all 0.2s",
            flexShrink: 0,
          }}>
            {meal.checked ? "✓" : ""}
          </div>

          <div style={{ flex: 1, textAlign: "left" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: meal.checked ? "#fafafa" : "#71717a" }}>
              {meal.name}
            </div>
            <div style={{ fontSize: 10, color: "#52525b", marginTop: 1 }}>
              {meal.calories} kcal · {meal.protein}g prot
            </div>
          </div>
        </button>
      ))}

      {/* Extra protein (whey) */}
      <div style={{
        marginTop: 12,
        padding: "12px 14px",
        background: "#18181b",
        border: "1px solid #27272a",
        borderRadius: 12,
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}>
        <span style={{ fontSize: 12, color: "#71717a", flex: 1 }}>Whey / extra prot</span>
        <button
          onClick={() => { const v = Math.max(0, extraProtein - 25); setExtraProtein(v); save(meals, v); }}
          style={{ width: 28, height: 28, borderRadius: 7, border: "1px solid #27272a", background: "#27272a", color: "#fafafa", fontSize: 14, cursor: "pointer" }}
        >−</button>
        <span style={{ fontSize: 14, fontWeight: 700, color: "#4a90d9", minWidth: 30, textAlign: "center" }}>{extraProtein}g</span>
        <button
          onClick={() => { const v = extraProtein + 25; setExtraProtein(v); save(meals, v); }}
          style={{ width: 28, height: 28, borderRadius: 7, border: "1px solid #27272a", background: "#27272a", color: "#fafafa", fontSize: 14, cursor: "pointer" }}
        >+</button>
      </div>
    </div>
  );
}
