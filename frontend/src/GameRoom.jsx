import { useState, useEffect } from "react";

export default function GameRoom({ roomCode, setScreen, ws, lastMessage }) {
  const [word, setWord] = useState("");

  return (
    <div className="screen">
      <h1 className="title-text">Game Room</h1>
      <h2>Room code: {roomCode}</h2>
      <div>
        <input value={word} onChange={(e) => setWord(e.target.value)} />
        <button
          onClick={() => {
            setWord("");
            ws.current.send(
              JSON.stringify({ type: "submitted_word", word: word }),
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
