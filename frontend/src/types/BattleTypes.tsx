import { GridColourState, KeyboardColourState, Letter } from "@/types/WordleTypes";

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
    atReadyPage: boolean,

    selectedWord: string,
    timer: number,
    
    your_words: string[],
    your_wordIdx: number,
    your_gridColourState: GridColourState[][],
    your_keyboardColourState: Record<Letter, KeyboardColourState>,
    your_isGameOver: boolean,
    your_popupMessage: string | null,
    your_triggerWordShakeAnimation: boolean,
    your_triggerLettersFlipAnimation: boolean,
    your_isKeyboardDisabled: boolean
    
    opponent_words: string[],
    opponent_wordIdx: number,
    opponent_gridColourState: GridColourState[][],
    opponent_keyboardColourState: Record<Letter, KeyboardColourState>,
    opponent_triggerLettersFlipAnimation: boolean,
}

export enum WhichPlayer {
    SOLO,
    YOU,
    OPP
}