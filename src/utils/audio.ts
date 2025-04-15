const getMicrophoneStream = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        return stream;
    } catch (err) {
        throw new Error(`Could not access microphone: ${err}`)
    }
}

export default getMicrophoneStream