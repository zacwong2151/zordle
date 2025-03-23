export type finding_game_user = {
    email: string,
    roomId: string
}

export type finding_game_room = {
    roomId: string,
    user1Email: string,
    user2Email: string | null
}