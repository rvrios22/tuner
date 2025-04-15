import { useEffect, useState, useRef } from 'react';
import getMicrophoneStream from '../utils/audio';
import detectPitch from '../utils/detectPitch';

type TunerState = {
  frequency: number | null;
  started: boolean;
  start: () => Promise<void>;
  stop: () => void;
};

const useTuner = (): TunerState => {
  const [frequency, setFrequency] = useState<number | null>(null);
  const [started, setStarted] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const rafRef = useRef<number | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const buffer = useRef<Float32Array>(new Float32Array(2048));

  const start = async () => {
    if (started) return;

    // Resume context inside a user gesture
    const context = new AudioContext();
    await context.resume();
    audioContextRef.current = context;

    const stream = await getMicrophoneStream();
    const source = context.createMediaStreamSource(stream);
    const analyser = context.createAnalyser();
    analyser.fftSize = 2048;
    source.connect(analyser);
    analyserRef.current = analyser;

    const tick = () => {
      analyser.getFloatTimeDomainData(buffer.current);
      const pitch = detectPitch(buffer.current, context.sampleRate);
      setFrequency(pitch);
      rafRef.current = requestAnimationFrame(tick);
    };

    setStarted(true);
    tick();
  };

  const stop = () => {
    setStarted(false);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    audioContextRef.current?.close();
    audioContextRef.current = null;
  };

  useEffect(() => {
    // Just check for permission, don’t auto-start
    navigator.permissions?.query({ name: 'microphone' as PermissionName }).then((res) => {
      if (res.state === 'granted') {
        setPermissionGranted(true);
      }

      // Optional: update state if permission changes
      res.onchange = () => {
        setPermissionGranted(res.state === 'granted');
      };
    });

    return () => stop();
  }, []);

  return { frequency, started, start, stop };
};

export default useTuner;
