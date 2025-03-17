import axios from "axios";
import { GridColourState, KeyboardColourState } from "@/types/ColourState";
import { Letter } from "@/types/Letter";
import { getRandomWord } from "./CoreGameApis";

type Player = {
    email: String, // primary key
    roomId: String
}

type Game = {
    roomId: String, // primary key
    player1Email: String,
    player2Email: String,
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

const DEV_BATTLE_SERVICE_URL = "http://localhost:7000/battle"
const PLAYER_POV_URL = "/player"
const GAME_POV_URL = "/game"

/**
 * Checks if user is currently playing a game or not
 */
export async function isUserInGame(email: String) {
    try {
        const res = await axios.get(DEV_BATTLE_SERVICE_URL + PLAYER_POV_URL + `/${email}`, {
            validateStatus: (status) => status < 500
        })

        if (res.status === 404) {
            return false
        }

        return true
    } catch (error) {
        console.error(error)
    }
}

/**
 * Initialise game for Player and Game
 */
export async function initialiseGame(
    roomId: String, // primary key
    player1Email: String,
    player2Email: String,
) {
    const player1ReqBody: Player = {
        email: player1Email,
        roomId: roomId
    }
    const player2ReqBody: Player = {
        email: player2Email,
        roomId: roomId
    }

    let selectedWord = "PLACE" // placeholder word in case wordService fails
    try {
        selectedWord = await getRandomWord()
    } catch (error) {
        console.error(error)    
    }

    const gridColourState: GridColourState[][] = [
        ['white', 'white', 'white', 'white', 'white'],
        ['white', 'white', 'white', 'white', 'white'],
        ['white', 'white', 'white', 'white', 'white'],
        ['white', 'white', 'white', 'white', 'white'],
        ['white', 'white', 'white', 'white', 'white'],
        ['white', 'white', 'white', 'white', 'white']
    ]
    const keyboardColourState: Record<Letter, KeyboardColourState> = {} as Record<Letter, KeyboardColourState>
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach(letter => {
        keyboardColourState[letter as Letter] = "gray"
    })

    const gameReqBody: Game = {
        roomId: roomId,
        player1Email: player1Email,
        player2Email: player2Email,
        selectedWord: selectedWord,
        timer: 0,
        words: ["", "", "", "", "", ""],
        wordIdx: 0,
        gridColourState: gridColourState,
        keyboardColourState: keyboardColourState,
        isGameOver: false,
        popupMessage: null,
        triggerWordShakeAnimation: false,
        triggerLettersFlipAnimation: false,
        isKeyboardDisabled: false
    }

    try {
        await axios.post(DEV_BATTLE_SERVICE_URL + PLAYER_POV_URL, player1ReqBody)
        await axios.post(DEV_BATTLE_SERVICE_URL + PLAYER_POV_URL, player2ReqBody)

        await axios.post(DEV_BATTLE_SERVICE_URL + GAME_POV_URL, gameReqBody)
    } catch (error) {
        console.error(error)
    }

}