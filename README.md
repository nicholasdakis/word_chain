# WordChain

A real-time multiplayer word chain game. Two players share a room and take turns submitting words where each word must start with the last letter of the previous word. The game ends on an invalid word, repeated word, or timeout.

## Tech Stack

- **Frontend:** React (Vite)
- **Backend:** FastAPI + WebSockets

## Getting Started

**Backend**
```
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

**Frontend**
```
cd frontend
npm install
npm run dev
```

Then open the URL shown in your terminal (usually `http://localhost:5173`).

## Credits

Word list (`words_alpha.txt`) from [dwyl/english-words](https://github.com/dwyl/english-words), licensed under the MIT License.
