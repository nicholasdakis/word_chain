import { useState, useEffect } from "react";

export default function GameRoom({
  roomCode,
  setScreen,
  ws,
  onMessageHandler,
}) {
  const [word, setWord] = useState("");
  const [validityNotifier, setValidityNotifier] = useState("");

  useEffect(() => {
    onMessageHandler.current = (msg) => {
      if (msg.valid) {
        setValidityNotifier(msg.word);
      } else {
        if (msg.reason === "invalid_word")
          setValidityNotifier("This word is not recognized.");
        if (msg.reason === "already_used")
          setValidityNotifier("This word has already been used.");
        if (msg.reason === "wrong_starting_letter")
          setValidityNotifier(
            "This word does not start with the last word's last letter.",
          );
      }
    };
    return () => {
      onMessageHandler.current = null;
    };
  }, [onMessageHandler]);

  return (
    <div className="screen">
      <h1 className="title-text">Game Room</h1>
      <h2>Room code: {roomCode}</h2>
      {validityNotifier !== "" && <h2>{validityNotifier}</h2>}
      <div>
        <input value={word} onChange={(e) => setWord(e.target.value)} />
        <button
          onClick={() => {
            setWord("");
            ws.current.send(
              JSON.stringify({ type: "submitted_word", submitted_word: word }),
            );
          }}
        >
          Confirm
        </button>
      </div>
      <button onClick={() => setScreen("menu")}>Back</button>
    </div>
  );
}
