export default function WaitingRoom({ playerCount, roomCode, setScreen }) {
  return (
    <div className="screen">
      <h1 className="title-text">Waiting Room</h1>
      <h2>Room code: {roomCode}</h2>
      <button onClick={() => setScreen("menu")}>Back</button>
    </div>
  );
}
