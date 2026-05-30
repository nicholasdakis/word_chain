import { useState, useEffect } from "react";

export default function GameRoom({ roomCode, setScreen, ws, lastMessage }) {
  const [word, setWord] = useState("");
  const [validityNotifier, setValidityNotifier] = useState("");

  useEffect(() => {
    if (!lastMessage) return;
    if (lastMessage.valid) {
      setValidityNotifier(lastMessage.word);
    } else {
      if (lastMessage.reason === "invalid_word") {
        setValidityNotifier("This word is not recognized.");
      }
      if (lastMessage.reason === "already_used") {
        setValidityNotifier("This word has already been used.");
      }
      if (lastMessage.reason === "wrong_starting_letter") {
        setValidityNotifier(
          "This word does not start with the last word's last letter.",
        );
      }
    }
  }, [lastMessage]);

  return (
    <div className="screen">
      <h1 className="title-text">Game Room</h1>
      <h2>Room code: {roomCode}</h2>
      {lastMessage?.word && <h2>Success: {validityNotifier}</h2>}
      {validityNotifier !== "" && lastMessage?.reason && (
        <h2>Error: {validityNotifier}</h2>
      )}
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
