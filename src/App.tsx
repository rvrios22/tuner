import useTuner from "./hooks/useTuner";
import TunerDisplay from "./components/TunerDisplay";

function App() {
  const { frequency, started, start, stop } = useTuner();
  return (
    <div
      style={{ padding: "2rem", textAlign: "center", fontFamily: "sans-serif" }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
        🎵 Online Tuner
      </h1>

      {!started ? (
        <button
          onClick={start}
          style={{
            padding: "0.75rem 1.5rem",
            fontSize: "1.2rem",
            cursor: "pointer",
            borderRadius: "8px",
            border: "none",
            background: "#4caf50",
            color: "white",
          }}
        >
          Start Tuner
        </button>
      ) : (
        <>
          <TunerDisplay frequency={frequency} />
          <button
            onClick={stop}
            style={{
              marginTop: "1rem",
              padding: "0.5rem 1rem",
              fontSize: "1rem",
              background: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Stop
          </button>
        </>
      )}
    </div>
  );
}

export default App;
