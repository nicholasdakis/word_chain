import random
import string
from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware

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
    while True:
        data = await websocket.receive_text()
        await websocket.send_text(data)
    
@app.post("/rooms")
def create_room():
    while True:
        room_id = "".join(random.choices(string.ascii_letters + string.digits, k=6))
        if room_id not in rooms:
            rooms[room_id] = {}
            break

    return room_id