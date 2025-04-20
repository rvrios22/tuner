import useAnalyser from "../hook/useAnalyser";
import useFrequency from "../hook/useFrequency";
import frequencyToNote from "../utils/frequencyToNote";
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
      <p>note: {freq ? frequencyToNote(freq) : '-'}</p>

    </>
  );
}

export default Tuner;
