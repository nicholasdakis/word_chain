import { useState, useRef, useEffect } from "react";
import Menu from "./Menu.jsx";
import WaitingRoom from "./WaitingScreen.jsx";
import GameRoom from "./GameRoom.jsx";
import "./App.css";

export default function App() {
  const [screen, setScreen] = useState("menu");
  const [roomCode, setRoomCode] = useState(null);
  const [playerId, setPlayerId] = useState(null);
  const [playerName, setPlayerName] = useState(null); // from backend
  const [username, setUsername] = useState(""); // locally set
  const ws = useRef(null);
  const onMessageHandler = useRef(null);

  useEffect(() => {
    if (screen === "waiting" && roomCode) {
      ws.current = new WebSocket(
        `ws://localhost:8000/ws/${roomCode}?username=${username}`,
      );
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
        <Menu
          setScreen={setScreen}
          setRoomCode={setRoomCode}
          setUsername={setUsername}
        />
      )}
      {screen === "waiting" && (
        <WaitingRoom
          setScreen={setScreen}
          roomCode={roomCode}
          onMessageHandler={onMessageHandler}
          setPlayerId={setPlayerId}
          setPlayerName={setPlayerName}
          playerName={playerName}
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
          playerName={username}
        />
      )}
    </div>
  );
}
