import useAnalyser from "../hook/useAnalyser";
import useFrequency from "../hook/useFrequency";
import frequencyToNote from "../utils/frequencyToNote";
import freequencyOffset from "../utils/frequencyOffset";
import { useEffect, useRef, useState } from "react";
interface TunerProps {
  audioStream: MediaStream | null;
}

function Tuner({ audioStream }: TunerProps) {
  const { analyser, audioContext } = useAnalyser(audioStream);
  const [centsOffset, setCentsOffset] = useState<number | null>(null);
  const freq = useFrequency(analyser, audioContext);
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!freq) return;
    const offset = freequencyOffset(freq);
    setCentsOffset(offset);
  }, [freq]);

  if (!analyser || !audioContext) {
    return <p>Analyser not ready...</p>;
  }

  const getBallPosition = () => {
    if (centsOffset === null) {
      return "50%"; // Default to center if offset is null or container width is not available
    }
    const offsetPercentage = (centsOffset / 50) * 50;
    const ballPosition = 50 + offsetPercentage;

    return `${ballPosition}%`;
  };

  return (
    <>
      {/* container */}
      <div
        ref={container}
        style={{
          width: "100%",
          height: "20vh",
          border: "4px solid black",
          position: "relative",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {/* center bar */}
        <div
          style={{ width: "5px", height: "100%", backgroundColor: "red" }}
        ></div>
        {/* ball */}
        <div
          style={{
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            backgroundColor: "black",
            position: "absolute",
            top: "50%",
            transform: `translate(-50%, -50%)`, // Center the ball horizontally and vertically
            left: getBallPosition(), // Use the calculated position
            transition: "left 0.1s ease-out",
          }}
        ></div>
      </div>
      <div style={{ textAlign: "center", fontSize: "1.25em" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p>-50 Cents</p>
          <p>50 Cents</p>
        </div>
        <p>{freq?.toFixed(2)}</p>
        <p>Note: {freq ? frequencyToNote(freq) : "-"}</p>
        <p>Cents: {freq ? freequencyOffset(freq) : 0}</p>
      </div>
    </>
  );
}

export default Tuner;
