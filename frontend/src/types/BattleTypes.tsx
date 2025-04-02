import { GridColourState, KeyboardColourState, Letter } from "@/types/WordleTypes";

export type Player = {
    email: string, // primary key
    roomId: string
}

/*
    The Game type here **MUST** sync with /models/Game in BattleService
*/
export type Game = {
    // Generic fields
    roomId: string, // roomId primary key
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

export enum WhichPlayer {
    SOLO,
    YOU,
    OPP
}

export type UpdateGameDto = {
    isPlayer1Ready?: boolean,
    player1_words?: string[],
    player1_wordIdx?: number,
    player1_gridColourState?: GridColourState[][],
    player1_keyboardColourState?: Record<Letter, KeyboardColourState>,
    player1_isGameOver?: boolean,
    
    isPlayer2Ready?: boolean,
    player2_words?: string[],
    player2_wordIdx?: number,
    player2_gridColourState?: GridColourState[][],
    player2_keyboardColourState?: Record<Letter, KeyboardColourState>,
    player2_isGameOver?: boolean,
}