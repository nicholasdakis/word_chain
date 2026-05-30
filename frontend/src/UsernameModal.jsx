import { useState } from "react";

export default function SetUsernameModal({ onClose, handleSetUsername }) {
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
        <div className="modal-buttons">
          <button onClick={onClose}>Close</button>
          <button onClick={() => handleSetUsername(username)}>Confirm</button>
        </div>
      </div>
    </div>
  );
}
