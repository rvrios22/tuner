import useAudio from "./hook/useAudio";
import Tuner from "./components/Tuner";

function App() {
  const { audioStream, permission, errMessage } = useAudio();
  if (permission === null) {
    return <p>Requesting microphone permission...</p>;
  }
  
  if (permission === false) {
    return (
      <>
        <h1>Permission Denied</h1>
        <p>{errMessage}</p>
      </>
    );
  }
  
  if (!audioStream) {
    return <p>Loading audio stream...</p>;
  }
  
  return (
    <>
      <h1>Tuner</h1>
      <Tuner audioStream={audioStream} />
    </>
  );
}
export default App;
