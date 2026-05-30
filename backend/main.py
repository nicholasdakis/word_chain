import random
import string
from fastapi import FastAPI, WebSocket, HTTPException, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import json
from service import validate_word

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

rooms = {} # rooms is stored in-memory for now

@app.get("/")
def root():
    return {"message": "WordChain backend is running"}

@app.websocket("/ws/{room_id}")
async def websocket_endpoint(websocket: WebSocket, room_id: str):
    await websocket.accept()
    join_count = len(rooms[room_id]["players"]) + 1
    new_player = {"ws": websocket, "id": f"player_{join_count}", "username": f"Player {join_count}"}
    rooms[room_id]["players"].append(new_player)
    await websocket.send_text(json.dumps({"type": "user_info", "id": new_player["id"], "username": new_player["username"]}))
    for player in rooms[room_id]["players"]:
        await player["ws"].send_text(json.dumps({"type": "player_joined", "count": len(rooms[room_id]["players"])}))

    if len(rooms[room_id]["players"]) == 2:
       for player in rooms[room_id]["players"]:
            await player["ws"].send_text(json.dumps({"type": "game_start"}))

    try:
        while True:
            data = await websocket.receive_text()
            msg = json.loads(data)
            if msg["type"] == "submitted_word":
                response = validate_word(msg["submitted_word"], rooms[room_id]["latest_word"], rooms[room_id]["used_words"])
                if not response["valid"]:
                    for player in rooms[room_id]["players"]:
                        await player["ws"].send_text(json.dumps(response))
                else:
                    rooms[room_id]["latest_word"] = msg["submitted_word"]
                    rooms[room_id]["used_words"].add(msg["submitted_word"])
                    for player in rooms[room_id]["players"]:
                        await player["ws"].send_text(json.dumps({"valid": True, "word": msg["submitted_word"]}))
    except WebSocketDisconnect:
        rooms[room_id]["players"].remove(new_player)
    
@app.post("/rooms")
def create_room():
    while True:
        room_id = "".join(random.choices(string.ascii_letters + string.digits, k=6))
        if room_id not in rooms:
            rooms[room_id] = {"players": [], "used_words": set(), "latest_word": None}
            break
    return room_id

@app.get("/rooms/{room_id}")
def get_room(room_id: str):
    if room_id not in rooms:
        raise HTTPException(status_code=404, detail="Room not found")
    return {"exists": True}