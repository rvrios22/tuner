import { useEffect, useRef } from "react";

const useAnalyser = (audioStream: MediaStream | null) => {
  const audioContext = useRef<AudioContext | null>(null);
  const analyser = useRef<AnalyserNode | null>(null);

  useEffect(() => {
    if (!audioStream) return;
    audioContext.current = new AudioContext();
    const source = audioContext.current.createMediaStreamSource(audioStream);
    analyser.current = audioContext.current.createAnalyser();
    source.connect(analyser.current);
  }, [audioStream]);

  return { analyser: analyser.current };
};

export default useAnalyser;
