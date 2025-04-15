import frequencyToNote from "../utils/frequencyToNote";

type TunerDisplayProps = {
  frequency: number | null;
};

export default function TunerDisplay({ frequency }: TunerDisplayProps) {
  if (!frequency) {
    return <h2>Listening...</h2>;
  }

  const { note, cents } = frequencyToNote(frequency);
  const inTune = Math.abs(cents) < 5;

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h1 style={{ fontSize: "4rem" }}>{note}</h1>
      <p style={{ fontSize: "1.5rem" }}>{frequency.toFixed(2)} Hz</p>
      <p style={{ fontSize: "1.25rem", color: inTune ? "green" : "red" }}>
        {cents > 0 ? "+" : ""}
        {cents} cents
      </p>

      {/* Optional visual indicator */}
      <div
        style={{
          marginTop: "1rem",
          height: "10px",
          width: "80%",
          maxWidth: "400px",
          marginInline: "auto",
          background: "#ddd",
          borderRadius: "5px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: `translateX(${cents}px)`,
            width: "2px",
            height: "100%",
            background: inTune ? "green" : "red",
          }}
        />
      </div>
    </div>
  );
}
