const freequencyOffset = (frequency: number): number => {
    if (!frequency || frequency <= 0) return 0
    const noteNumber = Math.round(12 * Math.log2(frequency / 440) + 69)
    const exactFrequency = 440 * Math.pow(2, (noteNumber - 69) / 12)
    const cents = 1200 * Math.log2(frequency / exactFrequency)
    return Math.round(cents)
}

export default freequencyOffset