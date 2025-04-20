import useAudio from "./hook/useAudio";
import Tuner from "./components/Tuner";

function App() {
  const { audioStream, permission, errMessage } = useAudio();
  if (permission === null) {
    return <p style={{ textAlign: "center" }}>Requesting microphone permission...</p>;
  }

  if (permission === false) {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Error</h1>
        <p>{errMessage}</p>
      </div>
    );
  }

  if (!audioStream) {
    return <p style={{ textAlign: "center" }}>Loading audio stream...</p>;
  }

  return (
    <>
      <h1 style={{ textAlign: "center", fontSize: "2.75em" }}>Tuner</h1>
      <Tuner audioStream={audioStream} />
    </>
  );
}
export default App;
