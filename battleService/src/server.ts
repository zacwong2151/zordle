import express, { Express, Request, Response, Application } from 'express';
import cors from "cors"
import mongoose from 'mongoose';
import { MONGO_CONNECTION_URL } from "../config"
import playerRouter from './routes/playerRoutes'
import { Server } from "socket.io"
import gameRouter from "./routes/gameRoutes"
import { GridColourState } from './types/ColourStates';

const app: Application = express();
const corsOptions = {
    origin: ["http://localhost:5173", "https://zordle.fly.dev"], // Allow requests from dev and prod frontends
    methods: "GET,POST,PUT,DELETE",
    credentials: true, // If using cookies or authentication
}

const BATTLE_SERVICE_PORT = 7000;
const WEBSOCKET_PORT = 7001

const io = new Server(WEBSOCKET_PORT, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
})

app.use(express.json());
app.use(cors(corsOptions))
app.use("/battle/player", playerRouter)
app.use("/battle/game", gameRouter)

app.listen(BATTLE_SERVICE_PORT, () => {
    console.log(`battleService is running on port ${BATTLE_SERVICE_PORT}`);
});

mongoose.connect(MONGO_CONNECTION_URL)
    .then(() => console.log("Connected to MongoDB via Mongoose!"))
    .catch((err) => console.error("MongoDB connection error:", err))

io.on('connection', (socket) => {
    socket.on('create-room', (roomId: string) => {
        socket.join(roomId)

        socket.on('new-grid-colour', (newGridColourState: GridColourState[][]) => {
            socket.broadcast.to(roomId).emit('update-grid-colour', newGridColourState) // the use of 'broadcast' excludes the sender
        })
    })

});
