import { useState } from "react";
import JoinRoomModal from "./JoinRoomModal.jsx";
import SetUsernameModal from "./UsernameModal.jsx";

export default function Menu({ setScreen, setRoomCode, setUsername }) {
  const [showJoinRoomPopup, setJoinRoomPopup] = useState(false);
  const [showUsernamePopup, setShowUsernamePopup] = useState(false);

  const handleSetUsername = async (username) => {
    setShowUsernamePopup(false);
    setUsername(username);
    await handleCreateRoom();
  };

  const handleCreateRoom = async () => {
    try {
      const response = await fetch("http://localhost:8000/rooms", {
        method: "POST",
      });
      if (response.ok) {
        const code = await response.json();
        setRoomCode(code);
        setScreen("waiting");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleJoinRoom = async (inputCode, username) => {
    try {
      const response = await fetch(`http://localhost:8000/rooms/${inputCode}`);
      if (response.ok) {
        setUsername(username);
        setRoomCode(inputCode);
        setScreen("waiting");
      }
    } catch (e) {}
  };

  return (
    <div>
      <h1 className="title-text">WordChain</h1>
      <p className="tagline">
        Each word must start with the last letter of the previous one. Work
        together!
      </p>
      <div className="screen">
        <div className="buttons">
          {showUsernamePopup && (
            <SetUsernameModal
              onClose={() => setShowUsernamePopup(false)}
              handleSetUsername={handleSetUsername}
            />
          )}
          <button
            disabled={showUsernamePopup}
            onClick={() => setShowUsernamePopup(true)}
          >
            Create Room
          </button>
          {showJoinRoomPopup && (
            <JoinRoomModal
              onClose={() => setJoinRoomPopup(false)}
              handleJoinRoom={handleJoinRoom}
            />
          )}
          <button
            disabled={showJoinRoomPopup}
            onClick={() => setJoinRoomPopup(true)}
          >
            Join Room
          </button>
        </div>
      </div>
    </div>
  );
}
