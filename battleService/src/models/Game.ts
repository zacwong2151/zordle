import mongoose, { Document, Schema } from "mongoose";
import { GridColourState, KeyboardColourState } from "../types/ColourStates";
import { Letter } from "../types/Letter";

export interface GameType extends Document {
    _id: string, // roomId
    player1Email: string | null,
    player2Email: string | null,
    isPlayer1Ready: boolean,
    isPlayer2Ready: boolean,
    selectedWord: string,
    timer: number,
    words: string[],
    wordIdx: number,
    gridColourState: GridColourState[][],
    keyboardColourState: Record<Letter, KeyboardColourState>,
    isGameOver: boolean,
    popupMessage: string,
    triggerWordShakeAnimation: boolean,
    triggerLettersFlipAnimation: boolean,
    isKeyboardDisabled: boolean
}

const gameSchema: Schema<GameType> = new Schema({
    _id: { // roomId
        type: String,
    },
    player1Email: {
        type: String,
    },
    player2Email: {
        type: String,
    },
    isPlayer1Ready: {
        type: Boolean,
    },
    isPlayer2Ready: {
        type: Boolean,
    },
    selectedWord: {
        type: String,
    },
    timer: {
        type: Number,
    },
    words: [{
        type: String, // array of strings
    }],
    wordIdx: {
        type: Number,
    },
    gridColourState: [[Schema.Types.Mixed]], // 2D array of *any* type
    keyboardColourState: {
        type: Map, // Map of Letter -> KeyboardColourState
        of: Schema.Types.Mixed, // Mongoose doesn't natively support Maps with complex types
    },
    isGameOver: {
        type: Boolean,
    },
    popupMessage: {
        type: String,
    },
    triggerWordShakeAnimation: {
        type: Boolean,
    },
    triggerLettersFlipAnimation: {
        type: Boolean,
    },
    isKeyboardDisabled: {
        type: Boolean,
    }
})


export const Game = mongoose.model<GameType>('Game', gameSchema)