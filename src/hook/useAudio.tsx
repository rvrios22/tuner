import { useEffect, useState, useRef } from "react";

//check for permissions and either returns the audio stream or returns an error with the message
const useAudio = () => {
  const audioStream = useRef<MediaStream | null>(null);
  const [permission, setPermission] = useState<boolean | null>(null);
  const [errMessage, setErrMessage] = useState<null | string>(null);
  useEffect(() => {
    const requestMic = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        setPermission(true);
        audioStream.current = stream;
      } catch (err) {
        setPermission(false);
        setErrMessage((err as Error).message);
      }
    };
    requestMic();
  }, []);
  return { audioStream: audioStream.current, permission, errMessage };
};

export default useAudio;
