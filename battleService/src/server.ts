import express, { Express, Request, Response, Application } from 'express';
import cors from "cors"
import mongoose from 'mongoose';
import { MONGO_CONNECTION_URL } from "../config"
import playerRouter from './routes/playerRoutes'
import { Server } from "socket.io"
import gameRouter from "./routes/gameRoutes"
import { GridColourState } from './types/ColourStates';

const BATTLE_SERVICE_PORT = 7000;
const WEBSOCKET_PORT = 7001

const app: Application = express();
const corsOptions = {
    origin: ["http://localhost:5173", "https://zordle.fly.dev"], // Allow requests from dev and prod frontends
    methods: "GET,POST,PUT,DELETE",
    credentials: true, // If using cookies or authentication
}


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

const roomSets = new Map<string, Set<string>>() // maps a roomId to a Set of player emails in that game
const timeMap = new Map<string, number>() // maps a roomId to its respective game timer
const timeIntervals = new Map<string, NodeJS.Timeout>() // maps a roomId to a NodeJS Interval. Indicates if a game's timer has started

io.on('connection', (socket) => { // listen for incoming sockets
    socket.on('create-room', (roomId: string) => {
        socket.join(roomId)
    })

    socket.on('new-grid-colour', (newGridColourState: GridColourState[][]) => {
        const roomId = Array.from(socket.rooms)[1] 
        if (!roomId) {
            console.error('roomId is null at new-grid-colour')
            return
        }
        socket.broadcast.to(roomId).emit('update-grid-colour', newGridColourState) // the use of 'broadcast' excludes the sender
    })

    socket.on('ready-to-play', (email: string) => {
        const roomId = Array.from(socket.rooms)[1] 
        if (!roomId) {
            console.error('roomId is null at ready-to-play')
            return
        }

        if (!roomSets.has(roomId)) {
            roomSets.set(roomId, new Set<string>())
        }
        const set: Set<string> = roomSets.get(roomId)!

        set.add(email)

        if (set.size === 2) { // TODO: explicity check that both emails are correct
            io.to(roomId).emit('both-players-ready')
            
            let countdown = 5
            const sendCountdown = () => {
                if (countdown >= 0) {
                    io.to(roomId).emit('countdown', countdown);
                    countdown--
                    setTimeout(sendCountdown, 800) // Recursive call
                }
            }
            sendCountdown()
        }
    })
    
    socket.on('start-timer', () => {
        const roomId = Array.from(socket.rooms)[1] 
        if (!roomId) {
            console.error('roomId is null at start-timer')
            return
        }

        if (!timeMap.has(roomId)) {
            timeMap.set(roomId, 1)
        }
        let time: number = timeMap.get(roomId)!

        if (timeIntervals.has(roomId)) {
            return
        }
        
        // TODO: handle case where at least 1 player does not leave the game, and game extends for >30 mins. Should auto delete game.
        const startTimer = () => {
            io.to(roomId).emit('update-time', time)
            timeMap.set(roomId, time++)
        }
        
        const intervalId = setInterval(startTimer, 1000)
        timeIntervals.set(roomId, intervalId)
    })
    
    socket.on('exit-game', (email: string, callback) => {
        console.log('received exit-game event')
        const roomId = Array.from(socket.rooms)[1] 
        if (!roomId) {
            console.error('roomId is null at exit-game')
            return
        }
        
        if (!roomSets.has(roomId)) {
            console.error('error at roomSets')
            callback({ success: true })
            return
        }
        if (!timeMap.has(roomId)) {
            console.error('error at timeMap')
            callback({ success: true })
            return
        }
        if (!timeIntervals.has(roomId)) {
            console.error('error at timeIntervals')
            callback({ success: true })
            return
        }

        const set = roomSets.get(roomId)!

        if (!set.has(email)) {
            throw new Error('should not happen')
        }
        set.delete(email)

        if (set.size === 0) { // no players left in the room. Clean up roomSets, timeMap, timeIntervals
            roomSets.delete(roomId)
            timeMap.delete(roomId)

            const intervalId = timeIntervals.get(roomId)
            clearInterval(intervalId)
            timeIntervals.delete(roomId)

            console.log(`removed ${email}, successfully cleaned up server`)
        } else if (set.size === 1) {
            console.log(`removed ${email}, server modified`)
        }

        console.log(roomSets)

        callback({ success: true })
    })
})
