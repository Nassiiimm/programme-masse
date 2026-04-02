import { useState } from "react";
import { useRestTimer } from "./hooks/useRestTimer";
import BottomNav from "./components/BottomNav";
import RestTimer from "./components/RestTimer";
import ProgrammePage from "./pages/ProgrammePage";
import LogPage from "./pages/LogPage";
import StatsPage from "./pages/StatsPage";
import NutritionPage from "./pages/NutritionPage";
import MeasurementsPage from "./pages/MeasurementsPage";

function App() {
  const [activeTab, setActiveTab] = useState("log");
  const timer = useRestTimer();

  const handleTimerStart = (seconds) => {
    timer.start(seconds);
  };

  return (
    <div style={{
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      background: "#09090b",
      color: "#fafafa",
      minHeight: "100vh",
      maxWidth: 520,
      margin: "0 auto",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Instrument+Serif&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #09090b; }
        ::-webkit-scrollbar { display: none; }
        input::placeholder { color: #3f3f46; }
      `}</style>

      {activeTab === "programme" && <ProgrammePage />}
      {activeTab === "log" && <LogPage onTimerStart={handleTimerStart} />}
      {activeTab === "stats" && <StatsPage />}
      {activeTab === "nutrition" && <NutritionPage />}
      {activeTab === "mesures" && <MeasurementsPage />}

      <RestTimer seconds={timer.seconds} isRunning={timer.isRunning} onStop={timer.stop} />
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

export default App;
