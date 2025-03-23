import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { useState, useEffect } from "react"
import ReactLoading from 'react-loading'
import { isRoomIdInFinding, updateFinding, getOtherUserEmail } from "@/apis/MatchingApis"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { useNavigate } from "react-router"
import { useUserContext } from "@/contexts/UserContext"
import { useMatchingContext } from "@/contexts/MatchingContext"
import { initialiseGame } from "@/apis/BattleApis"

export function JoinRoomModal({ roomId }: { roomId: string }) {
    const { isJoinRoomModalOpen, setIsJoinRoomModalOpen, setIsInvalidRoomModalOpen } = useMatchingContext()
    const [isValidRoomId, setIsValidRoomId] = useState<boolean>(false)
    const navigate = useNavigate()
    const { email } = useUserContext()

    /*
        Either bring user to battle page, or show an invalid room.
    */
    useEffect(() => {
        const fetchRoomId = async () => {
            try {
                const isValid = await isRoomIdInFinding(roomId)
                if (!isValid) {
                    setIsJoinRoomModalOpen(false)
                    setIsInvalidRoomModalOpen(true)
                    return
                }
                setIsValidRoomId(true)

                const otherUserEmail: string | null = await getOtherUserEmail(roomId)
                if (!otherUserEmail) {
                    console.error("should not happen")
                    return
                }

                await initialiseGame(roomId, otherUserEmail, email) // initialise game
                await updateFinding(roomId, email) // tell other user that game is ready to join
                setIsJoinRoomModalOpen(false)
                navigate(`/battle/${roomId}`)
            } catch (error) {
                console.error(error)
            }
        }
        if (isJoinRoomModalOpen) fetchRoomId()
    }, [roomId, email, isJoinRoomModalOpen])

    return (
        <Dialog open={isJoinRoomModalOpen}>
            <DialogContent className="gap-8" hideClose={true}>
                <VisuallyHidden>
                    <DialogDescription></DialogDescription>
                </VisuallyHidden>
                {
                    isValidRoomId ? (
                        <DialogTitle>Joining room..</DialogTitle>
                    ) : (
                        <VisuallyHidden>
                            <DialogTitle>Joining room..</DialogTitle>
                        </VisuallyHidden>
                    )
                }
                {
                    isValidRoomId && (
                        <div className="text-6xl font-bold mx-auto">
                            {roomId}
                        </div>
                    ) 
                }
                <ReactLoading type="spin" color="blue" width={80} height={80} className="mx-auto my-8" />
            </DialogContent>
        </Dialog>

    )
}