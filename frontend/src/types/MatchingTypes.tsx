export type User = {
    email: string,
    roomId: string
}

export type Room = {
    roomId: string,
    user1Email: string,
    user2Email: string | null
}