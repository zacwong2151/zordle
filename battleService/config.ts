import dotenv from "dotenv"

dotenv.config({
    path: "./.env"
})

if (!process.env.MONGO_CONNECTION_URL) {
    throw new Error("MONGO_CONNECTION_URL not defined in .env file")
}

export const MONGO_CONNECTION_URL = process.env.MONGO_CONNECTION_URL