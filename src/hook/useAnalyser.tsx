import { useEffect, useRef, useState } from "react";

const useAnalyser = (audioStream: MediaStream | null) => {
  const audioContext = useRef<AudioContext | null>(null);
  const analyser = useRef<AnalyserNode | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!audioStream) return;

    if (!audioContext.current) {
      audioContext.current = new AudioContext();
    }

    if (audioContext.current.state === "suspended") {
      audioContext.current.resume();
    }

    const source = audioContext.current.createMediaStreamSource(audioStream);
    analyser.current = audioContext.current.createAnalyser();
    analyser.current.fftSize = 2048;
    source.connect(analyser.current);
    //trigger re-render when ready so analyser does not stay null
    setReady(true);

    return () => {
      analyser.current?.disconnect();
    };
  }, [audioStream]);

  return {
    analyser: ready ? analyser.current : null,
    audioContext: audioContext.current,
  };
};

export default useAnalyser;
