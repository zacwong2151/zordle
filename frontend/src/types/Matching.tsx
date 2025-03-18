export type finding_game_user = {
    email: String,
    roomId: String
}

export type finding_game_room = {
    roomId: String,
    user1Email: String,
    user2Email: String | null
}