import useAnalyser from "../hook/useAnalyser";
import useFrequency from "../hook/useFrequency";
import frequencyToNote from "../utils/frequencyToNote";
import freequencyOffset from "../utils/frequencyOffset";
interface TunerProps {
  audioStream: MediaStream | null;
}

function Tuner({ audioStream }: TunerProps) {
  const { analyser, audioContext } = useAnalyser(audioStream);

  const freq = useFrequency(analyser, audioContext);

  if (!analyser || !audioContext) {
    return <p>Analyser not ready...</p>;
  }

  return (
    <>
      <div>Tuner is ready</div>
      <p>{freq?.toFixed(2)}</p>
      <p>Note: {freq ? frequencyToNote(freq) : "-"}</p>
      <p>Cents: {freq ? freequencyOffset(freq) : 0}</p>
    </>
  );
}

export default Tuner;
