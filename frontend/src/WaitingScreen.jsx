import { useState, useEffect } from "react";

export default function WaitingRoom({ roomCode, setScreen }) {
  const [playerCount, setPlayerCount] = useState(0);
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8000/ws/${roomCode}`);

    ws.onopen = () => {
      console.log("connected");
    };

    ws.onmessage = (event) => {
      console.log(event.data);
      const msg = JSON.parse(event.data);
      if (msg.type === "game_start") {
        setCountdown(3);
      }
      if (msg.type === "player_joined") setPlayerCount(msg.count);
    };
  }, []);

  useEffect(() => {
    if (countdown === null) return;
    if (countdown === 0) {
      setScreen("game");
      return;
    }

    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [countdown]);

  return (
    <div className="screen">
      <h1 className="title-text">Waiting Room</h1>
      <h2>Room code: {roomCode}</h2>
      <h2>Player count: {playerCount}</h2>
      {countdown != null && <h2>Game starting in: {countdown} seconds</h2>}
      <button onClick={() => setScreen("menu")}>Back</button>
    </div>
  );
}
