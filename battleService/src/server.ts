import express, { Express, Request, Response, Application } from 'express';
import cors from "cors"
import mongoose from 'mongoose';
import { MONGO_CONNECTION_URL } from "../config"
import { Player } from './models/Player';

const app: Application = express();
const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200,
    credentials: true
}
const PORT = 7000;

app.use(express.json());
app.use(cors(corsOptions))

app.listen(PORT, () => {
    console.log(`battleService is running on port ${PORT}`);
});

mongoose.connect(MONGO_CONNECTION_URL)
    .then(() => console.log("Connected to MongoDB via Mongoose!"))
    .catch((err) => console.error("MongoDB connection error:", err))

const player = new Player({
    _id: "123",
    roomId: "qewrty"
})
