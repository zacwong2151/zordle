/*
    2 schemas for Finding Game/Room:

    finding_game_user:
     - userEmail (primary key)
     - roomId
    finding_game_room:
     - roomId (primary key)
     - player1_email
     - player2_email (initialised to null)
*/

/**
 * Checks if user is finding a game or not (from finding_game_player)
 */
export function isUserFindingGame(email: string) : boolean {
    return false
}

/**
 * The user is finding a game. Insert entries into finding_game_player and finding_game_room
 */
export function userIsFindingGame(email: string, roomId: string) {

}

/**
 * Get user's room id (from finding_game_player)
 */
export function getUserRoomId(email: string) : string {
    return "123456"
}

/**
 * Checks if a 2nd player has joined the room (from finding_game_room)
 */
export function foundMatch(email: string) : boolean {
    return false
}

/**
 * Remove user's entries from both finding_game_player and finding_game_room
 */
export function removeUserFromFinding(email: string) {

}