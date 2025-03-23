import { GridColourState, KeyboardColourState } from "@/types/ColourState";
import { Letter } from "@/types/Letter";

export type Player = {
    email: string, // primary key
    roomId: string
}

export type Game = {
    roomId: string, // primary key
    player1Email: string,
    player2Email: string,
    isPlayer1Ready: boolean,
    isPlayer2Ready: boolean,
    selectedWord: string,
    timer: number,
    words: string[],
    wordIdx: number,
    gridColourState: GridColourState[][],
    keyboardColourState: Record<Letter, KeyboardColourState>,
    isGameOver: boolean,
    popupMessage: string | null,
    triggerWordShakeAnimation: boolean,
    triggerLettersFlipAnimation: boolean,
    isKeyboardDisabled: boolean
}