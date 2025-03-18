import { GridColourState, KeyboardColourState } from "@/types/ColourState";
import { Letter } from "@/types/Letter";

export type Player = {
    email: String, // primary key
    roomId: String
}

export type Game = {
    roomId: String, // primary key
    player1Email: String,
    player2Email: String,
    isPlayer1Ready: boolean,
    isPlayer2Ready: boolean,
    selectedWord: String,
    timer: number,
    words: String[],
    wordIdx: number,
    gridColourState: GridColourState[][],
    keyboardColourState: Record<Letter, KeyboardColourState>,
    isGameOver: boolean,
    popupMessage: String | null,
    triggerWordShakeAnimation: boolean,
    triggerLettersFlipAnimation: boolean,
    isKeyboardDisabled: boolean
}