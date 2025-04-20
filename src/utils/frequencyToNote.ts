const frequencyToNote = (frequency: number): string => {
    if (!frequency || frequency <= 0) return '-'
    const noteNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    const noteNumber = Math.round(12 * Math.log2(frequency / 440) + 69)
    const noteIdx = noteNumber % 12
    const octave = Math.floor(noteNumber / 12) - 1

    return `${noteNames[noteIdx]}${octave}`
}

export default frequencyToNote