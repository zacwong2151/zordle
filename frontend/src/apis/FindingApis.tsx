import axios from "axios"

/*
    2 schemas for Finding Game/Room:

    finding_game_user:
     - email (primary key)
     - roomId
    finding_game_room:
        - roomId (primary key)
        - user1Email
        - user2Email (initialised to null)
*/

type finding_game_user = {
    email: String,
    roomId: String
}

type finding_game_room = {
    roomId: String,
    user1Email: String,
    user2Email: String | null
}

const DEV_BATTLE_SERVICE_URL = "http://localhost:8080/battle/finding-game"
const ROOM_POV_URL = "/room"
const USER_POV_URL = "/user"

/**
 * Checks if user is finding a game or not (from finding_game_user)
*/
export async function isUserFindingGame(email: string) {
    try {
        const res = await axios.get(DEV_BATTLE_SERVICE_URL + USER_POV_URL + `/${email}`)
        if (res.data) {
            return true
        }
        return false
    } catch (error) {
        console.warn(error)
    }
}

/**
 * The user is finding a game. Insert entries into finding_game_user and finding_game_room
 */
export async function userIsFindingGame(email: string, roomId: string) {
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
        await axios.post(DEV_BATTLE_SERVICE_URL + USER_POV_URL, user)
        await axios.post(DEV_BATTLE_SERVICE_URL + ROOM_POV_URL, room)
    } catch (error) {
        console.error(error)
    }
}

/**
 * Get user's room id (from finding_game_user)
*/
export async function getUserRoomId(email: string) {
    try {
        const res = await axios.get(DEV_BATTLE_SERVICE_URL + USER_POV_URL + `/${email}`)
        const user: finding_game_user = res.data
        return user.roomId
    } catch (error) {
        console.error(error)
    }
}

/**
 * Checks if a 2nd user has joined the room (from finding_game_room)
*/
export async function foundMatch(email: string) {
    const roomId = await getUserRoomId(email)

    try {
        const res = await axios.get(DEV_BATTLE_SERVICE_URL + ROOM_POV_URL + `/${roomId}`)
        const room: finding_game_room = res.data
        if (room.user2Email) {
            return true
        }
        return false
    } catch (error) {
        console.error(error)
    }
}

/**
 * Remove user's entries from both finding_game_user and finding_game_room
 */
export async function removeUserFromFinding(email: string) {
    const roomId = await getUserRoomId(email)

    try {
        await axios.delete(DEV_BATTLE_SERVICE_URL + USER_POV_URL + `/${email}`)
        await axios.delete(DEV_BATTLE_SERVICE_URL + ROOM_POV_URL + `/${roomId}`)
    } catch (error) {
        console.error(error)
    }
}