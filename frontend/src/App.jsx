import { useState } from "react";
import Menu from "./Menu.jsx";
import WaitingRoom from "./WaitingScreen.jsx";
import GameRoom from "./GameRoom.jsx";
import "./App.css";

export default function App() {
  const [screen, setScreen] = useState("menu");
  const [roomCode, setRoomCode] = useState(null);

  return (
    <div>
      {screen === "menu" && (
        <Menu setScreen={setScreen} setRoomCode={setRoomCode} />
      )}
      {screen === "waiting" && (
        <WaitingRoom setScreen={setScreen} roomCode={roomCode} />
      )}
      {screen === "game" && (
        <GameRoom setScreen={setScreen} roomCode={roomCode} />
      )}
    </div>
  );
}
