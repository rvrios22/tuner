const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const frequencyToNote = (frequency: number) => {
    const A4 = 440;
    const semitone = 12;
    const noteNumber = Math.round(semitone * Math.log2(frequency / A4)) + 69;

    const noteIndex = noteNumber % 12;
    const octave = Math.floor(noteNumber / 12) - 1;
    const noteName = noteNames[noteIndex];

    const exactFreq = A4 * Math.pow(2, (noteNumber - 69) / 12);
    const cents = 1200 * Math.log2(frequency / exactFreq);

    return {
        note: `${noteName}${octave}`,
        cents: Math.round(cents),
    };
}

export default frequencyToNote