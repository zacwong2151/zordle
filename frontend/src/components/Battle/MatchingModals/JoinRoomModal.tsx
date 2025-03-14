import {
    Dialog,
    DialogPortal,
    DialogOverlay,
    DialogTrigger,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog"
import { useState, useEffect } from "react"
import ReactLoading from 'react-loading'
import { useWordleContext } from "@/contexts/WordleContext"
import { isRoomIdInFinding, updateUser2Email } from "@/apis/MatchingApis"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { useNavigate } from "react-router"
import { useUserContext } from "@/contexts/UserContext"

export function JoinRoomModal({ roomId }: { roomId: string }) {
    const { isJoinRoomModalOpen, setIsJoinRoomModalOpen, setIsInvalidRoomModalOpen } = useWordleContext()
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
                updateUser2Email(roomId, email)
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