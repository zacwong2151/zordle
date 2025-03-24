import axios from "axios"
import { Room, User } from "@/types/Matching"
import { JSONResponse, INTERNAL_SERVER_ERROR_RESPONSE } from "@/types/Api";

const DEV_MATCHING_SERVICE_URL = "http://localhost:8080/matching"
const ROOM_POV_URL = "/room"
const USER_POV_URL = "/user"

/*

export type User = {
    email: string, // primary key
    roomId: string
}

export type Room = {
    roomId: string, // // primary key
    user1Email: string,
    user2Email: string | null
}

*/

/**
 * Util function for User API calls
 */
async function getUser(email: string): Promise<JSONResponse> {
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
 * Util function for Room API calls
 */
async function getRoom(roomId: string): Promise<JSONResponse> {
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
 * Checks if User is finding a game or not (from User)
*/
export async function isUserFindingGame(email: string): Promise<boolean> {
    const res: JSONResponse = await getUser(email)

    return res.success
}

/**
 * The User is finding a game. Insert entries into User and Room
 */
export async function initialiseFinding(email: string, roomId: string): Promise<void> {
    const User: User = {
        email: email,
        roomId: roomId
    }
    const Room: Room = {
        roomId: roomId,
        user1Email: email,
        user2Email: null
    }

    try {
        await axios.post(DEV_MATCHING_SERVICE_URL + USER_POV_URL, User)
        await axios.post(DEV_MATCHING_SERVICE_URL + ROOM_POV_URL, Room)
    } catch (error) {
        console.error(error)
    }
}

/**
 * Get User's Room id (from User)
*/
export async function getUserRoomId(email: string): Promise<string | null> {
    const res: JSONResponse = await getUser(email)

    if (!res.success) {
        console.error(res.message)
        return null
    }
    const User: User = res.data
    return User.roomId
}

/**
 * Returns the email of the 2nd player in the Room (from Room)
*/
export async function foundMatch(email: string): Promise<string | null> {
    const roomId: string | null = await getUserRoomId(email)
    if (!roomId) return null
    
    const res: JSONResponse = await getRoom(roomId)
    if (!res.success) {
        console.error(res.message)
        return null
    }

    const Room: Room = res.data
    return Room.user2Email
}

/**
 * From Room
 */
export async function getOtherUserEmail(roomId: string): Promise<string | null> {
    const res: JSONResponse = await getRoom(roomId)
    if (!res.success) {
        console.error(res.message)
        return null
    }

    const Room: Room = res.data
    return Room.user1Email
}

/**
 * Remove User's entries from both User and Room
 */
export async function removeUserFromFinding(email: string): Promise<void> {
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
export async function isRoomIdInFinding(roomId: string): Promise<boolean> {
    const res: JSONResponse = await getRoom(roomId)
    return res.success
}

/**
 * Update user2Email in Room
 */
export async function updateFinding(roomId: string, user2Email: string): Promise<void> {
    try {
        await axios.put(DEV_MATCHING_SERVICE_URL + ROOM_POV_URL + `/${roomId}?user2Email=${user2Email}`)
    } catch (error) {
        console.error(error)
    }
}