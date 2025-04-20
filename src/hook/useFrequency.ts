import { useEffect, useState } from "react";
import { PitchDetector } from "pitchy";

const useFrequency = (
    analyser: AnalyserNode | null,
    audioContext: AudioContext | null
) => {
    const [freq, setFreq] = useState<number | null>(null);

    useEffect(() => {
        if (!analyser || !audioContext) return;

        const detector = PitchDetector.forFloat32Array(analyser.fftSize);
        detector.minVolumeDecibels = -10
        const input = new Float32Array(detector.inputLength);

        let isMounted = true;

        const update = () => {
            analyser.getFloatTimeDomainData(input);
            const [pitch] = detector.findPitch(input, audioContext.sampleRate);

            if (isMounted && pitch > 0) {
                setFreq(pitch);
            }

            requestAnimationFrame(update);
        };

        update();

        return () => {
            isMounted = false;
        };
    }, [analyser, audioContext]);

    return freq;
};

export default useFrequency;
