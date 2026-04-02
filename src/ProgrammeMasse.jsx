import { useState } from "react";
import { PROGRAM_DATA, EXERCISE_IMAGES, priorityStyles, dimensionStyles } from "./data/program";

export default function ProgrammeMasse() {
  const [activeDay, setActiveDay] = useState(0);
  const [expandedExercise, setExpandedExercise] = useState(null);
  const [activeSection, setActiveSection] = useState("program");
  const d = PROGRAM_DATA;
  const currentDay = d.days[activeDay];

  const toggleExercise = (idx) => {
    setExpandedExercise(expandedExercise === idx ? null : idx);
  };

  return (
    <div style={{
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      background: "#09090b",
      color: "#fafafa",
      minHeight: "100vh",
      maxWidth: 520,
      margin: "0 auto",
      paddingBottom: 32,
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Instrument+Serif&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #09090b; }
        ::-webkit-scrollbar { display: none; }
      `}</style>

      {/* HEADER */}
      <div style={{
        padding: "32px 20px 20px",
        background: "linear-gradient(180deg, #18181b 0%, #09090b 100%)",
        borderBottom: "1px solid #27272a",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <div style={{
            width: 8, height: 8, borderRadius: "50%",
            background: "#50c878",
            boxShadow: "0 0 8px rgba(80,200,120,0.5)"
          }} />
          <span style={{ fontSize: 11, color: "#71717a", letterSpacing: 2, textTransform: "uppercase", fontWeight: 600 }}>
            Programme actif · V2.1
          </span>
        </div>
        <h1 style={{
          fontFamily: "'Instrument Serif', Georgia, serif",
          fontSize: 32,
          fontWeight: 400,
          lineHeight: 1.1,
          marginBottom: 4,
          color: "#fafafa",
        }}>
          Quiet Luxury Sportif
        </h1>
        <p style={{ color: "#71717a", fontSize: 14, fontWeight: 500 }}>
          V-Taper optimisé · 4 jours · 70→74-75kg lean
        </p>

        {/* Dimension badges */}
        <div style={{ display: "flex", gap: 6, marginTop: 12, flexWrap: "wrap" }}>
          {[
            { label: "Largeur", color: "#4a90d9", icon: "↔" },
            { label: "Épaisseur", color: "#e2725b", icon: "↕" },
            { label: "Profondeur", color: "#7c5cbf", icon: "⬌" },
          ].map((d, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 4,
              background: `${d.color}15`, border: `1px solid ${d.color}30`,
              borderRadius: 6, padding: "4px 8px",
              fontSize: 10, fontWeight: 600, color: d.color,
            }}>
              <span>{d.icon}</span> {d.label}
            </div>
          ))}
        </div>

        {/* Macros */}
        <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
          {[
            { label: "Calories", value: "2850", unit: "kcal", color: "#e2725b" },
            { label: "Protéines", value: "155", unit: "g", color: "#4a90d9" },
            { label: "Glucides", value: "350", unit: "g", color: "#d4a037" },
            { label: "Lipides", value: "95", unit: "g", color: "#7c5cbf" },
          ].map((m, i) => (
            <div key={i} style={{
              flex: "1 1 calc(25% - 6px)",
              minWidth: 70,
              background: "#18181b",
              borderRadius: 10,
              padding: "10px 8px",
              textAlign: "center",
              border: `1px solid ${m.color}22`,
            }}>
              <div style={{ fontSize: 10, color: "#71717a", marginBottom: 2, fontWeight: 600, letterSpacing: 0.5 }}>
                {m.label}
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, color: m.color, lineHeight: 1.2 }}>
                {m.value}
                <span style={{ fontSize: 10, fontWeight: 500, opacity: 0.7 }}>{m.unit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION TABS */}
      <div style={{
        display: "flex", gap: 0, padding: "0 20px", marginTop: 16,
        borderBottom: "1px solid #27272a",
      }}>
        {[
          { id: "program", label: "Programme" },
          { id: "dimensions", label: "3D View" },
          { id: "conseils", label: "Conseils" },
        ].map(s => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            style={{
              background: "none", border: "none", color: activeSection === s.id ? "#fafafa" : "#52525b",
              fontSize: 13, fontWeight: 600, padding: "10px 14px", cursor: "pointer",
              borderBottom: activeSection === s.id ? "2px solid #e2725b" : "2px solid transparent",
              transition: "all 0.2s",
              fontFamily: "inherit",
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      {activeSection === "program" && (
        <>
          {/* WEEK OVERVIEW */}
          <div style={{ padding: "16px 20px 0" }}>
            <div style={{ display: "flex", gap: 4 }}>
              {d.weekSchedule.map((ws, i) => (
                <div key={i} style={{
                  flex: 1, textAlign: "center", padding: "8px 2px", borderRadius: 8,
                  background: ws.type === "rest" ? "#18181b" : ws.type === "upper" ? "rgba(226,114,91,0.1)" : "rgba(74,144,217,0.1)",
                  border: `1px solid ${ws.type === "rest" ? "#27272a" : ws.type === "upper" ? "rgba(226,114,91,0.2)" : "rgba(74,144,217,0.2)"}`,
                  cursor: ws.type !== "rest" ? "pointer" : "default",
                  opacity: ws.type === "rest" ? 0.5 : 1,
                }}
                  onClick={() => {
                    if (ws.type !== "rest") {
                      const dayIdx = d.days.findIndex(day => day.day.startsWith(ws.day.slice(0, 3)));
                      if (dayIdx >= 0) { setActiveDay(dayIdx); setExpandedExercise(null); }
                    }
                  }}
                >
                  <div style={{ fontSize: 10, color: "#71717a", fontWeight: 600 }}>{ws.day}</div>
                  <div style={{
                    fontSize: 9, fontWeight: 600, marginTop: 2,
                    color: ws.type === "rest" ? "#52525b" : ws.type === "upper" ? "#e2725b" : "#4a90d9",
                  }}>
                    {ws.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DAY TABS */}
          <div style={{
            display: "flex", gap: 6, padding: "16px 20px 0",
            overflowX: "auto",
          }}>
            {d.days.map((day, i) => (
              <button
                key={day.id}
                onClick={() => { setActiveDay(i); setExpandedExercise(null); }}
                style={{
                  flex: "1 1 0",
                  minWidth: 0,
                  padding: "12px 6px 10px",
                  borderRadius: 10,
                  border: activeDay === i ? `1.5px solid ${day.color}` : "1.5px solid #27272a",
                  background: activeDay === i ? `${day.color}11` : "#18181b",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  fontFamily: "inherit",
                }}
              >
                <div style={{
                  fontSize: 9, fontWeight: 700, letterSpacing: 1.5,
                  color: activeDay === i ? day.color : "#52525b",
                  textTransform: "uppercase",
                }}>
                  Jour {day.id}
                </div>
                <div style={{
                  fontSize: 12, fontWeight: 700, marginTop: 2,
                  color: activeDay === i ? "#fafafa" : "#71717a",
                }}>
                  {day.title}
                </div>
                <div style={{
                  fontSize: 9, color: "#52525b", marginTop: 1, fontWeight: 500,
                }}>
                  {day.subtitle}
                </div>
              </button>
            ))}
          </div>

          {/* DAY HEADER */}
          <div style={{ padding: "16px 20px 0" }}>
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "12px 14px",
              background: `linear-gradient(135deg, ${currentDay.color}15, ${currentDay.color}08)`,
              borderRadius: 10,
              border: `1px solid ${currentDay.color}25`,
            }}>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#fafafa" }}>
                  {currentDay.title}
                  <span style={{ color: currentDay.color, fontWeight: 500, fontSize: 13, marginLeft: 6 }}>
                    {currentDay.subtitle}
                  </span>
                </div>
                <div style={{ fontSize: 12, color: "#71717a", marginTop: 2 }}>
                  {currentDay.day}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 11, color: "#71717a" }}>{currentDay.totalSets} séries</div>
                <div style={{ fontSize: 11, color: "#71717a" }}>{currentDay.duration}</div>
              </div>
            </div>
          </div>

          {/* EXERCISES */}
          <div style={{ padding: "8px 20px" }}>
            {currentDay.exercises.map((ex, i) => {
              const ps = priorityStyles[ex.priority];
              const ds = dimensionStyles[ex.dimension];
              const isExpanded = expandedExercise === i;
              return (
                <div
                  key={i}
                  onClick={() => toggleExercise(i)}
                  style={{
                    marginTop: 8,
                    background: isExpanded ? "#1c1c20" : "#14141a",
                    borderRadius: 12,
                    border: isExpanded ? `1px solid ${ps.border}` : "1px solid #27272a",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    overflow: "hidden",
                  }}
                >
                  {/* Exercise row */}
                  <div style={{ padding: "14px 14px 12px", display: "flex", alignItems: "flex-start", gap: 10 }}>
                    {/* Number */}
                    <div style={{
                      minWidth: 28, height: 28, borderRadius: 8,
                      background: ps.bg,
                      border: `1px solid ${ps.border}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 13, fontWeight: 700, color: ps.text,
                      flexShrink: 0, marginTop: 1,
                    }}>
                      {i + 1}
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 14, fontWeight: 600, color: "#fafafa" }}>
                          {ex.name}
                        </span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 4, flexWrap: "wrap" }}>
                        <span style={{
                          fontSize: 8, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase",
                          color: ds.color, background: `${ds.color}15`, border: `1px solid ${ds.color}30`,
                          padding: "2px 5px", borderRadius: 4,
                        }}>
                          {ds.label}
                        </span>
                        <span style={{
                          fontSize: 8, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase",
                          color: ps.text, background: ps.bg, border: `1px solid ${ps.border}`,
                          padding: "2px 5px", borderRadius: 4,
                        }}>
                          {ps.label}
                        </span>
                      </div>
                      <div style={{ fontSize: 11, color: "#71717a", marginTop: 4 }}>
                        {ex.muscles}
                      </div>
                    </div>

                    {/* Sets & Rest */}
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: currentDay.color }}>
                        {ex.sets}
                      </div>
                      <div style={{ fontSize: 10, color: "#52525b", marginTop: 1 }}>
                        repos {ex.rest}
                      </div>
                    </div>
                  </div>

                  {/* Expanded details */}
                  {isExpanded && (
                    <div style={{
                      padding: "0 14px 14px",
                      borderTop: "1px solid #27272a",
                      marginTop: 0,
                      paddingTop: 12,
                    }}>
                      {/* Exercise GIF illustration */}
                      {EXERCISE_IMAGES[ex.name]?.gif && (
                        <div style={{
                          marginBottom: 10,
                          background: "#0a0a0f",
                          borderRadius: 10,
                          padding: 8,
                          border: "1px solid #27272a",
                          textAlign: "center",
                        }}>
                          <img
                            src={EXERCISE_IMAGES[ex.name].gif}
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
                      )}

                      {/* Execution cue */}
                      <div style={{
                        background: "#0f0f13",
                        borderRadius: 8,
                        padding: "10px 12px",
                        marginBottom: 8,
                        borderLeft: `3px solid ${currentDay.color}`,
                      }}>
                        <div style={{ fontSize: 9, fontWeight: 700, color: currentDay.color, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>
                          Exécution
                        </div>
                        <div style={{ fontSize: 12, color: "#a1a1aa", lineHeight: 1.5 }}>
                          {ex.cue}
                        </div>
                      </div>

                      {/* Why */}
                      <div style={{
                        background: "#0f0f13",
                        borderRadius: 8,
                        padding: "10px 12px",
                        borderLeft: `3px solid ${ds.color}`,
                      }}>
                        <div style={{ fontSize: 9, fontWeight: 700, color: ds.color, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>
                          {ds.label} — Pourquoi
                        </div>
                        <div style={{ fontSize: 12, color: "#a1a1aa", lineHeight: 1.5 }}>
                          {ex.why}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            <div style={{
              textAlign: "center", padding: "12px 0 0", fontSize: 11, color: "#3f3f46",
              fontStyle: "italic",
            }}>
              Tape sur un exercice pour les détails
            </div>
          </div>
        </>
      )}

      {activeSection === "dimensions" && (
        <div style={{ padding: "20px" }}>
          <h2 style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: 24, fontWeight: 400, marginBottom: 8, color: "#fafafa",
          }}>
            Développement 3D
          </h2>
          <p style={{ fontSize: 13, color: "#71717a", marginBottom: 20, lineHeight: 1.5 }}>
            Un physique impressionnant sous tous les angles — pas juste de face.
          </p>

          {/* Body diagram concept */}
          <div style={{
            display: "flex", gap: 12, marginBottom: 24,
          }}>
            {[
              { view: "Face", dimension: "Largeur", color: "#4a90d9", desc: "V-taper, épaules larges, lats visibles" },
              { view: "Profil", dimension: "Épaisseur", color: "#e2725b", desc: "Dos épais, pecs bombés, trapèzes présents" },
              { view: "3/4", dimension: "Profondeur", color: "#7c5cbf", desc: "Volume total, densité musculaire" },
            ].map((v, i) => (
              <div key={i} style={{
                flex: 1,
                background: "#18181b",
                borderRadius: 12,
                border: `1px solid ${v.color}30`,
                padding: "14px 10px",
                textAlign: "center",
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: "50%",
                  background: `${v.color}15`, border: `2px solid ${v.color}40`,
                  margin: "0 auto 8px", display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 18,
                }}>
                  {i === 0 ? "👤" : i === 1 ? "🚶" : "💪"}
                </div>
                <div style={{ fontSize: 11, fontWeight: 700, color: v.color, marginBottom: 2 }}>
                  {v.dimension}
                </div>
                <div style={{ fontSize: 9, color: "#52525b", fontWeight: 600, marginBottom: 4 }}>
                  Vue {v.view}
                </div>
                <div style={{ fontSize: 10, color: "#71717a", lineHeight: 1.4 }}>
                  {v.desc}
                </div>
              </div>
            ))}
          </div>

          {/* Exercise breakdown by dimension */}
          {[
            {
              title: "Largeur (V-taper)",
              color: "#4a90d9",
              exercises: ["Tirage vertical 2×/sem (J1+J3)", "Élévations latérales 2×/sem (J1+J3)", "Développé épaules (J3)"],
              note: "PRIORITÉ #1 et #2 — 8 sér. tirage vertical + 8 sér. latérales/sem"
            },
            {
              title: "Épaisseur du dos",
              color: "#e2725b",
              exercises: ["Rowing unilatéral (J1)", "Tirage horizontal poulie (J3)", "Face pull 2×/sem (J1+J3)", "Trap bar deadlift (J4)"],
              note: "6 séries rowing + 5 séries face pull"
            },
            {
              title: "Profondeur pecs",
              color: "#7c5cbf",
              exercises: ["Dév. couché haltères (J1)", "Dév. incliné haltères (J1)", "Dév. incliné barre (J3)"],
              note: "9 séries/sem — équilibré, pas surdosé"
            },
            {
              title: "Posture & prévention",
              color: "#50c878",
              exercises: ["L-Fly rotations 2×/sem (échauffement)", "Face Pull 2×/sem", "Hyperextensions 2×/sem", "Pallof press (J4)", "Planche (J2)"],
              note: "Rotateurs, bas du dos, core anti-rotation"
            },
          ].map((section, i) => (
            <div key={i} style={{
              background: "#18181b",
              borderRadius: 12,
              border: `1px solid ${section.color}20`,
              padding: "14px 16px",
              marginBottom: 10,
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#fafafa" }}>
                  {section.title}
                </div>
                <div style={{
                  fontSize: 9, fontWeight: 600, color: section.color,
                  background: `${section.color}15`, padding: "3px 8px", borderRadius: 4,
                }}>
                  {section.exercises.length} exos
                </div>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
                {section.exercises.map((ex, j) => (
                  <div key={j} style={{
                    fontSize: 11, color: "#a1a1aa",
                    background: "#0f0f13", padding: "4px 8px", borderRadius: 6,
                    border: "1px solid #27272a",
                  }}>
                    {ex}
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 10, color: "#52525b", fontStyle: "italic" }}>
                {section.note}
              </div>
            </div>
          ))}

          {/* Weekly volume summary */}
          <div style={{
            marginTop: 20, padding: 16,
            background: "linear-gradient(135deg, rgba(226,114,91,0.08), rgba(74,144,217,0.08))",
            borderRadius: 12, border: "1px solid #27272a",
          }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#fafafa", marginBottom: 10 }}>
              Volume hebdomadaire — ~80 séries/sem
            </div>
            {[
              { zone: "Deltoïdes latéraux", sets: "8 séries", color: "#4a90d9", note: "★★★ #1" },
              { zone: "Dos largeur (vertical)", sets: "8 séries", color: "#4a90d9", note: "★★★ #2" },
              { zone: "Pectoraux", sets: "9 séries", color: "#7c5cbf", note: "★★" },
              { zone: "Dos épaisseur (rowing)", sets: "6 séries", color: "#e2725b", note: "★★" },
              { zone: "Deltoïdes post.", sets: "5 séries", color: "#50c878", note: "★" },
              { zone: "Biceps", sets: "4 séries", color: "#d4a037", note: "★" },
              { zone: "Triceps", sets: "4 + pressing", color: "#d4a037", note: "★" },
              { zone: "Quadriceps", sets: "10 séries", color: "#4a90d9", note: "★★" },
              { zone: "Ischio-jambiers", sets: "9 séries", color: "#e2725b", note: "★★" },
              { zone: "Core", sets: "6-8 séries", color: "#50c878", note: "★" },
            ].map((z, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "5px 0",
                borderBottom: i < 9 ? "1px solid #27272a" : "none",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: z.color }} />
                  <span style={{ fontSize: 11, color: "#a1a1aa" }}>{z.zone}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 10, color: "#52525b" }}>{z.note}</span>
                  <span style={{ fontSize: 11, fontWeight: 600, color: z.color, minWidth: 65, textAlign: "right" }}>{z.sets}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSection === "conseils" && (
        <div style={{ padding: "20px" }}>
          <h2 style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: 24, fontWeight: 400, marginBottom: 16, color: "#fafafa",
          }}>
            Les fondamentaux
          </h2>

          <div style={{
            background: "linear-gradient(135deg, rgba(226,114,91,0.08), rgba(212,160,55,0.08))",
            border: "1px solid rgba(226,114,91,0.2)",
            borderRadius: 12, padding: 16, marginBottom: 20,
          }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#fafafa", marginBottom: 6 }}>
              La règle d'or
            </div>
            <div style={{ fontSize: 13, color: "#a1a1aa", lineHeight: 1.6 }}>
              <span style={{ color: "#e2725b", fontWeight: 700 }}>Training 30%</span> + <span style={{ color: "#4a90d9", fontWeight: 700 }}>Nutrition 40%</span> + <span style={{ color: "#7c5cbf", fontWeight: 700 }}>Récup 30%</span>
            </div>
          </div>

          {/* Progression system */}
          <div style={{
            background: "#18181b",
            borderRadius: 12,
            border: "1px solid #27272a",
            padding: "14px 16px",
            marginBottom: 16,
          }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#fafafa", marginBottom: 10 }}>
              Système de progression V2.1
            </div>
            {d.progression.map((p, i) => (
              <div key={i} style={{
                padding: "8px 0",
                borderBottom: i < d.progression.length - 1 ? "1px solid #27272a" : "none",
              }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#fafafa" }}>{p.rule}</div>
                <div style={{ fontSize: 11, color: "#71717a", marginTop: 2 }}>{p.detail}</div>
              </div>
            ))}
          </div>

          {d.tips.map((tip, i) => (
            <div key={i} style={{
              background: "#18181b",
              borderRadius: 12,
              border: "1px solid #27272a",
              padding: "14px 16px",
              marginBottom: 8,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: 18 }}>{tip.icon}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#fafafa" }}>{tip.title}</span>
              </div>
              <div style={{ fontSize: 12, color: "#a1a1aa", lineHeight: 1.6, paddingLeft: 30 }}>
                {tip.text}
              </div>
            </div>
          ))}

          {/* Échauffement */}
          <div style={{
            marginTop: 16,
            background: "#18181b", borderRadius: 12, border: "1px solid #e2725b30",
            padding: 16,
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#e2725b", letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>
              Échauffement obligatoire (12-15 min)
            </div>
            {[
              { step: "1", label: "Cardio léger", desc: "5 min — Rameur ou vélo", type: "upper+lower" },
              { step: "2", label: "Mobilité", desc: "3 min — Épaules (Upper) ou Hanches (Lower)", type: "upper+lower" },
              { step: "3", label: "L-Fly rotations externes", desc: "2×15 — NON NÉGOCIABLE", type: "upper" },
              { step: "4", label: "Activation", desc: "2 min — Band pull-aparts (Upper) ou Glute bridges + dead bugs (Lower)", type: "upper+lower" },
              { step: "5", label: "Séries progressives", desc: "5 min — Vide → 50% → 70% → 85%", type: "upper+lower" },
            ].map((m, i) => (
              <div key={i} style={{
                display: "flex", gap: 10, alignItems: "center",
                padding: "8px 0",
                borderBottom: i < 4 ? "1px solid #27272a" : "none",
              }}>
                <div style={{ minWidth: 24, height: 24, borderRadius: "50%", background: "#e2725b20", border: "1px solid #e2725b40", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#e2725b" }}>
                  {m.step}
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#fafafa" }}>{m.label}</span>
                  <span style={{ fontSize: 11, color: "#71717a", marginLeft: 6 }}>{m.desc}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Routine maison */}
          <div style={{
            marginTop: 16,
            background: "#18181b", borderRadius: 12, border: "1px solid #50c87830",
            padding: 16,
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#50c878", letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>
              Routine maison (jours off) — 5-10 min
            </div>
            {[
              { label: "Planche", desc: "3 × 45-60s" },
              { label: "Planche latérale", desc: "2 × 30s/côté" },
              { label: "Dead bug", desc: "2 × 10/côté" },
            ].map((m, i) => (
              <div key={i} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "6px 0",
                borderBottom: i < 2 ? "1px solid #27272a" : "none",
              }}>
                <span style={{ fontSize: 12, color: "#fafafa" }}>{m.label}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#50c878" }}>{m.desc}</span>
              </div>
            ))}
            <div style={{ fontSize: 10, color: "#52525b", marginTop: 8, fontStyle: "italic" }}>
              Objectif : rattraper le core. Faire tous les jours si possible.
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <div style={{
        margin: "24px 20px 0",
        padding: "16px",
        background: "#18181b",
        borderRadius: 12,
        border: "1px solid #27272a",
        textAlign: "center",
      }}>
        <div style={{ fontSize: 11, color: "#52525b", lineHeight: 1.6 }}>
          Programme Quiet Luxury Sportif — V2.1
          <br />
          70kg → 74-75kg lean · ~80 séries/sem
          <br />
          <span style={{ color: "#3f3f46" }}>Optimisé V-Taper · Progression mixte</span>
        </div>
      </div>
    </div>
  );
}
