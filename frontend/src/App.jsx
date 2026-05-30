import { useState, useRef, useEffect } from "react";
import Menu from "./Menu.jsx";
import WaitingRoom from "./WaitingScreen.jsx";
import GameRoom from "./GameRoom.jsx";
import "./App.css";

export default function App() {
  const [screen, setScreen] = useState("menu");
  const [roomCode, setRoomCode] = useState(null);
  const [playerId, setPlayerId] = useState(null);
  const ws = useRef(null);
  const onMessageHandler = useRef(null);

  useEffect(() => {
    if (screen === "waiting" && roomCode) {
      ws.current = new WebSocket(`ws://localhost:8000/ws/${roomCode}`);
      ws.current.onmessage = (event) => {
        if (onMessageHandler.current)
          onMessageHandler.current(JSON.parse(event.data));
      };
    }
    return () => {
      if (screen === "menu" && ws.current) {
        ws.current.close();
        ws.current = null;
      }
    };
  }, [screen, roomCode]);

  return (
    <div>
      {screen === "menu" && (
        <Menu setScreen={setScreen} setRoomCode={setRoomCode} />
      )}
      {screen === "waiting" && (
        <WaitingRoom
          setScreen={setScreen}
          roomCode={roomCode}
          onMessageHandler={onMessageHandler}
          setPlayerId={setPlayerId}
          playerId={playerId}
        />
      )}
      {screen === "game" && (
        <GameRoom
          setScreen={setScreen}
          roomCode={roomCode}
          ws={ws}
          onMessageHandler={onMessageHandler}
          playerId={playerId}
        />
      )}
    </div>
  );
}
