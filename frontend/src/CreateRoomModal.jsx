export default function CreateRoomModal({ onClose, roomCode }) {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Room Code: {roomCode}</h3>
        <h3>Players in room: 1/2</h3>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
