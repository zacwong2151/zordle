import axios from "axios"
import { finding_game_room, finding_game_user } from "@/types/Matching"
import { JSONResponse, INTERNAL_SERVER_ERROR_RESPONSE } from "@/types/Api";

const DEV_MATCHING_SERVICE_URL = "http://localhost:8080/finding-game"
const ROOM_POV_URL = "/room"
const USER_POV_URL = "/user"

/*

export type finding_game_user = {
    email: String, // primary key
    roomId: String
}

export type finding_game_room = {
    roomId: String, // // primary key
    user1Email: String,
    user2Email: String | null
}

*/

/**
 * Util function for finding_game_user API calls
 */
async function getFindingGameUser(email: String): Promise<JSONResponse> {
    try {
        const response = await axios.get(DEV_MATCHING_SERVICE_URL + USER_POV_URL + `/${email}`, {
            validateStatus: (status) => status < 500
        })

        return response.data
    } catch (error) {
        console.error(error)
        return INTERNAL_SERVER_ERROR_RESPONSE
    }
}

/**
 * Util function for finding_game_room API calls
 */
async function getFindingGameRoom(roomId: String): Promise<JSONResponse> {
    try {
        const response = await axios.get(DEV_MATCHING_SERVICE_URL + ROOM_POV_URL + `/${roomId}`, {
            validateStatus: (status) => status < 500
        })

        return response.data
    } catch (error) {
        console.error(error)
        return INTERNAL_SERVER_ERROR_RESPONSE
    }
}

/**
 * Checks if user is finding a game or not (from finding_game_user)
*/
export async function isUserFindingGame(email: String): Promise<boolean> {
    const res: JSONResponse = await getFindingGameUser(email)

    return res.success
}

/**
 * The user is finding a game. Insert entries into finding_game_user and finding_game_room
 */
export async function initialiseFinding(email: String, roomId: String): Promise<void> {
    const user: finding_game_user = {
        email: email,
        roomId: roomId
    }
    const room: finding_game_room = {
        roomId: roomId,
        user1Email: email,
        user2Email: null
    }

    try {
        await axios.post(DEV_MATCHING_SERVICE_URL + USER_POV_URL, user)
        await axios.post(DEV_MATCHING_SERVICE_URL + ROOM_POV_URL, room)
    } catch (error) {
        console.error(error)
    }
}

/**
 * Get user's room id (from finding_game_user)
*/
export async function getUserRoomId(email: String): Promise<String | null> {
    const res: JSONResponse = await getFindingGameUser(email)

    if (!res.success) {
        console.error(res.message)
        return null
    }
    const user: finding_game_user = res.data
    return user.roomId
}

/**
 * Returns the email of the 2nd player in the room (from finding_game_room)
*/
export async function foundMatch(email: String): Promise<String | null> {
    const roomId: String | null = await getUserRoomId(email)
    if (!roomId) return null
    
    const res: JSONResponse = await getFindingGameRoom(roomId)
    if (!res.success) {
        console.error(res.message)
        return null
    }

    const room: finding_game_room = res.data
    return room.user2Email
}

/**
 * From finding_game_room
 */
export async function getOtherUserEmail(roomId: String): Promise<String | null> {
    const res: JSONResponse = await getFindingGameRoom(roomId)
    if (!res.success) {
        console.error(res.message)
        return null
    }

    const room: finding_game_room = res.data
    return room.user1Email
}

/**
 * Remove user's entries from both finding_game_user and finding_game_room
 */
export async function removeUserFromFinding(email: String): Promise<void> {
    const roomId = await getUserRoomId(email)

    try {
        await axios.delete(DEV_MATCHING_SERVICE_URL + USER_POV_URL + `/${email}`)
        await axios.delete(DEV_MATCHING_SERVICE_URL + ROOM_POV_URL + `/${roomId}`)
    } catch (error) {
        console.error(error)
    }
}

/**
 * Checks if this roomId is a valid id in the finding queue
 */
export async function isRoomIdInFinding(roomId: String): Promise<boolean> {
    const res: JSONResponse = await getFindingGameRoom(roomId)
    return res.success
}

/**
 * Update user2Email in finding-game-room
 */
export async function updateFinding(roomId: String, user2Email: String): Promise<void> {
    try {
        await axios.put(DEV_MATCHING_SERVICE_URL + ROOM_POV_URL + `/${roomId}?user2Email=${user2Email}`)
    } catch (error) {
        console.error(error)
    }
}