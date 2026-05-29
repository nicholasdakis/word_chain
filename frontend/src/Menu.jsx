import { useState } from "react";
import CreateRoomModal from "./CreateRoomModal.jsx";
import JoinRoomModal from "./JoinRoomModal.jsx";

export default function Menu() {
  const [showCreateRoomPopup, setCreateRoomPopup] = useState(false);
  const [showJoinRoomPopup, setJoinRoomPopup] = useState(false);

  return (
    <div className="menu">
      <h1 className="title-text">WordChain</h1>
      <div className="buttons">
        {showCreateRoomPopup && (
          <CreateRoomModal onClose={() => setCreateRoomPopup(false)} />
        )}
        <button onClick={() => setCreateRoomPopup(true)}>Create Room</button>
        {showJoinRoomPopup && (
          <JoinRoomModal onClose={() => setJoinRoomPopup(false)} />
        )}
        <button onClick={() => setJoinRoomPopup(true)}>Join Room</button>
      </div>
    </div>
  );
}
