import express, { Express, Request, Response, Application } from 'express';
import cors from "cors"
import mongoose from 'mongoose';
import { MONGO_CONNECTION_URL } from "../config"
import router from './routes/playerRoutes';

const app: Application = express();
const corsOptions = {
    origin: ["http://localhost:5173", "https://zordle.fly.dev"], // Allow requests from dev and prod frontends
    methods: "GET,POST,PUT,DELETE",
    credentials: true, // If using cookies or authentication
}
const PORT = 7000;

app.use(express.json());
app.use(cors(corsOptions))
app.use("/battle", router)

app.listen(PORT, () => {
    console.log(`battleService is running on port ${PORT}`);
});

mongoose.connect(MONGO_CONNECTION_URL)
    .then(() => console.log("Connected to MongoDB via Mongoose!"))
    .catch((err) => console.error("MongoDB connection error:", err))
