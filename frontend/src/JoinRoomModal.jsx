import { useState } from "react";

export default function JoinRoomModal({ onClose, handleJoinRoom }) {
  const [code, setCode] = useState("");
  const [username, setUsername] = useState("");

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Enter a username:</h3>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter a username..."
        />
        <h3>Enter room code:</h3>
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter a code..."
        />
        <div className="modal-buttons">
          <button onClick={onClose}>Close</button>
          <button onClick={() => handleJoinRoom(code, username)}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
