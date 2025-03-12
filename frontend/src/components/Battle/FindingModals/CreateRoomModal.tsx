import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogTitle,
} from "@/components/ui/dialog"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import ReactLoading from 'react-loading'
import { useWordleContext } from "@/contexts/WordleContext"
import { useUserContext } from "@/contexts/UserContext"
import { getUserRoomId, foundMatch, removeUserFromFinding } from "@/apis/FindingApis"

export function CreateRoomModal() {
    const navigate = useNavigate()
    const { email } = useUserContext()
    const { isCreateRoomModalOpen, setIsCreateRoomModalOpen } = useWordleContext()
    const roomId: string = getUserRoomId(email)

    /*
        Poll finding_game_room every second to check if player2_email is initialised. Once it is, navigate to BattlePage.
        Remove entries from finding_game_player and finding_game_room
    */
    useEffect(() => {
        if (isCreateRoomModalOpen) {
            const interval = setInterval(() => {
                console.log('Polling every second to check if user found match..')
                if (foundMatch(email)) {
                    clearInterval(interval)
                    removeUserFromFinding(email)
                    const roomId = "123"
                    // navigate(`/battle/${roomId}`)
                }
            }, 1000) 
            return () => {
                if (interval) clearInterval(interval)
            } 
        }
    }, [email, navigate, isCreateRoomModalOpen])

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
                        onClick={() => setIsCreateRoomModalOpen(false)}
                    >
                        Leave room
                    </Button>
                </DialogFooter>

            </DialogContent>
        </Dialog>

    )
}