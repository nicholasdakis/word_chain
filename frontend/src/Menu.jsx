import { useState } from "react";
import CreateRoomModal from "./CreateRoomModal.jsx";
import JoinRoomModal from "./JoinRoomModal.jsx";

export default function Menu() {
  const [showCreateRoomPopup, setCreateRoomPopup] = useState(false);
  const [showJoinRoomPopup, setJoinRoomPopup] = useState(false);
  const [roomCode, setRoomCode] = useState(null);

  const handleCreateRoom = async () => {
    try {
      const response = await fetch("http://localhost:8000/rooms", {
        method: "POST",
      });
      if (response.ok) {
        const code = await response.json();
        setRoomCode(code);
        setCreateRoomPopup(true);
      }
    } catch (e) {}
  };

  const handleJoinRoom = async (inputCode) => {
    try {
      const response = await fetch(`http://localhost:8000/rooms/${inputCode}`);
      if (response.ok) {
        setJoinRoomPopup(false);
        console.log("Room found. Joining."); // placeholder for waiting room popup
      }
    } catch (e) {}
  };

  return (
    <div className="menu">
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
