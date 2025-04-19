import useAudio from "./hook/useAudio";
import Tuner from "./components/Tuner";

function App() {
  const { audioStream, permission, errMessage } = useAudio();
  if (!permission)
    return (
      <>
        <h1>Something Went Wrong</h1>
        <p>{errMessage}</p>
      </>
    );

  return (
    <>
      <h1>Tuner</h1>
      <Tuner audioStream={audioStream}/>
    </>
  );
}

export default App;
