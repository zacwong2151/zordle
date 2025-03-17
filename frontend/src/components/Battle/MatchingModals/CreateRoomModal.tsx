import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogTitle,
} from "@/components/ui/dialog"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import ReactLoading from 'react-loading'
import { useWordleContext } from "@/contexts/WordleContext"
import { useUserContext } from "@/contexts/UserContext"
import { getUserRoomId, foundMatch, removeUserFromFinding, isUserFindingGame } from "@/apis/MatchingApis"
import { initialiseGame } from "@/apis/BattleApis"

export function CreateRoomModal() {
    const navigate = useNavigate()
    const { email } = useUserContext()
    const { isCreateRoomModalOpen, setIsCreateRoomModalOpen } = useWordleContext()
    const [roomId, setRoomId] = useState<String | null>(null)

    /*
        Fetch user's room id
    */
    useEffect(() => {
        const fetchRoomId = async () => {
            try {
                const roomId = await getUserRoomId(email)
                setRoomId(roomId ?? null)
            } catch (error) {
                console.warn(error)
            }
        }
        if (isCreateRoomModalOpen) fetchRoomId()

    }, [email, roomId, isCreateRoomModalOpen])

    /*
        Poll finding_game_room every second to check if player2_email is initialised. Once it is, navigate to BattlePage.
    */
    useEffect(() => {
        if (isCreateRoomModalOpen && roomId) {
            const interval = setInterval(async () => {
                console.log('Polling every second to check if user found match..')

                const user2Email = await foundMatch(email)

                if (user2Email) {
                    await removeUserFromFinding(email)
                    await initialiseGame(roomId, email, user2Email)
                    
                    clearInterval(interval)
                    navigate(`/battle/${roomId}`)
                }
            }, 1000)
            return () => {
                if (interval) clearInterval(interval)
            }
        }
    }, [email, roomId, navigate, isCreateRoomModalOpen])

    const handleLeaveRoom = async () => {
        await removeUserFromFinding(email)
        setIsCreateRoomModalOpen(false)
    }

    return (
        <Dialog open={isCreateRoomModalOpen}>
            <DialogContent className="gap-8" hideClose={true}>
                <DialogTitle>Waiting for friend to join room..</DialogTitle>

                <div className="text-6xl font-bold mx-auto">
                    {roomId}
                </div>

                <ReactLoading type="spin" color="blue" width={80} height={80} className="mx-auto" />

                <DialogFooter>
                    <Button
                        className="bg-red-600 hover:bg-red-700"
                        onClick={handleLeaveRoom}
                    >
                        Leave room
                    </Button>
                </DialogFooter>

            </DialogContent>
        </Dialog>

    )
}