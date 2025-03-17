import mongoose, { Document, Schema } from "mongoose";

interface PlayerType extends Document {
    _id: string,
    roomId: string
}

const playerSchema: Schema<PlayerType> = new Schema({
    _id: { // email
        type: String,
        required: true
    },
    roomId: {
        type: String,
        required: true
    }
})

export const Player = mongoose.model<PlayerType>('Player', playerSchema)