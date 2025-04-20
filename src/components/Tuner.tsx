import useAnalyser from "../hook/useAnalyser";
import useFrequency from "../hook/useFrequency";
import { PitchDetector } from "pitchy";

interface TunerProps {
  audioStream: MediaStream | null;
}

function Tuner({ audioStream }: TunerProps) {
  const { analyser, audioContext } = useAnalyser(audioStream);

  // Always call hooks unconditionally
  const freq = useFrequency(analyser, audioContext);

  if (!analyser || !audioContext || freq === null) {
    return <p>Analyser not ready...</p>;
  }

  return (
    <>
      <div>Tuner is ready</div>
      <p>{freq}</p>
    </>
  );
}


export default Tuner;
