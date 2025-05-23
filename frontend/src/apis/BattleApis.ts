import axios from "axios";
import { getRandomWord } from "./WordleApis";
import { Player, Game, UpdateGameDto } from "@/types/BattleTypes";
import { JSONResponse, INTERNAL_SERVER_ERROR_RESPONSE } from "@/types/ApiTypes";
import { DEFAULT_WORDS, DEFAULT_GRID_COLOUR_STATE, DEFAULT_KEYBOARD_COLOUR_STATE } from "@/contexts/DefaultStates";

const DEV_BATTLE_SERVICE_URL = "http://localhost:7000/battle"
const PLAYER_POV_URL = "/player"
const GAME_POV_URL = "/game"

/*

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
*/

/**
 * Util function for Player API calls
 */
async function getPlayer(email: string): Promise<JSONResponse> {
    try {
        const response = await axios.get(DEV_BATTLE_SERVICE_URL + PLAYER_POV_URL + `/${email}`, {
            validateStatus: (status) => status < 500
        })

        return response.data
    } catch (error) {
        console.error(error)
        return INTERNAL_SERVER_ERROR_RESPONSE
    }
}

/**
 * Util function for Game API calls
 */
async function getGame(roomId: string): Promise<JSONResponse> {
    try {
        const response = await axios.get(DEV_BATTLE_SERVICE_URL + GAME_POV_URL + `/${roomId}`, {
            validateStatus: (status) => status < 500
        })

        return response.data
    } catch (error) {
        console.error(error)
        return INTERNAL_SERVER_ERROR_RESPONSE
    }
}


/**
 * Checks if user is currently playing a game or not
 */
export async function isUserInGame(email: string): Promise<boolean> {
    const res: JSONResponse = await getPlayer(email)

    return res.success
}

/**
 * Get a player's room id
 */
export async function getPlayerRoomId(email: string): Promise<string | null> {
    const res: JSONResponse = await getPlayer(email)

    if (!res.success) {
        console.error(res.message)
        return null
    }
    const player: Player = res.data
    return player.roomId
}

/**
 * Checks if this room id is valid
 */
export async function isGameIdValid(roomId: string): Promise<boolean> {
    const res: JSONResponse = await getGame(roomId)

    if (!res.success) {
        console.error(res.message)
        return false
    }
    return true
}

/**
 * Initialise game for Player and Game
 */
export async function initialiseGame(
    roomId: string, // primary key
    player1Email: string,
    player2Email: string,
): Promise<void> {
    const player1ReqBody: Player = {
        email: player1Email,
        roomId: roomId
    }
    const player2ReqBody: Player = {
        email: player2Email,
        roomId: roomId
    }

    const selectedWord: string = getRandomWord()

    const gameReqBody: Game = {
        roomId: roomId,
        atReadyPage: true,
        selectedWord: selectedWord,
        timer: 0,
        
        player1Email: player1Email,
        isPlayer1Ready: false,
        player1_words: DEFAULT_WORDS,
        player1_wordIdx: 0,
        player1_gridColourState: DEFAULT_GRID_COLOUR_STATE,
        player1_keyboardColourState: DEFAULT_KEYBOARD_COLOUR_STATE,
        player1_isGameOver: false,
        
        player2Email: player2Email,
        isPlayer2Ready: false,
        player2_words: DEFAULT_WORDS,
        player2_wordIdx: 0,
        player2_gridColourState: DEFAULT_GRID_COLOUR_STATE,
        player2_keyboardColourState: DEFAULT_KEYBOARD_COLOUR_STATE,
        player2_isGameOver: false,
    }

    try {
        // TODO: batch this into a single api call
        await axios.post(DEV_BATTLE_SERVICE_URL + PLAYER_POV_URL, player1ReqBody)
        await axios.post(DEV_BATTLE_SERVICE_URL + PLAYER_POV_URL, player2ReqBody)

        await axios.post(DEV_BATTLE_SERVICE_URL + GAME_POV_URL, gameReqBody)
    } catch (error) {
        console.error(error)
    }

}

/**
 * Get game info
 */
export async function getGameInfo(roomId: string): Promise<Game | null> {
    const res: JSONResponse = await getGame(roomId)

    if (!res.success) {
        return null // console logs 404 anyway
    }

    return res.data
}

/**
 * Remove player from game, and modify the corresponding game document
 */
export async function removePlayerFromGame(email: string): Promise<boolean> {
    try {
        const response = await axios.delete(DEV_BATTLE_SERVICE_URL + PLAYER_POV_URL + `/${email}`, {
            validateStatus: (status) => status < 500
        });
        const res: JSONResponse = response.data

        console.log(res.message)

        return res.success
    } catch (error) {
        console.error(error);
        return false
    }
}

export async function updateGameInfo(roomId: string, updateGameDto: UpdateGameDto) : Promise<void> {
    try {
        await axios.put(DEV_BATTLE_SERVICE_URL + GAME_POV_URL + `/${roomId}`, updateGameDto)
    } catch (error) {
        console.error(error)
    }
}