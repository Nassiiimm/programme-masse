const tabs = [
  { id: "programme", label: "Programme", icon: "📋" },
  { id: "log", label: "Log", icon: "🏋️" },
  { id: "stats", label: "Stats", icon: "📊" },
  { id: "nutrition", label: "Nutri", icon: "🍽️" },
  { id: "mesures", label: "Mesures", icon: "📐" },
];

export default function BottomNav({ activeTab, setActiveTab }) {
  return (
    <div style={{
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      background: "#111113",
      borderTop: "1px solid #27272a",
      display: "flex",
      justifyContent: "center",
      paddingBottom: "env(safe-area-inset-bottom, 0px)",
    }}>
      <div style={{
        display: "flex",
        maxWidth: 520,
        width: "100%",
      }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              padding: "8px 4px 6px",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: activeTab === tab.id ? "#e2725b" : "#52525b",
              transition: "color 0.2s",
              fontFamily: "inherit",
            }}
          >
            <span style={{ fontSize: 18 }}>{tab.icon}</span>
            <span style={{
              fontSize: 9,
              fontWeight: 600,
              letterSpacing: 0.3,
            }}>
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
