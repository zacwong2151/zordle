import { GridColourState, KeyboardColourState, Letter } from "@/types/WordleTypes";

export const DEFAULT_GRID_COLOUR_STATE: GridColourState[][] = [
    ['white', 'white', 'white', 'white', 'white'],
    ['white', 'white', 'white', 'white', 'white'],
    ['white', 'white', 'white', 'white', 'white'],
    ['white', 'white', 'white', 'white', 'white'],
    ['white', 'white', 'white', 'white', 'white'],
    ['white', 'white', 'white', 'white', 'white']
]

const initialKeyboardColourState: Record<Letter, KeyboardColourState> = {} as Record<Letter, KeyboardColourState>
"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach(letter => {
    initialKeyboardColourState[letter as Letter] = "gray"
})

export const DEFAULT_KEYBOARD_COLOUR_STATE: Record<Letter, KeyboardColourState> = initialKeyboardColourState

export const DEFAULT_WORDS: string[] = ["", "", "", "", "", ""]
