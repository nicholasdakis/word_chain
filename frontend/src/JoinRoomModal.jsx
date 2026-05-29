import { useState } from "react";

export default function JoinRoomModal({ onClose, handleJoinRoom }) {
  const [code, setCode] = useState("");

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Enter Code:</h3>
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter a code..."
        />
        <button onClick={onClose}>Close</button>
        <button onClick={() => handleJoinRoom(code)}>Confirm</button>
      </div>
    </div>
  );
}
