import mongoose, { Document, Schema } from "mongoose";
import { GridColourState, KeyboardColourState } from "../types/ColourStates";
import { Letter } from "../types/Letter";

/*  
    The GameType here **MUST** sync with BattleTypes in frontend
*/
export interface GameType extends Document {
    // Generic fields
    _id: string, // roomId primary key
    atReadyPage: boolean,
    selectedWord: string,
    timer: number,
    
    // Player specific fields
    player1Email: string | null,
    isPlayer1Ready: boolean,
    player1_words: string[],
    player1_wordIdx: number,
    player1_gridColourState: GridColourState[][],
    player1_keyboardColourState: Record<Letter, KeyboardColourState>,
    player1_isGameOver: boolean,
    
    player2Email: string | null,
    isPlayer2Ready: boolean,
    player2_words: string[],
    player2_wordIdx: number,
    player2_gridColourState: GridColourState[][],
    player2_keyboardColourState: Record<Letter, KeyboardColourState>,
    player2_isGameOver: boolean,
}

const gameSchema: Schema<GameType> = new Schema({
    _id: { // roomId
        type: String,
    },
    atReadyPage: {
        type: Boolean,
        default: false,
    },
    selectedWord: {
        type: String,
    },
    timer: {
        type: Number,
    },
    
    player1Email: {
        type: String,
        default: null,
    },
    isPlayer1Ready: {
        type: Boolean,
        default: false,
    },
    player1_words: [{
        type: String, // array of strings
    }],
    player1_wordIdx: {
        type: Number,
        default: 0,
    },
    player1_gridColourState: [[Schema.Types.Mixed]], // 2D array of *any* type
    player1_keyboardColourState: {
        type: Map, // Map of Letter -> KeyboardColourState
        of: Schema.Types.Mixed, // Mongoose doesn't natively support Maps with complex types
    },
    player1_isGameOver: {
        type: Boolean,
        default: false,
    },
    
    player2Email: {
        type: String,
        default: null,
    },
    isPlayer2Ready: {
        type: Boolean,
        default: false,
    },
    player2_words: [{
        type: String, // array of strings
    }],
    player2_wordIdx: {
        type: Number,
        default: 0,
    },
    player2_gridColourState: [[Schema.Types.Mixed]], // 2D array of *any* type
    player2_keyboardColourState: {
        type: Map, // Map of Letter -> KeyboardColourState
        of: Schema.Types.Mixed, // Mongoose doesn't natively support Maps with complex types
    },
    player2_isGameOver: {
        type: Boolean,
        default: false,
    },
});


export const Game = mongoose.model<GameType>('Game', gameSchema)