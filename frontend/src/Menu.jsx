import { useState } from "react";
import CreateRoomModal from "./CreateRoomModal.jsx";
import JoinRoomModal from "./JoinRoomModal.jsx";

export default function Menu({ setScreen, setRoomCode }) {
  const [showCreateRoomPopup, setCreateRoomPopup] = useState(false);
  const [showJoinRoomPopup, setJoinRoomPopup] = useState(false);

  const handleCreateRoom = async () => {
    console.log("clicked");
    try {
      console.log("b4 fetch");
      const response = await fetch("http://localhost:8000/rooms", {
        method: "POST",
      });
      console.log("after fetch", response);
      if (response.ok) {
        const code = await response.json();
        setRoomCode(code);
        setScreen("waiting");
      }
      console.log(response.status);
    } catch (e) {
      console.log(e);
    }
  };

  const handleJoinRoom = async (inputCode) => {
    try {
      const response = await fetch(`http://localhost:8000/rooms/${inputCode}`);
      if (response.ok) {
        setRoomCode(inputCode);
        setScreen("waiting");
      }
    } catch (e) {}
  };

  return (
    <div className="screen">
      <h1 className="title-text">WordChain</h1>
      <div className="buttons">
        {showCreateRoomPopup && (
          <CreateRoomModal
            onClose={() => setCreateRoomPopup(false)}
            roomCode={roomCode}
          />
        )}
        <button onClick={handleCreateRoom}>Create Room</button>
        {showJoinRoomPopup && (
          <JoinRoomModal
            onClose={() => setJoinRoomPopup(false)}
            handleJoinRoom={handleJoinRoom}
          />
        )}
        <button onClick={() => setJoinRoomPopup(true)}>Join Room</button>
      </div>
    </div>
  );
}
