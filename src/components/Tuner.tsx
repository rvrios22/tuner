import React from "react";
import useAnalyser from "../hook/useAnalyser";

interface TunerProps {
  audioStream: MediaStream | null;
}

function Tuner({ audioStream }: TunerProps) {
  const analyser = useAnalyser(audioStream);
  console.log(analyser);
  return <div>Tuner</div>;
}

export default Tuner; 
