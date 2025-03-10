import { useParams } from "react-router"

export default function BattlePage() {
    const { roomId } = useParams()

    /*
        TODO:
        1. upon page render, check if this roomId is in db. If its not, return to HomePage
        2. If yes, check if this user belongs to this roomId, if not, return to HomePage
    */

    return (
        <div>{roomId}</div>
    )
}