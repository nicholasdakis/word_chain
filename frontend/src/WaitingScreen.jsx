import { useState, useEffect } from "react";

export default function WaitingRoom({ roomCode, setScreen, lastMessage }) {
  const [playerCount, setPlayerCount] = useState(0);
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    if (!lastMessage) return;
    if (lastMessage.type === "game_start") setCountdown(3);
    if (lastMessage.type === "player_joined") setPlayerCount(lastMessage.count);
  }, [lastMessage]);

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
