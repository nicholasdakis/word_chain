import { useEffect } from "react";

export default function GameRoom({ roomCode, setScreen }) {
  return (
    <div className="screen">
      <h1 className="title-text">Game Room</h1>
      <h2>Room code: {roomCode}</h2>
      <button onClick={() => setScreen("menu")}>Back</button>
    </div>
  );
}
