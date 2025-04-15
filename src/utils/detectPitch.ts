const detectPitch = (buffer: Float32Array, sampleRate: number): number | null => {
    const SIZE = buffer.length;
    const MAX_SAMPLES = Math.floor(SIZE / 2);
    let bestOffset = -1;
    let bestCorrelation = 0;
    let rms = 0;

    for (let i = 0; i < SIZE; i++) {
        const val = buffer[i];
        rms += val * val;
    }
    rms = Math.sqrt(rms / SIZE);
    if (rms < 0.01) return null; // too quiet

    let lastCorrelation = - 1;

    for (let offset = 1; offset < MAX_SAMPLES; offset++) {
        let correlation = 0;

        for (let i = 0; i < MAX_SAMPLES; i++) {
            correlation += buffer[i] * buffer[i + offset];
        }

        correlation = correlation / MAX_SAMPLES;

        if (correlation > 0.1 && correlation > lastCorrelation) {
            bestCorrelation = correlation;
            bestOffset = offset;
        }
        lastCorrelation = correlation;
        console.log(bestCorrelation, bestOffset)
    }

    if (bestCorrelation > 0.1) {
        return sampleRate / bestOffset;
    }

    return null;
}

export default detectPitch;