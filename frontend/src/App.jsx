import { useState, useRef, useEffect } from "react";
import Menu from "./Menu.jsx";
import WaitingRoom from "./WaitingScreen.jsx";
import GameRoom from "./GameRoom.jsx";
import "./App.css";

export default function App() {
  const [screen, setScreen] = useState("menu");
  const [roomCode, setRoomCode] = useState(null);
  const [lastMessage, setLastMessage] = useState(null);
  const ws = useRef(null);

  useEffect(() => {
    if (screen === "waiting" && roomCode) {
      ws.current = new WebSocket(`ws://localhost:8000/ws/${roomCode}`);
      ws.current.onmessage = (event) => {
        setLastMessage(JSON.parse(event.data));
      };
    }
    return () => {
      if (ws.current) {
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
          ws={ws}
          lastMessage={lastMessage}
        />
      )}
      {screen === "game" && (
        <GameRoom
          setScreen={setScreen}
          roomCode={roomCode}
          ws={ws}
          lastMessage={lastMessage}
        />
      )}
    </div>
  );
}
