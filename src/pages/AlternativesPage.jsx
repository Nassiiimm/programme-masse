import { useState } from "react";
import { ALTERNATIVE_EXERCISES } from "../data/program";

export default function AlternativesPage() {
  const [expandedExercise, setExpandedExercise] = useState(null);

  const toggleExercise = (key) => {
    setExpandedExercise(expandedExercise === key ? null : key);
  };

  return (
    <div style={{ padding: "16px 20px", paddingBottom: 80 }}>
      <h2 style={{
        fontFamily: "'Instrument Serif', Georgia, serif",
        fontSize: 24, fontWeight: 400, marginBottom: 4, color: "#fafafa",
      }}>
        Exercices alternatifs
      </h2>
      <p style={{ fontSize: 12, color: "#71717a", marginBottom: 16, lineHeight: 1.5 }}>
        Substitutions et compléments pour varier ton programme ou quand un équipement est occupé.
      </p>

      {ALTERNATIVE_EXERCISES.map((cat, ci) => (
        <div key={ci} style={{ marginBottom: 20 }}>
          {/* Category header */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 8,
          }}>
            <div style={{
              width: 4,
              height: 20,
              borderRadius: 2,
              background: cat.color,
            }} />
            <h3 style={{
              fontSize: 15,
              fontWeight: 700,
              color: "#fafafa",
              margin: 0,
            }}>
              {cat.category}
            </h3>
            <span style={{
              fontSize: 10,
              color: cat.color,
              fontWeight: 600,
              background: `${cat.color}15`,
              padding: "2px 8px",
              borderRadius: 4,
            }}>
              {cat.exercises.length} alternative{cat.exercises.length > 1 ? "s" : ""}
            </span>
          </div>

          {/* Exercises */}
          {cat.exercises.map((ex, ei) => {
            const key = `${ci}-${ei}`;
            const isOpen = expandedExercise === key;
            return (
              <div
                key={key}
                style={{
                  background: isOpen ? "#1c1c20" : "#14141a",
                  borderRadius: 12,
                  border: isOpen ? `1px solid ${cat.color}40` : "1px solid #27272a",
                  marginBottom: 8,
                  overflow: "hidden",
                  transition: "all 0.2s",
                  cursor: "pointer",
                }}
                onClick={() => toggleExercise(key)}
              >
                {/* Exercise header */}
                <div style={{
                  padding: "12px 14px",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}>
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    overflow: "hidden",
                    flexShrink: 0,
                    background: "#0a0a0f",
                    border: "1px solid #27272a",
                  }}>
                    <img
                      src={ex.gif}
                      alt={ex.name}
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#fafafa" }}>
                      {ex.name}
                    </div>
                    <div style={{ fontSize: 10, color: "#52525b", marginTop: 1 }}>
                      {ex.muscles}
                    </div>
                  </div>
                  <div style={{
                    fontSize: 16,
                    color: "#3f3f46",
                    transform: isOpen ? "rotate(180deg)" : "rotate(0)",
                    transition: "transform 0.2s",
                  }}>
                    ▾
                  </div>
                </div>

                {/* Expanded content */}
                {isOpen && (
                  <div style={{
                    padding: "0 14px 14px",
                    borderTop: "1px solid #27272a",
                    paddingTop: 12,
                  }}>
                    {/* GIF */}
                    <div style={{
                      marginBottom: 10,
                      background: "#0a0a0f",
                      borderRadius: 10,
                      padding: 8,
                      border: "1px solid #27272a",
                      textAlign: "center",
                    }}>
                      <img
                        src={ex.gif}
                        alt={ex.name}
                        loading="lazy"
                        style={{
                          width: "100%",
                          maxHeight: 200,
                          objectFit: "contain",
                          borderRadius: 8,
                        }}
                      />
                    </div>

                    {/* Replaces */}
                    <div style={{
                      background: "#0f0f13",
                      borderRadius: 8,
                      padding: "8px 12px",
                      marginBottom: 6,
                      borderLeft: `3px solid ${cat.color}`,
                    }}>
                      <div style={{ fontSize: 9, fontWeight: 700, color: cat.color, letterSpacing: 1, textTransform: "uppercase", marginBottom: 3 }}>
                        Remplace
                      </div>
                      <div style={{ fontSize: 12, color: "#a1a1aa" }}>
                        {ex.replaces}
                      </div>
                    </div>

                    {/* Why */}
                    <div style={{
                      background: "#0f0f13",
                      borderRadius: 8,
                      padding: "8px 12px",
                      marginBottom: 6,
                      borderLeft: "3px solid #4a90d9",
                    }}>
                      <div style={{ fontSize: 9, fontWeight: 700, color: "#4a90d9", letterSpacing: 1, textTransform: "uppercase", marginBottom: 3 }}>
                        Pourquoi
                      </div>
                      <div style={{ fontSize: 12, color: "#a1a1aa", lineHeight: 1.5 }}>
                        {ex.why}
                      </div>
                    </div>

                    {/* When */}
                    <div style={{
                      background: "#0f0f13",
                      borderRadius: 8,
                      padding: "8px 12px",
                      borderLeft: "3px solid #22c55e",
                    }}>
                      <div style={{ fontSize: 9, fontWeight: 700, color: "#22c55e", letterSpacing: 1, textTransform: "uppercase", marginBottom: 3 }}>
                        Quand l'utiliser
                      </div>
                      <div style={{ fontSize: 12, color: "#a1a1aa", lineHeight: 1.5 }}>
                        {ex.when}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
